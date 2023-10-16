import { Card } from "@material-tailwind/react";
import propTypes from "prop-types";
const Table = ({ className, children }) => {
    return (
        <div>
            <Card className={className}>
                <table className={className}>
                    <thead>
                        <tr>
                            {children}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {children}
                        </tr>
                    </tbody>
                </table>
            </Card>
        </div>
    );
};
Table.propTypes = {
    children: propTypes.element,
    className: propTypes.string,
};
export default Table;