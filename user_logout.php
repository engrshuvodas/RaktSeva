<?php
session_start();
unset($_SESSION['user_loggedin']);
unset($_SESSION['user_id']);
unset($_SESSION['user_name']);
unset($_SESSION['user_email']);
session_destroy();
header("Location: home.php");
exit();
?>
