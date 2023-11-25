import { LoadingButton } from '@mui/lab';
import { Card, Checkbox, Grid, TextField } from '@mui/material';
import { Box, styled, useTheme } from '@mui/material';
import { Paragraph } from 'app/components/Typography';
import useAuth from 'app/hooks/useAuth';
import { Formik } from 'formik';
import { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { APIbackend } from '../../../APIbackendurl';
import OfficeConnectLogo from '../../../app/OfficeConnectLogo.png';
import backgroundImg from '../../../../src/app/OfficeConnectLogin.png';


const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: 'center' }));

const ContentBox = styled(Box)(() => ({
  height: '100%',
  padding: '32px',
  position: 'relative',
  background: 'rgba(0, 0, 0, 0.01)'
}));

const JWTRoot = styled(JustifyBox)(() => ({
  minHeight: '100% !important',
  background: `url(${backgroundImg})`, // Apply the background image here
  backgroundSize: 'cover', // Adjust background size as needed
  backgroundPosition: 'center', // Adjust background position as needed
  '& .card': {
    maxWidth: 300,
    minHeight: 300,
    margin: '1rem',
    display: 'flex',
    borderRadius: 12,
    alignItems: 'center',
  },
}));
const initialValues = {
  userName: '',
  password: '',
};

const validationSchema = Yup.object().shape({
  password: Yup.string()
    // .min(6, 'Password must be at least 6 characters long')
    .required('Password is required!'),
  userName: Yup.string().required('Username is required!')
});


const JwtLogin = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { APIbackendURl } = useContext(APIbackend);


  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      // Make a POST request to the login API
      const response = await axios.post(
        `${APIbackendURl.basePointUrl}applicationservice/Admin/PortalMaster/UserMaster/login`,
        {
          userName: values.userName,
          password: values.password,
        }
      );

      const { token } = response.data;

      login(token);

      navigate('/');
    } catch (e) {
      setLoading(false);
    }
  };


  return (
    <JWTRoot>
      <Card className="card">
        <Grid container>
          {/* <Grid item sm={6} xs={12}>
            <JustifyBox p={4} height="100%" sx={{ minWidth: 320 }}>
              <img src="/assets/images/illustrations/dreamer.svg" width="100%" alt="" />
            </JustifyBox>
          </Grid> */}

          <Grid item sm={6} xs={12}>
            <FlexBox flexDirection="column" alignItems="center">
              <img
                src={OfficeConnectLogo}
                alt="OfficeConnect Logo"
                style={{
                  width: '100px',
                  marginLeft: '150px',
                  marginTop: '20px',
                }}
              />
            </FlexBox>
            <JustifyBox p={4} height="100%" sx={{ minWidth: 320 }}>
              {/* style={{ backgroundColor: '#e4ecf1cc' }} */}
              <ContentBox>
                <Formik
                  onSubmit={handleFormSubmit}
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                >
                  {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                      <TextField
                        fullWidth
                        size="small"
                        type="text" // Change to "text"
                        name="userName" // Change to "userName"
                        label="Username" // Change the label
                        variant="outlined"
                        onBlur={handleBlur}
                        value={values.userName}
                        onChange={handleChange}
                        helperText={touched.userName && errors.userName}
                        error={Boolean(errors.userName && touched.userName)}
                        autoComplete="off"
                        sx={{ mb: 3 }}
                      />


                      <TextField
                        fullWidth
                        size="small"
                        name="password"
                        type="password"
                        label="Password"
                        variant="outlined"
                        onBlur={handleBlur}
                        value={values.password}
                        onChange={handleChange}
                        helperText={touched.password && errors.password}
                        error={Boolean(errors.password && touched.password)}
                        sx={{ mb: 1.5 }}
                        autoComplete="off"
                      />

                      <FlexBox justifyContent="space-between">
                        {/* <FlexBox gap={1}>
                          <Checkbox
                            size="small"
                            name="remember"
                            onChange={handleChange}
                            checked={values.remember}
                            sx={{ padding: 0 }}
                          />

                          <Paragraph>Remember Me</Paragraph>
                        </FlexBox> */}

                        {/* <NavLink
                          to="/session/forgot-password"
                          style={{ color: theme.palette.primary.main }}
                        >
                          Forgot password?
                        </NavLink> */}
                      </FlexBox>

                      <LoadingButton
                        type="submit"
                        color="primary"
                        loading={loading}
                        variant="contained"
                        sx={{ my: 2 }}
                      >
                        Login
                      </LoadingButton>

                      {/* <Paragraph>
                        Don't have an account?
                        <NavLink
                          to="/session/signup"
                          style={{ color: theme.palette.primary.main, marginLeft: 5 }}
                        >
                          Register
                        </NavLink>
                      </Paragraph> */}
                    </form>
                  )}
                </Formik>
              </ContentBox>
            </JustifyBox>

          </Grid>
        </Grid>
      </Card>
    </JWTRoot>
  );
};

export default JwtLogin;
