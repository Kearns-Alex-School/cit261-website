<?php
$directory = '../content/';

// only get the .txt files in the directory
$scanned_directory = preg_grep('~\.(txt)$~', scandir($directory));

$fileArr = array();
foreach($scanned_directory as $file) {
	array_push($fileArr, substr($file, 0, (strlen($file) - 4)));
}

echo json_encode($fileArr);
?>