<?php
    // allow browser
    header('Access-Control-Allow-Origin: *');
    
    // mysql connection
    // SHOULD BE CHANGED!
    // When in production, remove this informations from line and insert with security
    $mysqli = new mysqli("localhost", "root", "", "appshopi_app");
    if($mysqli->connect_errno)
        echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
    
    // if receive image
    if(isset($_FILES['imagePreview'])){
        // get photo sent by html
        $image = $_FILES['imagePreview'];

        // verify if extension is accepted
        if(preg_match("/^image\/(pjpeg|jpeg|png|gif|bmp)$/", $image["type"])){

            // get image extension
            preg_match("/\.(gif|bmp|png|jpg|jpeg){1}$/i", $image["name"], $ext);

            // gen a new name based on the time to avoid replaces
            $image_name = md5(uniqid(time())) . "." . $ext[1];

            // set folder path
            // CAN BE CHANGED!
            $image_path = "./../images/tmp/" . $image_name;

            // upload image to folder
            move_uploaded_file($image["tmp_name"], $image_path);  
            
            // send the name back to frontend
            echo ('__TMP'.$image_name);
        }else {
            echo "Error: invalid extension!";
        }
    }
?>