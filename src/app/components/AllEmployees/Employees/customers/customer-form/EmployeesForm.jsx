employeeform

import { Box, Button, Card, Divider, Grid, Icon, MenuItem, styled, TextField } from "@mui/material";
import { Breadcrumb } from "app/components";
import { FlexAlignCenter, FlexBox } from "app/components/FlexBox";
import { H4 } from "app/components/Typography";
import { convertHexToRGB } from "app/utils/utils";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { useDropzone } from "react-dropzone";
import * as yup from "yup";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { APIbackend } from '../../../../../../APIbackendurl';


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

const EmployeeForm = () => {
  const [imageList, setImageList] = useState([]);
  const { APIbackendURl } = useContext(APIbackend);
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
          <H4> Personal Information</H4>
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
            bloodgroup: "",
            companyemail: "",
            personalemail: "",
            mobile: "",
            username: "",
            companyname: "",
          }}
          validationSchema={yup.object().shape({
            salutation: yup.string().required("Salutation is required"),
            firstName: yup.string().required("First Name is required"),
            lastName: yup.string().required("Last Name is required"),
            bloodgroup: yup.string().required("Blood Group is required"),
            personalemail: yup.string().email("Invalid email").required("Personal Email is required"),
            mobile: yup.string().required("Mobile is required"),
            username: yup.string().required("User Name is required"),
            companyname: yup.string().required("Company Name is required"),
          })}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  {/* First Row */}
                  <Grid container spacing={3}>
                    <Grid item md={10} sm={4} xs={12}>
                      <Box display="flex" flexWrap="wrap">
                        <StyledTextField
                          select
                          size="small"
                          name="salutation"
                          label="*Salutation"
                          variant="outlined"
                          sx={{ minWidth: 100, marginRight: 2 }}
                          value={values.salutation || ""}
                          onChange={handleChange}
                          error={Boolean(touched.salutation && errors.salutation)}
                          helperText={touched.salutation && errors.salutation}
                        >
                          {["Mr.", "Mrs.", "Ms.", "Miss.", "Dr."].map((item) => (
                            <MenuItem value={item} key={item}>
                              {item}
                            </MenuItem>
                          ))}
                        </StyledTextField>
                        <StyledTextField
                          sx={{ minWidth: 100, marginRight: 2 }}
                          size="small"
                          name="firstName"
                          label="*First Name"
                          variant="outlined"
                          value={values.firstName}
                          onChange={handleChange}
                          error={Boolean(touched.firstName && errors.firstName)}
                          helperText={touched.firstName && errors.firstName}
                        />
                        <StyledTextField
                          sx={{ minWidth: 100, marginRight: 1 }}
                          size="small"
                          name="middleName"
                          label="Middle Name"
                          variant="outlined"
                          value={values.middleName}
                          onChange={handleChange}
                          error={Boolean(touched.middleName && errors.middleName)}
                          helperText={touched.middleName && errors.middleName}
                        />
                        <StyledTextField
                          sx={{ minWidth: 100, marginRight: 1 }}
                          size="small"
                          name="lastName"
                          label="*Last Name"
                          variant="outlined"
                          value={values.lastName}
                          onChange={handleChange}
                          error={Boolean(touched.lastName && errors.lastName)}
                          helperText={touched.lastName && errors.lastName}

                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          value={date}
                          onChange={handleDateChange}
                          renderInput={(props) => (
                            <TextField
                              {...props}
                              label="*Date of Birth"
                              id="mui-pickers-date"
                              sx={{ mb: 1, width: "100%" }}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                      <StyledTextField
                        fullWidth
                        multiline
                        size="small"
                        name="bloodgroup"
                        variant="outlined"
                        label="*Blood Group"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.bloodgroup || ""}
                        error={Boolean(touched.bloodgroup && errors.bloodgroup)}
                        helperText={touched.bloodgroup && errors.bloodgroup}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                      <StyledTextField
                        fullWidth
                        multiline
                        name="companyemail"
                        size="small"
                        type="email"
                        variant="outlined"
                        label="Company Email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.companyemail || ""}
                        error={Boolean(touched.companyemail && errors.companyemail)}
                        helperText={touched.companyemail && errors.companyemail}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                      <StyledTextField
                        fullWidth
                        multiline
                        name="personalemail"
                        size="small"
                        type="email"
                        variant="outlined"
                        label="*Personal Email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.personalemail || ""}
                        error={Boolean(touched.personalemail && errors.personalemail)}
                        helperText={touched.personalemail && errors.personalemail}

                      />
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                      <StyledTextField
                        fullWidth
                        multiline
                        size="small"
                        name="mobile"
                        label="*Mobile"
                        variant="outlined"
                        value={values.mobile}
                        onChange={handleChange}
                        error={Boolean(touched.mobile && errors.mobile)}
                        helperText={touched.mobile && errors.mobile}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                      <StyledTextField

                        fullWidth
                        multiline
                        size="small"
                        name="username"
                        label="*User Name"
                        variant="outlined"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.username || ""}
                        error={Boolean(touched.username && errors.username)}
                        helperText={touched.username && errors.username}
                      />

                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>


                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          fullWidth
                          multiline
                          value={date}
                          onChange={handleDateChange}
                          renderInput={(props) => (
                            <TextField
                              {...props}
                              label="*Date of Joining"
                              id="mui-pickers-date"
                              sx={{ mb: 1, width: "100%" }}
                            />
                          )}
                        />
                      </LocalizationProvider>

                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                      <StyledTextField
                        select
                        fullWidth
                        size="small"
                        name="companyname"
                        label="Company Name"
                        variant="outlined"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.companyname || ""}
                        error={Boolean(touched.companyname && errors.companyname)}
                        helperText={touched.companyname && errors.companyname}
                      >
                        {companyList.sort().map((com) => (
                          <MenuItem value={com} key={com}>
                            {com}
                          </MenuItem>
                        ))}
                      </StyledTextField>

                    </Grid>

                    <Grid item xs={12} sm={4} md={4}>
                      <StyledTextField
                        select
                        fullWidth
                        size="small"
                        name="role"
                        label="Role"
                        variant="outlined"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.role || ""}
                        error={Boolean(touched.role && errors.role)}
                        helperText={touched.role && errors.role}
                      >
                        {roleList.sort().map((rol) => (
                          <MenuItem value={rol} key={rol}>
                            {rol}
                          </MenuItem>
                        ))}
                      </StyledTextField>
                    </Grid>

                    <Grid item xs={12} sm={4} md={4}>
                      <StyledTextField
                        select
                        fullWidth
                        size="small"
                        name="department"
                        label="Department"
                        variant="outlined"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.department || ""}
                        error={Boolean(touched.department && errors.department)}
                        helperText={touched.department && errors.department}
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
                        fullWidth
                        multiline
                        size="small"
                        name="height"
                        variant="outlined"
                        label="Height"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.height || ""}
                        error={Boolean(touched.height && errors.height)}
                        helperText={touched.height && errors.height}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                      <StyledTextField
                        fullWidth
                        multiline
                        size="small"
                        name="weight"
                        variant="outlined"
                        label="Weight"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.weight || ""}
                        error={Boolean(touched.weight && errors.weight)}
                        helperText={touched.weight && errors.weight}
                      />

                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          value={date}
                          onChange={handleDateChange}
                          renderInput={(props) => (
                            <TextField
                              {...props}
                              label="Date of Anniversary"
                              id="mui-pickers-date"
                              sx={{ mb: 1, width: "100%" }}
                            />
                          )}
                        />
                      </LocalizationProvider>

                    </Grid>


                    <Grid item xs={12} sm={4} md={4}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          value={date}
                          onChange={handleDateChange}
                          renderInput={(props) => (
                            <TextField
                              {...props}
                              label="Service Anniversary"
                              id="mui-pickers-date"
                              sx={{ mb: 1, width: "100%" }}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>

                    <Grid item xs={12} sm={4} md={4}>
                      <StyledTextField
                        select
                        fullWidth
                        size="small"
                        name="maritalstatus"
                        label="Marital Status"
                        variant="outlined"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.maritalstatus || ""}
                        error={Boolean(touched.maritalstatus && errors.maritalstatus)}
                        helperText={touched.maritalstatus && errors.maritalstatus}
                      >
                        {maritalstatusList.sort().map((mar) => (
                          <MenuItem value={mar} key={mar}>
                            {mar}
                          </MenuItem>
                        ))}
                      </StyledTextField>

                    </Grid>

                    <Grid item xs={12} sm={4} md={4}>
                      <StyledTextField
                        select
                        fullWidth
                        size="small"
                        name="gender"
                        label="*Gender"
                        variant="outlined"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.gender || ""}
                        error={Boolean(touched.gender && errors.gender)}
                        helperText={touched.gender && errors.gender}
                      >
                        {genderList.sort().map((gen) => (
                          <MenuItem value={gen} key={gen}>
                            {gen}
                          </MenuItem>
                        ))}
                      </StyledTextField>

                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                      <StyledTextField
                        fullWidth
                        multiline
                        size="small"
                        name="fathername"
                        variant="outlined"
                        label="*Father/Husband name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.fathername || ""}
                        error={Boolean(touched.fathername && errors.fathername)}
                        helperText={touched.fathername && errors.fathername}
                      />

                    </Grid>

                    <Grid item xs={12} sm={4} md={4}>
                      <StyledTextField
                        fullWidth
                        multiline
                        size="small"
                        name="relationship"
                        variant="outlined"
                        label="Relationship"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.relationship || ""}
                        error={Boolean(touched.relationship && errors.relationship)}
                        helperText={touched.relationship && errors.relationship}
                      />

                    </Grid>

                    <Grid item xs={12} sm={4} md={4}>
                      <DropZone {...getRootProps()}>
                        <input {...getInputProps()} />
                        <FlexBox alignItems="center" flexDirection="column">
                          <Icon sx={{ color: "text.secondary", fontSize: "10px" }}>publish</Icon>
                          {imageList.length ? (
                            <span>{imageList.length} images were selected</span>
                          ) : (
                            <span>*Upload(Multiple Attachements like Voter ID, Aadhar Card, DL)</span>
                          )}
                        </FlexBox>
                      </DropZone>
                    </Grid>

                    <Grid item xs={12} sm={4} md={4}>

                      <Grid item xs={12} sm={4} md={4}>
                        <DropZone {...getRootProps()}>
                          <input {...getInputProps()} />
                          <FlexBox alignItems="center" flexDirection="column">
                            <Icon sx={{ color: "text.secondary", fontSize: "30px" }}>publish</Icon>
                            {imageList.length ? (
                              <span>{imageList.length} images were selected</span>
                            ) : (
                              <span>*Photo</span>
                            )}
                          </FlexBox>
                        </DropZone>
                      </Grid>
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

const productSchema = yup.object().shape({
  salutation: yup.string().required("Salutation is required"),
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  bloodgroup: yup.string().required("Blood Group is required"),
  personalemail: yup.string().email("Invalid email").required("Personal Email is required"),
  mobile: yup.string().required("Mobile is required"),
  username: yup.string().required("User Name is required"),
  companyname: yup.string().required("Company Name is required"),


});

const initialValues = {
  salutation: "",
  firstName: "",
  middleName: "",
  lastName: "",
  bloodgroup: "",
  companyemail: "",
  personalemail: "",
  mobile: "",
  username: "",
  companyname: "",

};

const salutationList = ["Mr.", "Mrs.", "Ms.", "Miss.", "Dr."];
const roleList = ["Employee", "Admin", "HR", "IT"];
const companyList = ["RIM", "3D CAD"];
const departmentList = ["Software Development", "Software Testing", "Project Management"];
const maritalstatusList = ["Single", "Married", "Divorced"];
const genderList = ["Male", "Female"];


export default EmployeeForm;
