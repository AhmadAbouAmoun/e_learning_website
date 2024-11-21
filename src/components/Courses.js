import React, {useEffect, useState} from "react";
import style from "../styles/course.module.css";
const Course = () => {
    console.log(style);
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

    function Enroll(id, name, teacher_id) {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("No token found in localStorage");
            alert("You must be logged in to enroll in a course.");
            return;
        }

        fetch(`http://localhost/e-learning-website/server/EnrollCourse.php`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                course_id: id,
                token: token,
                course_name: name,
                teacher_id,
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
                <div
                    key={course.id}
                    style={{
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        padding: "16px",
                        marginBottom: "12px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: "#f9f9f9",
                    }}
                >
                    <h3 style={{margin: 0}}>{course.name}</h3>
                    <button
                        style={{
                            padding: "8px 16px",
                            backgroundColor: "#007bff",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                        onClick={() => Enroll(course.id, course.name, course.teacher_id)}
                    >
                        Enroll Now
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Course;
