<?php
session_start();
include 'conn.php';
include 'session.php';
if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
    header("Location: login.php");
    exit;
}

$msg = '';
if (isset($_POST['update'])) {
    $address   = mysqli_real_escape_string($conn, $_POST['address']);
    $email     = mysqli_real_escape_string($conn, $_POST['email']);
    $contactno = mysqli_real_escape_string($conn, $_POST['contactno']);
    $sql = "UPDATE contact_info SET contact_address='$address', contact_mail='$email', contact_phone='$contactno' WHERE contact_id='1'";
    mysqli_query($conn, $sql);
    $msg = '<div class="alert alert-success"><i class="fa-solid fa-check"></i> Contact Details Updated Successfully.</div>';
}

// Fetch current values
$curr_sql = "SELECT * FROM contact_info WHERE contact_id='1'";
$curr_res = mysqli_query($conn, $curr_sql);
$curr = mysqli_fetch_assoc($curr_res);

$page_title = "Update Contact Info";
$active = "contact";
include 'header.php';
include 'sidebar.php';
?>

<div class="admin-main">
  <div class="admin-content">
    <div class="page-header">
      <h1>Update Contact Info</h1>
      <p>Modify the contact details displayed on the public website.</p>
    </div>

    <div class="row">
      <div class="col-md-8">
        <div class="admin-card">
          <div class="admin-card-header">
            <h3><i class="fa-solid fa-address-card"></i> Contact Information</h3>
          </div>
          <div class="admin-card-body">
            <?= $msg ?>
            <form method="post" name="change_contact">
              <div class="admin-form-group">
                <label class="admin-form-label">Address <span>*</span></label>
                <textarea class="admin-form-control" name="address" required><?= htmlspecialchars($curr['contact_address']) ?></textarea>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="admin-form-group">
                    <label class="admin-form-label">Email <span>*</span></label>
                    <input type="email" class="admin-form-control" name="email" value="<?= htmlspecialchars($curr['contact_mail']) ?>" required>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="admin-form-group">
                    <label class="admin-form-label">Contact Number <span>*</span></label>
                    <input type="text" class="admin-form-control" name="contactno" value="<?= htmlspecialchars($curr['contact_phone']) ?>" required>
                  </div>
                </div>
              </div>
              <div class="mt-2">
                <button class="btn-admin-primary" name="update" type="submit">
                  <i class="fa-solid fa-save"></i> Update Details
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
