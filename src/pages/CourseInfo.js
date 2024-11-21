import {useState} from "react";
import {useParams} from "react-router-dom";

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
        </div>
    );
};
export default CourseInfo;
