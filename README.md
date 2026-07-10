# Blood-Bank-&-Donation-Management-System

Blood Bank Donation System is a PHP-based web application that provides both user-facing pages and an admin panel to manage donors, blood inventory, and contact queries. It is designed as a lightweight, easy-to-deploy solution for small blood banks or nonprofits.

## Table of Contents

- Project Overview
- Technologies
- Features
- Quick Installation
- Usage
- Admin Panel
- Screenshots

## Project Overview

Blood Bank Donation System is a PHP-based web application that provides both user-facing pages and an admin panel to manage donors, blood inventory, and contact queries. It is designed as a lightweight, easy-to-deploy solution for small blood banks or nonprofits.

## Technologies & Languages

- **Server-side:** PHP (tested with PHP 7.4+ and PHP 8.x)
- **Database:** MySQL / MariaDB
- **Web server:** Apache (XAMPP/WAMP recommended for local development)
- **Front-end:** HTML5, CSS3, JavaScript
- **Libraries/Assets:** (project uses standard Bootstrap-like markup and simple JS; no external package manager required)

## Features

- Public user pages: Home, About Us, Why Donate, Need Blood, Contact Us, Become a Donor
- Donor registration and storage of donor details (name, age, blood group, contact, address)
- Search donors by blood group
- Contact form with admin-query management and read/pending status
- Admin panel with authentication to manage donors, queries and site pages
- CRUD for pages and contact information from the admin dashboard
- Basic session-based admin authentication and password change
- SQL seed file included for quick setup (creates admin user and sample content)

## Quick Installation (Local - XAMPP/WAMP)

1. Install XAMPP or WAMP and start Apache and MySQL services.
2. Copy the project directory into your web root, e.g. `C:\xampp\htdocs\BDMS`.
3. Import the SQL file `sql/blood_bank_database.sql` into MySQL (phpMyAdmin or CLI). The SQL creates the `blood_donation` database and seeds sample data.
   - Using phpMyAdmin: open `http://localhost/phpmyadmin` → Import → choose `BDMS/sql/blood_bank_database.sql` → Go.
   - Using CLI (example):

```powershell
& 'C:\xampp\mysql\bin\mysql.exe' -u root < "C:\xampp\htdocs\BDMS\sql\blood_bank_database.sql"
```

4. Ensure database connection settings match your environment in `conn.php` and `admin/conn.php`. By default the project expects:

- Host: `localhost`
- User: `root`
- Password: (empty)
- Database: `blood_donation`

5. Open the site in your browser: `http://localhost/BDMS/home.php` (user) and `http://localhost/BDMS/admin/login.php` (admin).

## Usage

- Register as a donor from the user-facing pages. Donor records are saved to the database.
- Use the search form to find donors by blood group.
- Visitors can submit contact queries which appear in the admin `pending_query` list for review.

## Admin Panel

- Login URL: `http://localhost/BDMS/admin/login.php`
- Default seeded credentials (from the included SQL):
  - Username: `varunsardana004`
  - Password: `123`

After login the admin can add donors, view donor lists, manage contact queries, and edit page content.

## Screenshots
See the image previews and examples in the original README (project screenshots are included in the repository). The README retains the original screenshot embeds below.

## Notes & Troubleshooting

- If your Apache or MySQL ports are in use, stop the conflicting services or change XAMPP ports.
- Ensure `conn.php` points to the correct database name — the included SQL creates `blood_donation`.
- If you get SQL errors while importing, check whether a `blood_donation` database already exists; you can drop it first if it's an older import.

## License & Credits

This project is the original work by the repository author. See the project files for full attribution and screenshots included by the author.

---

_Original README content below retained for reference:_

# Original Installation Instructions

1. Install XAMPP or WAMPP.

2. Open XAMPP Control panal and start [apache] and [mysql] .

3. Download project from github(https://github.com/varunsardana004/Blood-Bank-And-Donation-Management-System.git).

   OR follow gitbash commands <br>
     ```t
         i>cd C:\xampp\htdocs\
        ii>git clone https://github.com/varunsardana004/Blood-Bank-And-Donation-Management-System.git
     
     
4. Extract files in C:\xampp\htdocs.

5. Open link localhost/phpmyadmin

6. Click on new at side navbar.

7. Give a database name as (blood_bank_database) hit on create button.

8. After creating database name click on import.

9. Browse the file in directory[BDMS/sql/blood_bank_database.sql].

10. After importing successfully.

11. Open any browser and type http://localhost/BDMS/home.php to open User layout.
     
# Admin Panel
   Open any browser and type http://localhost/BDMS/admin/login.php to open Admin Login Panel.
   
   Enter Below Credentials to login to the Admin Panel.<br>
   <b> Username = </b> varunsardana004<br>
   <b>Password = </b> 123
   
# If you like my project hit the star 🌟 button

# Screenshots

<h3> User Panel Images </h3>
<br><b>1. Home Page 
   <br>
   <img src="https://user-images.githubusercontent.com/54537819/96302170-efe43480-1015-11eb-85f0-f419cf18e34b.png">
   <img src="https://user-images.githubusercontent.com/54537819/96302619-be1f9d80-1016-11eb-853e-fc463fa09ffd.png">
   <img src="https://user-images.githubusercontent.com/54537819/96302799-0048df00-1017-11eb-833a-5956683f1d07.png">
   <img src="https://user-images.githubusercontent.com/54537819/96302421-6e40d680-1016-11eb-8939-b7b09ed1e997.png">
   <br>
   <br>
   2. About Us Page
   <img src="https://user-images.githubusercontent.com/54537819/96301335-ac3cfb00-1014-11eb-84c1-092ddb1480e6.png">
   <br>
   <br>
   3. Why Donate Blood Page
   <img src="https://user-images.githubusercontent.com/54537819/96301343-af37eb80-1014-11eb-8aa8-35ad178ba3e7.png">
   <br>
   <br>
   4. Become A Donor Page
   <img src="https://user-images.githubusercontent.com/54537819/96301357-b3640900-1014-11eb-9956-c630873a396b.png">
   <br>
   <br>
   5. Need Blood Page
   <img src="https://user-images.githubusercontent.com/54537819/96301362-b6f79000-1014-11eb-9839-79178b5b248e.png">
   <img src="https://user-images.githubusercontent.com/54537819/96303874-ca0c5f00-1018-11eb-9fa0-aa773af1bb27.png">
   <img src="https://user-images.githubusercontent.com/54537819/96303701-769a1100-1018-11eb-98a3-b40c9068840a.png">
   <br>
   <br>
   6. Contact Us Page
   <img src="https://user-images.githubusercontent.com/54537819/96303477-10ad8980-1018-11eb-9b9b-8629ad48fa2b.png">
   
   <br>
   <br><br>
   <br>
   <h3> Admin Panel Images </h3>
   <br>
   <br>1. Admin Panel Login Portal
   <img src="https://user-images.githubusercontent.com/54537819/96365985-43fc2f80-1162-11eb-801c-056f973e61b4.png">
   <br>
   <br>
   2.Dashboard 
   <img src="https://user-images.githubusercontent.com/54537819/96366040-ace3a780-1162-11eb-86d9-9270b8931b70.png"><br><br>
   <img src="https://user-images.githubusercontent.com/54537819/96366049-ba992d00-1162-11eb-84e8-b90fb507f20d.png">
   <br><br>
   3.Change Password Page
   <img src="https://user-images.githubusercontent.com/54537819/96366158-75c1c600-1163-11eb-909b-2021d5cd2b06.png">
   <br><br>
   4.Add Donor Page
   <img src="https://user-images.githubusercontent.com/54537819/96366077-e3212700-1162-11eb-9f81-7d0dca60e913.png">
   <br>
   <br>
   5.Donor List Page
   <img src="https://user-images.githubusercontent.com/54537819/96366097-fdf39b80-1162-11eb-99cc-8506d03c900d.png">
   <br><br>
   6.Check Contact Us Query Page
   <img src="https://user-images.githubusercontent.com/54537819/96366120-1c599700-1163-11eb-9fa4-55355192d1b8.png">
   <br><br>
   7.Manage Page Data
   <img src="https://user-images.githubusercontent.com/54537819/96366140-4f9c2600-1163-11eb-86fc-65d9094f0807.png">
   <br>
   <br>
   8.Update Page Details
   <img src="https://user-images.githubusercontent.com/54537819/96366183-938f2b00-1163-11eb-8f3a-4cb90e877c11.png">
   <br>
   <br>
   9.Update Contact Info Page
   <img src="https://user-images.githubusercontent.com/54537819/96366208-b15c9000-1163-11eb-8163-e2d9f9bc4af5.png">
   
   
