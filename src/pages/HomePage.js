import {useState} from "react";
import Courses from "../components/Courses";
import Invitation from "../components/Invitation";

import "../styles/navbar.css";
import EnrolledCourses from "../components/EnrolledCourses";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import CourseInfo from "./CourseInfo";
const HomePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isPath = location.pathname.includes("course-info");

    return (
        <>
            {!isPath && (
                <div>
                    <nav className="navbar">
                        <h3>Website Name</h3>

                        <ul>
                            <li
                                onClick={() => {
                                    navigate("Courses");
                                }}
                            >
                                Courses{" "}
                            </li>
                            <li
                                onClick={() => {
                                    navigate("Enrolled");
                                }}
                            >
                                Enrolled Courses
                            </li>
                            <li
                                onClick={() => {
                                    navigate("Invitation");
                                }}
                            >
                                Invitations
                            </li>
                        </ul>

                        <span>Welcome</span>
                    </nav>
                </div>
            )}
            <Routes>
                <Route path="Courses" element={<Courses />} />
                <Route path="Enrolled/*" element={<EnrolledCourses />}>
                    <Route path="course-info/:id" element={<CourseInfo />} />
                </Route>
                <Route path="Invitation" element={<Invitation />} />
            </Routes>
        </>
    );
};
export default HomePage;
