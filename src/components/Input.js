const Input = ({value, input, setInput}) => {
    return (
        <div className="input_container">
            <label className="input_label" for="email_field">
                {value}
            </label>
            <input
                placeholder={value}
                title="Inpit title"
                name="input-name"
                type="text"
                className="input_field"
                required
                onChange={(e) => {
                    setInput((input = e.target.value));
                }}
            />
        </div>
    );
};

export default Input;
