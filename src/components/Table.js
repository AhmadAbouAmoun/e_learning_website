import {useEffect, useState} from "react";
import classes from "../styles/tableDesgin.module.css";

const Table = ({type}) => {
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
    const banUser = (id) => {
        fetch(`http://localhost/e-learning-website/server/banUser.php`, {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": " http://localhost:3000",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id,
                type,
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
    const deleteCourse = (id) => {
        fetch(`http://localhost/e-learning-website/server/deleteCourse.php`, {
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
    const deleteUser = (id, type) => {
        fetch(`http://localhost/e-learning-website/server/deleteUser.php`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id,
                type,
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
                            <td>
                                <button onClick={() => deleteCourse(course.id)}>Delete</button>
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
                            <td>
                                <button onClick={() => banUser()} disabled={user.banned}>
                                    {user.banned ? "Unban" : "Ban"}
                                </button>
                            </td>
                            <td>
                                <button onClick={() => deleteUser(user.id, type)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
};

export default Table;
