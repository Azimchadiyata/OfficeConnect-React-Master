import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Card, Divider, styled, Typography, Button, Snackbar } from "@mui/material";
import { AddCircleOutline, Edit } from "@mui/icons-material";
import { H4 } from "app/components/Typography";
import HREmpGovtDocumentsForm from "./HREmpGovtDocumentsForm";
import { Alert } from "@mui/material";
import { useParams } from "react-router-dom";
import { APIbackend } from '../../../../../../../APIbackendurl';


const StyledButton = styled(Button)(({ theme }) => ({
    fontSize: "13px",
    color: theme.palette.text.primary,
    ":hover": { background: "transparent" },
}));

const StyledKey = styled(Typography)(({ theme }) => ({
    fontWeight: "bold",
}));

const StyledValue = styled(Typography)({
    marginLeft: "8px",
});

const DocumentEntry = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    ":hover": {
        backgroundColor: theme.palette.grey[200],
        cursor: "pointer",
    },
}));

const HREmpDocuments = () => {
    const [shouldOpenDocumentsForm, setShouldOpenDocumentsForm] = useState(false);
    const [documentDetails, setDocumentDetails] = useState([]);
    const [hasDocumentDetails, setHasDocumentDetails] = useState(false);
    const [editDocument, setEditDocument] = useState(null);
    const { empId } = useParams();
    const { APIbackendURl } = useContext(APIbackend);


    const [alertOpen, setAlertOpen] = useState(false);
    const [alertSeverity, setAlertSeverity] = useState("success");
    const [alertMessage, setAlertMessage] = useState("");

    const handleOpenDocumentsForm = (document) => {
        setEditDocument(document);
        setShouldOpenDocumentsForm(true);
    };

    const handleCloseDocumentsForm = () => {
        setShouldOpenDocumentsForm(false);
        setEditDocument(null);
    };

    const handleSave = async (document) => {
        try {
            await axios.post(
                `${APIbackendURl.basePointUrl}employeeservice/empGovtDocumentDetails/updateEmpGovtDocumentDetails`,
                {
                    ...document,
                    empId: empId,
                }
            );
            fetchDocumentDetails();
            handleCloseDocumentsForm();

            // Show success alert
            handleAlertOpen("success", "Document details saved successfully.");
        } catch (error) {
            console.error("Error:", error);
            // Handle error condition

            // Show error alert
            handleAlertOpen("error", "Error saving document details. Please try again.");
        }
    };

    const fetchDocumentDetails = async () => {
        try {
            const response = await axios.post(
                `${APIbackendURl.basePointUrl}employeeservice/empGovtDocumentDetails/getEmpGovtDocumentDetails`,
                {
                    empId: empId,
                }
            );
            console.log(response.data);

            if (response.data) {
                setDocumentDetails(Array.isArray(response.data) ? response.data : [response.data]);
                setHasDocumentDetails(true);
            } else {
                setDocumentDetails([]);
                setHasDocumentDetails(false);
            }
        } catch (error) {
            console.error("Error:", error);
            // Handle error condition

            // Show error alert
            handleAlertOpen("error", "Error fetching document details. Please try again.");
        }
    };

    useEffect(() => {
        fetchDocumentDetails();
    }, []);

    const handleAlertOpen = (severity, message) => {
        setAlertSeverity(severity);
        setAlertMessage(message);
        setAlertOpen(true);
    };

    const handleAlertClose = () => {
        setAlertOpen(false);
    };

    return (
        <Card elevation={3}>
            <div style={{ position: "relative" }}>
                {hasDocumentDetails ? (
                    <StyledButton
                        sx={{ position: "absolute", top: 0, right: 0, zIndex: 1 }}
                        onClick={() => handleOpenDocumentsForm(documentDetails[0])}
                    >
                        <Edit /> {/* Replace EditIcon with your desired edit icon */}
                    </StyledButton>
                ) : (
                    <StyledButton
                        sx={{ position: "absolute", top: 0, right: 0, zIndex: 1 }}
                        onClick={() => handleOpenDocumentsForm()}
                    >
                        <AddCircleOutline />
                    </StyledButton>
                )}
                <H4 sx={{ p: 2 }}>Document Details</H4>
                <Divider />
                {!documentDetails || documentDetails.length === 0 ? (
                    <p>No document details available</p>
                ) : (
                    <div>
                        {documentDetails.map((document, index) => (
                            <DocumentEntry key={index}>
                                <div>
                                    <StyledKey>Aadhaar Number:</StyledKey>
                                    <StyledValue>{document.aadharCard}</StyledValue>
                                    <StyledKey>PAN Number:</StyledKey>
                                    <StyledValue>{document.panNumber}</StyledValue>
                                    {/* Display more values */}
                                    <StyledKey>Voter Number:</StyledKey>
                                    <StyledValue>{document.voterId}</StyledValue>
                                    <StyledKey>Driving License:</StyledKey>
                                    <StyledValue>{document.drivingLicenseNo}</StyledValue>
                                    <StyledKey>Passport Number:</StyledKey>
                                    <StyledValue>{document.passport}</StyledValue>
                                    <StyledKey>Passport Issue Date:</StyledKey>
                                    <StyledValue>{document.passIssueDate}</StyledValue>
                                    <StyledKey>Passport Expiry Date:</StyledKey>
                                    <StyledValue>{document.passportExpiryDate}</StyledValue>
                                    <StyledKey>Issue Place:</StyledKey>
                                    <StyledValue>{document.passportIssueplace}</StyledValue>
                                    <StyledKey>Documents :</StyledKey>
                                    {/* Display other document details here */}
                                </div>
                            </DocumentEntry>
                        ))}
                    </div>
                )}
                <HREmpGovtDocumentsForm
                    open={shouldOpenDocumentsForm}
                    onClose={handleCloseDocumentsForm}
                    onSave={handleSave}
                    document={editDocument}
                />
            </div>

            {/* Alert for success/error messages */}
            <Snackbar
                open={alertOpen}
                autoHideDuration={6000}
                onClose={handleAlertClose}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert onClose={handleAlertClose} severity={alertSeverity} sx={{ width: "100%" }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </Card>
    );
};

export default HREmpDocuments;
