const express = require('express');
const { google } = require('googleapis');
const session = require('express-session');
const fs = require('fs');
const path = require('path');
const twilio = require('twilio');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Load client secrets from a local file.
const CREDENTIALS_PATH = 'credentials.json';
const TOKEN_PATH = 'token.json';

let credentials;
let oAuth2Client;

fs.readFile(CREDENTIALS_PATH, (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    credentials = JSON.parse(content);
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
});

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Twilio configuration
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

app.get('/auth/google', (req, res) => {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/calendar.events']
    });
    res.redirect(authUrl);
});

app.get('/auth/google/callback', (req, res) => {
    const code = req.query.code;
    oAuth2Client.getToken(code, (err, token) => {
        if (err) return res.redirect('/');
        oAuth2Client.setCredentials(token);
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
            if (err) console.error(err);
        });
        req.session.token = token;
        res.redirect('/profile');
    });
});

app.post('/book-appointment', (req, res) => {
    if (!req.session.token) return res.redirect('/auth/google');
    oAuth2Client.setCredentials(req.session.token);

    const { doctor, date, time, phoneNumber } = req.body;
    const event = {
        summary: `Appointment with ${doctor}`,
        start: {
            dateTime: new Date(`${date}T${time}`).toISOString(),
            timeZone: 'America/Los_Angeles'
        },
        end: {
            dateTime: new Date(`${date}T${time}`).toISOString(),
            timeZone: 'America/Los_Angeles'
        }
    };

    const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });
    calendar.events.insert({
        calendarId: 'primary',
        resource: event
    }, (err, event) => {
        if (err) return console.log('Error creating event:', err);

        // Send SMS reminder
        const message = `Reminder: You have an appointment with ${doctor} on ${date} at ${time}.`;
        client.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phoneNumber
        }).then(message => console.log(`SMS sent: ${message.sid}`))
          .catch(err => console.error(err));

        res.send('Appointment booked successfully!');
    });
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});