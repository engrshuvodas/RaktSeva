<?php
session_start();
if (!isset($_SESSION['user_loggedin']) || $_SESSION['user_loggedin'] !== true) {
    header("Location: user_login.php");
    exit();
}

include 'conn.php';

$user_id    = $_SESSION['user_id'];
$user_name  = $_SESSION['user_name'];
$user_email = $_SESSION['user_email'];

// Fetch user data from DB
$sql    = "SELECT * FROM users WHERE user_id='$user_id'";
$result = mysqli_query($conn, $sql);
$user   = mysqli_fetch_assoc($result);

// Check if user is also a registered donor
$donor_sql    = "SELECT d.*, b.blood_group FROM donor_details d JOIN blood b ON d.donor_blood = b.blood_id WHERE d.donor_mail = '$user_email'";
$donor_result = mysqli_query($conn, $donor_sql);
$donor        = ($donor_result && mysqli_num_rows($donor_result) > 0) ? mysqli_fetch_assoc($donor_result) : null;

$active = '';
include('head.php');
?>

<div class="page-wrapper">
  <div class="container mt-4">

    <!-- Welcome Hero -->
    <div class="rs-card mb-4" style="background: linear-gradient(135deg, var(--dark) 0%, var(--dark-mid) 100%); color: #fff; padding: 36px 32px; border: none;">
      <h1 style="color:#fff; margin-bottom:6px;"><i class="fa-solid fa-user-circle" style="margin-right:10px;"></i> Welcome, <?= htmlspecialchars($user_name) ?>!</h1>
      <p style="color: rgba(255,255,255,0.72); margin: 0;">Manage your RaktSeva profile and donor information.</p>
      <?php if ($user['blood_group']): ?>
        <div class="mt-3">
          <span style="display:inline-block; background:var(--primary); color:#fff; font-weight:700; font-size:14px; padding:4px 16px; border-radius:20px;">
            <i class="fa-solid fa-droplet" style="margin-right:4px;"></i> <?= htmlspecialchars($user['blood_group']) ?>
          </span>
        </div>
      <?php endif; ?>
    </div>

    <!-- Stat Cards -->
    <div class="row mb-4">
      <div class="col-md-4 mb-3">
        <div class="stat-card">
          <div class="stat-icon-wrap dark"><i class="fa-solid fa-user-check"></i></div>
          <div class="stat-content">
            <div class="stat-label">Account Active</div>
            <div style="font-size: 14px; color: var(--text-muted); font-weight: 500; margin-top: 4px;">Since <?= date('M Y', strtotime($user['created_at'])) ?></div>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-3">
        <div class="stat-card">
          <div class="stat-icon-wrap red"><i class="fa-solid fa-hand-holding-droplet"></i></div>
          <div class="stat-content">
            <div class="stat-label">Donor Status</div>
            <div style="font-size: 14px; font-weight: 600; color: <?= $donor ? 'var(--primary)' : 'var(--text-muted)' ?>; margin-top: 4px;">
              <?= $donor ? 'Registered Donor' : 'Not Registered' ?>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-3">
        <div class="stat-card">
          <div class="stat-icon-wrap blue"><i class="fa-solid fa-clipboard-check"></i></div>
          <div class="stat-content">
            <div class="stat-label">Profile</div>
            <div style="font-size: 14px; color: var(--text-muted); font-weight: 500; margin-top: 4px;">
              <?= $user['mobile'] ? 'Complete' : 'Needs Update' ?>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Info + Donor Cards -->
    <div class="row mb-4">
      <div class="col-md-6 mb-4">
        <div class="rs-card h-100">
          <div class="rs-card-header"><i class="fa-solid fa-address-card"></i> Account Information</div>
          <div class="rs-card-body">
            <div class="info-row">
              <span class="info-label">Full Name</span>
              <span class="info-value"><?= htmlspecialchars($user['full_name']) ?></span>
            </div>
            <div class="info-row">
              <span class="info-label">Email</span>
              <span class="info-value"><?= htmlspecialchars($user['email']) ?></span>
            </div>
            <div class="info-row">
              <span class="info-label">Mobile</span>
              <span class="info-value"><?= $user['mobile'] ? htmlspecialchars($user['mobile']) : '<em style="color:var(--text-muted);font-weight:400;">Not provided</em>' ?></span>
            </div>
            <div class="info-row">
              <span class="info-label">Blood Group</span>
              <span class="info-value"><?= $user['blood_group'] ? htmlspecialchars($user['blood_group']) : '<em style="color:var(--text-muted);font-weight:400;">Not provided</em>' ?></span>
            </div>
            <div class="info-row">
              <span class="info-label">Joined</span>
              <span class="info-value"><?= date('d M Y', strtotime($user['created_at'])) ?></span>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-6 mb-4">
        <div class="rs-card h-100">
          <div class="rs-card-header"><i class="fa-solid fa-heart-pulse"></i> Donor Status</div>
          <div class="rs-card-body">
            <?php if ($donor): ?>
              <div class="info-row">
                <span class="info-label">Donor Name</span>
                <span class="info-value"><?= htmlspecialchars($donor['donor_name']) ?></span>
              </div>
              <div class="info-row">
                <span class="info-label">Blood Group</span>
                <span class="info-value" style="color:var(--primary);font-size:16px;font-weight:800;"><?= htmlspecialchars($donor['blood_group']) ?></span>
              </div>
              <div class="info-row">
                <span class="info-label">Age</span>
                <span class="info-value"><?= htmlspecialchars($donor['donor_age']) ?> yrs</span>
              </div>
              <div class="info-row">
                <span class="info-label">Gender</span>
                <span class="info-value"><?= htmlspecialchars($donor['donor_gender']) ?></span>
              </div>
              <div class="info-row">
                <span class="info-label">Mobile</span>
                <span class="info-value"><?= htmlspecialchars($donor['donor_number']) ?></span>
              </div>
              <div class="info-row">
                <span class="info-label">Address</span>
                <span class="info-value"><?= htmlspecialchars($donor['donor_address']) ?></span>
              </div>
            <?php else: ?>
              <div class="text-center py-4">
                <div style="font-size: 48px; color: var(--border); margin-bottom: 16px;"><i class="fa-solid fa-stethoscope"></i></div>
                <h4 style="font-size: 16px; color: var(--dark-mid); margin-bottom: 8px;">Not Registered as Donor</h4>
                <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 24px;">Your donation could save up to 3 lives.</p>
                <a href="donate_blood.php" class="btn btn-primary">Become a Donor</a>
              </div>
            <?php endif; ?>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="rs-card mb-4">
      <div class="rs-card-header"><i class="fa-solid fa-bolt"></i> Quick Actions</div>
      <div class="rs-card-body" style="display:flex; flex-wrap:wrap; gap:12px;">
        <a href="donate_blood.php" class="btn btn-primary"><i class="fa-solid fa-droplet"></i> Register as Donor</a>
        <a href="need_blood.php" class="btn btn-outline"><i class="fa-solid fa-magnifying-glass"></i> Search for Blood</a>
        <a href="contact_us.php" class="btn btn-secondary"><i class="fa-solid fa-envelope"></i> Contact Us</a>
      </div>
    </div>

  </div>
</div>
<?php include('footer.php'); ?>
