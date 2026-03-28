# EcoSync

EcoSync is a React + Supabase web app for reporting and managing community complaints with image uploads.

## Website Overview

EcoSync is a civic issue reporting platform where users can submit complaints with images, and admins can manage and resolve complaint records through a dedicated dashboard.

## Live Website

https://code-blooded-clean-city.vercel.app/

## Features

- Public complaint submission (no user login required)
- Image upload to Supabase Storage (`complaints-images`)
- Complaint listing from Supabase (`complaints` table)
- Admin login (hardcoded local auth)
- Admin dashboard:
  - View all complaints
  - Delete single complaint
  - Clear all complaints

## Tech Stack

- Frontend: React (Create React App), React Router
- Styling: Tailwind CSS
- Backend Services: Supabase Database + Supabase Storage
- Deployment: Vercel

## File Structure

```text
src/
  components/
    Chatbot/
    ComplaintForm.jsx
    ComplaintList.jsx
    Navbar.jsx
    Footer.jsx
  lib/
    supabaseClient.js
  Pages/
    ReportIssue.jsx
    AdminLogin.jsx
    AdminComplaintsDashboard.jsx
  utils/
    uploadComplaintImage.js
  App.jsx
  index.jsx
```

## Run Locally

```bash
npm install
npm start
```

## Build

```bash
npm run build
```
