<?php
session_start();
include 'conn.php';
include 'session.php';
if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
    header("Location: login.php");
    exit;
}
$page_title = "Add Donor";
$active = "add";
include 'header.php';
include 'sidebar.php';
?>

<div class="admin-main">
  <div class="admin-content">
    <div class="page-header">
      <h1>Add Donor</h1>
      <p>Manually register a new blood donor.</p>
    </div>

    <div class="admin-card" style="max-width: 900px;">
      <div class="admin-card-header">
        <h3><i class="fa-solid fa-user-plus"></i> Donor Information</h3>
      </div>
      <div class="admin-card-body">
        <form name="donor" action="save_donor_data.php" method="post">
          <div class="row">
            <div class="col-md-4">
              <div class="admin-form-group">
                <label class="admin-form-label">Full Name <span>*</span></label>
                <input type="text" name="fullname" class="admin-form-control" required>
              </div>
            </div>
            <div class="col-md-4">
              <div class="admin-form-group">
                <label class="admin-form-label">Mobile Number <span>*</span></label>
                <input type="text" name="mobileno" class="admin-form-control" required>
              </div>
            </div>
            <div class="col-md-4">
              <div class="admin-form-group">
                <label class="admin-form-label">Email Id</label>
                <input type="email" name="emailid" class="admin-form-control">
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4">
              <div class="admin-form-group">
                <label class="admin-form-label">Age <span>*</span></label>
                <input type="text" name="age" class="admin-form-control" required>
              </div>
            </div>
            <div class="col-md-4">
              <div class="admin-form-group">
                <label class="admin-form-label">Gender <span>*</span></label>
                <select name="gender" class="admin-form-control" required>
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
            <div class="col-md-4">
              <div class="admin-form-group">
                <label class="admin-form-label">Blood Group <span>*</span></label>
                <select name="blood" class="admin-form-control" required>
                  <option value="" selected disabled>Select</option>
                  <?php
                    $sql = "select * from blood";
                    $res = mysqli_query($conn, $sql);
                    while ($r = mysqli_fetch_assoc($res)) {
                      echo '<option value="'.$r['blood_id'].'">'.htmlspecialchars($r['blood_group']).'</option>';
                    }
                  ?>
                </select>
              </div>
            </div>
          </div>
          <div class="admin-form-group">
            <label class="admin-form-label">Address <span>*</span></label>
            <textarea class="admin-form-control" name="address" required></textarea>
          </div>
          <div class="mt-2">
            <button type="submit" name="submit" class="btn-admin-primary">
              <i class="fa-solid fa-save"></i> Save Donor
            </button>
          </div>
        </form>
      </div>
    </div>

  </div>
</div>

</body>
</html>
