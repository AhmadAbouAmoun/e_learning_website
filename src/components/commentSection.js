import {useEffect, useState} from "react";

const CommentSection = ({id}) => {
    const [pub, setPub] = useState();
    const [pri, setPri] = useState();
    const [pubComments, setPubComments] = useState([]);
    const [priComments, setPriComments] = useState([]);
    const [flag, setFlag] = useState(true);
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetch(`http://localhost/e-learning-website/server/GetPublicComments.php`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                course_id: id,
                token,
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            if (Array.isArray(data)) {
                setPubComments((pubComments) => (pubComments = data));
            }
        })
        .catch((error) => {
            console.error("Error posting comment:", error);
        });
    }, []);

    useEffect(() => {
        fetch("http://localhost/e-learning-website/server/GetPrivateComments.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                course_id: id,
                token: localStorage.getItem("token"),
            }),
        })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error("Error:", error));
    }, []);

    function CreateComment(type, comment) {
        fetch(`http://localhost/e-learning-website/server/SendComments.php`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                course_id: id,
                token,
                type,
                comment,
            }),
        })
        .then((response) => response.json())
        .then((data) => {})
        .catch((error) => {
            console.error("Error posting comment:", error);
        });
    }
    return (
        <div style={{width: "20%", padding: "20px", borderRight: "2px solid #ccc", backgroundColor: "#f9f9f9"}}>
            <h3>Comments</h3>
            <h3>Public Comments</h3>

            <div>
                <textarea
                    placeholder="Add a public comment"
                    style={{width: "100%", marginBottom: "10px", height: "80px"}}
                    onChange={(e) => {
                        setPub(e.target.value);
                    }}
                />
                <button style={{width: "100%"}} onClick={() => CreateComment("public", pub)}>
                    Post Public Comment
                </button>
                <div style={{marginTop: "20px"}}>
                    {pubComments.map((comment) => (
                        <p>
                            student number {comment.student_id}:{comment.comment}
                        </p>
                    ))}
                </div>
            </div>
            <h3>Private Comments</h3>
            <div>
                <textarea
                    placeholder="Add a private comment"
                    style={{width: "100%", marginBottom: "10px", height: "80px"}}
                    onChange={(e) => {
                        setPri(e.target.value);
                    }}
                />
                <button style={{width: "100%"}} onClick={() => CreateComment("private", pri)}>
                    Post Private Comment
                </button>
                <div style={{marginTop: "20px"}}>
                    <p></p>
                </div>
            </div>
        </div>
    );
};
export default CommentSection;
