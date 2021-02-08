<?php
    header('Content-Type: application/json');
	session_start();
    $res = array();

    if( !isset($_POST['functionName']) ) { $res['error'] = 'No function name!'; }

    if( !isset($res['error']) ) {
	
		$servername = 'PMYSQL110.dns-servicio.com';
		$username = 'jmfightersadmin';
		$password = '90iwlA7%';
		$dbname = '8006902_jmfighters';
		$port = 3306;

		$conn = new mysqli($servername, $username, $password, $dbname, $port);
		
		if ($conn->connect_error) {
			die("Connection failed: " . $conn->connect_error);
			$res['error'] = 'DB error connection';
		}else{
			switch($_POST['functionName']) {
				case 'addBooking':
				
				   $sql = "INSERT INTO booking (date, hour, name, dni, class)
					VALUES ('". $_POST["date"]."', '". $_POST["hour"] ."', '". $_POST["name"] ."', '". $_POST["dni"] ."', '". $_POST["className"] ."')";

					if ($conn->query($sql) === TRUE) {
						$res['result'] = 'Clase reservada con exito';
					} else {
						$res['error'] = 'Error al hacer la reserva';
					}
				   break;
				case 'getBookings':
				
					$sql = "SELECT * FROM booking where `date` like '" . $_POST["date"]."' and `class` like '" . $_POST["className"] . "' and `hour` like '" . $_POST["hour"] . "' and `dni` like '" . $_POST["dni"] ."' order by `class`";
					$result = $conn->query($sql);
					if($result->num_rows > 0){
						$res['hasBooking'] = true;
					}else{
						$sql = "SELECT * FROM booking where `date` like '" . $_POST["date"]."' and `class` like '" . $_POST["className"] . "' and `hour` like '" . $_POST["hour"] . "'";
						$result = $conn->query($sql);
						$res['result'] = $result->num_rows;
					}
					break;
				case 'getUserBookingsDay':
				
					$sql = "SELECT * FROM booking where `date` like '" . $_POST["date"]."' and `dni` like '" . $_SESSION["user"]["dni"] . "' order by `hour`";
					$result = $conn->query($sql);
					if($result->num_rows > 0){
						$res['result'] = $result->fetch_all(MYSQLI_ASSOC);
					}else{
						$res['error'] = 'No hay reservas hechas.';
					}					
					break;
				case 'getBookingsDay':
				
					$sql = "SELECT * FROM booking where `date` like '" . $_POST["date"]."' and `hour` like '%" . $_POST["hour"] . "%'";
					$result = $conn->query($sql);

					$res['result'] = $result->fetch_all(MYSQLI_ASSOC);
					$res['sql'] = $sql;
					break;
				case 'cancelBook':
					$sql = "DELETE FROM booking WHERE id=".$_POST['bookingId'];

					$res['removed'] = $conn->query($sql);
					break;
				case 'addClass':
					if(isset($_FILES['logo'])){
						//Get last id
						$sql = "SELECT `id` FROM class order by `id` desc";
						$result = $conn->query($sql);
						$queryResult = $result->fetch_all(MYSQLI_ASSOC);
						$id = $queryResult[0]['id'];

						//set url to save image
						$targetDir = "images/uploads/class/";
						$ext = explode(".", $_FILES["logo"]['name']);
						$arrayId = array($id,1);
						$fileName = array_sum($arrayId) . "." . $ext[count($ext) - 1];
						$targetFilePath = $targetDir . $fileName;

						// Upload file to server
						if(move_uploaded_file($_FILES["logo"]['tmp_name'], $targetFilePath)){
							// Insert image file name into database
							$sql = "INSERT INTO class (name, hours, days, pax, logo)
								VALUES ('". $_POST["className"]."', '". $_POST["hours"] ."', '". $_POST["days"] ."', '". $_POST["paxes"] ."', '". $targetFilePath ."')";

							if ($conn->query($sql) === TRUE) {
								$res['result'] = 'Clase creada con exito';
							} else {
								$res['error'] = 'Error al crear la clase';
							}
						}else{
							$res['error'] = "Sorry, there was an error uploading your file.";
						}

					}else{
						$res['error'] = "Sorry, there was an error uploading your file.";
					}
					
					break;
				case 'editClass':
					if(isset($_FILES['logo'])){
						//set url to save image
						$targetDir = "images/uploads/class/";
						$ext = explode(".", $_FILES["logo"]['name']);
						$fileName = $_POST['id'] . "." . $ext[count($ext) - 1];
						$targetFilePath = $targetDir . $fileName;

						if(move_uploaded_file($_FILES["logo"]['tmp_name'], $targetFilePath)){
							$sql = "UPDATE class SET
								name = '". $_POST["className"]."', 
								hours = '". $_POST["hours"] ."',
								days = '". $_POST["days"] ."',
								pax = '". $_POST["paxes"] ."',
								logo = '". $targetFilePath ."'
								WHERE id = ". $_POST["id"] .";";

							if ($conn->query($sql) === TRUE) {
								$res['result'] = 'Clase editada con exito';
							} else {
								$res['error'] = 'Error al editar la clase con foto';
							}
						}else{
							$res['error'] = "Sorry, there was an error uploading your file.";
						}
					}else{
						$sql = "UPDATE class SET
							name = '". $_POST["className"]."', 
							hours = '". $_POST["hours"] ."',
							days = '". $_POST["days"] ."',
							pax = ". $_POST["paxes"] ."
							WHERE id = ". $_POST["id"] .";";
							$res['sql'] = $sql;
						if ($conn->query($sql) === TRUE) {
							$res['result'] = 'Clase editada con exito';
						} else {
							$res['error'] = 'Error al editar la clase sin foto';
						}
					}
					
					break;
				case 'getClass':				
					$sql = "SELECT * FROM class";
					$result = $conn->query($sql);

					$res['result'] = $result->fetch_all(MYSQLI_ASSOC);
					if(isset($_SESSION['user'])){
						$res['user'] = $_SESSION['user'];
					}else{
						$res['user'] = null;
					}
					break;
				case 'removeClass':
					$sql = "DELETE FROM class WHERE id=".$_POST['classId'];

					$res['removed'] = $conn->query($sql);

					break;				
					$sql = "SELECT * FROM class";
					$result = $conn->query($sql);

					$res['result'] = $result->fetch_all(MYSQLI_ASSOC);
					if(isset($_SESSION['user'])){
						$res['user'] = $_SESSION['user'];
					}else{
						$res['user'] = null;
					}
					break;
				case 'addUser':
					$sql = "SELECT * FROM users where `dni` like '" . $_POST["dni"]."' || `user_name` like '". $_POST["username"] ."'";
					$result = $conn->query($sql);
					if($result->num_rows > 0){
						$res['error'] = 'Ya hay un usuario con ese DNI o nombre de usuario';
						break;
					};

					$sql = "INSERT INTO users (name, password, dni, email, user_name)
					VALUES ('". $_POST["name"]."', '". $_POST["password"] ."', '". $_POST["dni"] ."', '". $_POST["email"] ."', '". $_POST["username"] ."')";

					if ($conn->query($sql) === TRUE) {
						$res['msg'] = 'Usuario registrado con exito';
					} else {
						$res['error'] = 'Error al hacer el registro';
					}
					break;
				case 'getUser':
					$sql = "SELECT * FROM users where `user_name` like '" . $_POST["user"]."' and `password` like '" . $_POST["pass"] . "'";
					$result = $conn->query($sql);
					$res['userExist'] = $result->num_rows > 0;

					if($res['userExist']){
						$user = $result->fetch_all(MYSQLI_ASSOC);
						$_SESSION['user'] = $user[0];
						$res['user']=$_SESSION['user'];
					}
					$res['userOnSession'] =  isset($_SESSION['user']);
					break;
				case 'editUser':
					$sql = "UPDATE users SET name = '".$_POST["name"]."', email = '".$_POST['email']."' WHERE dni like '".$_POST["dni"]."';";
					if ($conn->query($sql) === TRUE) {
						$res['result'] = 'Datos actualizados';
					} else {
						$res['error'] = 'Error';
					}

					$sql = "SELECT * FROM users where `dni` like '" . $_POST["dni"]."';";
					$result = $conn->query($sql);
					if($result->num_rows > 0){
						$user = $result->fetch_all(MYSQLI_ASSOC);
						$_SESSION['user'] = $user[0];
					}
					break;
				case 'changePass':
					$sql = "UPDATE users SET `password` = '".$_POST["pass"]."' WHERE `id` = ".$_POST["id"].";";
					if ($conn->query($sql)) {
						$res['result'] = 'Ok';

						$sql = "SELECT * FROM users where `id` = ". $_POST["id"].";";
						$result = $conn->query($sql);
						if($result->num_rows > 0){
							$user = $result->fetch_all(MYSQLI_ASSOC);
							$_SESSION['user'] = $user[0];
						}
					} else {
						$res['error'] = 'Error';
					}				
					break;
				case 'getUserSession':
					if(isset($_SESSION['user'])){
						$res['user'] = $_SESSION['user'];
					}else{
						$res['user'] = null;
					}
					break;
				case 'signOut':
					$_SESSION['user'] = null;
					$res['sessionClosed'] = true;
					break;
				case 'sendNewPass':
					$sql = "UPDATE users SET `password` = '".$_POST["passEncoded"]."' WHERE `email` = '".$_POST["email"]."'";
					if ($conn->query($sql) === true) {

						$user_sql = "SELECT * FROM users WHERE email = '".$_POST["email"]."';";
						$result = $conn->query($user_sql);
						if($result->num_rows > 0){
							$res['user'] = $result->fetch_all(MYSQLI_ASSOC);
						
							$mensaje = "Hola ".$res['user'][0]['name']."\r\n \r\nSe le ha asignado una nueva contraseña para su cuenta".
							"\r\nUsuario: ".$res['user'][0]['user_name'].
							"\r\nContraseña: ".$_POST['pass'].
							"\r\n \r\nLa contraseña puede cambiarla una vez ha iniciado sesión, dentro de su cuenta.".
							"\r\n \r\nEste mensaje se ha generado automaticamente, no responda a este correo.";

							$mensaje = wordwrap($mensaje, 70, "\r\n");
							
							$headers = "From: no-reply@jmfighters.com";
							mail($res['user'][0]['email'], 'Cambio de contraseña', $mensaje, $headers);
							$res['msg'] = 'Se ha enviado una nueva contraseña a su correo';
						}else{
							$res['error'] = 'Error en el envio del correo';
						}						
					} else {
						$res['error'] = 'Error al cambiar la contraseña';
					}

					break;
				case 'getHours':
					$sql = "SELECT `hour` FROM booking group by `hour`";
					$result = $conn->query($sql);
					$res['hours'] = $result->fetch_all(MYSQLI_ASSOC);

					break;
				case 'addFighter':
					if(isset($_FILES['fighterImage'])){
						//Get last id
						$sql = "SELECT `id` FROM fighters order by `id` desc";
						$result = $conn->query($sql);
						$queryResult = $result->fetch_all(MYSQLI_ASSOC);
						$id = $queryResult[0]['id'];

						//set url to save image
						$targetDir = "images/uploads/fighters/";
						$ext = explode(".", $_FILES["fighterImage"]['name']);
						$arrayId = array($id,1);
						$fileName = array_sum($arrayId) . "." . $ext[count($ext) - 1];
						$targetFilePath = $targetDir . $fileName;

						if(strlen($_POST['description']) > 0){
							$content = preg_replace("/\r\n|\r/", "<br />", $_POST["description"]);
							$description = trim($content);
						}else{
							$description = $_POST["description"];
						}
						
						// Upload file to server
						if(move_uploaded_file($_FILES["fighterImage"]['tmp_name'], $targetFilePath)){
							// Insert image file name into database
							$sql = "INSERT INTO fighters (name, nick, age, weight, win, lose, nul, ko, picture, description)
								VALUES ('". $_POST["name"]."', '". $_POST["nick"] ."', ". $_POST["age"] .",
								". $_POST["weight"] .", ". $_POST["win"] .", ". $_POST["lose"] .", ". $_POST["nul"] .", ". $_POST["ko"] .", '".$targetFilePath."', '" .$description. "')";
							$res['sql'] = $sql;
							if ($conn->query($sql)) {
								$res['result'] = 'Competidor insertado con exito';
							} else {
								$res['error'] = 'Error al insertar el competidor';
								$res['sql'] = $sql;
							}
						}else{
							$res['error'] = "Lo siento, ha ocurrido un error subiendo la imagen.";
						}
					}else{
						$sql = "INSERT INTO fighters (name, nick, age, weight, win, lose, nul, ko, description)
								VALUES ('". $_POST["name"]."', '". $_POST["nick"] ."', ". $_POST["age"] .",
								". $_POST["weight"] .", ". $_POST["win"] .", ". $_POST["lose"] .", ". $_POST["nul"] .", ". $_POST["ko"] .", '" .$_POST['description']. "')";
							
						if ($conn->query($sql)) {
							$res['result'] = 'Competidor insertado con exito';
						} else {
							$res['error'] = 'Error al insertar al Competidor';
								$res['sql'] = $sql;
						}
					}
					break;
				case 'removefighter':
					$sql = "DELETE FROM fighters WHERE id=".$_POST['fighterId'];

					$res['removed'] = $conn->query($sql);

					break;
				case 'getFighters':
					$sql = "SELECT * FROM fighters";
					$result = $conn->query($sql);

					$res['result'] = $result->fetch_all(MYSQLI_ASSOC);
					break;
				default:
				   $res['error'] = 'Not found function '.$_POST['functionName'].'!';
				   break;
			}
		}
		$conn->close();
    }

    echo json_encode($res);

?>

		