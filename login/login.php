<?php 
	session_start();
	
	if (isset($_POST["student"])) {
		//admin user info
		$user = crypt("hdstudent", 'mtl');
		$password = crypt("terpderp", 'mtl');


		/** 
		 * TODO 
		 * Link this to the calendar framework
		 *
		 *
		 * SIDE NOTE: need to figure out how to make the cancel button in the authentication window
		 * return back to the welcome page. 
		 */
		if(isset($_SERVER['PHP_AUTH_USER']) && isset($_SERVER['PHP_AUTH_PW']) &&
		   crypt(trim($_SERVER['PHP_AUTH_USER']), 'mtl') == $user && crypt(trim($_SERVER['PHP_AUTH_PW']),'mtl') == $password){
			header("Location: calendar.php");
		} else {
			header("WWW-Authenticate: Basic realm=\"Scheduler\"");
			header("HTTP/1.0 401 Unauthorized");
			exit;
		}
	} else if (isset($_POST["admin"])) {
		//admin user info
		$user = crypt("admin123", 'mtl');
		$password = crypt("qwerty", 'mtl');


		/** 
		 * TODO 
		 * create admin pages with their extra functions. 
		 * Extra functions include...
		 * Display calendar
		 * ...?
		 *
		 *
		 * SIDE NOTE: need to figure out how to make the cancel button in the authentication window
		 * return back to the welcome page. 
		 */
		if(isset($_SERVER['PHP_AUTH_USER']) && isset($_SERVER['PHP_AUTH_PW']) &&
		   crypt(trim($_SERVER['PHP_AUTH_USER']), 'mtl') == $user && crypt(trim($_SERVER['PHP_AUTH_PW']),'mtl') == $password){
			header("Location: admin.php");
		} else {
			header("WWW-Authenticate: Basic realm=\"Scheduler\"");
			header("HTTP/1.0 401 Unauthorized");
			exit;
		}
	} 
?>