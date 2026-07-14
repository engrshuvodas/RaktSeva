<?php
$active ='donate';
include('head.php');
?>

<div class="page-wrapper">
  <div class="container">

    <div class="page-hero" style="border-radius: var(--radius-lg); margin-bottom: 30px; padding: 40px 30px; background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);">
      <h1><i class="fa-solid fa-hand-holding-droplet mr-2"></i> Donate Blood</h1>
      <p>Register as a blood donor and help save lives in your community.</p>
    </div>

    <div class="rs-card mb-section mx-auto" style="max-width: 800px;">
      <div class="rs-card-header"><i class="fa-solid fa-user-plus"></i> Donor Registration Form</div>
      <div class="rs-card-body">
        <form name="donor" action="savedata.php" method="post">
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label">Full Name <span>*</span></label>
              <input type="text" name="fullname" class="form-control" required>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">Mobile Number <span>*</span></label>
              <input type="text" name="mobileno" class="form-control" required>
            </div>
          </div>
          
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label">Email Id</label>
              <input type="email" name="emailid" class="form-control">
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">Age <span>*</span></label>
              <input type="text" name="age" class="form-control" required>
            </div>
          </div>
          
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label">Gender <span>*</span></label>
              <select name="gender" class="form-control" required>
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">Blood Group <span>*</span></label>
              <select name="blood" class="form-control" required>
                <option value="" selected disabled>Select</option>
                <?php
                  include 'conn.php';
                  $sql = "select * from blood";
                  $result = mysqli_query($conn, $sql);
                  while ($row = mysqli_fetch_assoc($result)) {
                ?>
                 <option value="<?php echo $row['blood_id'] ?>"><?php echo $row['blood_group'] ?></option>
                <?php } ?>
              </select>
            </div>
          </div>
          
          <div class="row">
            <div class="col-12 mb-4">
              <label class="form-label">Address <span>*</span></label>
              <textarea class="form-control" name="address" required></textarea>
            </div>
          </div>
          
          <div class="text-right">
            <button type="submit" name="submit" class="btn btn-primary btn-lg px-5">
              Submit Details <i class="fa-solid fa-paper-plane ml-2"></i>
            </button>
          </div>
        </form>
      </div>
    </div>

  </div>
</div>

<?php include('footer.php') ?>
