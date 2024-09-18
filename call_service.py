from flask import Flask, request, jsonify
from twilio.twiml.voice_response import VoiceResponse
from twilio.rest import Client

app = Flask(__name__)

# Twilio credentials
account_sid = 'your_account_sid'
auth_token = 'your_auth_token'
twilio_number = 'your_twilio_number'
client = Client(account_sid, auth_token)

@app.route('/make_call', methods=['POST'])
def make_call():
    to_number = request.json.get('to')
    call = client.calls.create(
        to=to_number,
        from_=twilio_number,
        url='http://demo.twilio.com/docs/voice.xml'
    )
    return jsonify({'status': 'calling', 'call_sid': call.sid})

if __name__ == '__main__':
    app.run(debug=True)