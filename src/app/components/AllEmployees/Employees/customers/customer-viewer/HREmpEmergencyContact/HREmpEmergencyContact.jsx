import React, { useState, useEffect, useContext } from 'react';
import { Button, Card, Divider, styled, Typography } from '@mui/material';
import { AddCircleOutline, Edit } from '@mui/icons-material';
import { FlexBetween } from 'app/components/FlexBox';
import { H4, H6 } from 'app/components/Typography';
import HREmpEmergencyContactForm from './HREmpEmergencyContactForm';
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
    // color: theme.palette.primary.main,
}));

const StyledValue = styled(Typography)({
    marginLeft: '8px',
});

const ContactEntry = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    ':hover': {
        backgroundColor: theme.palette.grey[200],
        cursor: 'pointer',
    },
}));

const HREmpEmergencyContact = () => {
    const [shouldOpenContactForm, setShouldOpenContactForm] = useState(false);
    const [contactDetails, setContactDetails] = useState(null);
    const { empId } = useParams();
    const { APIbackendURl } = useContext(APIbackend);


    const handleOpenContactForm = () => {
        setShouldOpenContactForm(true);
    };

    const handleCloseContactForm = () => {
        setShouldOpenContactForm(false);
    };

    const handleEditContact = (contact) => {
        setContactDetails(contact);
        setShouldOpenContactForm(true);
    };

    const handleSave = async (contact) => {
        try {
            const endpoint = contactDetails
                ? `${APIbackendURl.basePointUrl}employeeservice/employeeEmergencyContactDetails/updateEmergencyContactDetails`
                : `${APIbackendURl.basePointUrl}employeeservice//employeeEmergencyContactDetails/createEmployeeEmergencyContactDetails`;

            // Set the empEmgcontactId in the contact object
            contact.empEmgcontactId = contactDetails ? contactDetails.empEmgcontactId : 0;

            // Make POST request to the appropriate API endpoint
            const response = await axios.post(endpoint, {
                ...contact,
                empId: empId,
            });
            console.log(response.data); // Optional: Handle the response from the API

            handleCloseContactForm();
            fetchContactDetails(); // Fetch the updated contact details after saving
        } catch (error) {
            console.error('Error:', error);
            // Handle error condition
        }
    };

    const fetchContactDetails = async () => {
        try {
            // Make GET request to retrieve the contact details from the API
            const response = await axios.post(
                `${APIbackendURl.basePointUrl}employeeservice/employeeEmergencyContactDetails/getEmergencyContactDetailsByEmpId?empId=${empId}`
            );
            console.log(response.data); // Optional: Handle the response from the API

            // Update the state with the fetched contact details
            setContactDetails(response.data?.empEmergencycontactDetailsModel[0]); // Use empty array as default value if data is undefined
        } catch (error) {
            console.error('Error:', error);
            // Handle error condition
        }
    };

    useEffect(() => {
        fetchContactDetails(); // Fetch the contact details when the component mounts
    }, []);

    return (
        <Card elevation={3}>
            <div style={{ position: 'relative' }}>
                <StyledButton
                    sx={{ position: 'absolute', top: 0, right: 0, zIndex: 1 }}
                    onClick={handleOpenContactForm}
                >
                    {contactDetails ? <Edit /> : <AddCircleOutline />}
                </StyledButton>
                <H4 sx={{ p: 2 }}>Emergency Contact</H4>
                <Divider />
                {contactDetails === null ? (
                    <p>No contact details available</p>
                ) : contactDetails ? (
                    <H6>
                        <ContactEntry>
                            <div>
                                <StyledKey>Person Name:</StyledKey>
                                <StyledKey>Relationship:</StyledKey>
                                <StyledKey>Contact Number 1:</StyledKey>
                                <StyledKey>Contact Number 2:</StyledKey>
                            </div>
                            <div>
                                <StyledValue>{contactDetails.name}</StyledValue>
                                <StyledValue>{contactDetails.relationship}</StyledValue>
                                <StyledValue>{contactDetails.mobile1}</StyledValue>
                                <StyledValue>{contactDetails.mobile2}</StyledValue>
                            </div>
                        </ContactEntry>
                    </H6>
                ) : (
                    <p>No bank details available</p>
                )}

                <HREmpEmergencyContactForm
                    open={shouldOpenContactForm}
                    onClose={handleCloseContactForm}
                    onSave={handleSave}
                    contactDetails={contactDetails}
                />
            </div>
        </Card>
    );
};

export default HREmpEmergencyContact;
