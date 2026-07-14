<?php
session_start();
include 'conn.php';
$error = '';

if(isset($_POST["login"])){
    $username = mysqli_real_escape_string($conn, $_POST["username"]);
    $password = mysqli_real_escape_string($conn, $_POST["password"]);

    $sql = "SELECT * from admin_info where admin_username='$username' and admin_password='$password'";
    $result = mysqli_query($conn, $sql) or die("query failed.");

    if(mysqli_num_rows($result) > 0) {
        while($row = mysqli_fetch_assoc($result)){
            $_SESSION['loggedin'] = true;
            $_SESSION["username"] = $username;
            header("Location: dashboard.php");
            exit();
        }
    } else {
        $error = "Username and Password do not match!";
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>Admin Login - RaktSeva</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link rel="stylesheet" href="admin.css">
</head>
<body>

<div class="admin-auth-wrapper">
  <div class="admin-auth-card">
    <div class="admin-auth-logo">
      <div class="brand-icon">
        <i class="fa-solid fa-shield-halved"></i>
      </div>
      <h2>RaktSeva Admin</h2>
      <p>Secure Admin Portal</p>
    </div>
    
    <hr class="auth-divider">

    <?php if ($error): ?>
      <div class="alert alert-danger mb-4"><i class="fa-solid fa-circle-exclamation"></i> <?= $error ?></div>
    <?php endif; ?>

    <form method="post" action="">
      <div class="admin-form-group">
        <label class="admin-form-label">Username <span>*</span></label>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text bg-white" style="border-color: var(--border); color: var(--text-muted);"><i class="fa-solid fa-user"></i></span>
          </div>
          <input type="text" name="username" class="form-control" placeholder="Enter username" style="border-left: none;" required>
        </div>
      </div>
      
      <div class="admin-form-group">
        <label class="admin-form-label">Password <span>*</span></label>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text bg-white" style="border-color: var(--border); color: var(--text-muted);"><i class="fa-solid fa-lock"></i></span>
          </div>
          <input type="password" name="password" class="form-control" placeholder="Enter password" style="border-left: none;" required>
        </div>
      </div>
      
      <button type="submit" name="login" class="btn-admin-primary w-100 justify-content-center mt-3" style="padding: 12px; font-size: 15px;">
        Login to Dashboard <i class="fa-solid fa-arrow-right ml-2"></i>
      </button>
    </form>

    <div class="text-center mt-4">
      <a href="../home.php" style="color: var(--text-muted); font-size: 13px; text-decoration: none;">
        <i class="fa-solid fa-arrow-left"></i> Return to Public Site
      </a>
    </div>
  </div>
</div>

</body>
</html>
