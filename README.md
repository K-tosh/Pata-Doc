
# **Doctor's Portfolio Website(Pata Doc)**

## **Project Overview**

This project is a professional portfolio website for doctors, providing a platform where patients can easily find and schedule appointments with specialists based on their availability and area of expertise. The website addresses the challenge of patients struggling to find the right doctors and specialties, making it convenient to book appointments and access care, especially with the introduction of universal healthcare.

## **Key Features**

- **Doctor Availability & Specialty Display**: Patients can view doctors' schedules, areas of expertise, and availability.
- **Online Appointment Booking**: Easy-to-use interface for booking appointments based on the doctor’s availability.
- **Google Calendar API Integration**: Seamless scheduling by syncing appointment times with the doctor’s Google Calendar.
- **Twilio API Integration**: Automated SMS reminders for upcoming appointments.
- **Responsive Design**: Optimized for both desktop and mobile devices using Bootstrap.
- **Specialty Search**: Users can search for doctors based on their specialties, such as neurosurgery, obstetrics, or gynecology.
- **Referrals & Linkage**: Facilitates easier referrals and linkages to hospitals, aligning with universal healthcare goals.

## **Architecture & Technologies Used**

### **Architecture Breakdown**
1. **Frontend**:
   - HTML
   - CSS
   - Bootstrap
   
2. **Backend**:
   - Google Calendar API: Integration for handling doctor schedules and appointments.
   - Twilio API: For sending SMS reminders to patients.
   
3. **Hosting**:
   - GitHub Pages: Used for hosting the static website.

### **Technology Stack**
- **HTML**
- **CSS3**
- **Bootstrap 5**
- **JavaScript**
- **Google Calendar API** (for calendar management)
- **Twilio API** (for SMS notifications)

## **Installation & Setup**

### **1. Clone the Repository**
```
git clone https://github.com/your-username/Pata-Doc.git
cd Pata-Doc
```

### **2. API Key Setup**
- Set up the **Google Calendar API** to manage doctor schedules:
  - Create a project in the [Google Developer Console](https://console.developers.google.com/).
  - Enable the **Google Calendar API**.
  - Obtain your API key and OAuth credentials, then add them to your configuration.
  
- Set up the **Twilio API** for SMS notifications:
  - Sign up on [Twilio](https://www.twilio.com/) and obtain your **Twilio API** credentials.
  - Add your Twilio SID, Auth Token, and phone number to your environment variables.

### **3. Customize Doctor Data**
- Update the doctor's availability, specialties, and profile information by modifying the `doctors.json` or relevant sections in your HTML files.

### **4. Running Locally**
- Serve the project using a local server (you can use Live Server extension on VS Code for this).
- Make sure to configure and test the API integrations for scheduling and SMS notifications.

## **Project Demo**

You can view a live demo of the project [here](https://your-github-username.github.io/Pata-Doc/).


### **Next Steps**
- Expand functionality to include patient reviews and feedback for doctors.
- Add more doctors and specialties to the system.
- Implement a secure, encrypted messaging system for patient-doctor communication.

## **Conclusion**

This project was developed to bridge the gap between patients and doctors, making healthcare access more seamless and efficient. The integration of appointment booking and schedule management through APIs has streamlined the process, with the potential for expansion and improvements as the project grows.

## **Contact & Contributions**

Feel free to contribute to the project by submitting pull requests or reporting issues.

- **GitHub Repository**: [https://github.com/your-username/Pata-Doc](https://github.com/your-username/Pata-Doc)
- **Developer**: Eric Musanyi 

---