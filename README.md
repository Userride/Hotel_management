# 🏩 The Taj Hotel & Management System

A premium, full-stack MERN (MongoDB, Express, React, Node.js) web application designed for the legendary **Taj Hotel**. This system provides a seamless experience for guests to book royal stays and for administrators to manage operations with high-end aesthetics and role-based precision.

---

## 🚀 Project Overview

The Taj Hotel & Management System is an all-in-one hospitality portal that balances public-facing elegance with powerful backend management. It features:
- **Public Browsing**: Explore iconic hotels and insightful blogs without logging in.
- **Dynamic Booking**: A smart booking flow with real-time price calculations and date validation.
- **Role-Based Command Center**: Tailored dashboards for Super Admins, Managers, Receptionists, Waiters, and Cooks.
- **Visual Excellence**: Modern typography, glassmorphism UI, and fluid micro-animations.

---

## 🛠️ Tech Stack

### Frontend
- **React (Vite)**: For a lightning-fast development and user experience.
- **React Router**: Seamless navigation across the single-page application.
- **Lucide React**: Premium iconography for a modern feel.
- **Axios**: Efficient API communication.
- **Vanilla CSS**: Bespoke styling with custom design tokens.

### Backend
- **Node.js & Express**: Robust and scalable server-side environment.
- **MongoDB & Mongoose**: Flexible NoSQL database for complex hotel and booking data.
- **JWT (JSON Web Tokens)**: Secure, stateless authentication.
- **BcryptJS**: Industry-standard password hashing.

---

## ⚙️ Setup Steps

### Prerequisites
- Node.js installed
- MongoDB instance (Local or Atlas)
- `.env` file in the `server` directory

### Installation
1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd p1
   ```

2. **Install Dependencies**:
   From the root directory, run:
   ```bash
   # Using a pre-configured script if available, or manually:
   cd client && npm install
   cd ../server && npm install
   ```

3. **Environment Configuration**:
   Create a `.env` file in the `server/` folder:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_secret_key
   ```

4. **Seed Database (Optional but recommended)**:
   ```bash
   cd server
   node seed.js
   ```

5. **Run the Application**:
   From the root directory:
   ```bash
   # If concurrently is set up:
   npm run dev
   ```

---

## 📁 Folder Structure

```text
p1/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI (Header, Footer, Layout)
│   │   ├── context/        # AuthContext for global state
│   │   ├── pages/          # View components (Home, HotelDetails, Blogs)
│   │   │   ├── Auth/       # Login and Registration
│   │   │   └── Dashboard/  # Role-specific dashboard views
│   │   └── App.jsx         # Main routing and provider setup
├── server/                 # Express Backend
│   ├── models/             # Mongoose schemas (User, Hotel, Booking, Blog)
│   ├── controllers/        # Logic handlers for API routes
│   ├── routes/             # Express route definitions
│   ├── middleware/         # protect & authorize logic
│   ├── seed.js             # Initial data for hotels
│   └── index.js            # Entry point and server config
```

---

## 🔑 Role-Based Flow

The system employs **RBAC (Role-Based Access Control)** to ensure security and operational efficiency:

| Role | Access Level | Primary Features |
| :--- | :--- | :--- |
| **Super Admin** | Full System Control | CRUD for Hotels/Blogs, User Management, Booking Control, Revenue Stats. |
| **Customer** | Authenticated Guest | Personal Profile, Booking History, One-click Cancellation, Loyalty Points. |
| **Manager** | Operations | Professional greeting dashboard with time-based greetings. |
| **Receptionist** | Front Desk | Clean, distraction-free interface with operational greeting. |
| **Staff (Waiter/Cook)**| Support | Minimalist UI focused on their specific role identity. |

---

## ✨ Features Checklist
- [x] **Branding**: Complete Indian localization as "The Taj Hotel".
- [x] **Public Access**: Guest users can view hotels and details.
- [x] **Secure Auth**: JWT-protected routes and role-based middleware.
- [x] **Smart Booking**: Dynamic price calculation based on check-in/out.
- [x] **Admin Modules**: Full functional CRUD for all management sections.
- [x] **Premium Aesthetics**: Glassmorphism, Outfit typography, and responsive layouts.

*Developed with care for The Taj Hotel.*
