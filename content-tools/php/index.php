<?php
    // function disponible on PHP site to remove archives of a folder
    function unlinkRecursive($dir, $deleteRootToo) 
    { 
        if(!$dh = @opendir($dir)) 
        { 
            return; 
        } 
        while (false !== ($obj = readdir($dh))) 
        { 
            if($obj == '.' || $obj == '..') 
            { 
                continue; 
            } 
    
            if (!@unlink($dir . '/' . $obj)) 
            { 
                unlinkRecursive($dir.'/'.$obj, true); 
            } 
        } 
        closedir($dh); 
        if ($deleteRootToo) 
        { 
            @rmdir($dir); 
        } 
        return; 
    } 
?>

<?php
    // allow browser
    header('Access-Control-Allow-Origin: *');
    
    // mysql connection
    // SHOULD BE CHANGED!
    // When in production, remove this informations from line and insert with security
    $mysqli = new mysqli("localhost", "root", "", "appshopi_app");
    if($mysqli->connect_errno)
        echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
    
    // if receive update method
    if(isset($_POST['update'])){
        
        // get data sent by html
        if(isset($_POST['linkUrl'])) $linkUrl = $_POST['linkUrl'];
        else $linkUrl = '';
        if(isset($_POST['title'])) $title = $_POST['title'];
        else $title = '';
        if(isset($_POST['paragraph'])) $paragraph = $_POST['paragraph'];
        else $paragraph = '';
        if(isset($_POST['videoUrl'])) $videoUrl = $_POST['videoUrl'];
        else $videoUrl = '';
        
        // if photo was sent, then we have to save on the folder first
        if(isset($_FILES['image'])){

            // get photo sent by html
            $image = $_FILES['image'];    

            // verify if extension is accepted
            if(preg_match("/^image\/(pjpeg|jpeg|png|gif|bmp)$/", $image["type"])){

                // get image extension
                preg_match("/\.(gif|bmp|png|jpg|jpeg){1}$/i", $image["name"], $ext);

                // gen a new name based on the time to avoid replaces
                $image_name = md5(uniqid(time())) . "." . $ext[1];

                // set folder path
                // CAN BE CHANGED!
                $image_path = "./../images/" . $image_name;

                // upload image to folder
                move_uploaded_file($image["tmp_name"], $image_path);       
            }else {
                echo "Error: invalid extension!";
            }
        }
        // default image in case of error
        else $image_name = "author-pic.jpg";

        // insert the values into database and verify success
        // in case of success, all tmp images are deleted
        // otherwise, an error message will appear
        if(
            $mysqli->query(
                "INSERT INTO pages
                (
                    link_url,
                    title,
                    paragraph,
                    video_url,
                    image_url
                )
                VALUES
                (
                    '".$linkUrl."',
                    '".$title."',
                    '".$paragraph."',
                    '".$videoUrl."',
                    '".$image_name ."'
                )"
            )
        )
        unlinkRecursive('../images/tmp', false);
        else echo "Insert failed: (" . $mysqli->errno . ") " . $mysqli->error;
    }
?>