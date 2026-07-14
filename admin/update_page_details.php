<?php
session_start();
include 'conn.php';
include 'session.php';
if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
    header("Location: login.php");
    exit;
}

$msg = '';
$page_type = isset($_GET['type']) ? $_GET['type'] : '';

// Handle update submission
if (isset($_POST['submit']) && $page_type) {
    $data = mysqli_real_escape_string($conn, $_POST['data']);
    $sql  = "UPDATE pages SET page_data='$data' WHERE page_type='$page_type'";
    mysqli_query($conn, $sql) or die("query unsuccessful.");
    $msg = '<div class="alert alert-success"><i class="fa-solid fa-check"></i> Page Data Updated Successfully.</div>';
}

// Map type to page label
$type_labels = [
    'aboutus'      => 'About Us',
    'donor'        => 'Why Donate Blood',
    'needforblood' => 'The Need For Blood',
    'bloodtips'    => 'Blood Tips',
    'whoyouhelp'   => 'Who You Could Help',
    'bloodgroups'  => 'Blood Groups',
    'universal'    => 'Universal Donors & Recipients',
];
$page_label = isset($type_labels[$page_type]) ? $type_labels[$page_type] : $page_type;

// Fetch existing content
$existing = '';
if ($page_type) {
    $res = mysqli_query($conn, "SELECT page_data FROM pages WHERE page_type='$page_type'");
    if ($res && mysqli_num_rows($res) > 0) {
        $row = mysqli_fetch_assoc($res);
        $existing = $row['page_data'];
    }
}

$page_title = "Update Page";
$active = "pages";
include 'header.php';
include 'sidebar.php';
?>

<div class="admin-main">
  <div class="admin-content">
    <div class="page-header">
      <h1>Update Page Content</h1>
      <p>Editing: <strong><?= htmlspecialchars($page_label) ?></strong></p>
    </div>

    <div class="admin-card" style="max-width: 900px;">
      <div class="admin-card-header">
        <h3><i class="fa-solid fa-pen-to-square"></i> Page Details</h3>
      </div>
      <div class="admin-card-body">
        <?= $msg ?>
        <form name="update_page" method="post">
          <div class="admin-form-group">
            <label class="admin-form-label">Page: <?= htmlspecialchars($page_label) ?></label>
            <textarea id="area4" name="data" class="admin-form-control" rows="12"><?= htmlspecialchars($existing) ?></textarea>
          </div>
          <div class="mt-2 d-flex" style="gap:10px;">
            <button class="btn-admin-primary" name="submit" type="submit">
              <i class="fa-solid fa-floppy-disk"></i> Update
            </button>
            <a href="pages.php" class="btn-admin-secondary">
              <i class="fa-solid fa-arrow-left"></i> Back to Pages
            </a>
          </div>
        </form>

        <!-- NicEdit rich text editor -->
        <script type="text/javascript" src="nicEdit.js"></script>
        <script type="text/javascript">
          bkLib.onDomLoaded(function() {
            new nicEditor({fullPanel: true}).panelInstance('area4');
          });
        </script>
      </div>
    </div>

  </div>
</div>

</body>
</html>
