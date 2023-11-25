import {
  Box,
  Button,
  Card,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  styled,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Breadcrumb } from "app/components";
import { H4 } from "app/components/Typography";
import { Formik } from "formik";
import { useState } from "react";
import AddressForm from "./AddressForm";
import ContactPersonForm from "./ContactPersonForm";
import OtherDetailsForm from "./OtherDetailsForm";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const Form = styled("form")(() => ({ padding: "16px" }));

const StyledTextField = styled(TextField)(() => ({ margin: "8px" }));

const CustomerForm = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [state, setState] = useState({ date: new Date() });

  const handleSubmit = async (values, { isSubmitting }) => {
    console.log(values);
  };
  const handleTabChange = (e, value) => {
    setTabIndex(value);
  };


  const handleDateChange = (date) => setState({ ...state, date });
  const {
    date
  } = state;

  return (
    <Container>
      <div className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Employees", path: "/pages" }, { name: "New Employee" }]} />
      </div>

      <Card elevation={3}>
        <H4 p={2}>Personal Informatiosn</H4>

        <Divider sx={{ mb: 1 }} />

        <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize={true}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,

            handleSubmit,
            isSubmitting,
            setSubmitting,
            setFieldValue,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Grid container spacing={3} alignItems="center">
                <Grid item md={2} sm={4} xs={12}>
                  {/* Employee Type */}
                </Grid>

                <Grid item md={10} sm={8} xs={12}>
                  {/* <FormControl component="fieldset"> */}
                  {/* <RadioGroup
                      row
                      name="customerType"
                      value={values.customerType}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        label="Business"
                        value="business"
                        control={<Radio size="small" color="secondary" />}
                        sx={{ mr: 3, height: 20 }}
                      />
                      <FormControlLabel
                        label="Individual"
                        value="individual"
                        control={<Radio size="small" color="secondary" />}
                        sx={{ height: 20 }}
                      />
                    </RadioGroup> */}
                  {/* </FormControl> */}
                </Grid>

                <Grid item md={2} sm={4} xs={12}>
                  Primary Contact
                </Grid>

                <Grid item md={10} sm={8} xs={12}>
                  <Box m={-1} display="flex" flexWrap="wrap">
                    <StyledTextField
                      select
                      size="small"
                      name="salutation"
                      label="Salutation"
                      variant="outlined"
                      sx={{ minWidth: 100 }}
                      value={values.salutation || ""}
                      onChange={handleChange}
                    >
                      {salutationList.map((item, ind) => (
                        <MenuItem value={item} key={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </StyledTextField>
                    <StyledTextField
                      size="small"
                      name="firstName"
                      label="First Name"
                      variant="outlined"
                      value={values.firstName}
                      onChange={handleChange}
                    />
                    <StyledTextField
                      size="small"
                      name="middleName"
                      label="Middle Name"
                      variant="outlined"
                      value={values.middleName}
                      onChange={handleChange}
                    />
                    <StyledTextField
                      size="small"
                      name="lastName"
                      label="Last Name"
                      variant="outlined"
                      value={values.lastName}
                      onChange={handleChange}
                    />
                  </Box>
                </Grid>

                {/* <Grid >
               <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={date}
                onChange={handleDateChange}
                renderInput={(props) => (
                  <TextField
                    {...props}
                    label="Date of Birth"
                    id="mui-pickers-date"
                    sx={{ mb: 2, width: "100%" }}
                  />
                )}
              />
                </LocalizationProvider>

               </Grid> */}

                <               Grid item md={2} sm={4} xs={12}>
                  Date of Birth
                </Grid>

                <Grid item md={10} sm={8} xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      value={date}
                      onChange={handleDateChange}
                      renderInput={(props) => (
                        <TextField
                          {...props}
                          label="Date of Birth"
                          id="mui-pickers-date"
                          sx={{ mb: 1, width: "25%" }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid item md={2} sm={4} xs={12}>
                  Primary Contact
                </Grid>

                <Grid item md={10} sm={8} xs={12}>
                  <TextField
                    size="small"
                    name="companyName"
                    variant="outlined"
                    label="Company Name"
                    value={values.companyName}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item md={2} sm={4} xs={12}>
                  Customer Display Name
                </Grid>

                <Grid item md={10} sm={8} xs={12}>
                  <TextField
                    size="small"
                    name="displayName"
                    variant="outlined"
                    label="Display Name"
                    value={values.displayName}
                    onChange={handleChange}
                  />
                </Grid>

                {/* <Grid item md={2} sm={4} xs={12}>
                  Company Email
                </Grid>
                <Grid item md={10} sm={8} xs={12}>
                  <TextField
                    name="email"
                    size="small"
                    type="email"
                    variant="outlined"
                    value={values.email}
                    label="Company Email"
                    onChange={handleChange}
                  />
                </Grid> */}

                <Grid item md={2} sm={4} xs={12}>
                  Emails
                </Grid>

                <Grid item md={10} sm={8} xs={12}>
                  <Box m={-1} display="flex" flexWrap="wrap">
                    <StyledTextField
                      size="small"
                      name="workPhone"
                      label="Company Email"
                      variant="outlined"
                      value={values.workPhone}
                      onChange={handleChange}
                    />
                    <StyledTextField
                      size="small"
                      name="mobile"
                      label="Personal Email"
                      variant="outlined"
                      value={values.mobile}
                      onChange={handleChange}
                    />
                  </Box>
                </Grid>

                <Grid item md={2} sm={4} xs={12}>
                  Mobile Number
                </Grid>

                <Grid item md={10} sm={8} xs={12}>
                  <Box m={-1} display="flex" flexWrap="wrap">
                    <StyledTextField
                      size="small"
                      name="workPhone"
                      label="Phone"
                      variant="outlined"
                      value={values.workPhone}
                      onChange={handleChange}
                    />
                    <StyledTextField
                      size="small"
                      name="mobile"
                      label="Mobile"
                      variant="outlined"
                      value={values.mobile}
                      onChange={handleChange}
                    />
                  </Box>
                </Grid>

                <Grid item md={2} sm={4} xs={12}>
                  Date of Joining
                </Grid>

                <Grid item md={10} sm={8} xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      value={date}
                      onChange={handleDateChange}
                      renderInput={(props) => (
                        <TextField
                          {...props}
                          label="Date of Joining"
                          id="mui-pickers-date"
                          sx={{ mb: 1, width: "25%" }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid item md={2} sm={4} xs={12}>
                  Height/Weight
                </Grid>

                <Grid item md={10} sm={8} xs={12}>
                  <Box m={-1} display="flex" flexWrap="wrap">
                    <StyledTextField
                      size="small"
                      name="height"
                      label="Height"
                      variant="outlined"
                      value={values.workPhone}
                      onChange={handleChange}
                    />
                    <StyledTextField
                      size="small"
                      name="weight"
                      label="Weight"
                      variant="outlined"
                      value={values.mobile}
                      onChange={handleChange}
                    />
                  </Box>
                </Grid>

                <Grid item md={2} sm={4} xs={12}>
                  Blood Group
                </Grid>

                <Grid item md={10} sm={8} xs={12}>
                  <TextField
                    size="small"
                    name="displayName"
                    variant="outlined"
                    label="Blood group"
                    value={values.displayName}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item md={2} sm={4} xs={12}>
                  Father/Husband Name
                </Grid>

                <Grid item md={10} sm={8} xs={12}>
                  <TextField
                    size="small"
                    name="displayName"
                    variant="outlined"
                    label="Father/Husband name"
                    value={values.displayName}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item md={2} sm={4} xs={12}>
                  Probationary End Date
                </Grid>

                <Grid item md={10} sm={8} xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      value={date}
                      onChange={handleDateChange}
                      renderInput={(props) => (
                        <TextField
                          {...props}
                          label="Probationary End Date"
                          id="mui-pickers-date"
                          sx={{ mb: 1, width: "25%" }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>


                <Grid item md={2} sm={4} xs={12}>
                  Relationship
                </Grid>

                <Grid item md={10} sm={8} xs={12}>
                  <TextField
                    size="small"
                    type="email"
                    name="relationship"
                    label="Relationship"
                    variant="outlined"
                    value={values.website}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>


              <Tabs
                value={tabIndex}
                textColor="primary"
                indicatorColor="primary"
                onChange={handleTabChange}
                sx={{ mt: 2, mb: 3 }}
              >
                {tabList.map((item, ind) => (
                  <Tab key={ind} value={ind} label={item} sx={{ textTransform: "capitalize" }} />
                ))}
              </Tabs>
              {tabIndex === 2 && <OtherDetailsForm values={values} handleChange={handleChange} />}
              {tabIndex === 0 && (
                <AddressForm
                  values={values}
                  setFieldValue={setFieldValue}
                  handleChange={handleChange}
                />
              )}
              {tabIndex === 1 && (
                <ContactPersonForm
                  values={values}
                  setFieldValue={setFieldValue}
                  handleChange={handleChange}
                />
              )}


              <Box mt={3}>
                <Button color="primary" variant="contained" type="submit">
                  Submit
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Card>
    </Container>
  );
};

const salutationList = ["Mr.", "Mrs.", "Ms.", "Miss.", "Dr."];
const tabList = ["Address", "Emergency Contacts", "Other Details"];

const initialValues = {
  customerType: "",
};

export default CustomerForm;
