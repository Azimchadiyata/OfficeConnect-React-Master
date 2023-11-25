import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Card,
  Divider,
  styled,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { AddCircleOutline, Edit } from "@mui/icons-material";
import { FlexBetween } from "app/components/FlexBox";
import { H4, H6 } from "app/components/Typography";
import HREmpBankDetailsForm from "./HREmpBankDetailsForm";
import axios from "axios";
import { useParams } from "react-router-dom";
import { APIbackend } from '../../../../../../../../APIbackendurl';


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

const HREmpBankDetail = () => {
  const [shouldOpenBankForm, setShouldOpenBankForm] = useState(false);
  const [bankDetails, setBankDetails] = useState(null);
  const { empId } = useParams();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const { APIbackendURl } = useContext(APIbackend);


  const handleOpenBankForm = () => {
    setShouldOpenBankForm(true);
  };

  const handleCloseBankForm = () => {
    setShouldOpenBankForm(false);
  };

  const handleSave = async (bank) => {
    try {
      const endpoint = bankDetails
        ? `${APIbackendURl.basePointUrl}employeeservice/employeeAccountDetails/updateEmpAccountDetails`
        : `${APIbackendURl.basePointUrl}employeeservice/employeeAccountDetails/createEmpAccountDetails`;

      // Make POST request to the appropriate API endpoint
      const response = await axios.post(endpoint, {
        ...bank,
        empId: empId,
      });
      console.log(response.data); // Optional: Handle the response from the API

      setIsAlertOpen(true);
      setAlertMessage("Bank details updated successfully!");

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

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsAlertOpen(false);
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
          {bankDetails ? <Edit /> : <AddCircleOutline />}
        </StyledButton>
        <H4 sx={{ p: 2 }}>Bank Details</H4>
        <Divider />
        {bankDetails === null ? (
          <p>Loading bank details...</p>
        ) : bankDetails ? (
          <H6>
            <BankEntry>
              <div>
                <FlexBetween>
                  <StyledKey>Bank Name:</StyledKey>
                  <StyledValue>{bankDetails.bankName}</StyledValue>
                </FlexBetween>
                <FlexBetween>
                  <StyledKey>Branch:</StyledKey>
                  <StyledValue>{bankDetails.bankBranch}</StyledValue>
                </FlexBetween>
                <FlexBetween>
                  <StyledKey>IFSC Code:</StyledKey>
                  <StyledValue>{bankDetails.ifscCode}</StyledValue>
                </FlexBetween>
                <FlexBetween>
                  <StyledKey>Account Number:</StyledKey>
                  <StyledValue>{bankDetails.empAcNo}</StyledValue>
                </FlexBetween>
              </div>
              <div>
                <FlexBetween>
                  <StyledKey>PF Number:</StyledKey>
                  <StyledValue>{bankDetails.pfNo}</StyledValue>
                </FlexBetween>
                <FlexBetween>
                  <StyledKey>ESI Insurance Number:</StyledKey>
                  <StyledValue>{bankDetails.esiInsuranceNo}</StyledValue>
                </FlexBetween>
                <FlexBetween>
                  <StyledKey>Health Insurance Number:</StyledKey>
                  <StyledValue>{bankDetails.healthiInsuranceNo}</StyledValue>
                </FlexBetween>
                <FlexBetween>
                  <StyledKey>UAN Number:</StyledKey>
                  <StyledValue>{bankDetails.uanNo}</StyledValue>
                </FlexBetween>
              </div>
            </BankEntry>
          </H6>
        ) : (
          <p>No bank details available</p>
        )}
        <HREmpBankDetailsForm
          open={shouldOpenBankForm}
          onClose={handleCloseBankForm}
          onSave={handleSave}
          bankDetails={bankDetails} // Pass the bank details for update functionality
        />
      </div>
      <Snackbar
        open={isAlertOpen}
        autoHideDuration={6000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleAlertClose} severity="success">
          {alertMessage}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default HREmpBankDetail;