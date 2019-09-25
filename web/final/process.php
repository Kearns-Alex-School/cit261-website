<?php
// grab what function we are passing in
$function = $_POST['function'];

// use this to pass back any info to the caller as a JSON
$log = array();

switch ($function) {
		/* UPDATE FUNCTION */
  case ('update'):
    // grab out current lines so we do not double update
    $currentLines = $_POST['lines'];
    
    // create out file string
		$file = 'chats/' . $_POST['file'] . '.txt';

    // check to see if the file exists
		if (file_exists($file)) {
			$fileLines = file($file);
    }
    else {
      // send nothing back 
      $log['lines'] = 0;
      $log['text'] = false;
      break;
    }

    // get the number of lines in the file
		$count = count($fileLines);

    // check to see if we already up to date
		if ($currentLines == $count) {
      // send nothing back
			$log['lines'] = $currentLines;
      $log['text'] = false;
      break;
    }
    
    // create our array of lines to add to the chatbox
    $text = array();
    
    // grab all lines that are greater that what we already have
    foreach ($fileLines as $line_num => $line) {
      if ($currentLines <= $line_num) {
        $text[] = $line;
      }
    }

    $log['lines'] = $count;
    $log['text']  = $text;
	  break;

		/* SEND FUNCTION */
  case ('send'):
    // set up all of our variables
		$file      = 'chats/' . $_POST['file'] . '.txt';
		$message   = $_POST['message'];
		$user      = $_POST['user'];
		$timestamp = date("D M d 'y h.i A");

    // create our string for the file
		$txtdata   = $user . "|" . $message . "|" . $timestamp;

    // check to see if the file exists
    if (file_exists($file)) {
      // add to the file
			fwrite(fopen($file, "a") , $txtdata . "\n");
    }
    else {
      // create a new file
      fwrite(fopen($file, "w") , $txtdata . "\n");
    }
    
    fclose($file);
    
    $log['text'] = $txtdata;
    $log['file'] = $file;
	break;
}

// send back our JSON array
echo json_encode($log);
?>