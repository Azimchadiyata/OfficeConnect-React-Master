import React, { useState, useEffect, useContext } from 'react';
import {
    Button,
    Card,
    Divider,
    styled,
    Typography,
    Snackbar,
    Alert,
    Chip,
    IconButton,
} from '@mui/material';
import { AddCircleOutline, Edit, AttachFile, GetApp } from '@mui/icons-material';
import { H4, H6 } from 'app/components/Typography';
import HREmpEducationForm from './HREmpEducationForm';
import Filedownload from "./FileDownload";

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

const EducationEntry = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    ':hover': {
        backgroundColor: theme.palette.grey[200],
        cursor: 'pointer',
    },
}));

const HREmpEducation = () => {
    const [shouldOpenEducationForm, setShouldOpenEducationForm] = useState(
        false
    );
    const [showDetails, setShowDetails] = useState([]);

    const [postedEducations, setPostedEducations] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [alertMessage, setAlertMessage] = useState('');
    const [openAlert, setOpenAlert] = useState(false);
    const { empId } = useParams();
    const { APIbackendURl } = useContext(APIbackend);


    const handleOpenEducationForm = (index) => {
        setEditIndex(index);
        setShouldOpenEducationForm(true);
    };

    const handleCloseEducationForm = () => {
        setEditIndex(null);
        setShouldOpenEducationForm(false);
    };

    const handleSave = async (education) => {
        try {
            if (editIndex !== null) {
                await axios.post(
                    `${APIbackendURl.basePointUrl}employeeservice/empQualification/updateEmpQualificationAndDoc`,
                    {
                        ...education,
                        empId: empId,
                    }
                );
            } else {
                await axios.post(
                    `${APIbackendURl.basePointUrl}employeeservice/empQualification/createEmpQualificationAndDoc`,
                    {
                        ...education,
                        empId: empId,
                    }
                );
            }

            handleCloseEducationForm();
            fetchPostedEducations();
            setAlertMessage('Education details saved successfully');
            setOpenAlert(true);
        } catch (error) {
            console.error('Error:', error);
            setAlertMessage('Failed to save education details');
            setOpenAlert(true);
        }
    };

    const fetchPostedEducations = async () => {
        try {
            const response = await axios.post(
                `${APIbackendURl.basePointUrl}employeeservice/empQualification/getEmpQualificationEmpId?empId=${empId}`
            );

            setPostedEducations(response.data.empQualificationModel);
        } catch (error) {
            console.error('Error:', error);
            setPostedEducations([]);
        }
    };

    const handleEditEducation = (index) => {
        handleOpenEducationForm(index);
    };

    const handleDownloadAttachment = async (fileName, fileNameType, folderName) => {
        try {
            const response = await axios.get(
                `${APIbackendURl.basePointUrl}employeeservice/empQualification/downloadQualificationDocs/${fileName}&${fileNameType}&${folderName}`,
                {
                    responseType: 'arraybuffer',
                }
            );
            const blob = new Blob([response.data], { type: 'application/octet-stream' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchPostedEducations();
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
                    onClick={() => handleOpenEducationForm(null)}
                >
                    <AddCircleOutline />
                </StyledButton>
                <H4 sx={{ p: 2 }}>Education</H4>
                <Divider />
                {postedEducations.length === 0 ? (
                    <p>No education details available</p>
                ) : (
                    <H6>
                        {postedEducations.map((education, index) => (
                            <div key={index}>
                                <EducationEntry>
                                    <div>
                                        <StyledKey>Institute:</StyledKey>
                                        <StyledKey>Qualification:</StyledKey>
                                        <StyledKey>Specialization:</StyledKey>
                                        <StyledKey>Passout Year:</StyledKey>
                                        <StyledKey>Percentage:</StyledKey>
                                        <StyledKey>Documents:</StyledKey>
                                    </div>
                                    <div>
                                        <StyledValue>
                                            {education.institute}
                                        </StyledValue>
                                        <StyledValue>
                                            {education.qulification}
                                        </StyledValue>
                                        <StyledValue>
                                            {education.specialization}
                                        </StyledValue>
                                        <StyledValue>
                                            {education.passoutYear}
                                        </StyledValue>
                                        <StyledValue>
                                            {education.percentage}%
                                        </StyledValue>
                                        <StyledValue>
                                            {education.empQulificationDocumentsModel.length > 0 ? (
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
                                                    {education.empQulificationDocumentsModel.length > 0 ? (
                                                        <div>
                                                            <Filedownload
                                                                datamap={education.empQulificationDocumentsModel}
                                                                downloadlink={`${APIbackendURl.basePointUrl}employeeservice/empQualification/downloadQualificationDocs`}
                                                                Id="quldocId"
                                                                folderName={`${empId}`} // Replace with the correct value
                                                            />
                                                        </div>
                                                    ) : (
                                                        'No documents available'
                                                    )}
                                                </StyledValue>

                                            </div>
                                        )}

                                    </div>

                                    <div>
                                        <StyledButton
                                            onClick={() =>
                                                handleEditEducation(index)
                                            }
                                        >
                                            <Edit />
                                        </StyledButton>
                                    </div>
                                </EducationEntry>
                            </div>
                        ))}
                    </H6>
                )}
                {shouldOpenEducationForm && (
                    <HREmpEducationForm
                        open={shouldOpenEducationForm}
                        onClose={handleCloseEducationForm}
                        onSave={handleSave}
                        education={
                            editIndex !== null
                                ? postedEducations[editIndex]
                                : null
                        }
                    />
                )}
            </div>
            <Snackbar
                open={openAlert}
                autoHideDuration={6000}
                onClose={handleAlertClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleAlertClose} severity="success">
                    {alertMessage}
                </Alert>
            </Snackbar>
        </Card>
    );
};


export default HREmpEducation;