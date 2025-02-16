# Task Board Application

This is a **Task Management Board** built using **React (Next.js)** with Firebase as the backend. The project allows users to **create, manage, and complete tasks** with a modern UI and **MetaMask** authentication for Web3 integration.

## 🚀 Live Demo

The application is deployed on **Vercel**. You can access it here:\
🔗 **[Task Board Application](https://taskboard-application-dmju8ktv5-shafes-projects.vercel.app)**

---

## 📹 Demo Video

A walkthrough video explaining the project, code, and functionality is available on **Loom/YouTube**.
🔗 **[Demo Video Link](https://youtu.be/45rSEEWvoks)**

---

## 🛠️ Features

- **Task Management**: Add, update, delete tasks
- **Due Dates & Status Labels**: Organize tasks better
- **MetaMask Authentication**: Secure login using Web3 wallet
- **Persistent Profile Pictures**: Stored and fetched uniquely for each user
- **Modern UI with Tailwind CSS**: Responsive and sleek design

---

## 🏗️ Setup & Installation

### **Prerequisites**

Ensure you have the following installed before proceeding:

- **Node.js** (>= 16.x) - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/)
- **MetaMask Extension** - [Install Here](https://metamask.io/)
- **Firebase Account** - [Set Up Here](https://firebase.google.com/)

### **1️⃣ Clone the Repository**

```sh
git clone https://github.com/Shafekhan/Task-Board-Application
```

### **2️⃣ Install Dependencies**

```sh
npm install
```

### **3️⃣ Setup Firebase**

1. Go to **[Firebase Console](https://console.firebase.google.com/)**.
2. Create a project and **enable Firestore**.
3. Copy your **Firebase Config** and create a `.env.local` file:

```sh
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### **4️⃣ Run the Project Locally**

```sh
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🔗 MetaMask Integration

This application **requires MetaMask** to authenticate users and connect their wallets.

### **Steps to Connect MetaMask**

1. Install the **MetaMask** browser extension from [here](https://metamask.io/).
2. Open the app and **click on "Login with MetaMask"**.
3. Approve the request to **connect your wallet**.
4. You're all set! Your wallet address will be displayed.

If you face issues, ensure **MetaMask is installed and unlocked**.

---

## 🚀 Deployment

The app is deployed on **Vercel**. To deploy manually:

1. **Sign in to Vercel** and create a new project.
2. Connect to your **GitHub repo**.
3. Set environment variables (from `.env.local`).
4. Click **Deploy**.

For more details, visit [Next.js Deployment Guide](https://nextjs.org/docs/deployment).

---

🚀 All the best!

