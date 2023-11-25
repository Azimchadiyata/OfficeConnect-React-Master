import React, { useState, useEffect, useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    FormControl,
    FormLabel,
    Input,
    Box,
    Grid,
    MenuItem,
    styled,
} from '@mui/material';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { DatePicker } from '@mui/lab';
import { APIbackend } from '../../../../../../../APIbackendurl';


const StyledTextField = styled(TextField)({ marginBottom: "16px" });

const validationSchema = Yup.object().shape({
    // empId: Yup.number().required('Employee ID is required'),
    // documentType: Yup.string().required('Document Type is required'),
    // documentExt: Yup.string().required('Document Extension is required'),
    // base64: Yup.string().nullable(),
    // fileName: Yup.string().required('File Name is required'),
    // salutation: Yup.string().required('Salutation is required'),
    firstName: Yup.string().required('First Name is required'),
    middleName: Yup.string().nullable(),
    lastName: Yup.string().required('Last Name is required'),
    dob: Yup.date().required('Date of Birth is required'),
    // bloodGroup: Yup.string().required('Blood Group is required'),
    // userName: Yup.string().required('User Name is required'),
    joiningDate: Yup.date().required('Joining Date is required'),
    // approverId: Yup.string().required('Approver ID is required'),
    // approverName: Yup.string().required('Approver Name is required'),
    // authorizerEmpId: Yup.string().required('Authorizer Employee ID is required'),
    // authorizerEmpName: Yup.string().required('Authorizer Employee Name is required'),
    // compId: Yup.string().required('Company ID is required'),
    // companyName: Yup.string().required('Company Name is required'),
    // depId: Yup.string().required('Department ID is required'),
    // departmentName: Yup.string().required('Department Name is required'),
    // desigId: Yup.string().required('Designation ID is required'),
    // designationName: Yup.string().required('Designation Name is required'),
    // emailOff: Yup.string().required('Official Email is required'),
    emailOthers: Yup.string().required('Other Email is required'),
    // empCatName: Yup.string().required('Employee Category Name is required'),
    // empcatId: Yup.string().required('Employee Category ID is required'),
    // endDate: Yup.date().required('End Date is required'),
    // extContractDetails: Yup.string().required('External Contract Details is required'),
    // firstName: Yup.string().required('First Name is required'),
    // jobSpecification: Yup.string().required('Job Specification is required'),
    // lastName: Yup.string().required('Last Name is required'),
    // location: Yup.string().required('Location is required'),
    // middleName: Yup.string().nullable(),
    mobile: Yup.string().required('Mobile Number is required'),
    // probEndDate: Yup.date().required('Probation End Date is required'),
    // projConLogin: Yup.boolean().required('Project Consultant Login is required'),
    // reportingName: Yup.string().required('Reporting Name is required'),
    // reportingTo: Yup.number().required('Reporting To is required'),
    // roleId: Yup.string().required('Role ID is required'),
    // roleName: Yup.string().required('Role Name is required'),
    // salesConLogin: Yup.boolean().required('Sales Consultant Login is required'),
    // startDate: Yup.date().required('Start Date is required'),
    // totalExperience: Yup.string().required('Total Experience is required'),
});


const HREmpCreatingForm = ({ open, handleClose, onSave }) => {
    const [roleList, setRoleList] = useState([]);
    const [companyList, setCompanyList] = useState([]);
    const { APIbackendURl } = useContext(APIbackend);





    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await axios.get(
                    `${APIbackendURl.basePointUrl}applicationservice/roleMaster/getAllRole`
                );
                const roles = response.data.roleNpdModels; // Update key to match the response structure
                setRoleList(roles);
            } catch (error) {
                console.error(error);
            }
        };

        fetchRoles();
    }, []);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await axios.get(
                    `${APIbackendURl.basePointUrl}applicationservice/Company/CompanyMaster/CompanyMaster/View`
                );
                const companies = response.data.companyMasterModel;
                setCompanyList(companies);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCompanies();
    }, []);


    const navigate = useNavigate();
    const handleSubmit = async (values) => {
        values.reportingTo = 0;
        values.approverId = 0;
        values.authorizerEmpId = 0;
        values.compId = 1;
        values.compName = "RIM";
        // values.roleId = "2";
        // values.roleName = "employee";
        values.desigId = 1;
        values.designationName = "Front End Developer";
        values.depId = 1;
        values.departmentName = "Software Testing";
        values.empcatId = 1;
        values.empCatName = "Permanent Employee";

        try {
            const response = await axios.post(
                `${APIbackendURl.basePointUrl}employeeservice/employeeDetails/createEmployeeDetails`,
                values
            );
            console.log(response.data);
            onSave(values);
            navigate('/employees/emp-list');
            window.location.reload();


        } catch (error) {
            console.error(error);
        }
    };

    const formik = useFormik({
        initialValues: {
            approverId: "",
            approverName: "",
            authorizerEmpId: "",
            authorizerEmpName: "",
            base64: "",
            bloodGroup: "",
            compId: "",
            companyName: "",
            depId: "",
            departmentName: "",
            desigId: "",
            designationName: "",
            dob: "",
            documentExt: "",
            documentType: "photo",
            emailOff: "",
            emailOthers: "",
            empCatName: "",
            empId: "",
            empcatId: "",
            endDate: "",
            extContractDetails: "",
            fileName: "",
            firstName: "",
            jobSpecification: "",
            joiningDate: "",
            lastName: "",
            location: "",
            middleName: "",
            mobile: "",
            probEndDate: "",
            projConLogin: true,
            reportingName: "",
            reportingTo: "",
            roleId: "",
            roleName: "",
            salesConLogin: true,
            salutation: "",
            startDate: "",
            totalExperience: "",
            userName: "",
        },
        validationSchema,
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const handleFileChange = (event, field) => {
        const file = event.target.files[0];
        formik.setFieldValue(field, file);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Employee Details</DialogTitle>
            <DialogContent>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            {/* First Row */}
                            <Grid container spacing={1}>
                                <Grid item md={12} sm={4} xs={12}>
                                    <StyledTextField
                                        select
                                        size="small"
                                        name="salutation"
                                        label="*Salutation"
                                        variant="outlined"
                                        sx={{ minWidth: 100, marginRight: 1 }}
                                        value={formik.values.salutation}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        margin="normal"
                                        error={formik.touched.salutation && formik.errors.salutation}
                                        helperText={formik.touched.salutation && formik.errors.salutation}
                                    >
                                        {["Mr.", "Miss."].map((item) => (
                                            <MenuItem value={item} key={item}>
                                                {item}
                                            </MenuItem>
                                        ))}
                                    </StyledTextField>
                                    <StyledTextField
                                        sx={{ minWidth: 100, marginRight: 1 }}
                                        size="small"
                                        name="firstName"
                                        label="*First Name"
                                        variant="outlined"
                                        value={formik.values.firstName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        margin="normal"
                                        error={formik.touched.firstName && formik.errors.firstName}
                                        helperText={formik.touched.firstName && formik.errors.firstName}
                                    />
                                    <StyledTextField
                                        sx={{ minWidth: 100, marginRight: 1 }}
                                        size="small"
                                        name="middleName"
                                        label="Middle Name"
                                        variant="outlined"
                                        value={formik.values.middleName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        margin="normal"
                                        error={formik.touched.middleName && formik.errors.middleName}
                                        helperText={formik.touched.middleName && formik.errors.middleName}
                                    />
                                    <StyledTextField
                                        sx={{ minWidth: 100, marginRight: 1 }}
                                        size="small"
                                        name="lastName"
                                        label="*Last Name"
                                        variant="outlined"
                                        value={formik.values.lastName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        margin="normal"
                                        error={formik.touched.lastName && formik.errors.lastName}
                                        helperText={formik.touched.lastName && formik.errors.lastName}
                                    />
                                </Grid>


                                <Grid item xs={12} sm={4} md={4}>
                                    {/* Date of Birth */}
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            fullWidth
                                            value={formik.values.dob}
                                            onChange={(date) => formik.setFieldValue('dob', date)}
                                            renderInput={(props) => (
                                                <TextField
                                                    {...props}
                                                    label="*Date of Birth"
                                                    id="mui-pickers-date"
                                                    sx={{ mb: 1, width: '100%' }}
                                                    size="small"
                                                    margin="normal"
                                                    error={formik.touched.dob && formik.errors.dob}
                                                    helperText={formik.touched.dob && formik.errors.dob}
                                                />
                                            )}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} sm={4} md={4}>
                                    <TextField
                                        size="small"
                                        name="bloodGroup"
                                        label="Blood Group"
                                        variant="outlined"
                                        value={formik.values.bloodGroup}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        fullWidth
                                        margin="normal"
                                        error={formik.touched.bloodGroup && formik.errors.bloodGroup}
                                        helperText={formik.touched.bloodGroup && formik.errors.bloodGroup}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4} md={4}>
                                    <TextField
                                        size="small"
                                        name="userName"
                                        label="User Name"
                                        variant="outlined"
                                        value={formik.values.userName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        fullWidth
                                        margin="normal"
                                        error={formik.touched.userName && formik.errors.userName}
                                        helperText={formik.touched.userName && formik.errors.userName}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4} md={4}>
                                    {/* Joining Date */}
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            fullWidth
                                            value={formik.values.joiningDate}
                                            onChange={(date) => formik.setFieldValue('joiningDate', date)}
                                            renderInput={(props) => (
                                                <TextField
                                                    {...props}
                                                    label="*Joining Date"
                                                    id="mui-pickers-date"
                                                    sx={{ mb: 1, width: '100%' }}
                                                    size="small"
                                                    margin="normal"
                                                    error={formik.touched.joiningDate && formik.errors.joiningDate}
                                                    helperText={formik.touched.joiningDate && formik.errors.joiningDate}
                                                />
                                            )}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} sm={4} md={4}>
                                    <StyledTextField
                                        select
                                        size="small"
                                        name="roleId"
                                        label="*Role"
                                        variant="outlined"
                                        value={formik.values.roleId}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        fullWidth
                                        margin="normal"
                                        error={formik.touched.roleId && formik.errors.roleId}
                                        helperText={formik.touched.roleId && formik.errors.roleId}
                                    >
                                        {roleList ? (
                                            roleList.map((role) => (
                                                <MenuItem value={role.roleId} key={role.roleId}>
                                                    {role.roleName}
                                                </MenuItem>
                                            ))
                                        ) : (
                                            <MenuItem value="">Loading Roles...</MenuItem>
                                        )}

                                    </StyledTextField>

                                </Grid>
                                <Grid item xs={12} sm={4} md={4}>
                                    <StyledTextField
                                        select
                                        size="small"
                                        name="compId"
                                        label="*Company Name"
                                        variant="outlined"
                                        value={formik.values.compId}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        fullWidth
                                        margin="normal"
                                        error={formik.touched.compId && formik.errors.compId}
                                        helperText={formik.touched.compId && formik.errors.compId}
                                    >
                                        {companyList.length > 0 ? (
                                            companyList.map((company) => (
                                                <MenuItem value={company.compId} key={company.compId}>
                                                    {company.compName}
                                                </MenuItem>
                                            ))
                                        ) : (
                                            <MenuItem value="">Loading Companies...</MenuItem>
                                        )}
                                    </StyledTextField>


                                </Grid>

                                <Grid item xs={12} sm={4} md={4}>
                                    <StyledTextField
                                        select
                                        size="small"
                                        name="depId"
                                        label="*Department"
                                        variant="outlined"
                                        value={formik.values.depId}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        fullWidth
                                        margin="normal"
                                        error={formik.touched.depId && formik.errors.depId}
                                        helperText={formik.touched.depId && formik.errors.depId}
                                    >
                                        {departmentList.sort().map((dep) => (
                                            <MenuItem value={dep} key={dep}>
                                                {dep}
                                            </MenuItem>
                                        ))}
                                    </StyledTextField>
                                </Grid>

                                <Grid item xs={12} sm={4} md={4}>
                                    <StyledTextField
                                        select
                                        size="small"
                                        name="desigId"
                                        label="*Designation"
                                        variant="outlined"
                                        value={formik.values.desigId}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        fullWidth
                                        margin="normal"
                                        error={formik.touched.desigId && formik.errors.desigId}
                                        helperText={formik.touched.desigId && formik.errors.desigId}
                                    >
                                        {designationList.sort().map((des) => (
                                            <MenuItem value={des} key={des}>
                                                {des}
                                            </MenuItem>
                                        ))}
                                    </StyledTextField>
                                </Grid>

                                <Grid item xs={12} sm={4} md={4}>
                                    <TextField
                                        size="small"
                                        name="jobSpecification"
                                        label="Job Specification"
                                        variant="outlined"
                                        value={formik.values.jobSpecification}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        fullWidth
                                        margin="normal"
                                        error={formik.touched.jobSpecification && formik.errors.jobSpecification}
                                        helperText={formik.touched.jobSpecification && formik.errors.jobSpecification}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4} md={4}>
                                    <TextField
                                        size="small"
                                        name="emailOff"
                                        label="Company Email"
                                        placeholder="company@email.com"
                                        variant="outlined"
                                        value={formik.values.emailOff}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        fullWidth
                                        margin="normal"
                                        error={formik.touched.emailOff && formik.errors.emailOff}
                                        helperText={formik.touched.emailOff && formik.errors.emailOff}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4} md={4}>
                                    <TextField
                                        size="small"
                                        name="emailOthers"
                                        label="*Personal Email"
                                        placeholder="username@email.com"
                                        variant="outlined"
                                        value={formik.values.emailOthers}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        fullWidth
                                        margin="normal"
                                        error={formik.touched.emailOthers && formik.errors.emailOthers}
                                        helperText={formik.touched.emailOthers && formik.errors.emailOthers}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4} md={4}>
                                    <TextField
                                        size="small"
                                        name="mobile"
                                        label="*Mobile Number"
                                        variant="outlined"
                                        value={formik.values.mobile}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        fullWidth
                                        margin="normal"
                                        error={formik.touched.mobile && formik.errors.mobile}
                                        helperText={formik.touched.mobile && formik.errors.mobile}
                                    />
                                </Grid>
                                {/* Add the remaining input fields here */}
                                {/* Example: */}
                                <Grid item xs={12} sm={4} md={4}>
                                    <TextField
                                        size="small"
                                        name="location"
                                        label="Location"
                                        variant="outlined"
                                        value={formik.values.location}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        fullWidth
                                        margin="normal"
                                        error={formik.touched.location && formik.errors.location}
                                        helperText={formik.touched.location && formik.errors.location}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4} md={4}>
                                    <TextField
                                        size="small"
                                        name="totalExperience"
                                        label="*Total Experience in yrs"
                                        variant="outlined"
                                        value={formik.values.totalExperience}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        fullWidth
                                        margin="normal"
                                        error={formik.touched.totalExperience && formik.errors.totalExperience}
                                        helperText={formik.touched.totalExperience && formik.errors.totalExperience}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4} md={4}>
                                    <TextField
                                        size="small"
                                        name="authorizerEmpId"
                                        label="*Authorizer"
                                        variant="outlined"
                                        value={formik.values.authorizerEmpId}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        fullWidth
                                        margin="normal"
                                        error={formik.touched.authorizerEmpId && formik.errors.authorizerEmpId}
                                        helperText={formik.touched.authorizerEmpId && formik.errors.authorizerEmpId}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={4} md={4}>
                                    <TextField
                                        size="small"
                                        name="reportingTo"
                                        label="*Reporting To"
                                        variant="outlined"
                                        value={formik.values.reportingTo}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        fullWidth
                                        margin="normal"
                                        error={formik.touched.reportingTo && formik.errors.reportingTo}
                                        helperText={formik.touched.reportingTo && formik.errors.reportingTo}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={4} md={4}>
                                    <TextField
                                        size="small"
                                        name="approverId"
                                        label="*Approver"
                                        variant="outlined"
                                        value={formik.values.approverId}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        fullWidth
                                        margin="normal"
                                        error={formik.touched.approverId && formik.errors.approverId}
                                        helperText={formik.touched.approverId && formik.errors.approverId}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={4} md={4}>
                                    <StyledTextField
                                        select
                                        size="small"
                                        name="empCatId"
                                        label="*Employment Category"
                                        variant="outlined"
                                        value={formik.values.empCatId}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        fullWidth
                                        margin="normal"
                                        error={formik.touched.empCatId && formik.errors.empCatId}
                                        helperText={formik.touched.empCatId && formik.errors.empCatId}
                                    >
                                        {empCatList.sort().map((cat) => (
                                            <MenuItem value={cat} key={cat}>
                                                {cat}
                                            </MenuItem>
                                        ))}
                                    </StyledTextField>
                                </Grid>
                                <Grid item xs={12} sm={4} md={4}>
                                    {/* Probationary End Date */}
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            fullWidth
                                            value={formik.values.probEndDate}
                                            onChange={(date) => formik.setFieldValue('probEndDate', date)}
                                            renderInput={(props) => (
                                                <TextField
                                                    {...props}
                                                    label="Probationary End Date"
                                                    id="mui-pickers-date"
                                                    sx={{ mb: 1, width: '100%' }}
                                                    size="small"
                                                    margin="normal"
                                                    error={formik.touched.probEndDate && formik.errors.probEndDate}
                                                    helperText={formik.touched.probEndDate && formik.errors.probEndDate}
                                                />
                                            )}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} sm={4} md={4}>
                                    {/* From Date */}
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            fullWidth
                                            value={formik.values.startDate}
                                            onChange={(date) => formik.setFieldValue('startDate', date)}
                                            renderInput={(props) => (
                                                <TextField
                                                    {...props}
                                                    label="From Date"
                                                    id="mui-pickers-date"
                                                    sx={{ mb: 1, width: '100%' }}
                                                    size="small"
                                                    margin="normal"
                                                    error={formik.touched.startDate && formik.errors.startDate}
                                                    helperText={formik.touched.startDate && formik.errors.startDate}
                                                />
                                            )}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} sm={4} md={4}>
                                    {/* To Date */}
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            fullWidth
                                            value={formik.values.endDate}
                                            onChange={(date) => formik.setFieldValue('endDate', date)}
                                            renderInput={(props) => (
                                                <TextField
                                                    {...props}
                                                    label="To Date"
                                                    id="mui-pickers-date"
                                                    sx={{ mb: 1, width: '100%' }}
                                                    size="small"
                                                    margin="normal"
                                                    error={formik.touched.endDate && formik.errors.endDate}
                                                    helperText={formik.touched.endDate && formik.errors.endDate}
                                                />
                                            )}
                                        />
                                    </ LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} sm={4} md={4}>
                                    <TextField
                                        size="small"
                                        name="contractExtension"
                                        label="Contract Extension"
                                        variant="outlined"
                                        value={formik.values.contractExtension}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        fullWidth
                                        margin="normal"
                                        error={formik.touched.contractExtension && formik.errors.contractExtension}
                                        helperText={formik.touched.contractExtension && formik.errors.contractExtension}
                                    />
                                </Grid>


                                <Grid item xs={12}>
                                    {/* Connect User Type */}
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend"></FormLabel>
                                        <RadioGroup
                                            row
                                            aria-label="connect-user-type"
                                            name="connectUserType"
                                            value={formik.values.connectUserType}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        >
                                            <FormControlLabel
                                                value="Project"
                                                control={<Radio />}
                                                label="*Project Connect User"
                                            />
                                            <FormControlLabel
                                                value="Sales"
                                                control={<Radio />}
                                                label="*Sales Connect User"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                {/* ... */}
                            </Grid>
                        </Grid>
                    </Grid>

                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={onSave} type="submit" color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
};

// const roleList = ["admin", "employee", "hr"];
// const companyList = ["RIM", "3D CAD", "3DCADVS"];
const designationList = ["Software Testing", "Software Development", ""];

const departmentList = ["Front End Developer", "Test Engineer"];
const empCatList = ["Permanent Employee", "Contract", "PROBATIONARY", "Consultant"];

const maritalstatusList = ["Single", "Married", "Divorced"];
const genderList = ["Male", "Female"];


export default HREmpCreatingForm;