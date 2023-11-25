import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { LockOpen, Person, Edit, AddCircleOutline } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  Divider,
  styled,
  Table,
  TableBody,
  TableCell,
  TableRow,
  IconButton
} from "@mui/material";
import { FlexBetween, FlexBox } from "app/components/FlexBox";
import { H4, Small } from "app/components/Typography";
import EmployeeEditorDialog from "./EmployeeEditorDialog";
import { APIbackend } from '../../../../../../APIbackendurl';


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

const CustomerInfo = () => {
  const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false);
  const [user, setUser] = useState(null);
  const [employeeData, setEmployeeData] = useState(null);
  const { APIbackendURl } = useContext(APIbackend);
  const token = sessionStorage.getItem('token'); // Retrieve the token from session storage



  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.post(
          `${APIbackendURl.basePointUrl}applicationservice/Admin/PortalMaster/UserMaster/getById`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data; // Use response.data directly
        setEmployeeData(data);
      } catch (error) {
        console.log("Error fetching employee data:", error);
      }
    };

    fetchEmployeeData();
  }, []);

  const handleDialogClose = () => {
    setShouldOpenEditorDialog(false);
  };

  const handleEditUser = (user) => () => {
    setUser(user);
    setShouldOpenEditorDialog(true);
  };

  return (
    <Card sx={{ pt: 3 }} elevation={3}>
      <div style={{ position: 'relative' }} >
        <IconButton
          sx={{ position: 'absolute', top: 0, right: 0, zIndex: 1, fontSize: 'small', marginTop: '-25px' }}
          onClick={() => setShouldOpenEditorDialog(true)}
        >
          <Edit />
        </IconButton>
        <ContentBox mb={3} alignContent="center">
          <Avatar sx={{ width: 84, height: 84 }} src="/assets/images/faces/10.jpg" />
          <H4 sx={{ mt: "16px", mb: "8px" }}>{employeeData?.firstName}</H4>
          <Small color="text.primary">{employeeData?.departmentName}</Small>
          <Small color="text.secondary">{employeeData?.designation}</Small>
        </ContentBox>

        <Divider />

        <Table>
          <TableBody>
            <TableRow>
              <TableCell sx={{ pl: 2 }}>Email</TableCell>
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
              <TableCell sx={{ pl: 2 }}>PERSONAL</TableCell>
              <TableCell>{employeeData?.personalEmail}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        {shouldOpenEditorDialog && (
          <EmployeeEditorDialog
            member={user}
            open={shouldOpenEditorDialog}
            handleClose={handleDialogClose}
          />
        )}

        <FlexBetween p={2}>
          <StyledButton disableRipple startIcon={<LockOpen fontSize="small" />}>
            Reset & Send Password
          </StyledButton>

          <StyledButton disableRipple startIcon={<Person fontSize="small" />}>
            Login as Customer
          </StyledButton>
        </FlexBetween>
      </div>
    </Card>
  );
};

export default CustomerInfo;
