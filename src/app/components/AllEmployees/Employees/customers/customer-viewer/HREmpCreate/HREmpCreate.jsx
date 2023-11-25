

import React, { useState, useEffect, useContext } from 'react';
import {
    Button,
    Card,
    Divider,
    styled,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';
import { FlexBetween } from 'app/components/FlexBox';
import { H4, H6 } from 'app/components/Typography';
import HREmpCreatingFormm from './HREmpCreatingFormm';
import { APIbackend } from '../../../../../../../APIbackendurl';


const StyledButton = styled(Button)(({ theme }) => ({
    fontSize: '13px',
    color: theme.palette.text.primary,
    ':hover': { background: 'transparent' },
}));

const HREmpCreate = () => {
    const [shouldOpenCreatingForm, setShouldOpenCreatingForm] = useState(false);
    const [employeeDetails, setEmployeeDetails] = useState([]);
    const { APIbackendURl } = useContext(APIbackend);

    const handleOpenCreatingForm = () => {
        setShouldOpenCreatingForm(true);
    };

    const handleCloseCreatingForm = () => {
        setShouldOpenCreatingForm(false);
    };

    const handleSave = (employee) => {
        setEmployeeDetails((prevEmployeeDetails) => [...prevEmployeeDetails, employee]);
        handleCloseCreatingForm();
    };

    const handleDelete = (index) => {
        setEmployeeDetails((prevEmployeeDetails) => {
            const updatedDetails = [...prevEmployeeDetails];
            updatedDetails.splice(index, 1);
            return updatedDetails;
        });
    };

    useEffect(() => {
        const fetchEmployeeDetails = async () => {
            try {
                const response = await fetch(`${APIbackendURl.basePointUrl}employeeservice/employeeDetails/allEmployeeDetails`, {
                    method: 'POST',
                });
                if (response.ok) {
                    const data = await response.json();
                    setEmployeeDetails(Array.isArray(data) ? data : []);
                } else {
                    console.log('Failed to fetch employee details');
                }
            } catch (error) {
                console.log('Error:', error);
            }
        };

        fetchEmployeeDetails();
    }, []);

    return (
        <Card elevation={3}>
            <div style={{ position: 'relative' }}>
                <StyledButton
                    sx={{ position: 'absolute', top: 0, right: 0, zIndex: 1 }}
                    onClick={handleOpenCreatingForm}
                >
                    <AddCircleOutline />
                </StyledButton>
                <H4 sx={{ p: 2 }}>Employee Creation</H4>
                <Divider />
                {/* <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow> */}
                {/* <TableCell>Employee ID</TableCell> */}
                {/* <TableCell>Employee Name</TableCell> */}
                {/* <TableCell> Department </TableCell> */}
                {/* <TableCell>Date of Joining</TableCell>
                                <TableCell>Experience</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {employeeDetails.map((employee, index) => (
                                <TableRow key={index}>
                                    <TableCell>{employee.firstName}</TableCell>
                                    <TableCell>{employee.joiningDate}</TableCell>
                                    <TableCell>{employee.totalExperience}</TableCell> */}
                {/* Add more table cells for other fields */}
                {/* <TableCell>
                                        <Button variant="outlined" onClick={() => handleDelete(index)}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer> */}
            </div>

            <HREmpCreatingFormm
                open={shouldOpenCreatingForm}
                onClose={handleCloseCreatingForm}
                onSave={handleSave}
            />
        </Card>
    );
};

export default HREmpCreate;
