import classes from "../styles/tableDesgin.module.css";

const AdminPanel = () => {
    // fetch("http://localhost/e-learning-website/server/GetUsers.php", {method: "POST", body: {type: "student"}})
    // .then((response) => response.json())
    // .then((data) => {
    //     console.log(data);
    // });
    return (
        <main className={classes.dataPanel}>
            <h1>Data Panel</h1>

            <section className={classes.dataTable}>
                <h2>Students</h2>
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

            <section className={classes.dataTable}>
                <h2>Teachers</h2>
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
                </table>
            </section>
        </main>
    );
};

export default AdminPanel;
