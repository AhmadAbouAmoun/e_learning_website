import {useState} from "react";
import {useParams} from "react-router-dom";
import Announcments from "../components/Announcments";
import Assignments from "../components/Assignments";
import CommentSection from "../components/commentSection";

const CourseInfo = () => {
    const {id} = useParams();
    const [path, setPath] = useState("Announcments");
    console.log(path);

    return (
        <div style={{display: "flex", justifyContent: "space-between", maxWidth: "1200px", margin: "0 auto"}}>
            <CommentSection id={id} />
            <div style={{width: "75%", padding: "20px"}}>
                <nav className="navbar">
                    <h3>Website Name</h3>

                    <ul>
                        <li onClick={() => setPath("Announcements")}>Announcements</li>
                        <li onClick={() => setPath("Assignments")}>Assignments</li>
                    </ul>

                    <span>Welcome</span>
                </nav>

                {path === "Announcements" && <Announcments id={id} />}
                {path === "Assignments" && <Assignments id={id} />}
            </div>
        </div>
    );
};
export default CourseInfo;
