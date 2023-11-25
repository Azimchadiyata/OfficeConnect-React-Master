import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Card, Divider, styled, Typography, Button, Snackbar } from "@mui/material";
import { AddCircleOutline, Edit } from "@mui/icons-material";
import { H4, H6 } from "app/components/Typography";
import HREmpAddressForm from "./HREmpAddresssForm";
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

const AddressEntry = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    ":hover": {
        backgroundColor: theme.palette.grey[200],
        cursor: "pointer",
    },
}));

const HREmpAddress = () => {
    const [shouldOpenAddressForm, setShouldOpenAddressForm] = useState(false);
    const [addressDetails, setAddressDetails] = useState([]);
    const [hasAddressDetails, setHasAddressDetails] = useState(false);
    const [editAddress, setEditAddress] = useState(null);
    const { empId } = useParams();

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertSeverity, setAlertSeverity] = useState("success");
    const [alertMessage, setAlertMessage] = useState("");
    const { APIbackendURl } = useContext(APIbackend);

    const handleOpenAddressForm = (address) => {
        setEditAddress(address);
        setShouldOpenAddressForm(true);
    };

    const handleCloseAddressForm = () => {
        setShouldOpenAddressForm(false);
        setEditAddress(null);
    };

    const handleSave = async (address) => {
        try {
            await axios.post(
                `${APIbackendURl.basePointUrl}employeeservice/employeeContactDetails/updateContactDetails`,
                {
                    ...address,
                    empId: empId,
                }
            );
            fetchAddressDetails();
            handleCloseAddressForm();

            // Show success alert
            handleAlertOpen("success", "Address details saved successfully.");
        } catch (error) {
            console.error("Error:", error);
            // Handle error condition

            // Show error alert
            handleAlertOpen("error", "Error saving address details. Please try again.");
        }
    };

    const fetchAddressDetails = async () => {
        try {
            const response = await axios.post(
                `${APIbackendURl.basePointUrl}employeeservice/employeeContactDetails/getContactByEmpId`,
                {
                    empId: empId,
                }
            );
            console.log(response.data);

            if (response.data) {
                setAddressDetails(Array.isArray(response.data) ? response.data : [response.data]);
                setHasAddressDetails(true);
            } else {
                setAddressDetails([]);
                setHasAddressDetails(false);
            }
        } catch (error) {
            console.error("Error:", error);
            // Handle error condition

            // Show error alert
            handleAlertOpen("error", "Error fetching address details. Please try again.");
        }
    };

    useEffect(() => {
        fetchAddressDetails();
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
                {hasAddressDetails ? (
                    <StyledButton
                        sx={{ position: "absolute", top: 0, right: 0, zIndex: 1 }}
                        onClick={() => handleOpenAddressForm(addressDetails[0])}
                    >
                        <Edit /> {/* Replace EditIcon with your desired edit icon */}
                    </StyledButton>
                ) : (
                    <StyledButton
                        sx={{ position: "absolute", top: 0, right: 0, zIndex: 1 }}
                        onClick={handleOpenAddressForm}
                    >
                        <AddCircleOutline />
                    </StyledButton>
                )}
                <H4 sx={{ p: 2 }}>Address Details</H4>
                <Divider />
                {!addressDetails || addressDetails.length === 0 ? (
                    <p>No address details available</p>
                ) : (
                    <H6>
                        {addressDetails.map((address, index) => (
                            <AddressEntry key={index}>
                                <div>
                                    <StyledKey>Permanent Address:</StyledKey>
                                </div>
                                <div>
                                    <StyledValue>
                                        {`${address.doorNumber}, ${address.buildingName}, ${address.street}, ${address.location}, ${address.city}, ${address.district}, ${address.state}, ${address.country}, ${address.pincode}`}
                                    </StyledValue>
                                </div>
                                {address.localDoorNumber && (
                                    <>
                                        <Divider />
                                        <div>
                                            <StyledKey>Local Address :</StyledKey>
                                        </div>
                                        <div>
                                            <StyledValue>
                                                {`${address.localDoorNumber}, ${address.localBuildingName}, ${address.localStreet}, ${address.localLocation}, ${address.localCity}, ${address.localDistrict}, ${address.localState}, ${address.localCountry}, ${address.localPincode}`}
                                            </StyledValue>
                                        </div>
                                        <Divider />
                                    </>
                                )}
                            </AddressEntry>
                        ))}
                    </H6>
                )}
                <HREmpAddressForm
                    open={shouldOpenAddressForm}
                    onClose={handleCloseAddressForm}
                    onSave={handleSave}
                    initialValues={editAddress}
                />
            </div>

            {/* Alert for success/error messages */}
            <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose} anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert onClose={handleAlertClose} severity={alertSeverity} sx={{ width: "100%" }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </Card>
    );
};

export default HREmpAddress;
