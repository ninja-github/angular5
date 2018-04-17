<?php
  header('Access-Control-Allow-Origin:*');
 header("Access-Control-Allow-Credentials: true");
 header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
 header('Access-Control-Max-Age: 1000');
 header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "";

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
//print_r($request);exit;
// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = "Delete From countrymaster where CountryId = ".$_GET['id'];

if (mysqli_query($conn, $sql)) {
    echo "message: Country is Deleted!";
} 
else {
    echo "error: ".mysqli_error($conn);
}

mysqli_close($conn);

?>