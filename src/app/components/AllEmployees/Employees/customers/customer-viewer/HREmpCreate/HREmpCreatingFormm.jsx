//
import React, { useState, useEffect, useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { APIbackend } from '../../../../../../../APIbackendurl';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    FormControl,
    FormLabel,
    InputLabel,
    Input,
    Box,
    Grid,
    MenuItem,
    styled,
    Snackbar,
    Alert,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers';
import HREmpCrudTable from '../../../HREmpCrudTable';


const StyledTextField = styled(TextField)({ marginBottom: "16px" });

const validationSchema = Yup.object().shape({
    // empId: Yup.number().required('Employee ID is required'),
    // documentType: Yup.string().required('Document Type is required'),
    // documentExt: Yup.string().required('Document Extension is required'),
    // base64: Yup.string().nullable(),
    // fileName: Yup.string().required('File Name is required'),
    salutation: Yup.string().required('Salutation is required'),
    firstName: Yup.string().required('First Name is required'),
    // middleName: Yup.string().nullable(),
    lastName: Yup.string().required('Last Name is required'),
    dob: Yup.date().required('Date of Birth is required').max(new Date(), 'Date of Birth cannot be in the future'),
    bloodGroup: Yup.string().required('Blood Group is required'),
    userName: Yup.string().required('User Name is required').min(4, 'User Name must be at least 4 characters'),
    password: Yup.string().required('Password is required').min(4, 'Password must be at least 4 characters'),
    joiningDate: Yup.date().required('Joining Date is required').min(Yup.ref('dob'), 'Joining Date must be after Date of Birth'),
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
    // emailOff: Yup.string().email('Invalid email format').required('Company Email is required'),
    // emailOthers: Yup.string().email('Invalid email format').required('Personal Email is required'),
    // empCatName: Yup.string().required('Employee Category Name is required'),
    // empcatId: Yup.string().required('Employee Category ID is required'),
    // endDate: Yup.date().required('End Date is required'),
    // extContractDetails: Yup.string().required('External Contract Details is required'),
    // firstName: Yup.string().required('First Name is required'),
    // jobSpecification: Yup.string().required('Job Specification is required'),
    // lastName: Yup.string().required('Last Name is required'),
    // location: Yup.string().required('Location is required'),
    // middleName: Yup.string().nullable(),
    // mobile: Yup.string()
    // .matches(/^[0-9]{10}$/, 'Invalid mobile number')
    // .required('Mobile Number is required'),
    // probEndDate: Yup.date().required('Probation End Date is required'),
    // projConLogin: Yup.boolean().required('Project Consultant Login is required'),
    // reportingName: Yup.string().required('Reporting Name is required'),
    // reportingTo: Yup.number().required('Reporting To is required'),
    // roleId: Yup.string().required('Role ID is required'),
    // roleName: Yup.string().required('Role Name is required'),
    // salesConLogin: Yup.boolean().required('Sales Consultant Login is required'),
    // startDate: Yup.date().required('Start Date is required'),
    // totalExperience: Yup.number()
    // .typeError('Total Experience must be a number')
    // .positive('Total Experience must be a positive number')
    // .integer('Total Experience must be an integer')
    // .required('Total Experience is required'),
});


const HREmpCreatingForm = ({ open, handleClose, onSave }) => {
    const [roleList, setRoleList] = useState([]);
    const [companyList, setCompanyList] = useState([]); // State variable for company names
    const [departmentList, setDepartmentList] = useState([]);

    const { APIbackendURl } = useContext(APIbackend);
    const token = sessionStorage.getItem('token');
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');
    const [isSaving, setIsSaving] = useState(false);


    const handleOpenAlert = (message, severity) => {
        setAlertMessage(message);
        setAlertSeverity(severity);
        setAlertOpen(true);
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertOpen(false);
    };

    useEffect(() => {
        fetchRoles();
        fetchCompanies();
        fetchDepartments();

    }, []);


    const fetchRoles = async () => {
        try {
            const response = await axios.get(
                `${APIbackendURl.basePointUrl}applicationservice/Admin/PortalMaster/RoleMaster/View?page=1&size=0`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const { roleNpdModels } = response.data; // Extract the roleNpdModels array from the response

            if (Array.isArray(roleNpdModels)) {
                setRoleList(roleNpdModels); // Assuming you have a function like setRoleList to update the role list in your state or data structure
            } else {
                console.error('RoleNpdModels response is not an array:', roleNpdModels);
            }
        } catch (error) {
            console.error('Error fetching roles:', error);
        }
    };


    const fetchCompanies = async () => {
        try {
            const response = await axios.post(
                `${APIbackendURl.basePointUrl}applicationservice/Company/CompanyMaster/CompanyMaster/View?page=1&size=0`,
                null,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const { companyModels } = response.data; // Extract the companyModels array from the response

            if (Array.isArray(companyModels)) {
                setCompanyList(companyModels); // Assuming you have a function like setCompanyList to update the company list in your state or data structure
            } else {
                console.error('CompanyModels response is not an array:', companyModels);
            }
        } catch (error) {
            console.error('Error fetching companies:', error);
        }
    };


    const fetchDepartments = async () => {
        try {
            const response = await axios.post(
                `${APIbackendURl.basePointUrl}applicationservice/Department/DepartmentMaster/Department/View?page=1&size=0`,
                null,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const { departmentModels } = response.data; // Extract the departmentModels array from the response

            if (Array.isArray(departmentModels)) {
                setDepartmentList(departmentModels);
            } else {
                console.error('DepartmentModels response is not an array:', departmentModels);
            }
        } catch (error) {
            console.error('Error fetching departments:', error);
        }
    };

    const navigate = useNavigate();
    const handleSubmit = async (values) => {
        // values.reportingTo = 0;
        // values.approverId = 0;
        // values.authorizerEmpId = 0;
        // values.compId = 1;
        // values.companyName = "RIM";
        values.roleId = 1;
        // values.roleName = "admin";
        values.desigId = 1;
        // values.designationName = "Front End Developer";
        // values.depId = 1;
        // values.departmentName = "Software Testing";
        // values.empcatId = 0;
        // values.empCatName = "Permanent Employee";
        // values.dob = "2023-11-03";
        // values.joiningDate = "2023-11-03";
        // values.probEndDate = "2023-11-03";
        // values.startDate = "2023-11-03";
        // values.endDate = "2023-11-03";

        try {
            const response = await axios.post(
                `${APIbackendURl.basePointUrl}applicationservice/Admin/PortalMaster/UserMaster/Create`,
                values,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data);
            formik.resetForm();

            onSave(values);
            handleOpenAlert('Employee created successfully', 'success');
            onSave("Employee created successfully", "success"); // Call the onSave function with success message

            HREmpCrudTable.updatePageData();

            navigate('/employees/emp-list');
            setIsSaving(true);

            setTimeout(() => {
                setIsSaving(false);
                handleClose();
            }, 1000); // Delay closing for 2 seconds (2000 milliseconds)

            // window.location.reload();
        } catch (error) {
            console.error(error);
            onSave("Error creating employee", "error"); // Call the onSave function with error message
            handleOpenAlert('Error creating employee', 'error');
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
            // empId: 0,
            empcatId: "",
            // endDate: "",
            // extContractDetails: "",
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
            // startDate: "",
            // totalExperience: 0,
            userName: "",
            password: "",
            status: "ACTIVE",
            empNo: "",
            // probEndDate: "2023-11-03",


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
        <Dialog open={open} onClose={handleClose} fullWidth autoComplete="off" >
            <DialogTitle>Add Employee Details</DialogTitle>
            <DialogContent>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Grid item xs={12}>
                                <label htmlFor="profilePhoto">
                                    <Button component="span" startIcon={<AccountCircleIcon />}>
                                        {formik.values.profilePhoto ? 'Change Profile Photo' : '*Upload Profile Photo'}
                                    </Button>
                                </label>
                                <input
                                    accept="image/*"
                                    id="profilePhoto"
                                    name="profilePhoto"
                                    type="file"
                                    onChange={(event) => handleFileChange(event, 'profilePhoto')}
                                    hidden
                                />
                            </Grid>
                            {/* First Row */}
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={4} md={4}>
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
                                        fullWidth
                                        autoComplete="off"
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
                                </Grid>

                                <Grid item xs={12} sm={4} md={4}>

                                    <StyledTextField
                                        sx={{ minWidth: 100, marginRight: 1 }}
                                        autocomplete="off"
                                        size="small"
                                        name="firstName"
                                        label="*First Name"
                                        variant="outlined"
                                        value={formik.values.firstName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        fullWidth
                                        autoComplete="off"
                                        margin="normal"
                                        error={formik.touched.firstName && formik.errors.firstName}
                                        helperText={formik.touched.firstName && formik.errors.firstName}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={4} md={4}>

                                    <StyledTextField
                                        sx={{ minWidth: 100, marginRight: 1 }}
                                        size="small"
                                        name="middleName"
                                        label="Middle Name"
                                        variant="outlined"
                                        value={formik.values.middleName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        fullWidth
                                        autoComplete="off"
                                        margin="normal"
                                        error={formik.touched.middleName && formik.errors.middleName}
                                        helperText={formik.touched.middleName && formik.errors.middleName}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={4} md={4}>

                                    <StyledTextField
                                        sx={{ minWidth: 100, marginRight: 1 }}
                                        size="small"
                                        name="lastName"
                                        label="*Last Name"
                                        variant="outlined"
                                        value={formik.values.lastName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        fullWidth
                                        autoComplete="off"
                                        margin="normal"
                                        error={formik.touched.lastName && formik.errors.lastName}
                                        helperText={formik.touched.lastName && formik.errors.lastName}
                                    />

                                </Grid>

                                <Grid item xs={12} sm={4} md={4}>
                                    <StyledTextField
                                        size="small"
                                        name="userName"
                                        label="*User Name"
                                        variant="outlined"
                                        value={formik.values.userName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        fullWidth
                                        autoComplete="off"
                                        margin="normal"
                                        error={formik.touched.userName && formik.errors.userName}
                                        helperText={formik.touched.userName && formik.errors.userName}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4} md={4}>
                                    <StyledTextField
                                        size="small"
                                        type="password" // Set the input type to "password"
                                        name="password" // Add the "password" field to formik initialValues and validationSchema
                                        label="*Password"
                                        variant="outlined"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        fullWidth
                                        autoComplete="off"
                                        margin="normal"
                                        error={formik.touched.password && formik.errors.password}
                                        helperText={formik.touched.password && formik.errors.password}
                                    />
                                </Grid>


                                <Grid item xs={12} sm={4} md={4}>
                                    {/* Date of Birth */}
                                    <InputLabel htmlFor="mui-pickers-date">*Date of Birth</InputLabel>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            fullWidth
                                            autoComplete="off"
                                            format='dd-MM-yyyy'
                                            value={formik.values.dob}
                                            onChange={(date) => formik.setFieldValue('dob', date)}
                                            renderInput={(props) => (
                                                <StyledTextField
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
                                    {/* Joining Date */}
                                    <InputLabel htmlFor="mui-pickers-date">*Joining Date</InputLabel>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            fullWidth
                                            autoComplete="off"
                                            format='dd-MM-yyyy'
                                            value={formik.values.joiningDate}
                                            onChange={(date) => formik.setFieldValue('joiningDate', date)}
                                            renderInput={(props) => (
                                                <StyledTextField
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
                                        size="small"
                                        name="bloodGroup"
                                        label="*Blood Group"
                                        variant="outlined"
                                        value={formik.values.bloodGroup}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        fullWidth
                                        autoComplete="off"
                                        margin="normal"
                                        error={formik.touched.bloodGroup && formik.errors.bloodGroup}
                                        helperText={formik.touched.bloodGroup && formik.errors.bloodGroup}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={4} md={4}>
                                    <StyledTextField
                                        select
                                        size="small"
                                        name="role"
                                        label="Role"
                                        variant="outlined"
                                        value={formik.values.role}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        fullWidth
                                        autoComplete="off"
                                        margin="normal"
                                        error={formik.touched.role && formik.errors.role}
                                        helperText={formik.touched.role && formik.errors.role}
                                    >
                                        {roleList && roleList.length > 0 ? (
                                            roleList.map((role) => (
                                                <MenuItem value={role.roleName} key={role.roleId}>
                                                    {role.roleName}
                                                </MenuItem>
                                            ))
                                        ) : (
                                            <MenuItem value="" disabled>
                                                No roles available
                                            </MenuItem>
                                        )}
                                    </StyledTextField>
                                </Grid>


                                <Grid item xs={12} sm={4} md={4}>
                                    <StyledTextField
                                        select
                                        size="small"
                                        name="companyName"
                                        label="Company Name"
                                        variant="outlined"
                                        value={formik.values.companyName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        fullWidth
                                        autoComplete="off"
                                        margin="normal"
                                        error={formik.touched.companyName && formik.errors.companyName}
                                        helperText={formik.touched.companyName && formik.errors.companyName}
                                    >
                                        {companyList && companyList.length > 0 ? (
                                            companyList.map((company) => (
                                                <MenuItem value={company.companyName} key={company.companyId}>
                                                    {company.companyName}
                                                </MenuItem>
                                            ))
                                        ) : (
                                            <MenuItem value="" disabled>
                                                No companies available
                                            </MenuItem>
                                        )}
                                    </StyledTextField>
                                </Grid>

                                <Grid item xs={12} sm={4} md={4}>
                                    <StyledTextField
                                        select
                                        size="small"
                                        name="department"
                                        label="Department"
                                        variant="outlined"
                                        value={formik.values.department}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        fullWidth
                                        autoComplete="off"
                                        margin="normal"
                                        error={formik.touched.department && formik.errors.department}
                                        helperText={formik.touched.department && formik.errors.department}
                                    >
                                        {departmentList.map((department) => (
                                            <MenuItem value={department.deptName} key={department.deptId}>
                                                {department.deptName}
                                            </MenuItem>
                                        ))}
                                    </StyledTextField>
                                </Grid>



                                <Grid item xs={12} sm={4} md={4}>
                                    <StyledTextField
                                        select
                                        size="small"
                                        name="desigId"
                                        label="Designation"
                                        variant="outlined"
                                        value={formik.values.desigId}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        fullWidth
                                        autoComplete="off"
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
                                    <StyledTextField
                                        size="small"
                                        name="jobSpecification"
                                        label="Job Specification"
                                        variant="outlined"
                                        value={formik.values.jobSpecification}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        fullWidth
                                        autoComplete="off"
                                        margin="normal"
                                        error={formik.touched.jobSpecification && formik.errors.jobSpecification}
                                        helperText={formik.touched.jobSpecification && formik.errors.jobSpecification}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4} md={4}>
                                    <StyledTextField
                                        size="small"
                                        name="emailOff"
                                        label="Company Email"
                                        placeholder="company@email.com"
                                        variant="outlined"
                                        value={formik.values.emailOff}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        fullWidth
                                        autoComplete="off"
                                        margin="normal"
                                        error={formik.touched.emailOff && formik.errors.emailOff}
                                        helperText={formik.touched.emailOff && formik.errors.emailOff}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4} md={4}>
                                    <StyledTextField
                                        size="small"
                                        name="emailOthers"
                                        label="Personal Email"
                                        placeholder="username@email.com"
                                        variant="outlined"
                                        value={formik.values.emailOthers}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        fullWidth
                                        autoComplete="off"
                                        margin="normal"
                                        error={formik.touched.emailOthers && formik.errors.emailOthers}
                                        helperText={formik.touched.emailOthers && formik.errors.emailOthers}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4} md={4}>
                                    <StyledTextField
                                        size="small"
                                        name="mobile"
                                        label="Mobile Number"
                                        variant="outlined"
                                        value={formik.values.mobile}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        fullWidth
                                        autoComplete="off"
                                        margin="normal"
                                        error={formik.touched.mobile && formik.errors.mobile}
                                        helperText={formik.touched.mobile && formik.errors.mobile}
                                    />
                                </Grid>
                                {/* Add the remaining input fields here */}
                                {/* Example: */}
                                <Grid item xs={12} sm={4} md={4}>
                                    <StyledTextField
                                        size="small"
                                        name="location"
                                        label="Location"
                                        variant="outlined"
                                        value={formik.values.location}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        fullWidth
                                        autoComplete="off"
                                        margin="normal"
                                        error={formik.touched.location && formik.errors.location}
                                        helperText={formik.touched.location && formik.errors.location}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4} md={4}>
                                    <StyledTextField
                                        size="small"
                                        name="totalExperience"
                                        label="Total Experience in yrs"
                                        variant="outlined"
                                        value={formik.values.totalExperience}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        fullWidth
                                        autoComplete="off"
                                        margin="normal"
                                        error={formik.touched.totalExperience && formik.errors.totalExperience}
                                        helperText={formik.touched.totalExperience && formik.errors.totalExperience}
                                    />
                                </Grid>
                                {/* <Grid item xs={12} sm={4} md={4}>
                                    <StyledTextField
                                        size="small"
                                        name="authorizerEmpId"
                                        label="*Authorizer"
                                        variant="outlined"
                                        value={formik.values.authorizerEmpId}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        fullWidth
                                                        autoComplete="off"
                                        margin="normal"
                                        error={formik.touched.authorizerEmpId && formik.errors.authorizerEmpId}
                                        helperText={formik.touched.authorizerEmpId && formik.errors.authorizerEmpId}
                                    />
                                </Grid> */}

                                <Grid item xs={12} sm={4} md={4}>
                                    <StyledTextField
                                        select
                                        size="small"
                                        name="authorizerEmpId"
                                        label="Authorizer"
                                        variant="outlined"
                                        value={formik.values.authorizerEmpId}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        fullWidth
                                        autoComplete="off"
                                        margin="normal"
                                        error={formik.touched.authorizerEmpId && formik.errors.authorizerEmpId}
                                        helperText={formik.touched.authorizerEmpId && formik.errors.authorizerEmpId}
                                    >
                                        {authorizerList.sort().map((aut) => (
                                            <MenuItem value={aut} key={aut}>
                                                {aut}
                                            </MenuItem>
                                        ))}
                                    </StyledTextField>
                                </Grid>


                                <Grid item xs={12} sm={4} md={4}>
                                    <StyledTextField
                                        size="small"
                                        name="reportingTo"
                                        label="Reporting To"
                                        variant="outlined"
                                        value={formik.values.reportingTo}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        fullWidth
                                        autoComplete="off"
                                        margin="normal"
                                        error={formik.touched.reportingTo && formik.errors.reportingTo}
                                        helperText={formik.touched.reportingTo && formik.errors.reportingTo}
                                    />
                                </Grid>

                                {/* <Grid item xs={12} sm={4} md={4}>
                                    <StyledTextField
                                        size="small"
                                        name="approverId"
                                        label="*Approver"
                                        variant="outlined"
                                        value={formik.values.approverId}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        fullWidth
                                                        autoComplete="off"
                                        margin="normal"
                                        error={formik.touched.approverId && formik.errors.approverId}
                                        helperText={formik.touched.approverId && formik.errors.approverId}
                                    />
                                </Grid> */}

                                <Grid item xs={12} sm={4} md={4}>
                                    <StyledTextField
                                        select
                                        size="small"
                                        name="approverId"
                                        label="Approver"
                                        variant="outlined"
                                        value={formik.values.approverId}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        fullWidth
                                        autoComplete="off"
                                        margin="normal"
                                        error={formik.touched.approverId && formik.errors.approverId}
                                        helperText={formik.touched.approverId && formik.errors.approverId}
                                    >
                                        {approverList.sort().map((app) => (
                                            <MenuItem value={app} key={app}>
                                                {app}
                                            </MenuItem>
                                        ))}
                                    </StyledTextField>
                                </Grid>

                                <Grid item xs={12} sm={4} md={4}>
                                    <StyledTextField
                                        select
                                        size="small"
                                        name="empCatId"
                                        label="Employment Category"
                                        variant="outlined"
                                        value={formik.values.empCatId}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        fullWidth
                                        autoComplete="off"
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
                                {formik.values.empCatId === "PROBATIONARY" && (
                                    <Grid item xs={12}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={12} sm={4} md={4}>
                                                {/* Probationary End Date */}
                                                <InputLabel htmlFor="mui-pickers-date">Probationary End Date</InputLabel>

                                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                    <DatePicker
                                                        fullWidth
                                                        autoComplete="off"
                                                        format='dd-MM-yyyy'
                                                        value={formik.values.probEndDate}
                                                        onChange={(date) => formik.setFieldValue('probEndDate', date)}
                                                        renderInput={(props) => (
                                                            <StyledTextField
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
                                                <InputLabel htmlFor="mui-pickers-date">From Date</InputLabel>

                                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                    <DatePicker
                                                        fullWidth
                                                        autoComplete="off"
                                                        format='dd-MM-yyyy'
                                                        value={formik.values.startDate}
                                                        onChange={(date) => formik.setFieldValue('startDate', date)}
                                                        renderInput={(props) => (
                                                            <StyledTextField
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
                                                <InputLabel htmlFor="mui-pickers-date">To Date</InputLabel>

                                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                    <DatePicker
                                                        fullWidth
                                                        autoComplete="off"
                                                        format='dd-MM-yyyy'
                                                        value={formik.values.endDate}
                                                        onChange={(date) => formik.setFieldValue('endDate', date)}
                                                        renderInput={(props) => (
                                                            <StyledTextField
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
                                        </Grid>
                                    </Grid>
                                )}

                                {/* <Grid item xs={12} sm={4} md={4}>
                                    <StyledTextField
                                        size="small"
                                        name="contractExtension"
                                        label="Contract Extension"
                                        variant="outlined"
                                        value={formik.values.contractExtension}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        fullWidth
                                                        autoComplete="off"
                                        margin="normal"
                                        error={formik.touched.contractExtension && formik.errors.contractExtension}
                                        helperText={formik.touched.contractExtension && formik.errors.contractExtension}
                                    />
                                </Grid> */}

                                {formik.values.empCatId === "Contract" && (
                                    <Grid item xs={12} sm={4} md={4}>
                                        {/* Contract Extension Field */}
                                        <InputLabel htmlFor="mui-pickers-date">Contract Extension</InputLabel>

                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                fullWidth
                                                autoComplete="off"
                                                format='dd-MM-yyyy'
                                                value={formik.values.contractExtension}
                                                onChange={(date) => formik.setFieldValue('contractExtension', date)}
                                                renderInput={(props) => (
                                                    <StyledTextField
                                                        {...props}
                                                        label="Contract Extension"
                                                        id="mui-pickers-date"
                                                        sx={{ mb: 1, width: '100%' }}
                                                        size="small"
                                                        margin="normal"
                                                        error={formik.touched.contractExtension && formik.errors.contractExtension}
                                                        helperText={formik.touched.contractExtension && formik.errors.contractExtension}
                                                    />
                                                )}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                )}
                                {/* <Grid item xs={12}> */}
                                {/* Connect User Type */}
                                {/* <FormControl component="fieldset">
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
                                    </FormControl> */}
                                {/* </Grid> */}
                                {/* ... */}
                            </Grid>
                        </Grid>
                    </Grid>

                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={() => {
                            formik.handleSubmit(); // This will trigger the form validation
                        }} type="button" color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
            <Snackbar
                open={alertOpen}
                autoHideDuration={3000}
                onClose={handleCloseAlert}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert elevation={6} variant="filled" onClose={handleCloseAlert} severity={alertSeverity}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </Dialog>
    );
};

// const roleList = ["admin", "employee", "hr"];
const designationList = ["Software Testing", "Software Development", ""];
const approverList = ["Parimala", "Sandeep"];
const authorizerList = ["Preetha", "Parimala"];
const departmentList = ["Front End Developer", "Test Engineer"];
const empCatList = ["Permanent Employee", "Contract", "PROBATIONARY", "Consultant"];
const maritalstatusList = ["Single", "Married", "Divorced"];
const genderList = ["Male", "Female"];

export default HREmpCreatingForm;