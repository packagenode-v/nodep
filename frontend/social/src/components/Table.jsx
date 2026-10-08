function Table({
    title,
    data,
    fields,
    onEdit,
    onDelete
}) {

    return (
        <div className="table-box">

            <h3>{title}</h3>

            <table>

                <thead>
                    <tr>

                        {fields.map((field) => (
                            <th key={field}>
                                {field}
                            </th>
                        ))}

                        {(onEdit || onDelete) && (
                            <th>Actions</th>
                        )}

                    </tr>
                </thead>

                <tbody>

                    {data.map((item) => (

                        <tr key={item._id}>

                            {fields.map((field) => (
                                <td key={field}>
                                    {item[field]}
                                </td>
                            ))}

                            {(onEdit || onDelete) && (
                                <td className="actions">

                                    {onEdit && (
                                        <button
                                            className="edit"
                                            onClick={() =>
                                                onEdit(item)
                                            }
                                        >
                                            Edit
                                        </button>
                                    )}

                                    {onDelete && (
                                        <button
                                            className="delete"
                                            onClick={() =>
                                                onDelete(item._id)
                                            }
                                        >
                                            Delete
                                        </button>
                                    )}

                                </td>
                            )}

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default Table;