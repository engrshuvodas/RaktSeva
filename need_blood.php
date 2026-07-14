<?php 
$active ='need';
include('head.php');
?>

<div class="page-wrapper">
  <div class="container mt-section">

    <div class="page-hero" style="border-radius: var(--radius-lg); margin-bottom: 30px; padding: 40px 30px; background: linear-gradient(135deg, var(--dark) 0%, var(--dark-mid) 100%);">
      <h1><i class="fa-solid fa-magnifying-glass mr-2"></i> Need Blood</h1>
      <p>Search for available blood donors in your area.</p>
    </div>

    <div class="rs-card mb-section mx-auto" style="max-width: 800px;">
      <div class="rs-card-header"><i class="fa-solid fa-filter"></i> Search Donors</div>
      <div class="rs-card-body">
        <form name="needblood" action="" method="post">
          <div class="row align-items-end">
            <div class="col-md-5 mb-3">
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
            
            <div class="col-md-5 mb-3">
              <label class="form-label">Reason, why do you need blood? <span>*</span></label>
              <input type="text" class="form-control" name="address" required placeholder="Brief reason (e.g. surgery, accident)">
            </div>
            
            <div class="col-md-2 mb-3">
              <button type="submit" name="search" class="btn btn-primary w-100 h-100" style="padding: 10px;">
                <i class="fa-solid fa-search"></i> Search
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <div class="row mb-section">
    <?php 
    if (isset($_POST['search'])) {
        $bg = $_POST['blood'];
        $sql = "select * from donor_details join blood where donor_details.donor_blood=blood.blood_id AND donor_blood='{$bg}' order by rand() limit 6";
        $result = mysqli_query($conn, $sql);
        
        if (mysqli_num_rows($result) > 0) {
            echo '<div class="col-12 mb-4"><h3 class="section-title">Search Results</h3></div>';
            while ($row = mysqli_fetch_assoc($result)) {
    ?>
        <div class="col-lg-4 col-md-6 mb-4">
          <div class="donor-card">
            <img class="donor-card-img" src="image/blood_drop_logo.jpg" alt="Donor Image">
            <div class="donor-card-body">
              <h3 class="donor-card-name"><?= htmlspecialchars($row['donor_name']) ?></h3>
              <span class="donor-badge"><?= htmlspecialchars($row['blood_group']) ?></span>
              
              <div class="donor-info-row">
                <i class="fa-solid fa-phone"></i>
                <span><?= htmlspecialchars($row['donor_number']) ?></span>
              </div>
              <div class="donor-info-row">
                <i class="fa-solid fa-user"></i>
                <span><?= htmlspecialchars($row['donor_gender']) ?>, <?= htmlspecialchars($row['donor_age']) ?> yrs</span>
              </div>
              <div class="donor-info-row">
                <i class="fa-solid fa-location-dot"></i>
                <span><?= htmlspecialchars($row['donor_address']) ?></span>
              </div>
            </div>
          </div>
        </div>
    <?php
            }
        } else {
            echo '<div class="col-12"><div class="alert alert-danger"><i class="fa-solid fa-circle-exclamation"></i> No Donor Found For your search Blood group.</div></div>';
        }
    } 
    ?>
    </div>

  </div>
</div>

<?php include 'footer.php'; ?>
