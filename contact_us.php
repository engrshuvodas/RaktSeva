<?php 
$active ='contact';
include('head.php'); 
?>

<div class="page-wrapper">
  <div class="container">

    <div class="page-hero" style="border-radius: var(--radius-lg); margin-bottom: 30px; padding: 40px 30px; background: linear-gradient(135deg, var(--dark) 0%, var(--dark-mid) 100%);">
      <h1><i class="fa-solid fa-headset mr-2"></i> Contact Us</h1>
      <p>Have questions? We'd love to hear from you. Send us a message.</p>
    </div>

    <?php
    if (isset($_POST["send"])) {
        $name    = $_POST['fullname'];
        $number  = $_POST['contactno'];
        $email   = $_POST['email'];
        $message = $_POST['message'];
        
        include 'conn.php';
        $sql = "insert into contact_query (query_name,query_mail,query_number,query_message) values('{$name}','{$number}','{$email}','{$message}')";
        $result = mysqli_query($conn, $sql) or die("query unsuccessful.");
        echo '<div class="alert alert-success mb-4"><i class="fa-solid fa-circle-check"></i> Query Sent! We will contact you shortly.</div>';
    }
    ?>

    <div class="row mb-section">
      <div class="col-lg-8 mb-4">
        <div class="rs-card h-100">
          <div class="rs-card-header"><i class="fa-solid fa-paper-plane"></i> Send us a Message</div>
          <div class="rs-card-body">
            <form name="sentMessage" method="post">
                <div class="form-group mb-3">
                    <label class="form-label">Full Name <span>*</span></label>
                    <input type="text" class="form-control" name="fullname" required>
                </div>
                <div class="form-group mb-3">
                    <label class="form-label">Phone Number <span>*</span></label>
                    <input type="tel" class="form-control" name="contactno" required>
                </div>
                <div class="form-group mb-3">
                    <label class="form-label">Email Address <span>*</span></label>
                    <input type="email" class="form-control" name="email" required>
                </div>
                <div class="form-group mb-4">
                    <label class="form-label">Message <span>*</span></label>
                    <textarea class="form-control" name="message" required maxlength="999" style="min-height: 150px;"></textarea>
                </div>
                <button type="submit" name="send" class="btn btn-primary px-4"><i class="fa-solid fa-paper-plane mr-2"></i> Send Message</button>
            </form>
          </div>
        </div>
      </div>
      
      <div class="col-lg-4 mb-4">
        <div class="rs-card h-100">
          <div class="rs-card-header"><i class="fa-solid fa-address-book"></i> Contact Details</div>
          <div class="rs-card-body" style="font-size: 15px;">
            <?php
              include 'conn.php';
              $sql = "select * from contact_info";
              $result = mysqli_query($conn, $sql);
              if (mysqli_num_rows($result) > 0) {
                  while ($row = mysqli_fetch_assoc($result)) { 
            ?>
            
            <div class="mb-4">
              <h4 style="font-size: 13px; text-transform: uppercase; color: var(--text-muted); font-weight: 700; margin-bottom: 6px;"><i class="fa-solid fa-location-dot mr-1"></i> Address</h4>
              <div><?= htmlspecialchars($row['contact_address']); ?></div>
            </div>
            
            <div class="mb-4">
              <h4 style="font-size: 13px; text-transform: uppercase; color: var(--text-muted); font-weight: 700; margin-bottom: 6px;"><i class="fa-solid fa-phone mr-1"></i> Contact Number</h4>
              <div><?= htmlspecialchars($row['contact_phone']); ?></div>
            </div>
            
            <div class="mb-4">
              <h4 style="font-size: 13px; text-transform: uppercase; color: var(--text-muted); font-weight: 700; margin-bottom: 6px;"><i class="fa-solid fa-envelope mr-1"></i> Email</h4>
              <a href="mailto:<?= htmlspecialchars($row['contact_mail']); ?>"><?= htmlspecialchars($row['contact_mail']); ?></a>
            </div>
            
            <?php 
                  }
              } 
            ?>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>

<?php include 'footer.php'; ?>
