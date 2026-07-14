<?php
session_start();
include 'conn.php';
include 'session.php';
if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
    header("Location: login.php");
    exit;
}

// Handle mark as read
if (isset($_GET['mark_read'])) {
    $que_id = (int)$_GET['mark_read'];
    mysqli_query($conn, "UPDATE contact_query SET query_status='1' WHERE query_id=$que_id");
    header("Location: query.php");
    exit;
}

$page_title = "User Queries";
$active = "query";
include 'header.php';
include 'sidebar.php';
?>

<div class="admin-main">
  <div class="admin-content">
    <div class="page-header">
      <h1>User Queries</h1>
      <p>Manage all messages sent via the Contact Us form.</p>
    </div>

    <div class="admin-card">
      <div class="admin-card-header">
        <h3><i class="fa-solid fa-clipboard-question"></i> All Queries</h3>
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

            $sql = "SELECT * FROM contact_query LIMIT {$offset},{$limit}";
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
                <?php if ($row['query_status'] == 1): ?>
                  <span class="badge-pill badge-read"><i class="fa-solid fa-check"></i> Read</span>
                <?php else: ?>
                  <a href="query.php?mark_read=<?= $row['query_id'] ?>" class="badge-pill badge-pending" style="text-decoration:none;" onclick="return confirm('Mark as read?');">
                    <i class="fa-solid fa-clock"></i> Pending
                  </a>
                <?php endif; ?>
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
                echo '<tr><td colspan="8" style="text-align:center;padding:32px;color:var(--text-muted);">No queries found.</td></tr>';
            }
            ?>
          </tbody>
        </table>
      </div>
    </div>

    <?php
    $sql1 = "SELECT COUNT(*) as total FROM contact_query";
    $r1 = mysqli_query($conn, $sql1);
    $tot = mysqli_fetch_assoc($r1)['total'];
    $total_page = ceil($tot / $limit);
    if ($total_page > 1) {
        echo '<ul class="pagination justify-content-center">';
        if ($pg > 1) echo '<li class="page-item"><a class="page-link" href="query.php?page='.($pg - 1).'">Prev</a></li>';
        for ($i = 1; $i <= $total_page; $i++) {
            $cls = ($i == $pg) ? 'active' : '';
            echo '<li class="page-item '.$cls.'"><a class="page-link" href="query.php?page='.$i.'">'.$i.'</a></li>';
        }
        if ($total_page > $pg) echo '<li class="page-item"><a class="page-link" href="query.php?page='.($pg + 1).'">Next</a></li>';
        echo '</ul>';
    }
    ?>

  </div>
</div>

</body>
</html>
