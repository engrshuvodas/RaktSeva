<div align="center">

<img src="https://img.shields.io/badge/RaktSeva-Blood%20Bank%20Management%20System-b91c1c?style=for-the-badge&logo=heart&logoColor=white" alt="RaktSeva Banner"/>

# 🩸 RaktSeva

### A Modern Blood Bank Management System | Parul Sevashram Hospital Initiative

<p>
  <img src="https://img.shields.io/badge/PHP-8.x-777BB4?style=flat-square&logo=php&logoColor=white" />
  <img src="https://img.shields.io/badge/MySQL-Database-4479A1?style=flat-square&logo=mysql&logoColor=white" />
  <img src="https://img.shields.io/badge/Bootstrap-4.6-7952B3?style=flat-square&logo=bootstrap&logoColor=white" />
  <img src="https://img.shields.io/badge/XAMPP-Server-FB7A24?style=flat-square&logo=xampp&logoColor=white" />
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
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Database Setup](#-database-setup)
- [Demo Login Credentials](#-demo-login-credentials)
- [Usage](#-usage)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Developed By](#-developed-by)

---

## 🩹 About the Project

**RaktSeva** ("Service of Blood") is a full-stack blood bank management system built to digitize and streamline blood donation, inventory tracking, and donor–recipient coordination for **Parul Sevashram Hospital**. It replaces manual registers with a secure, fast, and role-based digital platform for donors, hospital staff, and administrators.

---

## ✨ Features

<table>
<tr>
<td>

**👤 User Side**
- 🔐 User Registration & Session-based Login
- 🩸 Register as a Blood Donor
- 🔍 Search Donors by Blood Group
- 🏥 Submit Blood Request (Need Blood form)
- 📩 Contact Us / Send Queries
- 📊 Personal User Dashboard

</td>
<td>

**🛡️ Admin Side**
- 🔑 Secure Admin Login with Session Guard
- 📋 Admin Dashboard with Live Stats
- 👥 Manage Donor List (Add / Delete)
- 💬 View & Manage User Queries
- ⏳ Pending Query Tracker
- 📝 CMS — Edit Page Content (About, Why Donate, etc.)
- 📞 Update Contact Information
- 🔒 Change Admin Password

</td>
</tr>
<tr>
<td colspan="2">

**🌐 General**
- 📱 Responsive UI (Bootstrap 4.6)
- 🎠 Image Slider / Carousel on Home Page
- 📰 Live News Ticker on Homepage
- 🩺 Blood Group Information & Education Section
- 🎨 Custom Red/Maroon Blood Bank Theme
- ✏️ NicEdit Rich Text Editor for page content (Admin)

</td>
</tr>
</table>

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Backend Language** | PHP (MySQLi extension) |
| **Database** | MySQL (`blood_donation` database) |
| **Frontend** | HTML5, CSS3 (Vanilla), JavaScript |
| **CSS Framework** | Bootstrap 4.6 |
| **Icons** | Font Awesome 6 |
| **Rich Text Editor** | NicEdit (JavaScript) |
| **Local Server** | XAMPP (Apache + MySQL) |
| **jQuery** | jQuery 3.5.1 |

---

## 📁 Project Structure

```
RaktSeva/
├── 📄 home.php                  # Homepage with carousel, donors, blood groups
├── 📄 about_us.php              # About Us page
├── 📄 why_donate_blood.php      # Why Donate Blood page
├── 📄 donate_blood.php          # Donor registration form (public)
├── 📄 need_blood.php            # Request blood / need blood form
├── 📄 search_blood_group.php    # Search donors by blood group
├── 📄 contact_us.php            # Contact Us / Query form
├── 📄 user_register.php         # User account registration
├── 📄 user_login.php            # User login page
├── 📄 user_dashboard.php        # User profile & donor status
├── 📄 user_logout.php           # User session logout
├── 📄 savedata.php              # Donor form data handler
├── 📄 conn.php                  # Database connection (mysqli)
├── 📄 head.php                  # Shared HTML head + navbar
├── 📄 footer.php                # Shared footer
├── 📄 slider.php                # Homepage image slider
├── 📄 ticker.php                # News ticker component
│
├── 📂 admin/                    # Admin panel (session protected)
│   ├── 📄 login.php             # Admin login
│   ├── 📄 dashboard.php         # Admin dashboard with stats
│   ├── 📄 donor_list.php        # View & manage all donors
│   ├── 📄 add_donor.php         # Add new donor manually
│   ├── 📄 delete.php            # Delete donor record
│   ├── 📄 query.php             # All user queries
│   ├── 📄 pending_query.php     # Pending queries view
│   ├── 📄 delete_query.php      # Delete a query
│   ├── 📄 pages.php             # CMS — manage page content
│   ├── 📄 update_page_details.php # Save page content changes
│   ├── 📄 update_contact.php    # Update site contact info
│   ├── 📄 change_password.php   # Change admin password
│   ├── 📄 logout.php            # Admin session logout
│   ├── 📄 session.php           # Session guard
│   ├── 📄 sidebar.php           # Admin sidebar nav
│   ├── 📄 header.php            # Admin header
│   ├── 📄 admin.css             # Admin panel styles
│   └── 📄 nicedit.js            # Rich text editor
│
├── 📂 css/
│   └── 📄 style.css             # Main frontend stylesheet
│
├── 📂 image/                    # Project images & assets
│
├── 📂 sql/
│   └── 📄 blood_bank_database.sql  # Full database schema & seed data
│
└── 📄 how_to_run.txt            # Step-by-step local setup guide
```

---

## 🚀 Getting Started

This is a **PHP + MySQL** project — no Node.js or npm required. You need a local server like **XAMPP**.

### Prerequisites
- [XAMPP](https://www.apachefriends.org/index.html) (Apache + MySQL)
- A modern web browser (Chrome recommended)

### Installation

**Step 1 — Install & Start XAMPP**
1. Download and install [XAMPP](https://www.apachefriends.org/index.html)
2. Open the **XAMPP Control Panel**
3. Start **Apache** and **MySQL** (both should show green)

**Step 2 — Copy Project to htdocs**
```
Copy the RaktSeva folder to:
C:\xampp\htdocs\RaktSeva
```

**Step 3 — Import the Database**

See the [Database Setup](#-database-setup) section below.

**Step 4 — Open in Browser**
```
http://localhost/RaktSeva/home.php
```

---

## 🗄 Database Setup

1. Open your browser → go to `http://localhost/phpmyadmin`
2. Click **"New"** in the left sidebar
3. Name the database exactly: **`blood_donation`** → click **Create**
4. Select the `blood_donation` database from the sidebar
5. Click the **"Import"** tab
6. Click **"Choose File"** and select:
   ```
   C:\xampp\htdocs\RaktSeva\sql\blood_bank_database.sql
   ```
7. Click **"Import"** at the bottom
<br/>

---

## 🗄️ Database Tables

<div align="center">

| Table | Description |
|:---|:---|
| `donor_details` | All registered blood donors |
| `admin_info` | Admin login credentials |
| `blood` | Blood groups — A+, A−, B+, B−, O+, O−, AB+, AB− |
| `pages` | CMS content (About, Why Donate, Blood Tips, etc.) |
| `contact_info` | Site contact details |
| `contact_query` | User-submitted queries / messages |
| `query_stat` | Query status — Read / Pending |

</div>

<br/>

---

## 🧪 Demo Login Credentials

<div align="center">

> ⚠️ **For testing only.** Change these credentials before deploying to production.

<table>
<tr>
<th>🎭 Role</th>
<th>👤 Username / Email</th>
<th>🔑 Password</th>
<th>🔗 Login URL</th>
</tr>
<tr>
<td align="center"><b>🛡️ Admin</b></td>
<td align="center"><code>admin</code></td>
<td align="center"><code>admin</code></td>
<td align="center"><code>/admin/login.php</code></td>
</tr>
<tr>
<td align="center"><b>👤 User</b></td>
<td align="center"><code>Shuvo@gmail.com</code></td>
<td align="center"><code>password</code></td>
<td align="center"><code>/user_login.php</code></td>
</tr>
</table>

> 💡 New users can also register at `/user_register.php` — passwords are hashed with PHP's `password_hash()`.

</div>

<br/>

---

## 📖 How to Use

<table>
<tr>
<td valign="top" width="50%">

### 👤 As a User
1. Visit `http://localhost/RaktSeva/home.php`
2. **Register** an account at `/user_register.php`
3. **Log in** at `/user_login.php` to access your personal dashboard
4. **Donate Blood** — fill the donor form at `/donate_blood.php`
5. **Need Blood** — search for donors at `/need_blood.php`
6. **Contact Us** — send a query via `/contact_us.php`

### As an Admin
1. Visit `http://localhost/RaktSeva/admin/login.php`
2. Log in with admin credentials
3. **Dashboard** — view live counts of donors, queries, and pending messages
4. **Donor List** — view, add, or delete donor records
5. **Queries** — read and manage user submitted queries
6. **Pages** — edit page content using the built-in rich text editor
7. **Settings** — update contact info or change your password

---

## 🗺 Roadmap

- [x] Admin Login with Session Protection
- [x] User Registration & Login (Password Hashed)
- [x] User Dashboard (Profile + Donor Status)
- [x] Donor Registration Form (Public)
- [x] Admin — Donor List Management (Add / Delete)
- [x] Search Donors by Blood Group
- [x] Contact Us / Query System with Pending Status
- [x] CMS for Page Content (Admin editable)
- [x] Responsive UI with Bootstrap 4.6
- [ ] Email Notifications for Query Replies
- [ ] SMS Alert for Blood Requests
- [ ] Blood Inventory / Stock Tracking
- [ ] Printable Donor Cards

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
