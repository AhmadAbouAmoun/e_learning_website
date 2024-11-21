const CommentSection = () => {
    return (
        <div style={{width: "20%", padding: "20px", borderRight: "2px solid #ccc", backgroundColor: "#f9f9f9"}}>
            <h3>Comments</h3>
            <h4>Public Comments</h4>
            <div>
                <textarea
                    placeholder="Add a public comment"
                    style={{width: "100%", marginBottom: "10px", height: "80px"}}
                />
                <button style={{width: "100%"}}>Post Public Comment</button>
                <div style={{marginTop: "20px"}}>
                    <p>
                        <strong>John:</strong> Hello world
                    </p>
                </div>
            </div>
        </div>
    );
};
export default CommentSection;
