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
                                <button>Delete</button>
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
                                <button>{user.banned ? "Unban" : "Ban"}</button>
                            </td>
                            <td>
                                <button>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
};

export default Table;
