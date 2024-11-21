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
    let i = 0;
    return (
        <div style={{padding: "20px"}}>
            {ann.map((element) => (
                <div
                    key={i}
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
                    <h3 style={{margin: 0}}>Announcment: {element.announcment}</h3>
                </div>
            ))}
        </div>
    );
};
export default Announcments;
