<div align="center">

<!-- HERO BANNER -->
<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=b91c1c&height=220&section=header&text=%F0%9F%A9%B8%20RaktSeva&fontSize=72&fontColor=ffffff&fontAlignY=40&desc=Blood%20Bank%20%26%20Donor%20Management%20System&descAlignY=60&descColor=ffcccc&animation=fadeIn" />

<br/>

<p>
  <img src="https://img.shields.io/badge/PHP-8.x-777BB4?style=for-the-badge&logo=php&logoColor=white" />
  &nbsp;
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" />
  &nbsp;
  <img src="https://img.shields.io/badge/Bootstrap-4.6-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white" />
  &nbsp;
  <img src="https://img.shields.io/badge/XAMPP-FB7A24?style=for-the-badge&logo=xampp&logoColor=white" />
  &nbsp;
  <img src="https://img.shields.io/badge/jQuery-3.5.1-0769AD?style=for-the-badge&logo=jquery&logoColor=white" />
</p>

<p>
  <img src="https://img.shields.io/badge/Status-Active%20Development-22c55e?style=flat-square" />
  &nbsp;
  <img src="https://img.shields.io/badge/License-MIT-b91c1c?style=flat-square" />
  &nbsp;
  <img src="https://img.shields.io/badge/Hospital-Parul%20Sevashram-ff6b6b?style=flat-square&logo=heart&logoColor=white" />
</p>

<br/>

<blockquote>
<p><strong>A Modern Blood Bank Management System | Parul Sevashram Hospital Initiative</strong></p>
<p><em>Saving lives, one donation at a time. ❤️</em></p>
</blockquote>

<br/>

<!-- NAV PILLS -->
<p>
  <a href="#-about-the-project"><img src="https://img.shields.io/badge/About-b91c1c?style=flat-square" /></a>
  <a href="#-features"><img src="https://img.shields.io/badge/Features-991b1b?style=flat-square" /></a>
  <a href="#-tech-stack"><img src="https://img.shields.io/badge/Tech%20Stack-7f1d1d?style=flat-square" /></a>
  <a href="#-project-structure"><img src="https://img.shields.io/badge/Structure-b91c1c?style=flat-square" /></a>
  <a href="#-getting-started"><img src="https://img.shields.io/badge/Getting%20Started-991b1b?style=flat-square" /></a>
  <a href="#-demo-login-credentials"><img src="https://img.shields.io/badge/Demo%20Login-7f1d1d?style=flat-square" /></a>
  <a href="#-developed-by"><img src="https://img.shields.io/badge/Developer-b91c1c?style=flat-square" /></a>
</p>

</div>

<br/>

---

## 🩹 About the Project

**RaktSeva** (রক্তসেবা — *Service of Blood*) is a web-based **Blood Bank & Donor Management System** built with **PHP** and **MySQL**. It digitizes and streamlines blood donor registration, blood group searching, and query/contact management for **Parul Sevashram Hospital**.

The system offers two separate portals:
- 🧑 **User Portal** — for donors and the public to register, search for blood, and contact the team
- 🛡️ **Admin Portal** — for hospital staff to manage donors, queries, and page content

<br/>

---

## ✨ Features

<table>
<tr>
<td width="50%" valign="top">

### 👤 User Side
| | Feature |
|:---:|:---|
| 🔐 | User Registration & Secure Session Login |
| 🩸 | Register as a Blood Donor |
| 🔍 | Search Donors by Blood Group |
| 🏥 | Submit Blood Request (Need Blood) |
| 📩 | Contact Us / Send Queries |
| 📊 | Personal User Dashboard |

</td>
<td width="50%" valign="top">

### 🛡️ Admin Side
| | Feature |
|:---:|:---|
| 🔑 | Secure Admin Login with Session Guard |
| 📋 | Dashboard — Live Donor & Query Stats |
| 👥 | Manage Donor List (Add / Delete) |
| 💬 | View & Manage User Queries |
| ⏳ | Pending Query Tracker |
| 📝 | CMS — Edit Page Content (Rich Text) |
| 📞 | Update Contact Information |
| 🔒 | Change Admin Password |

</td>
</tr>
<tr>
<td colspan="2" align="center">

### 🌐 General
📱 Responsive UI (Bootstrap 4.6) &nbsp;|&nbsp; 🎠 Image Slider on Home &nbsp;|&nbsp; 📰 Live News Ticker &nbsp;|&nbsp; 🩺 Blood Group Education &nbsp;|&nbsp; 🎨 Custom Red/Maroon Theme &nbsp;|&nbsp; ✏️ NicEdit Rich Text Editor

</td>
</tr>
</table>

<br/>

---

## 🛠 Tech Stack

<div align="center">

| Layer | Technology |
|:---|:---|
| 🔵 **Backend Language** | PHP (MySQLi extension) |
| 🟠 **Database** | MySQL — `blood_donation` |
| 🌐 **Frontend** | HTML5, CSS3 (Vanilla), JavaScript |
| 💜 **CSS Framework** | Bootstrap 4.6 |
| ⚡ **JavaScript Library** | jQuery 3.5.1 |
| 🎨 **Icons** | Font Awesome 6 |
| ✏️ **Rich Text Editor** | NicEdit.js |
| 🖥️ **Local Server** | XAMPP (Apache + MySQL) |

</div>

<br/>

---

## 📁 Project Structure

```
🩸 RaktSeva/
│
├── 📄 home.php                   ← Homepage: carousel, donors, blood groups
├── 📄 about_us.php               ← About Us page
├── 📄 why_donate_blood.php       ← Why Donate Blood
├── 📄 donate_blood.php           ← Donor registration form (public)
├── 📄 need_blood.php             ← Blood request / need blood
├── 📄 search_blood_group.php     ← Search donors by blood group
├── 📄 contact_us.php             ← Contact & Query form
├── 📄 user_register.php          ← User account registration
├── 📄 user_login.php             ← User login
├── 📄 user_dashboard.php         ← User profile & donor status
├── 📄 user_logout.php            ← Session logout
├── 📄 savedata.php               ← Donor form submission handler
├── 📄 conn.php                   ← DB connection (mysqli)
├── 📄 head.php                   ← Shared HTML head + navbar
├── 📄 footer.php                 ← Shared footer
├── 📄 slider.php                 ← Homepage slider component
├── 📄 ticker.php                 ← News ticker component
│
├── 📂 admin/                     ← Admin panel (session protected)
│   ├── 📄 login.php              ← Admin login
│   ├── 📄 dashboard.php          ← Live stats dashboard
│   ├── 📄 donor_list.php         ← Manage donors
│   ├── 📄 add_donor.php          ← Add donor manually
│   ├── 📄 delete.php             ← Delete donor
│   ├── 📄 query.php              ← All user queries
│   ├── 📄 pending_query.php      ← Pending queries
│   ├── 📄 delete_query.php       ← Delete query
│   ├── 📄 pages.php              ← CMS page list
│   ├── 📄 update_page_details.php← Save page content
│   ├── 📄 update_contact.php     ← Update contact info
│   ├── 📄 change_password.php    ← Change admin password
│   ├── 📄 logout.php             ← Admin logout
│   ├── 📄 session.php            ← Session guard
│   ├── 📄 sidebar.php            ← Admin sidebar
│   ├── 📄 header.php             ← Admin header
│   ├── 🎨 admin.css              ← Admin styles
│   └── 📜 nicedit.js             ← Rich text editor
│
├── 📂 css/
│   └── 🎨 style.css              ← Main frontend stylesheet
│
├── 📂 image/                     ← Project images & assets
│
├── 📂 sql/
│   └── 📄 blood_bank_database.sql← Full DB schema + seed data
│
└── 📄 how_to_run.txt             ← Step-by-step local setup guide
```

<br/>

---

## 🚀 Getting Started

> ⚠️ This is a **PHP + MySQL** project. No Node.js or npm needed. Just **XAMPP**!

<br/>

**Step 1 — Download & Install XAMPP**

<a href="https://www.apachefriends.org/index.html">
  <img src="https://img.shields.io/badge/Download%20XAMPP-FB7A24?style=for-the-badge&logo=xampp&logoColor=white" />
</a>

After installing, open **XAMPP Control Panel** → Start **Apache** + **MySQL** ✅

<br/>

**Step 2 — Copy Project to htdocs**

```
📁 C:\xampp\htdocs\RaktSeva\
```

<br/>

**Step 3 — Import the Database**

```
1. Open  →  http://localhost/phpmyadmin
2. Click "New"  →  Name it: blood_donation  →  Create
3. Select the database  →  Click "Import" tab
4. Choose file  →  RaktSeva\sql\blood_bank_database.sql
5. Click "Import" ✅
```

<br/>

**Step 4 — Open in Browser** 🎉

```
http://localhost/RaktSeva/home.php
```

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

> ⚠️ **For testing only.** Change credentials before deploying to production.

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

> 💡 New users can register at `/user_register.php` — passwords are hashed with PHP `password_hash()`.

</div>

<br/>

---

## 📖 How to Use

<table>
<tr>
<td valign="top" width="50%">

### 👤 As a User
1. Go to `http://localhost/RaktSeva/home.php`
2. **Register** at `/user_register.php`
3. **Login** at `/user_login.php`
4. **Donate Blood** → `/donate_blood.php`
5. **Need Blood** → `/need_blood.php`
6. **Contact** → `/contact_us.php`

</td>
<td valign="top" width="50%">

### 🛡️ As an Admin
1. Login at `/admin/login.php`
2. **Dashboard** → view live stats
3. **Donors** → manage donor records
4. **Queries** → read & manage messages
5. **Pages** → edit content via rich editor
6. **Settings** → update contact / password

</td>
</tr>
</table>

<br/>

---

## 🗺️ Roadmap

<table>
<tr><td>✅</td><td>Admin Login with Session Protection</td></tr>
<tr><td>✅</td><td>User Registration &amp; Login (Password Hashed)</td></tr>
<tr><td>✅</td><td>Personal User Dashboard</td></tr>
<tr><td>✅</td><td>Public Donor Registration Form</td></tr>
<tr><td>✅</td><td>Admin Donor Management (Add / Delete)</td></tr>
<tr><td>✅</td><td>Search Donors by Blood Group</td></tr>
<tr><td>✅</td><td>Contact &amp; Query System (Read / Pending)</td></tr>
<tr><td>✅</td><td>CMS — Admin-Editable Page Content</td></tr>
<tr><td>✅</td><td>Responsive UI with Bootstrap 4.6</td></tr>
<tr><td>🔜</td><td>Email Notifications for Query Replies</td></tr>
<tr><td>🔜</td><td>SMS Alerts for Blood Requests</td></tr>
<tr><td>🔜</td><td>Blood Inventory / Stock Tracking</td></tr>
<tr><td>🔜</td><td>Printable Donor Cards</td></tr>
</table>

<br/>

---

## 🤝 Contributing

```bash
# 1. Fork this repository
# 2. Create your feature branch
git checkout -b feature/AmazingFeature

# 3. Commit your changes
git commit -m "Add AmazingFeature"

# 4. Push to the branch
git push origin feature/AmazingFeature

# 5. Open a Pull Request 🎉
```

<br/>

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more details.

<br/>

---

## 👨‍💻 Developed By

<div align="center">

### Engr Shuvo Das

<p>
  <a href="https://wa.me/+919641700503">
    <img src="https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" />
  </a>
  &nbsp;
  <a href="https://www.linkedin.com/in/engrshuvoda/">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" />
  </a>
  &nbsp;
  <a href="https://github.com/engrshuvodas">
    <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" />
  </a>
  &nbsp;
  <a href="https://www.fiverr.com/shuvo_das74886">
    <img src="https://img.shields.io/badge/Fiverr-1DBF73?style=for-the-badge&logo=fiverr&logoColor=white" />
  </a>
</p>
<p>
  <a href="https://www.youtube.com/channel/UCEJ0R871tF2PLT27q9azYWg">
    <img src="https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white" />
  </a>
  &nbsp;
  <a href="https://engrshuvodas.github.io/me/">
    <img src="https://img.shields.io/badge/Portfolio-000000?style=for-the-badge&logo=About.me&logoColor=white" />
  </a>
  &nbsp;
  <a href="mailto:engrshuvoda@gmail.com">
    <img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" />
  </a>
  &nbsp;
  <a href="https://x.com/engrshuvodas">
    <img src="https://img.shields.io/badge/X%20Twitter-000000?style=for-the-badge&logo=x&logoColor=white" />
  </a>
  &nbsp;
  <a href="https://www.facebook.com/engr.shuvo74886/">
    <img src="https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white" />
  </a>
</p>

<br/>

<h4>🧑‍💻 Developed with ❤️ and dedication by
  <a href="https://engrshuvodas.github.io/SHUVO-_portfolio/" target="_blank">Engr Shuvo Das</a>
</h4>

<br/>

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=b91c1c&height=130&section=footer&text=%E2%AD%90%20Star%20this%20Repo%20if%20it%20helped%20you!&fontSize=20&fontColor=ffffff&fontAlignY=65&animation=fadeIn" />

</div>
