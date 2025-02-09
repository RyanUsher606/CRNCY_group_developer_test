import { Table } from "react-bootstrap";

const JobInformation = ({ searchJobTitle, setSearchJobTitle, filteredJobTitles }) => {
    return (
        <div>
            <h3>Job Titles</h3>
            <input
                type="text"
                placeholder="Search Job Titles..."
                value={searchJobTitle}
                onChange={(e) => setSearchJobTitle(e.target.value)} //Update searchJobTitle state on input change
            />

            <Table striped bordered hover variant="dark" className="mx-auto">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Employer</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredJobTitles.slice(0, 10).map((job) => ( //maximum of 10 employers
                        <tr key={job.id}>
                            <td>{job.id}</td>
                            <td>{job.item}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default JobInformation