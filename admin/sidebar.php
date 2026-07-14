<!-- SIDEBAR -->
<div class="admin-sidebar" id="adminSidebar">

  <div class="sidebar-section-label">Main Menu</div>
  <div class="sidebar-nav">
    <a href="dashboard.php" class="<?php if(isset($active) && $active=='dashboard') echo 'act'; ?>">
      <i class="fa-solid fa-gauge"></i> Dashboard
    </a>
  </div>

  <div class="sidebar-section-label">Donors</div>
  <div class="sidebar-nav">
    <a href="add_donor.php" class="<?php if(isset($active) && $active=='add') echo 'act'; ?>">
      <i class="fa-solid fa-user-plus"></i> Add Donor
    </a>
    <a href="donor_list.php" class="<?php if(isset($active) && $active=='list') echo 'act'; ?>">
      <i class="fa-solid fa-users"></i> Donor List
    </a>
  </div>

  <div class="sidebar-section-label">Management</div>
  <div class="sidebar-nav">
    <a href="query.php" class="<?php if(isset($active) && $active=='query') echo 'act'; ?>">
      <i class="fa-solid fa-clipboard-question"></i> Contact Queries
    </a>
    <a href="pages.php" class="<?php if(isset($active) && $active=='pages') echo 'act'; ?>">
      <i class="fa-solid fa-file-lines"></i> Manage Pages
    </a>
    <a href="update_contact.php" class="<?php if(isset($active) && $active=='contact') echo 'act'; ?>">
      <i class="fa-solid fa-address-card"></i> Contact Info
    </a>
  </div>

  <div class="sidebar-footer">
    <a href="../home.php" target="_blank">
      <i class="fa-solid fa-arrow-up-right-from-square"></i> View Public Site
    </a>
  </div>
</div>

<script>
  var toggleBtn = document.getElementById('sidebarToggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', function() {
      document.getElementById('adminSidebar').classList.toggle('open');
    });
  }
</script>
