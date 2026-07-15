<div align="center">

<img src="https://img.shields.io/badge/RaktSeva-Blood%20Bank%20Management%20System-b91c1c?style=for-the-badge&logo=heart&logoColor=white" alt="RaktSeva Banner"/>

# 🩸 RaktSeva

### A Modern Blood Bank Management System | Parul Sevashram Hospital Initiative

<p>
  <img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" />
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=flat-square&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/JWT-Auth-000000?style=flat-square&logo=jsonwebtokens&logoColor=white" />
  <img src="https://img.shields.io/badge/License-MIT-b91c1c?style=flat-square" />
  <img src="https://img.shields.io/badge/Status-Active%20Development-orange?style=flat-square" />
</p>

<p>
  <em>Saving lives, one donation at a time. ❤️</em>
</p>

</div>

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Demo Login Credentials](#-demo-login-credentials)
- [Usage](#-usage)
- [Screenshots](#-screenshots)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Developed By](#-developed-by)

---

## 🩹 About the Project

**RaktSeva** (রক্তসেবা — "Service of Blood") is a full-stack blood bank management system built to digitize and streamline blood donation, inventory tracking, and donor–recipient coordination for **Parul Sevashram Hospital**. It replaces manual registers with a secure, fast, and role-based digital platform for donors, hospital staff, and administrators.

---

## ✨ Features

<table>
<tr>
<td>

- 🔐 Secure JWT-based Authentication  
- 🩸 Real-time Blood Inventory Tracking  
- 👥 Donor Registration & Management  
- 🏥 Blood Request Handling for Recipients  

</td>
<td>

- 📊 Admin Dashboard with Analytics  
- 🔍 Search Donors by Blood Group & Location  
- 📱 Fully Responsive UI  
- 🎨 Custom Maroon/Red Hospital Brand Theme  

</td>
</tr>
</table>

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 16 (App Router), React, Tailwind CSS |
| **Backend** | Next.js API Routes |
| **Database** | MongoDB (Mongoose) |
| **Authentication** | JWT (JSON Web Tokens) |
| **Deployment** | Vercel |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- npm / yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/engrshuvodas/RaktSeva.git

# 2. Navigate to project directory
cd RaktSeva

# 3. Install dependencies
npm install

# 4. Set up environment variables (see below)
cp .env.example .env.local

# 5. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser 🎉

---

## 🔑 Environment Variables

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NEXTAUTH_URL=http://localhost:3000
```

---

## 🧪 Demo Login Credentials

> ⚠️ For demo/testing purposes only. Change credentials before deploying to production.

<table>
<tr>
<th>Role</th>
<th>Username</th>
<th>Password</th>
</tr>
<tr>
<td>🛡️ Admin</td>
<td><code>admin</code></td>
<td><code>admin</code></td>
</tr>
<tr>
<td>👤 User</td>
<td><code>Shuvo@gmail.com</code></td>
<td><code>password</code></td>
</tr>
</table>

- **Admin Login:** `/admin/login`
- **User Login:** `/login`

---

## 📖 Usage

1. **Users** can register as donors, browse blood availability, and submit blood requests.
2. **Admins** manage donor records, approve/reject requests, and monitor live inventory from the dashboard.
3. All authenticated routes are protected via JWT middleware.

---

## 📸 Screenshots

<div align="center">
<img src="https://via.placeholder.com/800x400/b91c1c/ffffff?text=Home+Page" width="45%" />
<img src="https://via.placeholder.com/800x400/b91c1c/ffffff?text=Admin+Dashboard" width="45%" />
</div>

> *Replace the placeholders above with actual project screenshots.*

---

## 🗺 Roadmap

- [x] User & Admin Authentication (JWT)
- [ ] Donor Registration Module
- [ ] Blood Inventory Management
- [ ] SMS/Email Notifications
- [ ] Analytics Dashboard

---

## 🤝 Contributing

Contributions are welcome!

```bash
1. Fork the repository
2. Create your feature branch (git checkout -b feature/AmazingFeature)
3. Commit your changes (git commit -m 'Add some AmazingFeature')
4. Push to the branch (git push origin feature/AmazingFeature)
5. Open a Pull Request
```

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

## 👨‍💻 Developed By

**Engr Shuvo Das**

| Platform | Link |
| :--- | :--- |
| **WhatsApp** | [Chat Now](https://wa.me/+919641700503) |
| **LinkedIn** | [Profile](https://www.linkedin.com/in/engrshuvoda/) |
| **YouTube** | [Channel](https://www.youtube.com/channel/UCEJ0R871tF2PLT27q9azYWg) |
| **GitHub** | [Repositories](https://github.com/engrshuvodas) |
| **Fiverr** | [Hire Me](https://www.fiverr.com/shuvo_das74886) |
| **Portfolio** | [About Me](https://engrshuvodas.github.io/me/) |
| **Email** | [engrshuvoda@gmail.com](mailto:engrshuvoda@gmail.com) |
| **X (Twitter)** | [@engrshuvodas](https://x.com/engrshuvodas) |
| **Facebook** | [Engr Shuvo](https://www.facebook.com/engr.shuvo74886/) |

<h4 align="center">🧑‍💻 Developed with dedication by 
  <a href="https://engrshuvodas.github.io/SHUVO-_portfolio/" target="_blank">Engr Shuvo Das</a>
</h4>

<div align="center">

⭐ **If you find this project helpful, don't forget to star the repo!** ⭐

</div>
