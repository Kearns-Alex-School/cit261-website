<?php
$function = $_POST['function'];

$log = array();

switch ($function) {
		/* GET STATE FUNCTION */
	case ('getState'):

		$file = $_POST['group'];

		if (file_exists($file . '.txt')) {
			$lines = file($file . '.txt');
    }
    else {
      $log['state'] = 0;
      $log['test'] = 'does not exist';
      break;
    }

		$log['state'] = count($lines);
	break;

		/* UPDATE FUNCTION */
	case ('update'):
		$state = $_POST['state'];
		$file = $_POST['group'];

		if (file_exists($file . '.txt')) {
			$lines = file($file . '.txt');
    }
    else {
      $log['state'] = 0;
      $log['text'] = false;
      $log['test'] = 'does not exist';
      break;
    }

		$count = count($lines);

		if ($state == $count) {
			$log['state'] = $state;
			$log['text'] = false;
		}
		else {
			$text = array();
			$log['state'] = $state + count($lines) - $state;

			foreach ($lines as $line_num => $line) {
				if ($line_num >= $state) {
					$text[] = $line = str_replace("\n", "", $line);
				}
			}

			$log['text'] = $text;
		}

	break;

		/* SEND FUNCTION */
	case ('send'):
		$file = $_POST['group'].'.txt';
		$message = $_POST['message'];
		$user = $_POST['user'];
		$timestamp = date("D M d 'y h.i A");

		$txtdata = $user . "|" . $message . "|" . $timestamp;

    // add an message to the text
    if (file_exists($file)) {
			fwrite(fopen($file, "a") , $txtdata . "\n");
    }
    else {
      fwrite(fopen($file, "w") , $txtdata . "\n");
      $log['file'] = 'trying to write new file';
    }
    
    fclose($file);
    
    $log['text'] = $txtdata;
    $log['file'] = $file;
	break;
}

echo json_encode($log);
?>