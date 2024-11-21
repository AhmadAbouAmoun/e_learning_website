import {useState} from "react";
import Courses from "../components/Courses";
import "../styles/navbar.css";
import EnrolledCourses from "../components/EnrolledCourses";
import {Route, Routes, useNavigate} from "react-router-dom";
import CourseInfo from "./CourseInfo";
const HomePage = () => {
    const navigate = useNavigate();
    return (
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
                    <li onClick={() => {}}>Invitations</li>
                </ul>

                <span>Welcome</span>
            </nav>
            <Routes>
                <Route path="Courses" element={<Courses />} />
                <Route path="Enrolled/*" element={<EnrolledCourses />}>
                    <Route path="course-info/:id" element={<CourseInfo />} />
                </Route>
            </Routes>
        </div>
    );
};
export default HomePage;
