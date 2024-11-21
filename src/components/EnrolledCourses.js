import React, {useEffect, useState} from "react";
import style from "../styles/course.module.css";
import {Outlet, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import CourseInfo from "../pages/CourseInfo";

const EnrolledCourses = () => {
    const [courses, setCourses] = useState([]);
    const location = useLocation();
    const isPath = location.pathname.includes("course-info");
    const navigate = useNavigate();
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
            if (Array.isArray(data)) {
                setCourses([...data]);
            } else {
                console.error("Unexpected response format:", data);
            }
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
    }, []);

    return (
        <>
            {!isPath && (
                <div style={{padding: "20px"}}>
                    {courses.map((course) => (
                        <div key={course.course_id} className={style.card}>
                            <h3 style={{margin: 0}}>{course.course_name}</h3>
                            <button
                                className={style.button}
                                onClick={() => navigate(`course-info/${course.course_id}`)}
                            >
                                View
                            </button>
                        </div>
                    ))}
                </div>
            )}
            <Outlet />
        </>
    );
};

export default EnrolledCourses;
