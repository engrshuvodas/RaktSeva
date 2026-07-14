<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>RaktSeva - Blood Bank & Donation</title>
  
  <!-- Bootstrap 4.6 -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
  
  <!-- Font Awesome 6 -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  
  <!-- Google Fonts (Inter) imported in CSS -->
  <link rel="stylesheet" href="css/style.css">
  
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.min.js"></script>
</head>
<body>
  <div class="header">
    <a href="home.php" class="logo">
      <i class="fa-solid fa-droplet" style="color: var(--primary); margin-right: 6px;"></i>RaktSeva
    </a>
    
    <button class="nav-toggle" id="navToggle">
      <i class="fa-solid fa-bars"></i>
    </button>
    
    <div class="header-right" id="navMenu">
      <a href="about_us.php" class="<?php if($active=='about') echo 'act'; ?>">About Us</a>
      <a href="why_donate_blood.php" class="<?php if($active=='why') echo 'act'; ?>">Why Donate</a>
      <a href="donate_blood.php" class="<?php if($active=='donate') echo 'act'; ?>">Become A Donor</a>
      <a href="need_blood.php" class="<?php if($active=='need') echo 'act'; ?>">Need Blood</a>
      <a href="contact_us.php" class="<?php if($active=='contact') echo 'act'; ?>">Contact Us</a>

      <?php if (isset($_SESSION['user_loggedin']) && $_SESSION['user_loggedin'] === true): ?>
        <a href="user_dashboard.php" class="btn-user">
          <i class="fa-solid fa-user"></i>
          <?= htmlspecialchars($_SESSION['user_name']) ?>
        </a>
        <a href="user_logout.php" class="btn-logout">
          <i class="fa-solid fa-right-from-bracket"></i> Logout
        </a>
      <?php else: ?>
        <a href="user_login.php" class="login-btn">
          Login <i class="fa-solid fa-arrow-right-to-bracket"></i>
        </a>
      <?php endif; ?>
    </div>
  </div>

  <script>
    // Simple toggle for mobile nav
    document.getElementById('navToggle').addEventListener('click', function() {
      document.getElementById('navMenu').classList.toggle('open');
    });
  </script>
