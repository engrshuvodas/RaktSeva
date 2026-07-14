<?php
session_start();
include 'conn.php';
include 'session.php';
if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
    header("Location: login.php");
    exit;
}

if (isset($_GET['mark_read'])) {
    $que_id = (int)$_GET['mark_read'];
    mysqli_query($conn, "UPDATE contact_query SET query_status='1' WHERE query_id=$que_id");
    header("Location: pending_query.php");
    exit;
}

$page_title = "Pending Queries";
$active = "query";
include 'header.php';
include 'sidebar.php';
?>

<div class="admin-main">
  <div class="admin-content">
    <div class="page-header">
      <h1>Pending Queries</h1>
      <p>Queries that have not been marked as read yet.</p>
    </div>

    <div class="admin-card">
      <div class="admin-card-header">
        <h3 style="color:var(--warning);"><i class="fa-solid fa-clock-rotate-left"></i> Pending Queries</h3>
      </div>
      <div class="table-responsive">
        <table class="admin-table">
          <thead>
            <tr>
              <th>S.no</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Message</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <?php
            $limit = 10;
            $pg = isset($_GET['page']) ? (int)$_GET['page'] : 1;
            $offset = ($pg - 1) * $limit;
            $cnt = $offset + 1;

            $sql = "SELECT * FROM contact_query WHERE query_status=2 LIMIT {$offset},{$limit}";
            $result = mysqli_query($conn, $sql);

            if (mysqli_num_rows($result) > 0) {
                while ($row = mysqli_fetch_assoc($result)) {
            ?>
            <tr>
              <td><?= $cnt++ ?></td>
              <td style="font-weight:600;"><?= htmlspecialchars($row['query_name']) ?></td>
              <td><?= htmlspecialchars($row['query_mail']) ?></td>
              <td><?= htmlspecialchars($row['query_number']) ?></td>
              <td><div style="max-width:220px;font-size:13px;"><?= htmlspecialchars($row['query_message']) ?></div></td>
              <td style="font-size:12px;"><?= htmlspecialchars($row['query_date']) ?></td>
              <td>
                <a href="pending_query.php?mark_read=<?= $row['query_id'] ?>" class="badge-pill badge-pending" style="text-decoration:none;" onclick="return confirm('Mark as read?');">
                  <i class="fa-solid fa-clock"></i> Pending
                </a>
              </td>
              <td>
                <a class="btn-admin-danger" href="delete_query.php?id=<?= $row['query_id'] ?>" onclick="return confirm('Delete this query?');">
                  <i class="fa-solid fa-trash"></i> Delete
                </a>
              </td>
            </tr>
            <?php
                }
            } else {
                echo '<tr><td colspan="8" style="text-align:center;padding:32px;color:var(--text-muted);">No pending queries.</td></tr>';
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
