<?php 
$active ='why';
include('head.php');
?>

<div class="page-wrapper">
  <div class="container mt-section">

    <div class="page-hero" style="border-radius: var(--radius-lg); margin-bottom: 30px; padding: 40px 30px; background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);">
      <h1><i class="fa-solid fa-heart-circle-check mr-2"></i> Why Should I Donate Blood?</h1>
      <p>Your blood can save up to 3 lives. Find out why your donation matters.</p>
    </div>

    <div class="row mb-section align-items-center">
      <div class="col-lg-6 mb-4 mb-lg-0">
        <div class="rs-card h-100">
          <div class="rs-card-body" style="font-size: 15px; line-height: 1.8;">
            <?php
              include 'conn.php';
              $sql = "select * from pages where page_type='donor'";
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
      <div class="col-lg-6 text-center">
        <img class="img-fluid rounded shadow" src="image/08f2fccc45d2564f74ead4a6d5086871.png" style="max-height: 500px; object-fit: contain;" alt="Why Donate Blood">
      </div>
    </div>

  </div>
</div>

<?php include('footer.php'); ?>
