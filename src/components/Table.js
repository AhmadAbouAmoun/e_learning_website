import {useEffect, useState} from "react";
import classes from "../styles/tableDesgin.module.css";

const Table = ({type, input}) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`http://localhost/e-learning-website/server/Get${type}.php`, {method: "GET"})
        .then((response) => response.json())
        .then((data) => {
            setData(data);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
    }, [type]);
    ////////
    const banUser = (id) => {
        fetch(`http://localhost/e-learning-website/server/BanningSystem.php`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id,
                type: input,
            }),
        })
        .then((response) => response.json())
        .then((result) => {
            if (result.message) {
                alert("User banned successfully");
                setData((prevData) => prevData.map((item) => (item.id === id ? {...item, banned: true} : item)));
            } else if (result.error) {
                alert(result.error);
            }
        })
        .catch((error) => {
            console.error("Error banning user:", error);
        });
    };
    ///////
    const deleteCourse = (id) => {
        fetch(`http://localhost/e-learning-website/server/DeleteCourse.php`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: id,
        })
        .then((response) => response.json())
        .then((result) => {
            if (result.message) {
                alert(result.message);
                setData((prevData) => prevData.filter((course) => course.id !== id));
            } else if (result.status === "failed") {
                alert(result.message);
            }
        })
        .catch((error) => {
            console.error("Error deleting course:", error);
        });
    };
    //////////
    const deleteUser = (id) => {
        fetch(`http://localhost/e-learning-website/server/DeletingUser.php`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id,
                type: input,
            }),
        })
        .then((response) => response.json())
        .then((result) => {
            if (result.message) {
                alert(result.message);
                setData((prevData) => prevData.filter((item) => item.id !== id)); // Remove the deleted user from the UI
            } else if (result.error) {
                alert(result.error);
            }
        })
        .catch((error) => {
            console.error("Error deleting user:", error);
        });
    };

    return type === "Courses" ? (
        <section className={classes.dataTable}>
            <h2>Courses</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>ID</th>
                        <th>Teacher's ID</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((course) => (
                        <tr key={course.id}>
                            <td>{course.name}</td>
                            <td>{course.id}</td>
                            <td>{course.teacher_id}</td>
                            <td onClick={() => deleteCourse(course.id)}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    stroke="#c40808"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <path d="M18 6 6 18" />
                                    <path d="m6 6 12 12" />
                                </svg>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    ) : (
        <section className={classes.dataTable}>
            <h2>{type}</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Banned</th>
                        <th>Ban</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.id}</td>
                            <td>{user.email}</td>
                            <td>{user.banned ? "Yes" : "No"}</td>
                            <td onClick={() => banUser(user.id)} disabled={user.banned}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#c40808"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="lucide lucide-ban"
                                >
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="m4.9 4.9 14.2 14.2" />
                                </svg>
                            </td>
                            <td onClick={() => deleteUser(user.id)}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    stroke="#c40808"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <path d="M18 6 6 18" />
                                    <path d="m6 6 12 12" />
                                </svg>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
};

export default Table;
