<?php 
$active ='about';
include('head.php');
?>


<div id="page-container" style="margin-top:50px; position: relative;min-height: 84vh;">
  <div class="container">
  <div id="content-wrap" style="padding-bottom:50px;">
<div class="row">
    <div class="col-lg-6">
        <h1 class="mt-4 mb-3">About Us</h1>
        <p> <?php
          include 'conn.php';
          $sql=$sql= "select * from pages where page_type='aboutus'";
          $result=mysqli_query($conn,$sql);
          if(mysqli_num_rows($result)>0)   {
              while($row = mysqli_fetch_assoc($result)) {
                echo $row['page_data'];
              }
            }

         ?>
      </p>

    </div>
    <div class="col-lg-6">
        <img class="img-fluid rounded" src="image\banner_590x300.jpg" style="height:400px" alt="error"  >
    </div>
</div>
</div></div>

<?php include('footer.php')
?>
</div>
</body>

</html>
