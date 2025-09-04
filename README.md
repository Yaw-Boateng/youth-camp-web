# Church Youth Camp Registration System

A comprehensive web-based registration system for managing youth camp participants built with React.js and Firebase.

## Features

- **Secure Authentication**: Firebase-based login for branch representatives
- **Registration Management**: Complete participant registration with Google Sheets integration
- **Dashboard**: View and manage registered participants
- **News & Announcements**: Stay updated with camp information
- **Responsive Design**: Mobile-friendly interface optimized for all devices

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Firebase project setup
- Google Sheets API access (for production)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Firebase:
   - Update `src/config/firebase.js` with your Firebase project credentials
   - Enable Authentication in your Firebase console
   - Set up Firestore database

4. Start the development server:
   ```bash
   npm run dev
   ```

### Firebase Setup

1. Create a new Firebase project
2. Enable Authentication with Email/Password provider
3. Create Firestore database
4. Add your Firebase config to `src/config/firebase.js`

### Google Sheets Integration

For production deployment, you'll need to:
1. Set up Google Sheets API credentials
2. Create a service account
3. Update `src/services/googleSheets.js` with actual API integration

## Technology Stack

- **Frontend**: React.js, Tailwind CSS
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Data Storage**: Google Sheets API
- **Routing**: React Router DOM

## Project Structure

```
src/
├── components/          # React components
├── contexts/           # React contexts (Auth)
├── services/          # API services
├── utils/             # Utility functions
├── config/            # Configuration files
└── App.jsx            # Main application component
```

## Deployment

The application can be deployed to various platforms like Vercel, Netlify, or Firebase Hosting.

## Support

For technical support or questions about the registration system, contact the development team.