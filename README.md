# Kalifa OS

Kalifa OS is a web application built with Next.js, TypeScript, Tailwind CSS, Redux, and Firebase, designed to provide tools and resources for managing Android devices. It offers features such as Factory Reset Protection (FRP) bypass tools, system application access, contact management, and guides for Android device configuration, with a focus on Samsung, Infinix, Tecno, and other Android devices.

## Table of Contents

- Overview  
- Features  
- Tech Stack  
- Project Structure  
- Installation  
- Environment Variables  
- Firebase Setup  
- Running the Application  
- Available Routes  
- Testing  
- Contributing  
- License  
- Contact  

## Overview

Kalifa OS is a user-friendly platform aimed at Android enthusiasts and technicians, providing tools and guides to bypass FRP, access system applications, and contact support. The application emphasizes legal and responsible use of tools, with a responsive design and dark mode support for enhanced usability.

## Features

- **FRP Bypass Tools**: Download specialized tools to bypass Factory Reset Protection on Android devices (`/frp-tools`).
- **System Applications**: Access and manage system apps for Samsung, Infinix, Tecno, and other Android devices using Android intent links (`/system-apps`).
- **Bypass FRP Settings**: Step-by-step guide to open app settings, set screen locks, or access the phone app for device unlocking (`/bypass-frp-setting`).
- **Contact Form**: Submit inquiries or support requests, stored in Firebase Firestore (`/contact`).
- **Custom 404 Page**: Friendly error page for invalid routes (`/not-found`).
- **Dark Mode**: Toggle between light and dark themes using Redux state management.
- **Responsive Design**: Built with Tailwind CSS for a mobile-first, responsive UI.
- **Firebase Integration**: Firestore for data storage (tools, system apps, contact messages) and Authentication for Google sign-in.
- **Android Intent Links**: Direct access to Android system settings and apps (Android-specific).

## Tech Stack

- **Framework**: Next.js (App Router, 13+)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Backend**: Firebase (Firestore, Authentication, Storage)
- **Icons**: Lucide React and custom SVG icons (Android, Samsung, Infinix, Tecno)
- **Fonts**: Google Fonts (Geist, Geist Mono)
- **Build Tool**: Node.js

## Project Structure

kalifa-os/
├── app/
│   ├── layout.tsx               # Root layout with Navigate and Footer
│   ├── page.tsx                 # Homepage
│   ├── try-free/
│   │   ├── page.tsx            # TryFreePage component
│   ├── learn-more/
│   │   ├── page.tsx            # LearnMore component
│   ├── frp-tools-apk-download/
│   │   ├── page.tsx            # FRPToolsPage component
│   ├── pricing/
│   │   ├── page.tsx            # PricingPage component
│   ├── privacy/
│   │   ├── page.tsx            # PrivacyPage component
│   ├── terms/
│   │   ├── page.tsx            # TermsPage component
│   ├── about/
│   │   ├── page.tsx            # AboutPage component
│   ├── contact/
│   │   ├── page.tsx            # ContactPage component
│   ├── bypass-frp-setting/
│   │   ├── page.tsx            # BypassFrpSettingPage component
│   ├── not-found.tsx            # Custom 404 page
│   ├── frp-tools/
│   │   ├── page.tsx            # FrpToolsPage component
│   ├── system-apps/
│   │   ├── page.tsx            # SystemAppsPage component
│   ├── server/
│   │   ├── firebaseApi.ts      # Firebase configuration with env variables
│   ├── components/
│   │   ├── about/
│   │   │   ├── AboutCon.tsx     # About content component
│   │   ├── home/
│   │   │   ├── HomeClient.tsx   # Client-side home component
│   │   │   ├── HomePage.tsx     # HomePage component
│   │   ├── loading/
│   │   │   ├── Loading.tsx      # Loading component
│   │   │   ├── OrbitingDotsSpinner.tsx # Spinner component
│   │   ├── startTopPage/
│   │   │   ├── ScrollToTop.tsx  # ScrollToTop component
│   │   ├── navigate/
│   │   │   ├── Navigate.tsx     # Navigation component
│   │   │   ├── Toggle.tsx


## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/kalifa-os.git
cd kalifa-os

2. Install Dependencies

npm install

3. Set Up Environment Variables

Create a .env.local file in the root directory.

NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

Firebase Setup

1. Go to Firebase Console


2. Create a new project


3. Enable:

Firestore Database

Firebase Authentication (Google Sign-In)

Firebase Storage



4. Copy your Firebase config and paste into .env.local



Running the Application

npm run dev

Visit http://localhost:3000 in your browser.

Available Routes

/ – Home

/frp-tools – FRP tool list

/frp-tools-apk-download – APK file downloads

/system-apps – System app links

/bypass-frp-setting – Step-by-step bypass guide

/contact – Contact support

/about, /terms, /privacy, /pricing, /try-free, /learn-more – Static pages

/not-found – Custom 404 page


Testing

Testing is manual for now. Automated tests coming soon.

Contributing

Feel free to contribute to this project by submitting issues or pull requests.

License

This project is licensed under the MIT License.

Contact

For support or feedback:

GitHub: @your-username

Email: your-email@example.com


---

Let me know if you'd like me to:

- Insert your real GitHub username and email,
- Generate and download this as a `.md` file,
- Add badges (e.g., Build Passing, License MIT),
- Or auto-generate a LICENSE file.