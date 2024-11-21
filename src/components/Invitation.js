import {useEffect, useState} from "react";

const Invitation = () => {
    const [invitation, setInvitation] = useState([]);
    useEffect(() => {
        fetch(`http://localhost/e-learning-website/server/GetInvitations.php`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                token: localStorage.getItem("token"),
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            if (Array.isArray(data)) {
                setInvitation(data);
            } else {
                console.error("Unexpected response format:", data);
            }
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
    }, []);
    return (
        <div style={{padding: "20px"}}>
            {invitation.map((course) => (
                <div
                    key={course.id}
                    style={{
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        padding: "16px",
                        marginBottom: "12px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: "#f9f9f9",
                    }}
                >
                    <h3 style={{margin: 0}}>{course.name}</h3>
                    <button
                        style={{
                            padding: "8px 16px",
                            backgroundColor: "#007bff",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                    >
                        Enroll Now
                    </button>
                </div>
            ))}
        </div>
    );
};
export default Invitation;
