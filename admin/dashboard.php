<?php
session_start();
include 'conn.php';
include 'session.php';
if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
    header("Location: login.php");
    exit;
}
$page_title = "Dashboard";
$active = "dashboard";
include 'header.php';
include 'sidebar.php';
?>

<div class="admin-main">
  <div class="admin-content">
    <div class="page-header">
      <h1>Dashboard</h1>
      <p>Overview of the blood bank operations.</p>
    </div>

    <div class="row">
      <div class="col-md-4 mb-4">
        <div class="admin-stat-card">
          <div class="admin-stat-icon icon-red"><i class="fa-solid fa-users"></i></div>
          <div class="admin-stat-body">
            <?php
              $sql = "SELECT * from donor_details";
              $result = mysqli_query($conn, $sql);
              $count = mysqli_num_rows($result);
            ?>
            <div class="admin-stat-number"><?= $count ?></div>
            <div class="admin-stat-label">Blood Donors Available</div>
            <div class="admin-stat-action"><a href="donor_list.php">View Details <i class="fa-solid fa-arrow-right"></i></a></div>
          </div>
        </div>
      </div>

      <div class="col-md-4 mb-4">
        <div class="admin-stat-card">
          <div class="admin-stat-icon icon-blue"><i class="fa-solid fa-comments"></i></div>
          <div class="admin-stat-body">
            <?php
              $sql1 = "SELECT * from contact_query";
              $result1 = mysqli_query($conn, $sql1);
              $count1 = mysqli_num_rows($result1);
            ?>
            <div class="admin-stat-number"><?= $count1 ?></div>
            <div class="admin-stat-label">All User Queries</div>
            <div class="admin-stat-action"><a href="query.php">View Details <i class="fa-solid fa-arrow-right"></i></a></div>
          </div>
        </div>
      </div>

      <div class="col-md-4 mb-4">
        <div class="admin-stat-card">
          <div class="admin-stat-icon icon-warn"><i class="fa-solid fa-clock-rotate-left"></i></div>
          <div class="admin-stat-body">
            <?php
              $sql2 = "SELECT * from contact_query where query_status=2";
              $result2 = mysqli_query($conn, $sql2);
              $count2 = mysqli_num_rows($result2);
            ?>
            <div class="admin-stat-number"><?= $count2 ?></div>
            <div class="admin-stat-label">Pending Queries</div>
            <div class="admin-stat-action"><a href="pending_query.php">View Details <i class="fa-solid fa-arrow-right"></i></a></div>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>

</body>
</html>
