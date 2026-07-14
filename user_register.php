<?php
session_start();
if (isset($_SESSION['user_loggedin']) && $_SESSION['user_loggedin'] === true) {
    header("Location: user_dashboard.php");
    exit();
}

include 'conn.php';

$error = '';
$success = '';

if (isset($_POST['register'])) {
    $full_name   = mysqli_real_escape_string($conn, trim($_POST['full_name']));
    $email       = mysqli_real_escape_string($conn, trim($_POST['email']));
    $mobile      = mysqli_real_escape_string($conn, trim($_POST['mobile']));
    $blood_group = mysqli_real_escape_string($conn, $_POST['blood_group']);
    $password    = $_POST['password'];
    $confirm     = $_POST['confirm_password'];

    if (empty($full_name) || empty($email) || empty($password) || empty($confirm)) {
        $error = "Please fill in all required fields.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error = "Invalid email address.";
    } elseif (strlen($password) < 6) {
        $error = "Password must be at least 6 characters.";
    } elseif ($password !== $confirm) {
        $error = "Passwords do not match.";
    } else {
        // Check if email already exists
        $check = mysqli_query($conn, "SELECT user_id FROM users WHERE email='$email'");
        if (mysqli_num_rows($check) > 0) {
            $error = "An account with this email already exists.";
        } else {
            $hashed = password_hash($password, PASSWORD_DEFAULT);
            $sql = "INSERT INTO users (full_name, email, password, mobile, blood_group) VALUES ('$full_name', '$email', '$hashed', '$mobile', '$blood_group')";
            if (mysqli_query($conn, $sql)) {
                $success = "Account created successfully! You can now <a href='user_login.php' style='color:var(--primary);font-weight:700;'>Login</a>.";
            } else {
                $error = "Something went wrong. Please try again.";
            }
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>Register - RaktSeva</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
<div class="auth-wrapper">
  <div class="auth-card" style="max-width: 540px;">
    <div class="auth-logo">
      <div class="brand-icon">
        <i class="fa-solid fa-droplet"></i>
      </div>
      <h2>RaktSeva</h2>
      <p>Create your account</p>
    </div>
    
    <hr class="auth-divider">

    <?php if ($error): ?>
      <div class="alert alert-danger"><i class="fa-solid fa-circle-exclamation"></i> <?= $error ?></div>
    <?php endif; ?>
    <?php if ($success): ?>
      <div class="alert alert-success"><i class="fa-solid fa-check-circle"></i> <?= $success ?></div>
    <?php endif; ?>

    <form method="post" action="">
      <div class="form-group">
        <label class="form-label">Full Name <span>*</span></label>
        <input type="text" name="full_name" class="form-control" placeholder="Enter your full name" value="<?= isset($_POST['full_name']) ? htmlspecialchars($_POST['full_name']) : '' ?>" required>
      </div>
      <div class="form-group">
        <label class="form-label">Email Address <span>*</span></label>
        <input type="email" name="email" class="form-control" placeholder="Enter your email" value="<?= isset($_POST['email']) ? htmlspecialchars($_POST['email']) : '' ?>" required>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label class="form-label">Mobile Number</label>
            <input type="text" name="mobile" class="form-control" placeholder="e.g. 017XXXXXXXX" value="<?= isset($_POST['mobile']) ? htmlspecialchars($_POST['mobile']) : '' ?>">
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label class="form-label">Blood Group</label>
            <select name="blood_group" class="form-control">
              <option value="">Select</option>
              <?php
                $bg_options = ['A+','A-','B+','B-','AB+','AB-','O+','O-'];
                foreach ($bg_options as $bg) {
                  $sel = (isset($_POST['blood_group']) && $_POST['blood_group'] === $bg) ? 'selected' : '';
                  echo "<option value='$bg' $sel>$bg</option>";
                }
              ?>
            </select>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Password <span>*</span></label>
        <input type="password" name="password" class="form-control" placeholder="Minimum 6 characters" required>
      </div>
      <div class="form-group">
        <label class="form-label">Confirm Password <span>*</span></label>
        <input type="password" name="confirm_password" class="form-control" placeholder="Re-enter your password" required>
      </div>
      <button type="submit" name="register" class="btn btn-primary w-100 justify-content-center mt-3">
        Create Account <i class="fa-solid fa-user-plus ml-2"></i>
      </button>
    </form>

    <div class="auth-footer">
      Already have an account? <a href="user_login.php">Login here</a>
    </div>
    <div class="auth-links">
      <a href="home.php"><i class="fa-solid fa-arrow-left"></i> Back to Home</a>
    </div>
  </div>
</div>
</body>
</html>
