import {useParams} from "react-router-dom";

const CourseInfo = () => {
    const {courseId} = useParams();
    return <h1>HELLO</h1>;
};
export default CourseInfo;
