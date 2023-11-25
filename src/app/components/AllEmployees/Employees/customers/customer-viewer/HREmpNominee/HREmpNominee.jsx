import React, { useState, useEffect, useContext } from 'react';
import { Button, Card, Divider, styled, Typography, Snackbar, Alert } from '@mui/material';
import { AddCircleOutline, Edit } from '@mui/icons-material';
import { FlexBetween } from 'app/components/FlexBox';
import { H4, H6 } from 'app/components/Typography';
import HREmpNomineeForm from './HREmpNomineeForm';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { APIbackend } from '../../../../../../../APIbackendurl';


const StyledButton = styled(Button)(({ theme }) => ({
    fontSize: '13px',
    color: theme.palette.text.primary,
    ':hover': { background: 'transparent' },
}));

const StyledKey = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
}));

const StyledValue = styled(Typography)({
    marginLeft: '8px',
});

const NomineeEntry = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    ':hover': {
        backgroundColor: theme.palette.grey[200],
        cursor: 'pointer',
    },
}));

const HREmpNominee = () => {
    const [shouldOpenNomineeForm, setShouldOpenNomineeForm] = useState(false);
    const [postedNominees, setPostedNominees] = useState([]);
    const [editIndex, setEditIndex] = useState(null); // Track the index of the nominee being edited
    const [alertMessage, setAlertMessage] = useState(''); // Alert message to display on success
    const [openAlert, setOpenAlert] = useState(false); // State to control alert visibility
    const { empId } = useParams();
    const { APIbackendURl } = useContext(APIbackend);


    const handleOpenNomineeForm = (index) => {
        setEditIndex(index);
        setShouldOpenNomineeForm(true);
    };

    const handleCloseNomineeForm = () => {
        setEditIndex(null);
        setShouldOpenNomineeForm(false);
    };

    const handleSave = async (nominee) => {
        try {
            if (editIndex !== null) {
                // Update existing nominee
                await axios.post(`${APIbackendURl.basePointUrl}applicationservice/nominee/updateNominee`, {
                    ...nominee,
                    empId: empId,
                });
            } else {
                // Create new nominee
                await axios.post(`${APIbackendURl.basePointUrl}applicationservice/nominee/createNominee`, {
                    ...nominee,
                    empId: empId,
                });
            }


            handleCloseNomineeForm();
            fetchPostedNominees(); // Fetch the updated nominees data after saving
            setAlertMessage('Nominee details saved successfully'); // Set the alert message
            setOpenAlert(true); // Open the alert
        } catch (error) {
            console.error('Error:', error);
            // Handle error condition
            setAlertMessage('Failed to save nominee details'); // Set the alert message
            setOpenAlert(true); // Open the alert
        }
    };

    const fetchPostedNominees = async () => {
        try {
            // Make GET request to retrieve the nominees data from the API
            const response = await axios.post(`${APIbackendURl.basePointUrl}applicationservice/nominee/getNomineeByEmpId?empId=${empId}`);
            console.log(response.data); // Optional: Handle the response from the API

            // Update the state with the fetched nominees data
            setPostedNominees(response.data.empNomineeDetailsModel); // Assuming the nominees data is returned as an array
        } catch (error) {
            console.error('Error:', error);
            // Handle error condition
        }
    };

    const handleEditNominee = (index) => {
        handleOpenNomineeForm(index);
    };

    useEffect(() => {
        fetchPostedNominees(); // Fetch the nominees data when the component mounts
    }, []);

    const handleAlertClose = () => {
        setOpenAlert(false);
    };

    return (
        <Card elevation={3}>
            <div style={{ position: 'relative' }}>
                <StyledButton
                    sx={{ position: 'absolute', top: 0, right: 0, zIndex: 1 }}
                    onClick={() => handleOpenNomineeForm(null)}
                >
                    <AddCircleOutline />
                </StyledButton>
                <H4 sx={{ p: 2 }}>Nominee Details</H4>
                <Divider />
                {postedNominees.length === 0 ? (
                    <p>No nominee details available</p>
                ) : (
                    <H6>
                        {postedNominees.map((nominee, index) => (
                            <NomineeEntry key={index} onClick={() => handleEditNominee(index)}>
                                <div>
                                    <StyledKey>Name:</StyledKey>
                                    <StyledKey>Relationship:</StyledKey>
                                    <StyledKey>Age:</StyledKey>
                                    <StyledKey>Address:</StyledKey>
                                </div>
                                <div>
                                    <StyledValue>{nominee.name}</StyledValue>
                                    <StyledValue>{nominee.relationship}</StyledValue>
                                    <StyledValue>{nominee.age}</StyledValue>
                                    <StyledValue>
                                        {`${nominee.doorNumber}, ${nominee.buildingName}, ${nominee.street}, ${nominee.location}, ${nominee.city}, ${nominee.district}, ${nominee.state}, ${nominee.country}, ${nominee.pincode}`}
                                    </StyledValue>
                                </div>
                                <Edit />
                            </NomineeEntry>
                        ))}
                    </H6>
                )}
                {shouldOpenNomineeForm && (
                    <HREmpNomineeForm
                        open={shouldOpenNomineeForm}
                        onClose={handleCloseNomineeForm}
                        onSave={handleSave}
                        nominee={editIndex !== null ? postedNominees[editIndex] : null} // Pass the nominee object to be edited
                    />
                )}
            </div>
            {/* Alert component */}
            <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleAlertClose} anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert onClose={handleAlertClose} severity="success">
                    {alertMessage}
                </Alert>
            </Snackbar>
        </Card>
    );
};

export default HREmpNominee;
