import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Breadcrumb } from "app/components";
import HREmpProfile from "./HREmpProfile";
import HREmpAccountAndStatutory from "./HREmpAccountAndStatutory";
import Avatar from '@mui/material/Avatar';
import { APIbackend } from '../../../../../../APIbackendurl';
import { format } from "date-fns";

import { LockOpen, Person, Edit, AddCircleOutline } from "@mui/icons-material";
import {

    Button,
    Card,
    Divider,
    styled,
    Table,
    TableBody,
    Tab,
    Tabs,
    TableCell,
    TableRow,
    IconButton
} from "@mui/material";
import { FlexBetween, FlexBox } from "app/components/FlexBox";
import { H4, Small } from "app/components/Typography";
import HREmpUpdatingForm from "./HREmpCreate/HREmpUpdatingForm";

const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
        marginBottom: "30px",
        [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
}));

const ContentBox = styled(FlexBox)({
    alignItems: "center",
    flexDirection: "column",
});

const StyedSmall = styled(Small)({
    color: "#08ad6c",
    padding: "2px 4px",
    borderRadius: "4px",
    background: "rgba(9, 182, 109, 0.15)",
});

const StyledButton = styled(Button)(({ theme }) => ({
    fontSize: "13px",
    color: theme.palette.text.primary,
    ":hover": { background: "transparent" },
}));

const HREmployeeProfileMain = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const handleTabChange = (e, value) => setTabIndex(value);
    const [employeeData, setEmployeeData] = useState(null);
    const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false);
    const { empId } = useParams();
    const { APIbackendURl } = useContext(APIbackend);
    const token = sessionStorage.getItem('token'); // Retrieve the token from session storage


    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const response = await axios.post(
                    `${APIbackendURl.basePointUrl}applicationservice/Admin/PortalMaster/UserMaster/getById`,
                    { empId },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                // Format the date before setting it in the state
                const formattedEmployeeData = {
                    ...response.data,
                    joiningDate: format(new Date(response.data.joiningDate), "dd-MM-yyyy"), // Updated date format
                    dob: format(new Date(response.data.dob), "dd-MM-yyyy"), // Updated date format
                };

                setEmployeeData(formattedEmployeeData);
            } catch (error) {
                console.log("Error fetching employee data:", error);
            }
        };

        fetchEmployeeData();
    }, [empId]);


    const handleDialogClose = () => {
        setShouldOpenEditorDialog(false);
    };

    if (!employeeData) {
        return <div>Loading employee data...</div>;
    }

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[{ name: "Employees", path: "/" }, { name: "Profile" }]}
                />
            </div>
            <Tabs
                sx={{ mt: 2 }}
                value={tabIndex}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
            >
                {tabList.map((item, ind) => (
                    <Tab key={ind} value={ind} label={item} sx={{ textTransform: "capitalize" }} />
                ))}
            </Tabs>

            <Card sx={{ pt: 3 }} elevation={3}>
                <div style={{ position: 'relative' }}>
                    <IconButton
                        sx={{ position: 'absolute', top: 0, right: 0, zIndex: 1, fontSize: 'small', marginTop: '-25px' }}
                        onClick={() => setShouldOpenEditorDialog(true)}
                    >
                        <Edit />
                    </IconButton>
                    <ContentBox mb={3} alignContent="left">
                        <Avatar sx={{ width: 84, height: 84 }} src={employeeData?.profilePhoto || "/assets/images/faces/10.jpg"} />

                        <H4 sx={{ mt: "16px", mb: "8px" }}>{employeeData?.firstName} {employeeData?.lastName}</H4>
                        <Small color="text.primary">{employeeData?.departmentName}</Small>
                        <Small color="text.secondary">{employeeData?.designation}</Small>
                    </ContentBox>

                    <Divider />

                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell sx={{ pl: 2 }}>Company Email</TableCell>
                                <TableCell>
                                    <div>{employeeData?.emailOff}</div>
                                    <StyedSmall>Email Verified</StyedSmall>
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell sx={{ pl: 2 }}>Joining</TableCell>
                                <TableCell>{employeeData?.joiningDate}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell sx={{ pl: 2 }}>Experience In Year</TableCell>
                                <TableCell>{employeeData?.totalExperience}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell sx={{ pl: 2 }}>DOB</TableCell>
                                <TableCell>{employeeData?.dob}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell sx={{ pl: 2 }}>Mobile</TableCell>
                                <TableCell>{employeeData?.mobile}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell sx={{ pl: 2 }}>Personal Email</TableCell>
                                <TableCell>{employeeData?.emailOthers}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    {shouldOpenEditorDialog && (
                        <HREmpUpdatingForm
                            open={shouldOpenEditorDialog}
                            handleClose={handleDialogClose}
                            employee={employeeData}
                        />
                    )}
                </div>
            </Card>
            <Divider sx={{ mb: "24px" }} />

            {tabIndex === 0 && <HREmpProfile />}
            {tabIndex === 1 && <HREmpAccountAndStatutory />}
        </Container>
    );
};

const tabList = ["Profile", "Account & Statutory"];

export default HREmployeeProfileMain;
