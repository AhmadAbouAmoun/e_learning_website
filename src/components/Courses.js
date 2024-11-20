import React from "react";

// Mock data for courses
const courses = [
    {id: 1, name: "Course 1"},
    {id: 2, name: "Course 2"},
    {id: 3, name: "Course 3"},
];

const Course = () => {
    // Handler for "Enroll Now" button
    const handleEnroll = (courseId) => {
        console.log(`Enrolled in course with ID: ${courseId}`);
        // You can add your enrollment logic here (API call, etc.)
    };

    return (
        <div style={{padding: "20px"}}>
            {courses.map((course) => (
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
                        onClick={() => handleEnroll(course.id)}
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

export default Course;
