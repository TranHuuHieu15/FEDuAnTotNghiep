import { Card, Typography } from "@material-tailwind/react";
import PropTypes from "prop-types";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";

const TableHead = ({ headers }) => (
  <thead>
    <tr>
      {headers.map((head) => (
        <th
          key={head}
          className="p-4 border-b border-blue-gray-100 bg-blue-gray-50"
        >
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
  const navigate = useNavigate();
  const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

  return (
    <tr>
      {data.map((item) => (
        <td
          key={item.id}
          className={`${classes} ${
            item.id % 2 === 1 ? "bg-blue-gray-50/50" : ""
          }`}
        >
          <Typography
            variant="small"
            color="blue-gray"
            className={`font-normal${
              item.id === data.length - 1 ? " font-medium" : ""
            }`}
          >
            {item}
          </Typography>
        </td>
      ))}
      <td>
        <Button onClick={() => navigate(`/admin/updateBrand?id${data.id}`)}>
          Edit
        </Button>
      </td>
    </tr>
  );
};
const Table = ({
  headers,
  rows,
  className = "w-full h-full overflow-scroll",
}) => {
  return (
    <Card className={className}>
      <table className="w-full text-left table-auto min-w-max">
        <TableHead headers={headers} />
        <tbody>
          {rows.map((rowData) => (
            <TableRow
              key={rowData.id}
              data={rowData}
              isLast={rowData.id === rows.length - 1}
            />
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
