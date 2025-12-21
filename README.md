# 🎓 CSCA Prep - Ultimate CSCA Exam Preparation Platform

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge)](https://csca-prep-seven.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Data-336791?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)

A comprehensive, high-performance web application designed to help international students prepare for the **Chinese Government Scholarship (CSCA) Undergraduate Admission Exam**. By **2026**, over **306 universities** already require this Test Report, and as part of a nationwide initiative, all Chinese universities will mandate the **CSCA Test Result** for undergraduate applicants by **2028**. This platform provides a realistic exam engine, advanced analytics, and a robust administrative dashboard to ensure student success.

---

## 🚀 Live Demo
**Website:** [https://csca-prep-seven.vercel.app/](https://csca-prep-seven.vercel.app/)

---

## 🔐 Demo Credentials

Use the following accounts to explore the platform's features:

### 🛠️ administrator Access
- **Email:** `admin@csca-prep.com`
- **Password:** `password123`
- **Capabilities:** View global statistics, manage question sets, and monitor student progress via the `/admin` dashboard.

### 📖 Student Access
- **Email:** `student@csca-prep.com`
- **Password:** `password123`
- **Capabilities:** Practice mock exams, view personal performance history, and track progress via the `/dashboard`.

---

## ✨ Key Features

- **🎯 Realistic Exam Engine:** Timer-based testing with LaTeX support for complex math/science formulas.
- **📊 Advanced Analytics:** Interactive charts (using Recharts) to track student performance and subject-wise mastery.
- **📁 Dynamic Question Management:** Seed and manage thousands of questions across multiple subjects (Math, Physics, Chemistry, Chinese).
- **🛡️ Secure Authentication:** Role-based access control (RBAC) ensuring data privacy for students and admins.
- **🎨 Premium UI/UX:** Built with Tailwind CSS and Shadcn UI, featuring glassmorphism, responsive layouts, and smooth micro-animations.

---

## 🛠️ Technology Stack

- **Frontend:** Next.js 15 (App Router), React 19, Tailwind CSS, Shadcn UI
- **Backend:** Next.js Server Actions, Prisma ORM
- **Database:** PostgreSQL (Vercel Postgres / Supabase)
- **State Management:** Zustand
- **Charting:** Recharts
- **Typing/Logic:** TypeScript, Zod

---

## 🛠️ Local Development

### 1. Clone & Install
```bash
git clone https://github.com/rakibnuist/csca-prep.git
cd csca-prep
npm install
```

### 2. Environment Setup
Create a `.env` file in the root directory:
```env
DATABASE_URL="your_postgresql_url"
NEXTAUTH_SECRET="your_secret"
```

### 3. Database Initialization & Seeding
```bash
npx prisma generate
npx prisma db push
npm run seed:tests # Seeds all mock exams and demo users
```

### 4. Run the App
```bash
npm run dev
```

---

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.

---

Built with ❤️ for international students.
