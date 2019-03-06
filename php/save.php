<?php
$post_data = $_POST['data'];
$post_file = $_POST['file'];
if (!empty($post_data)) {
    $dir = '../content/';
    $filename = $dir.$post_file.'.txt';
    $handle = fopen($filename, "w");
    fwrite($handle, $post_data);
    fclose($handle);
    echo $file;
}
?>