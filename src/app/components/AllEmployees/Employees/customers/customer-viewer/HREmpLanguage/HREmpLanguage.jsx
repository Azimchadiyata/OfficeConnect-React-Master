import React, { useState, useEffect, useContext } from 'react';
import { Button, Card, Divider, styled, Typography, Snackbar, Alert } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';
import { FlexBetween } from 'app/components/FlexBox';
import { H4, H6 } from 'app/components/Typography';
import HREmpLanguageForm from './HREmpLanguageForm';
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

const LanguageEntry = styled('div')(({ theme }) => ({
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    ':hover': {
        backgroundColor: theme.palette.grey[200],
        cursor: 'pointer',
    },
}));

const HREmpLanguage = () => {
    const [shouldOpenLanguageForm, setShouldOpenLanguageForm] = useState(false);
    const [languageDetails, setLanguageDetails] = useState([]);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');
    const { empId } = useParams();
    const { APIbackendURl } = useContext(APIbackend);


    const handleOpenLanguageForm = () => {
        setShouldOpenLanguageForm(true);
    };

    const handleCloseLanguageForm = () => {
        setShouldOpenLanguageForm(false);
    };

    const handleSave = async (language) => {
        try {
            const readValue = JSON.parse(language.read);
            const speakValue = JSON.parse(language.speak);
            const writeValue = JSON.parse(language.write);

            const response = await axios.post(
                `${APIbackendURl.basePointUrl}employeeservice/language/createLanguage`,
                {
                    empId: empId,
                    langId: 0,
                    language: language.language,
                    read: readValue,
                    speak: speakValue,
                    write: writeValue,
                }
            );

            setAlertMessage('Language details saved successfully.');
            setAlertSeverity('success');
            handleAlertOpen();

            handleCloseLanguageForm();
            fetchLanguageDetails();
        } catch (error) {
            console.error('Error:', error);
            setAlertMessage('Error saving language details.');
            setAlertSeverity('error');
            handleAlertOpen();
        }
    };

    const handleUpdate = async (language) => {
        try {
            const readValue = JSON.parse(language.read);
            const speakValue = JSON.parse(language.speak);
            const writeValue = JSON.parse(language.write);

            const response = await axios.post(
                `${APIbackendURl.basePointUrl}employeeservice/language/updateLanguage`,
                {
                    empId: empId,
                    langId: language.langId,
                    language: language.language,
                    read: readValue,
                    speak: speakValue,
                    write: writeValue,
                }
            );

            setAlertMessage('Language details updated successfully.');
            setAlertSeverity('success');
            handleAlertOpen();

            fetchLanguageDetails();
        } catch (error) {
            console.error('Error:', error);
            setAlertMessage('Error updating language details.');
            setAlertSeverity('error');
            handleAlertOpen();
        }
    };

    const fetchLanguageDetails = async () => {
        try {
            const response = await axios.post(
                `${APIbackendURl.basePointUrl}employeeservice/language/getLanguageByEmpId?empId=${empId}`
            );

            setLanguageDetails(response.data.empLanguageModel || []);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            fetchLanguageDetails();
        }
    }, []);

    const handleAlertOpen = () => {
        setAlertOpen(true);
    };

    const handleAlertClose = () => {
        setAlertOpen(false);
    };

    return (
        <Card elevation={3}>
            <div style={{ position: 'relative' }}>
                <StyledButton
                    sx={{ position: 'absolute', top: 0, right: 0, zIndex: 1 }}
                    onClick={handleOpenLanguageForm}
                >
                    <AddCircleOutline />
                </StyledButton>
                <H4 sx={{ p: 2 }}>Language Details</H4>
                <Divider />
                {languageDetails.length === 0 ? (
                    <p>No language details available</p>
                ) : (
                    <H6>
                        {languageDetails.map((language, index) => (
                            <LanguageEntry key={index}>
                                <FlexBetween>
                                    <div>
                                        <StyledKey>Language:</StyledKey>
                                        <StyledValue>{language.language}</StyledValue>
                                    </div>
                                    <div>
                                        <StyledKey>Read:</StyledKey>
                                        <StyledValue>{language.read ? 'Yes' : 'No'}</StyledValue>
                                    </div>
                                    <div>
                                        <StyledKey>Write:</StyledKey>
                                        <StyledValue>{language.write ? 'Yes' : 'No'}</StyledValue>
                                    </div>
                                    <div>
                                        <StyledKey>Speak:</StyledKey>
                                        <StyledValue>{language.speak ? 'Yes' : 'No'}</StyledValue>
                                    </div>
                                </FlexBetween>
                            </LanguageEntry>
                        ))}
                    </H6>
                )}
                {shouldOpenLanguageForm && (
                    <HREmpLanguageForm
                        open={shouldOpenLanguageForm}
                        onClose={handleCloseLanguageForm}
                        onSave={handleSave}
                        onUpdate={handleUpdate}
                    />
                )}
            </div>
            <Snackbar
                open={alertOpen}
                autoHideDuration={5000}
                onClose={handleAlertClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleAlertClose} severity={alertSeverity} sx={{ width: '100%' }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </Card>
    );
};

export default HREmpLanguage;
