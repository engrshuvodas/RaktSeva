<?php 
$active ='about';
include('head.php');
?>

<div class="page-wrapper">
  <div class="container mt-section">

    <div class="page-hero" style="border-radius: var(--radius-lg); margin-bottom: 30px; padding: 40px 30px; background: linear-gradient(135deg, var(--dark) 0%, var(--dark-mid) 100%);">
      <h1><i class="fa-solid fa-circle-info mr-2"></i> About Us</h1>
      <p>Learn more about our mission and how we operate.</p>
    </div>

    <div class="row mb-section align-items-center">
      <div class="col-lg-6 mb-4 mb-lg-0">
        <div class="rs-card h-100">
          <div class="rs-card-body" style="font-size: 15px; line-height: 1.8;">
            <?php
              include 'conn.php';
              $sql = "select * from pages where page_type='aboutus'";
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
      <div class="col-lg-6">
        <img class="img-fluid rounded shadow" src="image/banner_590x300.jpg" alt="About Us">
      </div>
    </div>

  </div>
</div>

<?php include('footer.php'); ?>
