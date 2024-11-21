import {useState} from "react";
import {useParams} from "react-router-dom";
import Announcments from "../components/Announcments";

const CourseInfo = () => {
    const {id} = useParams();
    const [path, setPath] = useState("Announcments");
    console.log(path);

    return (
        <div>
            <nav className="navbar">
                <h3>Website Name</h3>

                <ul>
                    <li onClick={() => setPath("Announcments")}>Announcments</li>
                    <li onClick={() => setPath("Assignments")}>Assignments</li>
                </ul>

                <span>Welcome</span>
            </nav>
            {path === "Announcments" && <Announcments id={id} />}
        </div>
    );
};
export default CourseInfo;
