<?php
$active = "home";
include('head.php'); 
?>
<?php include 'ticker.php'; ?>

<div class="page-wrapper">
  <div class="container">
    
    <!-- Carousel -->
    <div id="demo" class="carousel slide" data-ride="carousel">
      <ul class="carousel-indicators">
        <li data-target="#demo" data-slide-to="0" class="active"></li>
        <li data-target="#demo" data-slide-to="1"></li>
      </ul>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="image/_107317099_blooddonor976.jpg" alt="Blood Donor" width="100%" height="450">
        </div>
        <div class="carousel-item">
          <img src="image/Blood-facts_10-illustration-graphics__canteen.png" alt="Blood Facts" width="100%" height="450">
        </div>
      </div>
      <a class="carousel-control-prev" href="#demo" data-slide="prev">
        <span class="carousel-control-prev-icon"></span>
      </a>
      <a class="carousel-control-next" href="#demo" data-slide="next">
        <span class="carousel-control-next-icon"></span>
      </a>
    </div>

    <div class="text-center mt-section mb-section">
      <h1 class="section-title">Welcome to RaktSeva</h1>
      <p class="section-subtitle">Blood Bank & Donor Management System</p>
    </div>

    <!-- Info Cards -->
    <div class="row mb-section">
      <div class="col-lg-4 mb-4">
        <div class="rs-card h-100">
          <div class="rs-card-header"><i class="fa-solid fa-droplet text-white"></i> The need for blood</div>
          <div class="rs-card-body overflow-auto" style="height: 160px;">
            <?php
              include 'conn.php';
              $sql = "select * from pages where page_type='needforblood'";
              $result = mysqli_query($conn, $sql);
              if (mysqli_num_rows($result) > 0) {
                  while ($row = mysqli_fetch_assoc($result)) {
                      echo $row['page_data'];
                  }
              }
            ?>
          </div>
        </div>
      </div>
      <div class="col-lg-4 mb-4">
        <div class="rs-card h-100">
          <div class="rs-card-header"><i class="fa-solid fa-lightbulb text-warning"></i> Blood Tips</div>
          <div class="rs-card-body overflow-auto" style="height: 160px;">
            <?php
              $sql = "select * from pages where page_type='bloodtips'";
              $result = mysqli_query($conn, $sql);
              if (mysqli_num_rows($result) > 0) {
                  while ($row = mysqli_fetch_assoc($result)) {
                      echo $row['page_data'];
                  }
              }
            ?>
          </div>
        </div>
      </div>
      <div class="col-lg-4 mb-4">
        <div class="rs-card h-100">
          <div class="rs-card-header"><i class="fa-solid fa-hand-holding-heart text-success"></i> Who you could Help</div>
          <div class="rs-card-body overflow-auto" style="height: 160px;">
            <?php
              $sql = "select * from pages where page_type='whoyouhelp'";
              $result = mysqli_query($conn, $sql);
              if (mysqli_num_rows($result) > 0) {
                  while ($row = mysqli_fetch_assoc($result)) {
                      echo $row['page_data'];
                  }
              }
            ?>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Donors -->
    <div class="mb-4">
      <div class="section-label">Our Heroes</div>
      <h2 class="section-title">Recent Blood Donors</h2>
    </div>

    <div class="row mb-section">
      <?php
        $sql = "select * from donor_details join blood where donor_details.donor_blood=blood.blood_id order by rand() limit 6";
        $result = mysqli_query($conn, $sql);
        if (mysqli_num_rows($result) > 0) {
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
        } 
      ?>
    </div>

    <hr>

    <!-- Blood Groups Section -->
    <div class="row mt-section mb-section align-items-center">
      <div class="col-lg-6 mb-4 mb-lg-0">
        <div class="section-label">Learn</div>
        <h2 class="section-title">Blood Groups</h2>
        <div>
          <?php
            $sql = "select * from pages where page_type='bloodgroups'";
            $result = mysqli_query($conn, $sql);
            if (mysqli_num_rows($result) > 0) {
                while ($row = mysqli_fetch_assoc($result)) {
                    echo $row['page_data'];
                }
            }
          ?>
        </div>
      </div>
      <div class="col-lg-6">
        <img class="img-fluid rounded shadow-sm" src="image/blood_donationcover.jpeg" alt="Blood Donation">
      </div>
    </div>

    <hr>

    <!-- Call to Action -->
    <div class="row mt-section mb-4 align-items-center bg-white p-4 rounded border shadow-sm">
      <div class="col-md-8 mb-3 mb-md-0">
        <h4 class="mb-2" style="font-weight: 700;">Universal Donors and Recipients</h4>
        <div class="text-muted">
          <?php
            $sql = "select * from pages where page_type='universal'";
            $result = mysqli_query($conn, $sql);
            if (mysqli_num_rows($result) > 0) {
                while ($row = mysqli_fetch_assoc($result)) {
                    echo $row['page_data'];
                }
            }
          ?>
        </div>
      </div>
      <div class="col-md-4 text-md-right">
        <a class="btn btn-primary btn-lg w-100" href="donate_blood.php">
          Become a Donor <i class="fa-solid fa-arrow-right ml-2"></i>
        </a>
      </div>
    </div>

  </div>
</div>

<?php include('footer.php'); ?>
