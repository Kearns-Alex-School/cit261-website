<?php
/* Add an message to the text. */
$post_user = $_POST['user'];
$post_message = $_POST['message'];
$post_group = $_POST['group'];
$timestamp = date("D M d 'y h.i A")." &raquo; ";

$txtdata = $timestamp."|".$post_user."|".$post_message;

if (!empty($post_user)) {
  $dir = 'content/';
  $filename = $dir.$post_group.'.txt';
  $handle = fopen($filename, "a");
  fwrite($handle, $txtdata."\n");
  fclose($handle);
  echo $file;
}
?>