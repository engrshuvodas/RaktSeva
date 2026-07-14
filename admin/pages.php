<?php
session_start();
include 'conn.php';
include 'session.php';
if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
    header("Location: login.php");
    exit;
}
$page_title = "Manage Pages";
$active = "pages";
include 'header.php';
include 'sidebar.php';
?>

<div class="admin-main">
  <div class="admin-content">
    <div class="page-header">
      <h1>Manage Page Data</h1>
      <p>Edit the content displayed on the public website pages.</p>
    </div>

    <div class="admin-card">
      <div class="admin-card-header">
        <h3><i class="fa-solid fa-file-lines"></i> Website Pages</h3>
      </div>
      <div class="table-responsive">
        <table class="admin-table">
          <thead>
            <tr>
              <th>S.no</th>
              <th>Page Name</th>
              <th>Page Type</th>
              <th>Content Preview</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <?php
            $limit = 10;
            $pg = isset($_GET['page']) ? (int)$_GET['page'] : 1;
            $offset = ($pg - 1) * $limit;
            $cnt = $offset + 1;

            $sql = "SELECT * FROM pages LIMIT {$offset},{$limit}";
            $result = mysqli_query($conn, $sql);

            if (mysqli_num_rows($result) > 0) {
                while ($row = mysqli_fetch_assoc($result)) {
            ?>
            <tr>
              <td><?= $cnt++ ?></td>
              <td style="font-weight:600;"><?= htmlspecialchars($row['page_name']) ?></td>
              <td><span style="background:var(--bg);border:1px solid var(--border);padding:2px 8px;border-radius:4px;font-size:12px;"><?= htmlspecialchars($row['page_type']) ?></span></td>
              <td><div style="max-width:300px;font-size:13px;color:var(--text-muted);overflow:hidden;max-height:60px;"><?= strip_tags($row['page_data']) ?></div></td>
              <td>
                <a class="btn-admin-edit" href="update_page_details.php?type=<?= $row['page_type'] ?>">
                  <i class="fa-solid fa-pen-to-square"></i> Edit
                </a>
              </td>
            </tr>
            <?php
                }
            } else {
                echo '<tr><td colspan="5" style="text-align:center;padding:32px;color:var(--text-muted);">No pages found.</td></tr>';
            }
            ?>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</div>

</body>
</html>
