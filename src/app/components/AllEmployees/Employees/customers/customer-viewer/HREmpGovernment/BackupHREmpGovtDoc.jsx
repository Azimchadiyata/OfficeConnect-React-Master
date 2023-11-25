import React, { useState, useEffect, useContext } from 'react';
import { Button, Card, Divider, styled, Typography, Snackbar, Alert } from '@mui/material';
import { AddCircleOutline, Edit } from '@mui/icons-material';
import { H4, H6 } from 'app/components/Typography';
import HREmpGovtDocumentsForm from './HREmpGovtDocumentsForm'; // Import the form component
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

const EmployeeGovtDocumentsEntry = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    ':hover': {
        backgroundColor: theme.palette.grey[200],
        cursor: 'pointer',
    },
}));

const HREmpGovtDocuments = () => {
    const [shouldOpenGovtDocumentsForm, setShouldOpenGovtDocumentsForm] = useState(false);
    const [postedGovtDocuments, setPostedGovtDocuments] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [alertMessage, setAlertMessage] = useState('');
    const [openAlert, setOpenAlert] = useState(false);
    const [showDetails, setShowDetails] = useState([]);
    const { empId } = useParams();
    const { APIbackendURl } = useContext(APIbackend);


    const handleOpenGovtDocumentsForm = (index) => {
        setEditIndex(index);
        setShouldOpenGovtDocumentsForm(true);
    };

    const handleCloseGovtDocumentsForm = () => {
        setEditIndex(null);
        setShouldOpenGovtDocumentsForm(false);
    };

    const handleSaveGovtDocuments = async (document) => {
        try {
            await axios.post(`${APIbackendURl.basePointUrl}employeeservice/empGovtDocumentDetails/updateEmpGovtDocumentDetails`, {
                ...document,
                empId: empId,
            });


            handleCloseGovtDocumentsForm();
            fetchPostedGovtDocuments();
            setAlertMessage('Government documents saved successfully');
            setOpenAlert(true);
        } catch (error) {
            console.error('Error:', error);
            setAlertMessage('Failed to save government documents');
            setOpenAlert(true);
        }
    };


    // const fetchPostedGovtDocuments = async () => {
    //     try {
    //         const response = await axios.post(`${APIbackendURl.basePointUrl}employeeservice/empGovtDocumentDetails/getEmpGovtDocumentDetails`",
    //             { empId });
    //         setPostedGovtDocuments(response.data.govtIssueDocumentsModel);
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // };
    const fetchPostedGovtDocuments = async () => {
        try {
            const response = await axios.post(`${APIbackendURl.basePointUrl}employeeservice/empGovtDocumentDetails/getEmpGovtDocumentDetails`, { empId });
            console.log("Response:", response.data);


            setPostedGovtDocuments(response.data.govtIssueDocumentsModel);
        } catch (error) {
            console.error('Error fetching govt documents:', error);
        }
    };


    const handleEditDocument = (index) => {
        handleOpenGovtDocumentsForm(index);
    };

    useEffect(() => {
        fetchPostedGovtDocuments();
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
                    onClick={() => handleOpenGovtDocumentsForm(null)}
                >
                    <AddCircleOutline />
                </StyledButton>
                <H4 sx={{ p: 2 }}>Government Documents</H4>
                <Divider />
                {postedGovtDocuments.length === 0 ? (
                    <p>No government documents available</p>
                ) : (
                    <H6>
                        {postedGovtDocuments.map((document, index) => (
                            <EmployeeGovtDocumentsEntry key={index}>
                                <div>
                                    <StyledKey>Aadhaar Number:</StyledKey>
                                    <StyledKey>PAN Number:</StyledKey>
                                    {/* Display more values */}
                                    <StyledKey>Voter Number:</StyledKey>
                                    <StyledKey>Driving License:</StyledKey>
                                    <StyledKey>Passport Number:</StyledKey>
                                    <StyledKey>Passport Issue Date:</StyledKey>
                                    <StyledKey>Passport Expiry Date:</StyledKey>
                                    <StyledKey>Issue Place:</StyledKey>
                                    <StyledKey>Documents :</StyledKey>
                                </div>
                                <div>
                                    <StyledValue>{document.aadharCard}</StyledValue>
                                    <StyledValue>{document.panNumber}</StyledValue>
                                    <StyledValue>{document.voterId}</StyledValue>
                                    <StyledValue>{document.drivingLicenseNo}</StyledValue>
                                    <StyledValue>{document.passport}</StyledValue>
                                    <StyledValue>{document.passIssueDate}</StyledValue>
                                    <StyledValue>{document.passportExpiryDate}</StyledValue>
                                    <StyledValue>{document.passportIssueplace}</StyledValue>
                                    <StyledValue>
                                        {document.govtIssueDocumentsModel?.length > 0 ? (
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
                                                {document.govtIssueDocumentsModel.length > 0 ? (
                                                    <div>
                                                        <Filedownload
                                                            datamap={document.govtIssueDocumentsModel}
                                                            downloadlink={`${APIbackendURl.basePointUrl}employeeservice/empGovtDocumentDetails/downloadGovtIssueDocs`}
                                                            Id="govtDocId"
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
                                <StyledButton onClick={() => handleEditDocument(index)}>
                                    <Edit />
                                </StyledButton>
                            </EmployeeGovtDocumentsEntry>
                        ))}
                    </H6>
                )}

                {shouldOpenGovtDocumentsForm && (
                    <HREmpGovtDocumentsForm
                        open={shouldOpenGovtDocumentsForm}
                        onClose={handleCloseGovtDocumentsForm}
                        onSave={handleSaveGovtDocuments}
                        document={editIndex !== null ? postedGovtDocuments[editIndex] : null}
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

export default HREmpGovtDocuments;