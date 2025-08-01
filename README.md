# 🌟 Intern Tracker Dashboard

A simple full-stack project that simulates an intern dashboard with referral tracking and leaderboard. This project is built using HTML/CSS/JS for the frontend and Node.js + Express for the backend.
---

## 🚀 Features

### ✅ Frontend:
- Dummy Login and Signup pages (no real authentication)
- Dashboard displays:
  - Intern Name
  - Referral Code
  - Total Donations Raised
  - Static Rewards Section
  - 🏆 Leaderboard showing Top 3 interns

### ✅ Backend:
- RESTful API built using Express.js
- Data is stored and retrieved from a local `interns.json` file
- API Endpoints:
  - `POST /api/interns` – Register a new intern (signup)
  - `GET /api/interns/:internName` – Fetch intern data by name (login)
  - `GET /api/interns/top` – Get top 3 interns by amount raised

---
## 🔧 Installation & Run Locally

1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/intern-tracker.git
   cd intern-tracker
   npm install
   node server.js

