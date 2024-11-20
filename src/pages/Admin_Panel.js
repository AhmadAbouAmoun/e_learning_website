import {useEffect} from "react";
import classes from "../styles/tableDesgin.module.css";
import Table from "../components/Table";

const AdminPanel = () => {
    return (
        <main className={classes.dataPanel}>
            <h1>Data Panel</h1>
            <Table type="Students" />
            <Table type="Teachers" />
            <button> Create Teacher </button>
            <Table type="Courses" />
        </main>
    );
};

export default AdminPanel;
