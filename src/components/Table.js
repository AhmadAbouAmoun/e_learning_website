import {useEffect} from "react";
import classes from "../styles/tableDesgin.module.css";

const Table = ({type}) => {
    useEffect(() => {
        fetch(`http://localhost/e-learning-website/server/Get${type}.php`, {method: "GET"})
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        });
    }, []);
    return type === "Courses" ? (
        <section className={classes.dataTable}>
            <h2>Courses</h2>
            <table>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>id</th>
                        <th>Teacher's id</th>
                        <th>Delete</th>
                    </tr>
                </thead>
            </table>
        </section>
    ) : (
        <section className={classes.dataTable}>
            <h2>{type}</h2>
            <table>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>id</th>
                        <th>email</th>
                        <th>banned</th>
                        <th>Ban</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </section>
    );
};
export default Table;
