import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
    Button,
    Card,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    styled,
    Icon,
} from "@mui/material";
import shortid from "shortid";
import Breadcrumb from "app/components/Breadcrumb";
import HREmpCreatingFormm from "../../AllEmployees/Employees/customers/customer-viewer/HREmpCreate/HREmpCreatingFormm";
import { APIbackend } from '../../../../APIbackendurl';
import { format } from "date-fns";


const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: {
        margin: "16px",
    },
    "& .breadcrumb": {
        marginBottom: "30px",
        [theme.breakpoints.down("sm")]: {
            marginBottom: "16px",
        },
    },
}));

const ProductTable = styled(Table)(() => ({
    minWidth: 750,
    whiteSpace: "pre",
    "& thead": {
        "& th:first-of-type": {
            paddingLeft: 16,
        },
    },
    "& td": {
        borderBottom: "none",
    },
    "& td:first-of-type": {
        paddingLeft: "16px !important",
    },
}));

const HREmpCrudTable = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [userList, setUserList] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [shouldOpenCreatingForm, setShouldOpenCreatingForm] = useState(false);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
    const { APIbackendURl } = useContext(APIbackend);
    const token = sessionStorage.getItem('token'); // Retrieve the token from session storage

    // Alert state
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertSeverity, setAlertSeverity] = useState("success");
    const [alertMessage, setAlertMessage] = useState("");

    // Function to open the alert
    const handleOpenAlert = (message, severity) => {
        setAlertMessage(message);
        setAlertSeverity(severity);
        setAlertOpen(true);
    };

    // Function to close the alert
    const handleCloseAlert = () => {
        setAlertOpen(false);
    };

    const handleChangePage = (_, newPage) => setPage(newPage);

    const updatePageData = async () => {
        try {
            const response = await axios.get(
                `${APIbackendURl.basePointUrl}applicationservice/Admin/PortalMaster/UserMaster/View`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Format the dates before setting them in the state
            const formattedUserList = response.data.updateEmployeeDetailsByIdModel.map((user) => ({
                ...user,
                joiningDate: format(new Date(user.joiningDate), "dd-MM-yyyy"),
            }));

            setUserList(formattedUserList);
        } catch (error) {
            console.log("Error fetching user data:", error);
        }
    };
    useEffect(() => {
        updatePageData();
    }, []);

    HREmpCrudTable.updatePageData = updatePageData;


    const handleOpenCreatingForm = (employeeId) => {
        setSelectedEmployeeId(employeeId);
        setShouldOpenCreatingForm(true);
    };

    const handleCloseCreatingForm = (employeeId) => {
        setSelectedEmployeeId(employeeId);
        setShouldOpenCreatingForm(false);
    };



    const handleViewEmployee = (employeeId) => {
        navigate(`/employees/emp-profile/${employeeId}`);
    };


    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: "All Employees" }]} />
            </div>

            <Button
                sx={{ mb: 2 }}
                color="primary"
                variant="contained"
                onClick={handleOpenCreatingForm}
            >
                Add New Employee
            </Button>

            <Card sx={{ width: "100%", overflow: "auto" }} elevation={6}>
                <ProductTable>
                    <TableHead>
                        <TableRow>
                            <TableCell>Employee ID</TableCell>
                            <TableCell>Employee Name</TableCell>
                            <TableCell>Department</TableCell>
                            <TableCell>Reporting To</TableCell>
                            <TableCell>Date of Joining</TableCell>
                            <TableCell>Experience</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {userList
                            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((user) => (
                                <TableRow hover key={shortid.generate()}>
                                    <TableCell sx={{ px: 0 }} align="left">
                                        {user.empId}
                                    </TableCell>

                                    <TableCell sx={{ px: 0 }} align="left">
                                        <Link to={`/employees/emp-profile/${user.empId}`}>
                                            {user.firstName} <span style={{ marginRight: "5px" }}>{user.lastName}</span>
                                        </Link>
                                    </TableCell>

                                    <TableCell sx={{ px: 0 }}>{user.deptName}</TableCell>
                                    <TableCell sx={{ px: 0 }} align="left">
                                        <Link to={`/employees/emp-profile/`}> {user.reportingTo}</Link>
                                    </TableCell>

                                    <TableCell sx={{ px: 0 }} align="left">
                                        {user.joiningDate}
                                    </TableCell>

                                    <TableCell sx={{ px: 0 }} align="left">
                                        {user.totalExperience}
                                    </TableCell>

                                    <TableCell sx={{ px: 0 }}>
                                        <Icon
                                            color="primary"
                                            onClick={() => handleViewEmployee(user.empId)}
                                            style={{ cursor: "pointer" }}
                                        >
                                            <Link to={`/employees/emp-profile/${user.empId}`}>visibility</Link>
                                        </Icon>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </ProductTable>

                <TablePagination
                    page={page}
                    sx={{ px: 2 }}
                    component="div"
                    count={userList.length}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handleChangePage}
                    rowsPerPageOptions={[5, 10, 25]}
                    nextIconButtonProps={{ "aria-label": "Next Page" }}
                    backIconButtonProps={{ "aria-label": "Previous Page" }}
                    onRowsPerPageChange={({ target: { value } }) =>
                        setRowsPerPage(value)
                    }
                />

                <HREmpCreatingFormm
                    open={shouldOpenCreatingForm}
                    handleClose={handleCloseCreatingForm}
                    // onSave={handleCloseCreatingForm}
                    onSave={handleOpenAlert} // Pass the alert function


                />
            </Card>
        </Container>
    );
};

export default HREmpCrudTable;
