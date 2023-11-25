//
import React, { useState, useEffect, useContext } from 'react';
import { Button, Card, Divider, styled, Typography, Snackbar, Alert } from '@mui/material';
import { AddCircleOutline, Edit } from '@mui/icons-material';
import { FlexBetween } from 'app/components/FlexBox';
import { H4, H6 } from 'app/components/Typography';
import HREmpExperienceForm from './HREmpExperianceForm';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import Filedownload from '../HREmpEducation/FileDownload'; // Import the FileDownload component
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

const EmployeeExperienceEntry = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    ':hover': {
        backgroundColor: theme.palette.grey[200],
        cursor: 'pointer',
    },
}));

const HREmpExperience = () => {
    const [shouldOpenExperienceForm, setShouldOpenExperienceForm] = useState(false);
    const [postedExperiences, setPostedExperiences] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [alertMessage, setAlertMessage] = useState('');
    const [openAlert, setOpenAlert] = useState(false);
    const [showDetails, setShowDetails] = useState([]);

    const { empId } = useParams();
    const { APIbackendURl } = useContext(APIbackend);


    const handleOpenExperienceForm = (index) => {
        setEditIndex(index);
        setShouldOpenExperienceForm(true);
    };

    const handleCloseExperienceForm = () => {
        setEditIndex(null);
        setShouldOpenExperienceForm(false);
    };

    const handleSaveExperience = async (experience) => {
        try {
            if (editIndex !== null) {
                await axios.post(`${APIbackendURl.basePointUrl}employeeservice/employeeWorkExperience/updateWorkExperienceWithDoc`, {
                    ...experience,
                    empId: empId,
                });
            } else {
                await axios.post(`${APIbackendURl.basePointUrl}employeeservice/employeeWorkExperience/createEmpWorkExperienceAndDoc`, {
                    ...experience,
                    empId: empId,
                });
            }

            handleCloseExperienceForm();
            fetchPostedExperiences();
            setAlertMessage('Experience details saved successfully');
            setOpenAlert(true);
        } catch (error) {
            console.error('Error:', error);
            setAlertMessage('Failed to save experience details');
            setOpenAlert(true);
        }
    };

    const fetchPostedExperiences = async () => {
        try {
            const response = await axios.post(`${APIbackendURl.basePointUrl}employeeservice/employeeWorkExperience/getWorkExperienceByEmpId?empId=${empId}`);
            setPostedExperiences(response.data.empWorkexperinceModel);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleEditExperience = (index) => {
        handleOpenExperienceForm(index);
    };

    useEffect(() => {
        fetchPostedExperiences();
    }, []);

    const handleAlertClose = () => {
        setOpenAlert(false);
    };

    const handleToggleDetails = (index) => {
        setShowDetails((prevDetails) => {
            const updatedDetails = [...prevDetails];
            updatedDetails[index] = !updatedDetails[index];
            return updatedDetails;
        });
    };

    return (
        <Card elevation={3}>
            <div style={{ position: 'relative' }}>
                <StyledButton
                    sx={{ position: 'absolute', top: 0, right: 0, zIndex: 1 }}
                    onClick={() => handleOpenExperienceForm(null)}
                >
                    <AddCircleOutline />
                </StyledButton>
                <H4 sx={{ p: 2 }}> Experience</H4>
                <Divider />
                {postedExperiences.length === 0 ? (
                    <p>No experience details available</p>
                ) : (
                    <H6>
                        {postedExperiences.map((experience, index) => (
                            <EmployeeExperienceEntry key={index}>
                                <div>
                                    <StyledKey>Company:</StyledKey>
                                    <StyledKey>Job Title:</StyledKey>
                                    <StyledKey>From Date:</StyledKey>
                                    <StyledKey>To Date:</StyledKey>
                                    <StyledKey>Remarks</StyledKey>
                                    <StyledKey>Documents:</StyledKey> {/* Add this line */}
                                </div>
                                <div>
                                    <StyledValue>{experience.company}</StyledValue>
                                    <StyledValue>{experience.jobTitle}</StyledValue>
                                    <StyledValue>{experience.fromDate}</StyledValue>
                                    <StyledValue>{experience.toDate}</StyledValue>
                                    <StyledValue>{experience.comments}</StyledValue>
                                    <StyledValue>
                                        {experience.empWorkExpDocumentsModel.length > 0 ? (
                                            <a
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => handleToggleDetails(index)}
                                            >
                                                {showDetails[index] ? 'Hide Document View' : 'Click Document View'}
                                            </a>
                                        ) : (
                                            'No documents available'
                                        )}
                                    </StyledValue>
                                    {showDetails[index] && (
                                        <div>
                                            <StyledValue>
                                                {experience.empWorkExpDocumentsModel.length > 0 ? (
                                                    <div>
                                                        <Filedownload
                                                            datamap={experience.empWorkExpDocumentsModel}
                                                            downloadlink={`${APIbackendURl.basePointUrl}employeeservice/employeeWorkExperience/downloadExperienceDocs`}
                                                            Id="workExpdocId"
                                                            folderName={`${empId}`}
                                                        />
                                                    </div>
                                                ) : (
                                                    'No documents available'
                                                )}
                                            </StyledValue>
                                        </div>
                                    )}
                                </div>
                                <StyledButton onClick={() => handleEditExperience(index)}>
                                    <Edit />
                                </StyledButton>
                            </EmployeeExperienceEntry>
                        ))}
                    </H6>
                )}

                {shouldOpenExperienceForm && (
                    <HREmpExperienceForm
                        open={shouldOpenExperienceForm}
                        onClose={handleCloseExperienceForm}
                        onSave={handleSaveExperience}
                        experience={editIndex !== null ? postedExperiences[editIndex] : null}
                    />
                )}
            </div>
            <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleAlertClose} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
                <Alert onClose={handleAlertClose} severity="success">
                    {alertMessage}
                </Alert>
            </Snackbar>
        </Card>
    );
};

export default HREmpExperience;