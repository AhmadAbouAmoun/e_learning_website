import React, {useEffect, useState} from "react";
import style from "../styles/course.module.css";

const EnrolledCourses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetch(`http://localhost/e-learning-website/server/GetEnrolled.php`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                token: localStorage.getItem("token"),
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (Array.isArray(data)) {
                setCourses(data);
            } else {
                console.error("Unexpected response format:", data);
            }
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
    }, []);

    return (
        <div style={{padding: "20px"}}>
            {courses.map((course) => (
                <div key={course.id} className={style.card}>
                    <h3 style={{margin: 0}}>{course.name}</h3>
                    <button className={style.button}>View</button>
                </div>
            ))}
        </div>
    );
};

export default EnrolledCourses;
