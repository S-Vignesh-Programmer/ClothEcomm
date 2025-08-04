# 🛍️ Cloth Ecommerce Website

An end-to-end **MERN stack** ecommerce application where users can sign up, log in, browse clothing products. This project showcases **JWT authentication**, **MongoDB database**, and **a fully responsive React + Tailwind CSS frontend**.

---

### Live Link : [https://cloth-ecomm-henna.vercel.app/]

---

## 📌 Features

### 🧑‍💻 User Side
-  Browse clothing products
-  Secure signup/login using JWT + bcrypt
-  Beautiful UI with **React + Tailwind CSS**

### ⚙️ Admin/Backend
- 🔧 Node.js + Express.js server
- 🗂️ MongoDB for storing users details
- 🔒 JWT authentication
- 🔐 Password hashing with bcryptjs
- 🌐 CORS-enabled REST API
- API tested via Postman & Thunder Client

---

## 🧰 Tech Stack

| Layer        | Technology                          |
|--------------|-------------------------------------|
| Frontend     | React.js, Tailwind CSS              |
| Backend      | Node.js, Express.js                 |
| Database     | MongoDB + Mongoose                  |
| Auth         | JWT, bcryptjs                       |
| API Testing  | Postman, Thunder Client             |

---

## 🔐 User Authentication Flow

-  User registers via /api/auth/signup

-  Password is hashed using bcryptjs
  
-  On login (/api/auth/login), JWT token is returned

---

## 🚀 Getting Started (Local Setup)

1️⃣ Clone the repo

git clone https://github.com/your-username/cloth-ecommerce.git
cd cloth-ecommerce

2️⃣ Backend Setup

cd server
npm install

🔐 Create a .env file in /server:

PORT=5000
MONGO_URI=your_mongo_connection
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key

Run the server:

npm run dev

3️⃣ Frontend Setup

cd ../client
npm install
npm start

---

## License
  MIT License. Feel free to use, modify, and distribute.
