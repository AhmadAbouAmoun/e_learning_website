import {useEffect, useState} from "react";

const Announcments = ({id}) => {
    const [ann, setAnn] = useState([]);

    useEffect(() => {
        fetch(`http://localhost/e-learning-website/server/DisplayAnn.php`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                course_id: id,
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            setAnn(data);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
    }, []);
    return;
};
export default Announcments;
