<?php

include "connection.php";
include "JWT.php";


$input = json_decode(file_get_contents("php://input"), true);
error_log(file_get_contents("php://input"));

if(!isset($input["type"]) || !isset($input["id"])){
    echo $input["type"];
    echo  $input["id"] ;
    return;
    exit;
}
    $id=$input["id"];
    $type=$input["type"];
    //here starts the part related to the deletion of the student

    if($type=="student"){
        $deleteEnroll = $connection->prepare("DELETE  FROM enrolledcourses WHERE student_id = ?");
        $deleteEnroll->bind_param('i', $id);

        if ($deleteEnroll->execute()) {

                $query = $connection->prepare("DELETE  FROM $type WHERE id = ?");
                $query->bind_param('i', $id);
            
                if ($query->execute()) {
                    if($query->affected_rows > 0)
                    {
                        echo json_encode(["message" => "User $id of type $type was deleted successfully with all his related data"]);
                    }
                    else{
                        echo"record does not exist ".$connection->error;
                    }
                } else {
                    echo json_encode(["error" => "Failed to update students status"]);
                }

        }
        else{
            echo"enrolled did not excute";
        }
    }

    //here starts the part related to the deletion of the teacher
    
    else {
    
        $findingCourses = $connection->prepare("SELECT id FROM courses WHERE teacher_id = ?");
        $findingCourses->bind_param('i', $id);
    
        if (!$findingCourses->execute()) {
            $connection->rollback();
            echo json_encode(["error" => "Error fetching courses: " . $connection->error]);
            return;
        }
    
        $courseIds = [];
        $result = $findingCourses->get_result();
        while ($row = $result->fetch_assoc()) {
            $courseIds[] = $row["id"];
        }
    
        foreach ($courseIds as $course_id) {
            $deleteEnroll = $connection->prepare("DELETE FROM enrolledcourses WHERE course_id = ?");
            $deleteEnroll->bind_param('i', $course_id);
    
            if (!$deleteEnroll->execute()) {
                $connection->rollback();
                echo json_encode(["error" => "Error deleting enrolled students for course ID $course_id: " . $connection->error]);
                return;
            }
        }
    
        $deleteCourses = $connection->prepare("DELETE FROM courses WHERE teacher_id = ?");
        $deleteCourses->bind_param('i', $id);
    
        if (!$deleteCourses->execute()) {
            $connection->rollback();
            echo json_encode(["error" => "Error deleting courses taught by teacher ID $id: " . $connection->error]);
            return;
        }
    
        $deleteTeacher = $connection->prepare("DELETE FROM $type WHERE id = ?");
        $deleteTeacher->bind_param('i', $id);
    
        if (!$deleteTeacher->execute()) {
            $connection->rollback();
            echo json_encode(["error" => "Error deleting teacher/user: " . $connection->error]);
            return;
        }
    
        if ($deleteTeacher->affected_rows > 0) {
            $connection->commit();
            echo json_encode(["message" => "User $id of type $type deleted successfully with related data."]);
        } else {
            echo json_encode(["error" => "Record does not exist for user type $type with ID $id."]);
        }
    }