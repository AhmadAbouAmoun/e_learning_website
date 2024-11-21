import {useState} from "react";
import classes from "../styles/tableDesgin.module.css";
import Table from "../components/Table";

const AdminPanel = () => {
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showCreateCourseForm, setShowCreateCourseForm] = useState(false);

    const [teacherData, setTeacherData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [courseData, setCourseData] = useState({
        name: "",
        teacher_id: "",
    });

    const handleTeacherInputChange = (e) => {
        const {name, value} = e.target;
        setTeacherData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCourseInputChange = (e) => {
        const {name, value} = e.target;
        setCourseData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleTeacherFormSubmit = (e) => {
        e.preventDefault();

        fetch("http://localhost/e-learning-website/server/CreateInstructor.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                name: teacherData.name,
                email: teacherData.email,
                password: teacherData.password,
            }),
        })
        .then((response) => response.json())
        .then((result) => {
            if (result.status === "success") {
                alert("Teacher created successfully");
                setShowCreateForm(false);
            } else {
                alert(result.message || "Error creating teacher");
            }
        })
        .catch((error) => {
            console.error("Error creating teacher:", error);
            alert("Error creating teacher");
        });
    };

    return (
        <main className={classes.dataPanel}>
            <h1>Data Panel</h1>
            <Table type="Students" input="student" />

            <Table type="Teachers" input="teacher" />

            <button onClick={() => setShowCreateForm(true)}>Create Teacher</button>

            {showCreateForm && (
                <div className={classes.createForm}>
                    <h2>Create New Teacher</h2>
                    <form onSubmit={handleTeacherFormSubmit}>
                        <div className={classes.formGroup}>
                            <label htmlFor="teacherName">Name</label>
                            <input
                                type="text"
                                id="teacherName"
                                name="name"
                                value={teacherData.name}
                                onChange={handleTeacherInputChange}
                                required
                            />
                        </div>
                        <div className={classes.formGroup}>
                            <label htmlFor="teacherEmail">Email</label>
                            <input
                                type="email"
                                id="teacherEmail"
                                name="email"
                                value={teacherData.email}
                                onChange={handleTeacherInputChange}
                                required
                            />
                        </div>
                        <div className={classes.formGroup}>
                            <label htmlFor="teacherPassword">Password</label>
                            <input
                                type="password"
                                id="teacherPassword"
                                name="password"
                                value={teacherData.password}
                                onChange={handleTeacherInputChange}
                                required
                            />
                        </div>
                        <button type="submit">Create Teacher</button>
                        <button type="button" onClick={() => setShowCreateForm(false)} className={classes.cancelButton}>
                            Cancel
                        </button>
                    </form>
                </div>
            )}

            <Table type="Courses" />
        </main>
    );
};

export default AdminPanel;
