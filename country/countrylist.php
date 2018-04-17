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

$sql = "select * from `countrymaster`";
$result = mysqli_query($conn, $sql);

$r=array();
if (mysqli_num_rows($result) > 0) {
    // output data of each row
    while($row = mysqli_fetch_assoc($result)) {
        //echo "id: " . $row["id"]. " - Name: " . $row["firstname"]. " " . $row["lastname"]. "<br>";
        array_push($r,$row);
    }
    echo json_encode($r);
} else {
    echo json_encode(array("error"=>"no data found!"));
}

mysqli_close($conn);

?>