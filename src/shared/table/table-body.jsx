import React from 'react'
import _ from 'lodash';
const TableBody = (props) => {
    const { data, columns } = props;
    const renderCell = (item, column) => {
        const { path, content } = column;
        if (content) return content(item);
        else {
            return _.get(item, path);
        }
    }
    return (
        <tbody>
            {
                data.map((item, index) =>
                    <tr key={item.key || index}>
                        {columns.map((column) => <td key={column.path || column.key}>{renderCell(item, column)}</td>)}
                    </tr>
                )
            }
        </tbody>
    );
}

export default TableBody;