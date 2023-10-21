import { Card, Typography } from "@material-tailwind/react";
import PropTypes from "prop-types";

const TableHead = ({ headers }) => (
    <thead>
        <tr>
            {headers.map((head) => (
                <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                    >
                        {head}
                    </Typography>
                </th>
            ))}
        </tr>
    </thead>
);

const TableRow = ({ data, isLast }) => {
    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

    return (
        <tr>
            {data.map((item, index) => (
                <td key={index} className={`${classes} ${index % 2 === 1 ? 'bg-blue-gray-50/50' : ''}`}>
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className={`font-normal${index === data.length - 1 ? ' font-medium' : ''}`}
                    >
                        {item}
                    </Typography>
                </td>
            ))}
        </tr>
    );
};
const Table = ({ headers, rows, className = "h-full w-full overflow-scroll" }) => {
    return (
        <Card className={className}>
            <table className="w-full min-w-max table-auto text-left">
                <TableHead headers={headers} />
                <tbody>
                    {rows.map((rowData, index) => (
                        <TableRow key={index} data={rowData} isLast={index === rows.length - 1} />
                    ))}
                </tbody>
            </table>
        </Card>
    );
};
Table.propTypes = {
    headers: PropTypes.arrayOf(PropTypes.string).isRequired,
    rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
    className: PropTypes.string,
};
TableHead.propTypes = {
    headers: PropTypes.arrayOf(PropTypes.string).isRequired,
};
TableRow.propTypes = {
    data: PropTypes.arrayOf(PropTypes.string).isRequired,
    isLast: PropTypes.bool.isRequired,
};
export default Table;