import {useState} from "react";

const Invitation = () => {
    const [invitation, setInvitation] = useState([]);
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
