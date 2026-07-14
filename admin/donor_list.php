<?php
session_start();
include 'conn.php';
include 'session.php';
if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
    header("Location: login.php");
    exit;
}
$page_title = "Donor List";
$active = "list";
include 'header.php';
include 'sidebar.php';
?>

<div class="admin-main">
  <div class="admin-content">
    <div class="page-header">
      <h1>Donor List</h1>
      <p>Manage all registered blood donors in the system.</p>
    </div>

    <?php
    $limit = 10;
    $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
    $offset = ($page - 1) * $limit;
    $count = $offset + 1;

    $sql = "select * from donor_details join blood where donor_details.donor_blood=blood.blood_id LIMIT {$offset},{$limit}";
    $result = mysqli_query($conn, $sql);
    ?>

    <div class="admin-card">
      <div class="admin-card-header">
        <h3><i class="fa-solid fa-users-viewfinder"></i> Registered Donors</h3>
      </div>
      <div class="table-responsive">
        <table class="admin-table">
          <thead>
            <tr>
              <th>S.no</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Blood Group</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <?php
            if (mysqli_num_rows($result) > 0) {
                while ($row = mysqli_fetch_assoc($result)) {
            ?>
            <tr>
              <td><?= $count++ ?></td>
              <td style="font-weight:600;"><?= htmlspecialchars($row['donor_name']) ?></td>
              <td><?= htmlspecialchars($row['donor_number']) ?></td>
              <td><?= htmlspecialchars($row['donor_mail']) ?></td>
              <td><?= htmlspecialchars($row['donor_age']) ?></td>
              <td><?= htmlspecialchars($row['donor_gender']) ?></td>
              <td><span style="background:var(--primary);color:#fff;padding:2px 10px;border-radius:20px;font-size:12px;font-weight:700;"><?= htmlspecialchars($row['blood_group']) ?></span></td>
              <td><div style="max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="<?= htmlspecialchars($row['donor_address']) ?>"><?= htmlspecialchars($row['donor_address']) ?></div></td>
              <td>
                <a class="btn-admin-danger" href="delete.php?id=<?= $row['donor_id'] ?>" onclick="return confirm('Delete this donor?');">
                  <i class="fa-solid fa-trash"></i> Delete
                </a>
              </td>
            </tr>
            <?php
                }
            } else {
                echo '<tr><td colspan="9" style="text-align:center;padding:32px;color:var(--text-muted);">No donors found.</td></tr>';
            }
            ?>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination -->
    <?php
    $sql1 = "SELECT COUNT(*) as total FROM donor_details";
    $result1 = mysqli_query($conn, $sql1);
    $row1 = mysqli_fetch_assoc($result1);
    $total_records = $row1['total'];
    $total_page = ceil($total_records / $limit);

    if ($total_page > 1) {
        echo '<ul class="pagination justify-content-center">';
        if ($page > 1) echo '<li class="page-item"><a class="page-link" href="donor_list.php?page='.($page - 1).'">Prev</a></li>';
        for ($i = 1; $i <= $total_page; $i++) {
            $cls = ($i == $page) ? 'active' : '';
            echo '<li class="page-item '.$cls.'"><a class="page-link" href="donor_list.php?page='.$i.'">'.$i.'</a></li>';
        }
        if ($total_page > $page) echo '<li class="page-item"><a class="page-link" href="donor_list.php?page='.($page + 1).'">Next</a></li>';
        echo '</ul>';
    }
    ?>

  </div>
</div>

</body>
</html>
