const SelectUser = ({type, setType}) => {
    return (
        <div>
            <select
                value={type}
                onChange={(e) => {
                    setType((type = e.target.value));
                    console.log(type);
                }}
            >
                <option value="student">student</option>
                <option value="teacher">teacher</option>
                <option value="admin">admin</option>
            </select>
        </div>
    );
};
export default SelectUser;
