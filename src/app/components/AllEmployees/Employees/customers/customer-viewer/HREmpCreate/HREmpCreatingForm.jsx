import React, { useEffect, useState, useContext } from "react";
import { Box, Button, Card, Divider, Grid, Icon, MenuItem, styled, TextField } from "@mui/material";
import { Breadcrumb } from "app/components";
import { FlexAlignCenter, FlexBox } from "app/components/FlexBox";
import { H4 } from "app/components/Typography";
import { convertHexToRGB } from "app/utils/utils";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import * as yup from "yup";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import HREmpCreatingForm from "./HREmpCreatingFormm";
import { APIbackend } from '../../../../../../../APIbackendurl';


// styled components
const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
        marginBottom: "30px",
        [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
}));

const StyledTextField = styled(TextField)({ marginBottom: "16px" });
const Form = styled("form")({ paddingLeft: "16px", paddingRight: "16px" });

const DropZone = styled(FlexAlignCenter)(({ isDragActive, theme }) => ({
    height: 160,
    width: "100%",
    cursor: "pointer",
    borderRadius: "4px",
    marginBottom: "16px",
    transition: "all 350ms ease-in-out",
    border: `2px dashed rgba(${convertHexToRGB(theme.palette.text.primary)}, 0.3)`,
    "&:hover": {
        background: `rgb(${convertHexToRGB(theme.palette.text.primary)}, 0.2) !important`,
    },
    background: isDragActive ? "rgb(0, 0, 0, 0.15)" : "rgb(0, 0, 0, 0.01)",
}));

const HREmpCreatingFormm = () => {
    const { APIbackendURl } = useContext(APIbackend);
    const [imageList, setImageList] = useState([]);
    const [state, setState] = useState({ date: new Date() });
    let navigate = useNavigate();
    const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
        accept: { "image/*": [".jpg", ".png"] },
    });

    const handleSubmit = async (values) => {
        try {
            const response = await fetch(`${APIbackendURl.basePointUrl}employeeservice/employeeDetails/allEmployeeDetails`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                alert("Registered Successfully");
                navigate("/employees/emp-list");
            } else {
                // Handle error response
                console.log("Error:", response.status);
            }
        } catch (error) {
            console.log("Error:", error);
        }
    };

    useEffect(() => {
        setImageList(acceptedFiles);
    }, [acceptedFiles]);

    const handleDateChange = (date) => setState({ ...state, date });
    const { date } = state;

    return (

        <Container>
            <div className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: "Employees", path: "/employees" }, { name: "New Employee" }]} />
            </div>

            <Card elevation={3}>
                <Box p={2} display="flex">
                    <H4>Personal Information</H4>
                </Box>
                <Divider sx={{ mb: 3 }} />

                <Formik
                    onSubmit={handleSubmit}
                    enableReinitialize={true}
                    initialValues={{
                        salutation: "",
                        firstName: "",
                        middleName: "",
                        lastName: "",
                        dateOfBirth: null,
                        bloodGroup: "",
                        companyEmail: "",
                        personalEmail: "",
                        mobile: "",
                        username: "",
                        dateOfJoining: null,
                        role: "",
                        company: "",
                        department: "",
                        designation: "",
                        jobSpecification: "",
                        experienceInYears: "",
                        location: "",
                        authorizer: "",
                        reportingTo: "",
                        approver: "",
                        employmentCategory: "",
                        probationaryEndDate: null,
                        fromDate: null,
                        toDate: null,
                        contractExtension: "",
                        projectConnectUser: "",
                        salesConnectUser: "",
                    }}
                    validationSchema={yup.object().shape({
                        salutation: yup.string().required("Salutation is required"),
                        firstName: yup.string().required("First Name is required"),
                        lastName: yup.string().required("Last Name is required"),
                        dateOfBirth: yup.date().required("Date of Birth is required"),
                        personalEmail: yup.string().email("Invalid email").required("Personal Email is required"),
                        mobile: yup.string().required("Mobile Number is required"),
                        username: yup.string().required("User Name is required"),
                        dateOfJoining: yup.date().required("Date of Joining is required"),
                        role: yup.string().required("Role is required"),
                        company: yup.string().required("Company is required"),
                        department: yup.string().required("Department is required"),
                        gender: yup.string().required("Gender is required"),
                    })}
                >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                        <Form onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Grid container spacing={3}>
                                        <Grid item md={10} sm={4} xs={12}>
                                            <StyledTextField
                                                select
                                                size="small"
                                                name="salutation"
                                                label="Salutation"
                                                variant="outlined"
                                                value={values.salutation || ""}
                                                onChange={handleChange}
                                                error={Boolean(touched.salutation && errors.salutation)}
                                                helperText={touched.salutation && errors.salutation}
                                            >
                                                {salutationList.map((item) => (
                                                    <MenuItem value={item} key={item}>
                                                        {item}
                                                    </MenuItem>
                                                ))}
                                            </StyledTextField>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <StyledTextField
                                                size="small"
                                                name="firstName"
                                                label="First Name"
                                                variant="outlined"
                                                value={values.firstName}
                                                onChange={handleChange}
                                                error={Boolean(touched.firstName && errors.firstName)}
                                                helperText={touched.firstName && errors.firstName}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <StyledTextField
                                                size="small"
                                                name="middleName"
                                                label="Middle Name"
                                                variant="outlined"
                                                value={values.middleName}
                                                onChange={handleChange}
                                                error={Boolean(touched.middleName && errors.middleName)}
                                                helperText={touched.middleName && errors.middleName}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <StyledTextField
                                                size="small"
                                                name="lastName"
                                                label="Last Name"
                                                variant="outlined"
                                                value={values.lastName}
                                                onChange={handleChange}
                                                error={Boolean(touched.lastName && errors.lastName)}
                                                helperText={touched.lastName && errors.lastName}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DatePicker
                                                    value={values.dateOfBirth}
                                                    onChange={(date) => handleChange("dateOfBirth")(date)}
                                                    renderInput={(props) => (
                                                        <TextField
                                                            {...props}
                                                            label="Date of Birth"
                                                            id="mui-pickers-date"
                                                            sx={{ mb: 1, width: "100%" }}
                                                        />
                                                    )}
                                                />
                                            </LocalizationProvider>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <StyledTextField
                                                size="small"
                                                name="bloodGroup"
                                                label="Blood Group"
                                                variant="outlined"
                                                value={values.bloodGroup}
                                                onChange={handleChange}
                                                error={Boolean(touched.bloodGroup && errors.bloodGroup)}
                                                helperText={touched.bloodGroup && errors.bloodGroup}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <StyledTextField
                                                size="small"
                                                name="companyEmail"
                                                label="Company Email"
                                                variant="outlined"
                                                value={values.companyEmail}
                                                onChange={handleChange}
                                                error={Boolean(touched.companyEmail && errors.companyEmail)}
                                                helperText={touched.companyEmail && errors.companyEmail}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <StyledTextField
                                                size="small"
                                                name="personalEmail"
                                                label="Personal Email"
                                                variant="outlined"
                                                value={values.personalEmail}
                                                onChange={handleChange}
                                                error={Boolean(touched.personalEmail && errors.personalEmail)}
                                                helperText={touched.personalEmail && errors.personalEmail}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <StyledTextField
                                                size="small"
                                                name="mobile"
                                                label="Mobile Number"
                                                variant="outlined"
                                                value={values.mobile}
                                                onChange={handleChange}
                                                error={Boolean(touched.mobile && errors.mobile)}
                                                helperText={touched.mobile && errors.mobile}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <StyledTextField
                                                size="small"
                                                name="username"
                                                label="User Name"
                                                variant="outlined"
                                                value={values.username}
                                                onChange={handleChange}
                                                error={Boolean(touched.username && errors.username)}
                                                helperText={touched.username && errors.username}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DatePicker
                                                    value={values.dateOfJoining}
                                                    onChange={(date) => handleChange("dateOfJoining")(date)}
                                                    renderInput={(props) => (
                                                        <TextField
                                                            {...props}
                                                            label="Date of Joining"
                                                            id="mui-pickers-date"
                                                            sx={{ mb: 1, width: "100%" }}
                                                        />
                                                    )}
                                                />
                                            </LocalizationProvider>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <StyledTextField
                                                select
                                                size="small"
                                                name="role"
                                                label="Role"
                                                variant="outlined"
                                                value={values.role}
                                                onChange={handleChange}
                                                error={Boolean(touched.role && errors.role)}
                                                helperText={touched.role && errors.role}
                                            >
                                                {roleList.map((role) => (
                                                    <MenuItem value={role} key={role}>
                                                        {role}
                                                    </MenuItem>
                                                ))}
                                            </StyledTextField>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <StyledTextField
                                                select
                                                size="small"
                                                name="company"
                                                label="Company"
                                                variant="outlined"
                                                value={values.company}
                                                onChange={handleChange}
                                                error={Boolean(touched.company && errors.company)}
                                                helperText={touched.company && errors.company}
                                            >
                                                {companyList.map((company) => (
                                                    <MenuItem value={company} key={company}>
                                                        {company}
                                                    </MenuItem>
                                                ))}
                                            </StyledTextField>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <StyledTextField
                                                select
                                                size="small"
                                                name="department"
                                                label="Department"
                                                variant="outlined"
                                                value={values.department}
                                                onChange={handleChange}
                                                error={Boolean(touched.department && errors.department)}
                                                helperText={touched.department && errors.department}
                                            >
                                                {departmentList.map((department) => (
                                                    <MenuItem value={department} key={department}>
                                                        {department}
                                                    </MenuItem>
                                                ))}
                                            </StyledTextField>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <StyledTextField
                                                size="small"
                                                name="designation"
                                                label="Designation"
                                                variant="outlined"
                                                value={values.designation}
                                                onChange={handleChange}
                                                error={Boolean(touched.designation && errors.designation)}
                                                helperText={touched.designation && errors.designation}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <StyledTextField
                                                size="small"
                                                name="jobSpecification"
                                                label="Job Specification"
                                                variant="outlined"
                                                value={values.jobSpecification}
                                                onChange={handleChange}
                                                error={Boolean(touched.jobSpecification && errors.jobSpecification)}
                                                helperText={touched.jobSpecification && errors.jobSpecification}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <StyledTextField
                                                size="small"
                                                name="experienceInYears"
                                                label="Total Experience (In Years)"
                                                variant="outlined"
                                                value={values.experienceInYears}
                                                onChange={handleChange}
                                                error={Boolean(touched.experienceInYears && errors.experienceInYears)}
                                                helperText={touched.experienceInYears && errors.experienceInYears}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <StyledTextField
                                                size="small"
                                                name="location"
                                                label="Location"
                                                variant="outlined"
                                                value={values.location}
                                                onChange={handleChange}
                                                error={Boolean(touched.location && errors.location)}
                                                helperText={touched.location && errors.location}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <StyledTextField
                                                size="small"
                                                name="authorizer"
                                                label="Authorizer"
                                                variant="outlined"
                                                value={values.authorizer}
                                                onChange={handleChange}
                                                error={Boolean(touched.authorizer && errors.authorizer)}
                                                helperText={touched.authorizer && errors.authorizer}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <StyledTextField
                                                size="small"
                                                name="reportingTo"
                                                label="Reporting to"
                                                variant="outlined"
                                                value={values.reportingTo}
                                                onChange={handleChange}
                                                error={Boolean(touched.reportingTo && errors.reportingTo)}
                                                helperText={touched.reportingTo && errors.reportingTo}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <StyledTextField
                                                size="small"
                                                name="approver"
                                                label="Approver"
                                                variant="outlined"
                                                value={values.approver}
                                                onChange={handleChange}
                                                error={Boolean(touched.approver && errors.approver)}
                                                helperText={touched.approver && errors.approver}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <StyledTextField
                                                size="small"
                                                name="employmentCategory"
                                                label="Employment Category"
                                                variant="outlined"
                                                value={values.employmentCategory}
                                                onChange={handleChange}
                                                error={Boolean(touched.employmentCategory && errors.employmentCategory)}
                                                helperText={touched.employmentCategory && errors.employmentCategory}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DatePicker
                                                    value={values.probationaryEndDate}
                                                    onChange={(date) => handleChange("probationaryEndDate")(date)}
                                                    renderInput={(props) => (
                                                        <TextField
                                                            {...props}
                                                            label="Probationary End Date"
                                                            id="mui-pickers-date"
                                                            sx={{ mb: 1, width: "100%" }}
                                                        />
                                                    )}
                                                />
                                            </LocalizationProvider>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DatePicker
                                                    value={values.fromDate}
                                                    onChange={(date) => handleChange("fromDate")(date)}
                                                    renderInput={(props) => (
                                                        <TextField
                                                            {...props}
                                                            label="From Date"
                                                            id="mui-pickers-date"
                                                            sx={{ mb: 1, width: "100%" }}
                                                        />
                                                    )}
                                                />
                                            </LocalizationProvider>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DatePicker
                                                    value={values.toDate}
                                                    onChange={(date) => handleChange("toDate")(date)}
                                                    renderInput={(props) => (
                                                        <TextField
                                                            {...props}
                                                            label="To Date"
                                                            id="mui-pickers-date"
                                                            sx={{ mb: 1, width: "100%" }}
                                                        />
                                                    )}
                                                />
                                            </LocalizationProvider>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <StyledTextField
                                                size="small"
                                                name="contractExtension"
                                                label="Contract Extension"
                                                variant="outlined"
                                                value={values.contractExtension}
                                                onChange={handleChange}
                                                error={Boolean(touched.contractExtension && errors.contractExtension)}
                                                helperText={touched.contractExtension && errors.contractExtension}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <StyledTextField
                                                size="small"
                                                name="projectConnectUser"
                                                label="Project Connect User"
                                                variant="outlined"
                                                value={values.projectConnectUser}
                                                onChange={handleChange}
                                                error={Boolean(touched.projectConnectUser && errors.projectConnectUser)}
                                                helperText={touched.projectConnectUser && errors.projectConnectUser}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <StyledTextField
                                                size="small"
                                                name="salesConnectUser"
                                                label="Sales Connect User"
                                                variant="outlined"
                                                value={values.salesConnectUser}
                                                onChange={handleChange}
                                                error={Boolean(touched.salesConnectUser && errors.salesConnectUser)}
                                                helperText={touched.salesConnectUser && errors.salesConnectUser}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <DropZone {...getRootProps()}>
                                                <input {...getInputProps()} />
                                                <FlexBox alignItems="center" flexDirection="column">
                                                    <Icon sx={{ color: "text.secondary", fontSize: "10px" }}>publish</Icon>
                                                    {imageList.length ? (
                                                        <span>{imageList.length} images were selected</span>
                                                    ) : (
                                                        <span>Upload (Multiple Attachments like Voter ID, Aadhar Card, DL)</span>
                                                    )}
                                                </FlexBox>
                                            </DropZone>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <DropZone {...getRootProps()}>
                                                <input {...getInputProps()} />
                                                <FlexBox alignItems="center" flexDirection="column">
                                                    <Icon sx={{ color: "text.secondary", fontSize: "30px" }}>publish</Icon>
                                                    {imageList.length ? (
                                                        <span>{imageList.length} images were selected</span>
                                                    ) : (
                                                        <span>Photo</span>
                                                    )}
                                                </FlexBox>
                                            </DropZone>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Button type="submit" color="primary" variant="contained" sx={{ mb: 2, px: 6 }}>
                                Submit
                            </Button>
                        </Form>
                    )}

                </Formik>
            </Card>
        </Container>
    );
};


const salutationList = ["Mr.", "Mrs.", "Ms.", "Miss.", "Dr."];
const roleList = ["Employee", "Admin", "HR", "IT"];
const companyList = ["RIM", "3D CAD"];
const departmentList = ["Software Development", "Software Testing", "Project Management"];
const maritalstatusList = ["Single", "Married", "Divorced"];
const genderList = ["Male", "Female"];


export default HREmpCreatingFormm;


