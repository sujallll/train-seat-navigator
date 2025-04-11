# 🚆 Train Seat Navigator

A full-stack web application to manage seat reservations in a single-coach train with 80 seats. Built using **Next.js**, **Node.js**, **Express.js**, and **Supabase (PostgreSQL)**.

## 📚 Project Description

- 80 seats in total (11 rows: 10 with 7 seats, last with 3).
- Users can book up to 7 seats at a time.
- Priority is given to booking in the same row.
- If not possible, the nearest available seats are reserved.
- No double booking allowed.
- Users must log in to book or cancel seats.
- Admin can reset or cancel bookings.

## 🛠 Tech Stack

- **Frontend:** Next.js (React)
- **Backend:** Node.js + Express.js
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth (JWT)
- **Deployment:** Vercel / Render / Railway / Supabase

## 🔐 Features

- User Signup and Login
- Reserve up to 7 seats at once
- Auto-book logic (same row → nearby)
- Cancel or reset seat bookings
- Fully responsive UI
- Input validation & sanitization
- Secure JWT-based authentication
- Clean error handling & messages

🌐 [Live Deployment Link](#) *(insert Vercel link)*  
🗃️ [Backend API Hosted On](#) *(insert Render/Railway link)*

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/sujallll/train-seat-navigator.git
cd train-seat-navigator
