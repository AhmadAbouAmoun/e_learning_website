import {useState} from "react";

const Assignments = ({course_id}) => {
    const [assignments, setAssignments] = useState([]);
    const [newAssignment, setNewAssignment] = useState({title: "", description: ""});
    const [file, setFile] = useState(null);
    const token = localStorage.getItem("token");

    const createAssignment = (title, description, course_id, token) => {
        fetch("http://localhost/e-learning-website/server/CreateAssignment.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: {
                title: title,
                description: description,
                course_id: course_id,
                token,
            },
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === "success") {
                console.log("Assignment created successfully:", data.message);
            } else {
                console.error("Error creating assignment:", data.message);
                alert("Failed to create assignment: " + data.message);
            }
        })
        .catch((error) => {
            console.error("Fetch error:", error);
            alert("An error occurred while creating the assignment.");
        });
    };

    const handleFileUpload = (e, assignmentId) => {
        if (!file) {
            alert("Please select a file before turning in.");
            return;
        }
        alert(`Turned in assignment ${assignmentId} with file: ${file.name}`);
        setFile(null);
    };

    const handlePublish = () => {
        if (!token) {
            alert("You must be logged in to publish assignments.");
            return;
        }
        if (!newAssignment.title || !newAssignment.description) {
            alert("Please provide both a title and description for the assignment.");
            return;
        }
        createAssignment(newAssignment.title, newAssignment.description, course_id, token);
    };

    return (
        <div style={{padding: "20px"}}>
            <h2>Assignments</h2>

            {assignments.length > 0 ? (
                assignments.map((assignment) => (
                    <div
                        key={assignment.id}
                        style={{
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                            padding: "10px",
                            marginBottom: "15px",
                        }}
                    >
                        <h3>{assignment.title}</h3>
                        <p>{assignment.description}</p>
                        <input
                            type="file"
                            onChange={(e) => setFile(e.target.files[0])}
                            style={{marginBottom: "10px"}}
                        />
                        <button onClick={(e) => handleFileUpload(e, assignment.id)}>Turn In</button>
                    </div>
                ))
            ) : (
                <p>No assignments available.</p>
            )}

            <div style={{marginTop: "20px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px"}}>
                <h3>Publish New Assignment</h3>
                <input
                    type="text"
                    placeholder="Assignment Title"
                    value={newAssignment.title}
                    onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})}
                    style={{
                        display: "block",
                        width: "100%",
                        marginBottom: "10px",
                        padding: "8px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                    }}
                />
                <textarea
                    placeholder="Assignment Description"
                    value={newAssignment.description}
                    onChange={(e) => setNewAssignment({...newAssignment, description: e.target.value})}
                    style={{
                        display: "block",
                        width: "100%",
                        marginBottom: "10px",
                        padding: "8px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        height: "80px",
                    }}
                />
                <button onClick={handlePublish} style={{padding: "10px 20px"}}>
                    Publish Assignment
                </button>
            </div>
        </div>
    );
};

export default Assignments;
