import {useState} from "react";
import Courses from "../components/Courses";
import "../styles/navbar.css";
const HomePage = () => {
    const [page, setPage] = useState("Courses");
    return (
        <div>
            <nav className="navbar">
                <h3>Website Name</h3>

                <ul>
                    <li
                        onClick={() => {
                            setPage("Courses");
                        }}
                    >
                        Courses{" "}
                    </li>
                    <li
                        onClick={() => {
                            setPage("Enrolled");
                        }}
                    >
                        Enrolled Courses
                    </li>
                    <li
                        onClick={() => {
                            setPage("Invitations");
                        }}
                    >
                        Invitations
                    </li>
                </ul>

                <span>Welcome</span>
            </nav>
            {page === "Courses" && <Courses />}
        </div>
    );
};
export default HomePage;
