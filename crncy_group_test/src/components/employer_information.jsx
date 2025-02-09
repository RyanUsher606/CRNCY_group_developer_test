import { Table } from "react-bootstrap";
const EmpInformation = ({ searchEmployer, setSearchEmployer, filteredEmployers }) => {
    return (
        <div>
            <h3>Employers</h3>
            <input
                type="text"
                placeholder="Search Employers..."
                value={searchEmployer}
                onChange={(e) => setSearchEmployer(e.target.value)} //Update searchEmployer state on input change
            />

            <Table striped bordered hover variant="dark" className="mx-auto">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Employer</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEmployers.slice(0, 10).map((emp) => ( //maximum of 10 employers
                        <tr key={emp.id}>
                            <td>{emp.id}</td>
                            <td>{emp.item}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default EmpInformation