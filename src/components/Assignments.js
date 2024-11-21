import {useState} from "react";

const Assignments = ({id}) => {
    const [assignments, setAssignments] = useState([
        {id: 1, title: "Assignment 1", description: "Description of Assignment 1"},
        {id: 2, title: "Assignment 2", description: "Description of Assignment 2"},
    ]);
    const [newAssignment, setNewAssignment] = useState({title: "", description: ""});
    const [file, setFile] = useState(null);

    const handleFileUpload = (e, assignmentId) => {
        alert(`Turned in assignment ${assignmentId} with file: ${file.name}`);
    };

    const handlePublish = () => {
        const newAssignmentData = {
            id: assignments.length + 1,
            title: newAssignment.title,
            description: newAssignment.description,
        };
        setAssignments([...assignments, newAssignmentData]);
        setNewAssignment({title: "", description: ""});
        alert(`Published new assignment: ${newAssignment.title}`);
    };

    return (
        <div style={{padding: "20px"}}>
            <h2>Assignments</h2>
            {assignments.length > 0 ? (
                assignments.map((assignment) => (
                    <div key={assignment.id} style={{marginBottom: "10px"}}>
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

            <div style={{marginTop: "20px"}}>
                <h3>Publish New Assignment</h3>
                <input
                    type="text"
                    placeholder="Assignment Title"
                    value={newAssignment.title}
                    onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})}
                    style={{display: "block", marginBottom: "10px"}}
                />
                <textarea
                    placeholder="Assignment Description"
                    value={newAssignment.description}
                    onChange={(e) => setNewAssignment({...newAssignment, description: e.target.value})}
                    style={{display: "block", marginBottom: "10px"}}
                />
                <button onClick={handlePublish}>Publish Assignment</button>
            </div>
        </div>
    );
};

export default Assignments;
