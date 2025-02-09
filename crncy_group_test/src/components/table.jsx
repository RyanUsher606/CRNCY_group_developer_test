import { useState, useEffect } from "react";
import { Container, Row, Col, Pagination } from "react-bootstrap";
import EmpInformation from "./employer_information";
import JobInformation from "./job_information";

export default function Display_Table() {
    //Initializing variables for storing data and pagination state.
    const [data, setData] = useState(null);
    const [searchEmployer, setSearchEmployer] = useState("");
    const [searchJobTitle, setSearchJobTitle] = useState("");

    const [currentPageEmp, setCurrentPageEmp] = useState(1);
    const [currentPageJob, setCurrentPageJob] = useState(1);
    const resultsPerPage = 10;

    // Function to fetch data from the API
    const fetchData = async () => {
        try {
            // Fetch data from the API endpoint
            const res = await fetch('https://auto-pay-api-sgiognjnfa-uc.a.run.app/auto-pay/get-ui-params', {
                method: 'GET'
            });

            // Parse response as JSON
            const results = await res.json();
            setData(results);

        } catch (err) {
            // Log any errors
            console.error(err);
        }
    };

    // Fetch data
    useEffect(() => {
        fetchData();
    }, []);

    // Reset employer pagination when the employer search input changes
    useEffect(() => {
        setCurrentPageEmp(1);
    }, [searchEmployer]);

    // Reset job title pagination when the job title search input changes
    useEffect(() => {
        setCurrentPageJob(1);
    }, [searchJobTitle]);


    // Filter employers based on search input
    const filteredEmployers = data?.employers.filter((emp) =>
        emp.item.toLowerCase().includes(searchEmployer.toLowerCase()) || emp.id.toString().includes(searchEmployer)
    );

    // Filter job titles based on search input
    const filteredJobTitles = data?.jobTitles.filter((job) =>
        job.item.toLowerCase().includes(searchJobTitle.toLowerCase()) || job.id.toString().includes(searchJobTitle)
    );

    // Calculate the total number of pages for employer results
    const totalPagesEmp = filteredEmployers ? Math.ceil(filteredEmployers.length / resultsPerPage) : 1;

    // Calculate the total number of pages for job title results
    const totalPagesJob = filteredJobTitles ? Math.ceil(filteredJobTitles.length / resultsPerPage) : 1;

    // Get current page data for employers
    const currentEmployerData = filteredEmployers?.slice(
        (currentPageEmp - 1) * resultsPerPage,
        currentPageEmp * resultsPerPage
    );

    // Get current page data for job titles
    const currentJobTitleData = filteredJobTitles?.slice(
        (currentPageJob - 1) * resultsPerPage,
        currentPageJob * resultsPerPage
    );

    //updates the current employer page when a pagination is clicked
    const handleEmpPageClick = (pageNumber) => {
        setCurrentPageEmp(pageNumber);
    };

    //update the current job title page when a pagination is clicked
    const handleJobPageClick = (pageNumber) => {
        setCurrentPageJob(pageNumber);
    };

    // Function to determine the range of pagination numbers displayed
    const getPaginationRange = (currentPage, totalPages) => {
        const maxPagesToShow = 5; // Limit pagination to 5 pages at a time, can be increased or decreased.

        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));

        let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        // Adjusts startPage if not enough pages to show full range
        if (endPage - startPage < maxPagesToShow - 1) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }

        return { startPage, endPage };
    };

    const { startPage: startPageEmp, endPage: endPageEmp } = getPaginationRange(currentPageEmp, totalPagesEmp);

    const { startPage: startPageJob, endPage: endPageJob } = getPaginationRange(currentPageJob, totalPagesJob);

    return (
        <Container fluid>
            {!data ? ( //Ternary Operator to show loading incase data is being loaded into variables and show tables otherwise 
                <p>Loading...</p>
            ) : (
                <Row>
                    <Col>
                        <EmpInformation
                            searchEmployer={searchEmployer}
                            setSearchEmployer={setSearchEmployer}
                            filteredEmployers={currentEmployerData}
                        />
                        {filteredEmployers && filteredEmployers.length > 0 && ( //pagination only if there are employer results
                            <Pagination>
                                <Pagination.Prev
                                    onClick={() => handleEmpPageClick(currentPageEmp - 1)}
                                    disabled={currentPageEmp === 1}
                                />
                                {[...Array(endPageEmp - startPageEmp + 1)].map((_, idx) => ( //Dynamically generate pagination buttons
                                    <Pagination.Item
                                        key={startPageEmp + idx}
                                        active={startPageEmp + idx === currentPageEmp}
                                        onClick={() => handleEmpPageClick(startPageEmp + idx)}
                                    >
                                        {startPageEmp + idx}
                                    </Pagination.Item>
                                ))}
                                <Pagination.Next
                                    onClick={() => handleEmpPageClick(currentPageEmp + 1)}
                                    disabled={currentPageEmp === totalPagesEmp}
                                />
                            </Pagination>
                        )}
                    </Col>

                    <Col>
                        <JobInformation
                            searchJobTitle={searchJobTitle}
                            setSearchJobTitle={setSearchJobTitle}
                            filteredJobTitles={currentJobTitleData}
                        />
                        {filteredJobTitles && filteredJobTitles.length > 0 && ( //pagination only if there are job title results
                            <Pagination>
                                <Pagination.Prev
                                    onClick={() => handleJobPageClick(currentPageJob - 1)}
                                    disabled={currentPageJob === 1}
                                />
                                {[...Array(endPageJob - startPageJob + 1)].map((_, idx) => ( //Dynamically generate pagination buttons
                                    <Pagination.Item
                                        key={startPageJob + idx}
                                        active={startPageJob + idx === currentPageJob}
                                        onClick={() => handleJobPageClick(startPageJob + idx)}
                                    >
                                        {startPageJob + idx}
                                    </Pagination.Item>
                                ))}
                                <Pagination.Next
                                    onClick={() => handleJobPageClick(currentPageJob + 1)}
                                    disabled={currentPageJob === totalPagesJob}
                                />
                            </Pagination>
                        )}
                    </Col>
                </Row>
            )}
        </Container>
    );
}
