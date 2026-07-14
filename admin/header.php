<?php
// header.php — outputs the full document start (DOCTYPE, html, head, body opening, topbar)
// Each admin page should: include('header.php') first, then include('sidebar.php'), then content, then </body></html>
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title><?php echo isset($page_title) ? $page_title . ' | RaktSeva Admin' : 'RaktSeva Admin'; ?></title>
  <!-- Bootstrap 4.6 -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
  <!-- Font Awesome 6 -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <!-- Admin CSS -->
  <link rel="stylesheet" href="admin.css">
  <!-- jQuery + Bootstrap JS -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.min.js"></script>
</head>
<body>

<!-- TOPBAR -->
<div class="admin-topbar">
  <a href="dashboard.php" class="topbar-brand">
    <i class="fa-solid fa-droplet"></i> RaktSeva Admin
  </a>

  <button class="sidebar-toggle-btn d-md-none" id="sidebarToggle">
    <i class="fa-solid fa-bars"></i>
  </button>

  <div class="topbar-right">
    <div class="topbar-dropdown" id="userMenuDropdown">
      <button class="topbar-dropdown-toggle" id="userMenuToggle">
        <div class="topbar-user">
          <div class="user-avatar">
            <i class="fa-solid fa-user"></i>
          </div>
          <?php
          include 'conn.php';
          $username = $_SESSION['username'];
          $sql = "select * from admin_info where admin_username='$username'";
          $result = mysqli_query($conn, $sql);
          $row = mysqli_fetch_assoc($result);
          echo "Hi, " . htmlspecialchars($row['admin_name']);
          ?>
        </div>
        <i class="fa-solid fa-chevron-down" style="font-size: 10px; color: var(--text-muted);"></i>
      </button>

      <div class="topbar-dropdown-menu" id="userMenu">
        <a href="change_password.php"><i class="fa-solid fa-key"></i> Change Password</a>
        <div class="menu-divider"></div>
        <a href="logout.php" class="danger"><i class="fa-solid fa-arrow-right-from-bracket"></i> Logout</a>
      </div>
    </div>
  </div>
</div>

<script>
  document.getElementById('userMenuToggle').addEventListener('click', function(e) {
    e.stopPropagation();
    document.getElementById('userMenu').classList.toggle('open');
  });
  document.addEventListener('click', function(e) {
    if (!e.target.closest('#userMenuDropdown')) {
      document.getElementById('userMenu').classList.remove('open');
    }
  });
</script>
