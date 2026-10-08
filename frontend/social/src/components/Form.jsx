function Form({
    title,
    fields,
    form,
    setForm,
    onSubmit,
    editId
}) {

    return (
        <form className="form" onSubmit={onSubmit}>

            <h3>{title}</h3>

            {fields.map((field) => (

                <input
                    key={field}
                    name={field}
                    placeholder={field}
                    value={form[field] || ""}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            [field]: e.target.value
                        })
                    }
                />

            ))}

            <button type="submit">
                {editId ? "Update" : "Add"}
            </button>

        </form>
    );
}

export default Form;