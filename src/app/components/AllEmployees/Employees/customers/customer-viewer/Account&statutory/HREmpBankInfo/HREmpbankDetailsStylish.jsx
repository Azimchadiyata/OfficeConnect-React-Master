import React, { useState, useEffect, useContext } from "react";
import {
    Button,
    Card,
    Divider,
    styled,
    Typography,
    Box,
} from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";
import { FlexBetween } from "app/components/FlexBox";
import { H4, H6 } from "app/components/Typography";
import HREmpBankDetailsForm from "./HREmpBankDetailsForm";
import axios from "axios";
import { useParams } from "react-router-dom";
import { APIbackend } from '../../../../../../../../APIbackendurl';


const StyledButton = styled(Button)(({ theme }) => ({
    fontSize: "13px",
    color: "white",
    ":hover": { background: "transparent" },
}));

const StyledKey = styled(Typography)(({ theme }) => ({
    fontWeight: "bold",
    // color: theme.palette.primary.main,
}));

const StyledValue = styled(Typography)({
    marginLeft: "8px",
});

const BankEntry = styled("div")(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    ":hover": {
        backgroundColor: theme.palette.grey[200],
        cursor: "pointer",
    },
}));

const HighlightedHeading = styled(H4)(({ theme }) => ({
    position: "relative",
    padding: theme.spacing(2),
    backgroundColor: "rgba(34, 42, 69, 0.96)",
    color: theme.palette.common.white,
}));

const HighlightedData = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.grey[200],
    padding: theme.spacing(2),
}));

const HREmpBankDetail = () => {
    const [shouldOpenBankForm, setShouldOpenBankForm] = useState(false);
    const [bankDetails, setBankDetails] = useState(null);
    const { empId } = useParams();
    const { APIbackendURl } = useContext(APIbackend);


    const handleOpenBankForm = () => {
        setShouldOpenBankForm(true);
    };

    const handleCloseBankForm = () => {
        setShouldOpenBankForm(false);
    };

    const handleSave = async (bank) => {
        try {
            // Make POST request to the API endpoint
            const response = await axios.post(
                `${APIbackendURl.basePointUrl}employeeservice/employeeAccountDetails/createEmpAccountDetails`,
                {
                    ...bank,
                    empId: empId,
                }
            );
            console.log(response.data); // Optional: Handle the response from the API

            handleCloseBankForm();
            fetchBankDetails(); // Fetch the updated bank details after saving
        } catch (error) {
            console.error("Error:", error);
            // Handle error condition
        }
    };

    const fetchBankDetails = async () => {
        try {
            // Make GET request to retrieve the bank details from the API
            const response = await axios.post(
                `${APIbackendURl.basePointUrl}employeeservice/employeeAccountDetails/getEmpAccountDetailsByEmpId?empId=${empId}`
            );
            console.log(response.data); // Optional: Handle the response from the API

            // Update the state with the fetched bank details
            setBankDetails(response.data?.empAccountDetailsModel[0]); // Use the first item in the array as bank details
        } catch (error) {
            console.error("Error:", error);
            // Handle error condition
        }
    };

    useEffect(() => {
        fetchBankDetails(); // Fetch the bank details when the component mounts
    }, []);

    return (
        <Card elevation={3}>
            <div style={{ position: "relative" }}>
                <StyledButton
                    sx={{ position: "absolute", top: 0, right: 0, zIndex: 1 }}
                    onClick={handleOpenBankForm}
                >
                    <AddCircleOutline />
                </StyledButton>
                <HighlightedHeading>Bank Details</HighlightedHeading>
                <Divider />
                <HighlightedData>
                    {bankDetails === null ? (
                        <p>Loading bank details...</p>
                    ) : bankDetails ? (
                        <H6>
                            <BankEntry>
                                <div>
                                    <StyledKey>Bank Name:</StyledKey>
                                    <StyledKey>Branch:</StyledKey>
                                    <StyledKey>IFSC Code:</StyledKey>
                                    <StyledKey>Account Number:</StyledKey>
                                    <StyledKey>PF Number:</StyledKey>
                                    <StyledKey>ESI Insurance Number:</StyledKey>
                                    <StyledKey>Health Insurance Number:</StyledKey>
                                    <StyledKey>UAN Number:</StyledKey>
                                </div>
                                <div>
                                    <StyledValue>{bankDetails.bankName}</StyledValue>
                                    <StyledValue>{bankDetails.bankBranch}</StyledValue>
                                    <StyledValue>{bankDetails.ifscCode}</StyledValue>
                                    <StyledValue>{bankDetails.empAcNo}</StyledValue>
                                    <StyledValue>{bankDetails.pfNo}</StyledValue>
                                    <StyledValue>{bankDetails.esiInsuranceNo}</StyledValue>
                                    <StyledValue>{bankDetails.healthiInsuranceNo}</StyledValue>
                                    <StyledValue>{bankDetails.uanNo}</StyledValue>
                                </div>
                            </BankEntry>
                        </H6>
                    ) : (
                        <p>No bank details available</p>
                    )}
                </HighlightedData>
                <HREmpBankDetailsForm
                    open={shouldOpenBankForm}
                    onClose={handleCloseBankForm}
                    onSave={handleSave}
                />
            </div>
        </Card>
    );
};

export default HREmpBankDetail;
