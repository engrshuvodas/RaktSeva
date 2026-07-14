<?php
session_start();
if (isset($_SESSION['user_loggedin']) && $_SESSION['user_loggedin'] === true) {
    header("Location: user_dashboard.php");
    exit();
}

include 'conn.php';

$error = '';

if (isset($_POST['login'])) {
    $email    = mysqli_real_escape_string($conn, trim($_POST['email']));
    $password = $_POST['password'];

    if (empty($email) || empty($password)) {
        $error = "Please enter both email and password.";
    } else {
        $sql    = "SELECT * FROM users WHERE email='$email'";
        $result = mysqli_query($conn, $sql);
        if (mysqli_num_rows($result) > 0) {
            $user = mysqli_fetch_assoc($result);
            if (password_verify($password, $user['password'])) {
                $_SESSION['user_loggedin'] = true;
                $_SESSION['user_id']       = $user['user_id'];
                $_SESSION['user_name']     = $user['full_name'];
                $_SESSION['user_email']    = $user['email'];
                header("Location: user_dashboard.php");
                exit();
            } else {
                $error = "Incorrect email or password.";
            }
        } else {
            $error = "No account found with this email.";
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>User Login - RaktSeva</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
<div class="auth-wrapper">
  <div class="auth-card">
    <div class="auth-logo">
      <div class="brand-icon">
        <i class="fa-solid fa-droplet"></i>
      </div>
      <h2>RaktSeva</h2>
      <p>Sign in to your account</p>
    </div>
    
    <hr class="auth-divider">

    <?php if ($error): ?>
      <div class="alert alert-danger"><i class="fa-solid fa-circle-exclamation"></i> <?= $error ?></div>
    <?php endif; ?>

    <form method="post" action="">
      <div class="form-group">
        <label class="form-label">Email Address</label>
        <input type="email" name="email" class="form-control" placeholder="Enter your email" value="<?= isset($_POST['email']) ? htmlspecialchars($_POST['email']) : '' ?>" required>
      </div>
      <div class="form-group">
        <label class="form-label">Password</label>
        <input type="password" name="password" class="form-control" placeholder="Enter your password" required>
      </div>
      <button type="submit" name="login" class="btn btn-primary w-100 justify-content-center mt-3">
        Login <i class="fa-solid fa-arrow-right-to-bracket ml-2"></i>
      </button>
    </form>

    <div class="auth-footer">
      Don't have an account? <a href="user_register.php">Register here</a>
    </div>
    
    <div class="auth-links">
      <a href="home.php"><i class="fa-solid fa-arrow-left"></i> Back to Home</a>
      <a href="admin/login.php"><i class="fa-solid fa-lock"></i> Admin Login</a>
    </div>
  </div>
</div>
</body>
</html>
