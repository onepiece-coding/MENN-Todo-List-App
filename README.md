# 📝 Todo List App

A simple full-stack Todo List application built with a **Next.js 15** frontend and an **Express.js + MongoDB** backend.  
It features user authentication (JWT stored in HTTP-only cookies), protected routes, and CRUD operations on per-user tasks, with a focus on best practices for SEO, accessibility, performance, and code organization.

---

## 🧰 Tech Stack

- **Frontend**
  
  - Next.js 15 (App Router, Server & Client Components)
    
  - TypeScript
    
  - Tailwind CSS
    
  - React Hook Form + Zod for client-side validation
    
  - react-toastify for user notifications
    
- **Backend**
  
  - Node.js + Express.js
    
  - TypeScript
    
  - MongoDB + Mongoose
    
  - JSON Web Tokens (JWT)
  
  - cookie-parser for auth cookies
    
  - CORS, dotenv  

---

## 🚀 Features

- **User Registration & Login** with JWT in HTTP-only cookies

- **Protected Routes** on both frontend (middleware + SSR guard) and backend (auth middleware)
  
- **CRUD** on “tasks” (Add, Edit, Delete, List) — each user only sees their own
  
- **Client-side form validation** with Zod schemas

- **Server Actions** for secure form submissions (no client fetch)
  
- **Accessibility**: semantic HTML, labels, `aria-*`, keyboard support
  
- **SEO & Performance**: SSR for initial data, force-dynamic layout for auth state, preconnect hints  

---

## ⚙️ Getting Started

### Prerequisites

- Node.js v18+
  
- MongoDB running locally (or a connection URI)  

### 1. Backend Setup

```bash
  cd backend
  npm install
  npm run dev
```

### 2. Frontend Setup
   
```bash
  cd frontend
  npm install
  npm run dev
```

---

## 🔑 Environment Variables

Backend (backend/.env)

```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/todoapp
NODE_ENV=development
JWT_SECRET=your_jwt_secret
COOKIE_NAME=token
COOKIE_SECRET=your_cookie_secret
```

Frontend (frontend/.env.local)

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

---

## 🎯 Usage

1. Register a new account at /register.

2. Login at /login.

3. Visit /tasks to add, toggle, or delete your tasks.

4. Use the Logout button in the header to end your session.

## 🛡️ Security & Best Practices

1. JWT in HTTP-only cookies protects against XSS.

2. SameSite=lax for CSRF mitigation; switch to none+secure if using across different domains.

3. Server Actions handle secrets and side effects on the server.

4. Client-side zod schemas mirror backend validation.

5. Force dynamic layout ensures header reflects login state immediately.

---

## 🔗 Connect With Me

github: [https://github.com/onepiece-coding](https://github.com/onepiece-coding)

LinkedIn: [https://www.linkedin.com/in/lahcen-alhiane-0799ba303/](https://www.linkedin.com/in/lahcen-alhiane-0799ba303/)

🚀 Happy Coding!
