<?php
session_start();
include 'conn.php';
include 'session.php';
if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
    header("Location: login.php");
    exit;
}

$msg = '';
if (isset($_POST["submit"])) {
    $username    = $_SESSION['username'];
    $currpwd     = mysqli_real_escape_string($conn, $_POST["currpassword"]);
    $sql         = "SELECT * FROM admin_info WHERE admin_username='$username'";
    $result      = mysqli_query($conn, $sql);
    $row         = mysqli_fetch_assoc($result);

    if ($currpwd == $row['admin_password']) {
        $newpwd  = mysqli_real_escape_string($conn, $_POST["newpassword"]);
        $confpwd = mysqli_real_escape_string($conn, $_POST["confirmpassword"]);

        if ($newpwd == $confpwd) {
            if ($newpwd != $currpwd) {
                mysqli_query($conn, "UPDATE admin_info SET admin_password='$newpwd' WHERE admin_username='$username'");
                $msg = '<div class="alert alert-success"><i class="fa-solid fa-check"></i> Password changed successfully.</div>';
            } else {
                $msg = '<div class="alert alert-info"><i class="fa-solid fa-circle-info"></i> New password cannot be the same as current password.</div>';
            }
        } else {
            $msg = '<div class="alert alert-warning"><i class="fa-solid fa-triangle-exclamation"></i> New password and confirm password do not match.</div>';
        }
    } else {
        $msg = '<div class="alert alert-danger"><i class="fa-solid fa-circle-exclamation"></i> Current password is incorrect.</div>';
    }
}

$page_title = "Change Password";
$active = "";
include 'header.php';
include 'sidebar.php';
?>

<div class="admin-main">
  <div class="admin-content">
    <div class="page-header">
      <h1>Change Password</h1>
      <p>Update your admin account password.</p>
    </div>

    <div class="row">
      <div class="col-md-6">
        <div class="admin-card">
          <div class="admin-card-header">
            <h3><i class="fa-solid fa-key"></i> Password Details</h3>
          </div>
          <div class="admin-card-body">
            <?= $msg ?>
            <form method="post" name="chngpwd">
              <div class="admin-form-group">
                <label class="admin-form-label">Current Password <span>*</span></label>
                <input type="password" class="admin-form-control" name="currpassword" required>
              </div>
              <div class="admin-form-group">
                <label class="admin-form-label">New Password <span>*</span></label>
                <input type="password" class="admin-form-control" name="newpassword" required>
              </div>
              <div class="admin-form-group">
                <label class="admin-form-label">Confirm New Password <span>*</span></label>
                <input type="password" class="admin-form-control" name="confirmpassword" required>
              </div>
              <div class="mt-2">
                <button class="btn-admin-primary" name="submit" type="submit">
                  <i class="fa-solid fa-floppy-disk"></i> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>

</body>
</html>
