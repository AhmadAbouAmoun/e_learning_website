import React, {useEffect, useState} from "react";
import style from "../styles/course.module.css";
const Course = () => {
    const [courses, setData] = useState([]);
    useEffect(() => {
        fetch(`http://localhost/e-learning-website/server/GetCourses.php`, {method: "GET"})
        .then((response) => response.json())
        .then((data) => {
            setData(data);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
    }, []);

    function Enroll(id) {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("No token found in localStorage");
            alert("You must be logged in to enroll in a course.");
            return;
        }

        fetch(`http://localhost/e-learning-website/server/EnrollCourse.php`, {
            method: "POST",
            headers: {"Content-Type": "application/json"}, // Fixed headers key
            body: JSON.stringify({
                course_id: id, // Ensure body is stringified
                token: token,
            }),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            if (data.status === "success") {
                console.log(data.message);
                alert("Successfully enrolled in the course!");
            } else {
                console.error(data.message);
                alert(`Failed to enroll: ${data.message}`);
            }
        })
        .catch((error) => {
            console.error("Error occurred during enrollment:", error);
            alert("An error occurred. Please try again.");
        });
    }

    return (
        <div style={{padding: "20px"}}>
            {courses.map((course) => (
                <div key={course.id} className={style.card}>
                    <h3 style={{margin: 0}}>{course.name}</h3>
                    <button className={style.button} onClick={() => Enroll(course.id)}>
                        Enroll Now
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Course;
