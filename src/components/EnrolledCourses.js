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

    //Am truly sorry for using embeded css but the css modules is not working and importing the file is sometimes working sometimes not
    return (
        <>
            {!isPath && (
                <div style={{padding: "20px"}}>
                    {courses.map((course) => (
                        <div
                            key={course.course_id}
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
                            <h3 style={{margin: 0}}>{course.course_name}</h3>
                            <button
                                style={{
                                    padding: "8px 16px",
                                    backgroundColor: "#007bff",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                }}
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
