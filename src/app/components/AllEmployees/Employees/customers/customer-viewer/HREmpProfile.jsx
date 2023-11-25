import { Fade, Grid } from "@mui/material";
import CustomerActions from "./CustomerActions";
import CustomerBillings from "./CustomerBillings";
import CustomerEmailSender from "./CustomerEmailSender";
import CustomerInfo from "./HREmpInfo";
import HREmpEducation from "./HREmpEducation/HREmpEducation";
import HREmpExperience from "./HREmpExperiance/HREmpExperiance";
import HREmpCurricularActivity from "./HREmpCurricularActivity/HREmpCurricularActivity";
import HREmpLanguage from "./HREmpLanguage/HREmpLanguage";
import HREmpNominee from "./HREmpNominee/HREmpNominee";
import HREmpGovtDocuments from "./HREmpGovernment/HREmpGovtDocuments";
import HREmpEmergencyContact from "./HREmpEmergencyContact/HREmpEmergencyContact";
import HREmpAddresss from "./HREmpAddresss/HREmpAddresss";
import HREmpCreate from "./HREmpCreate/HREmpCreate";
import HREmpSkills from "./HREmpSkills";




const HREmpProfile = () => {
  return (
    <Fade in timeout={300}>
      <Grid container spacing={3}>
        {/* <Grid item xs={12}>
          <CustomerInfo />
        </Grid> */}
        {/* <Grid item xs={12}>
          <HREmpCreate />
        </Grid> */}

        <Grid item xs={12}>
          <HREmpSkills />
        </Grid>


        <Grid item xs={12}>
          <HREmpExperience />
        </Grid>
        <Grid item xs={12}>
          <HREmpEducation />
        </Grid>

        <Grid item lg={4} md={6} xs={12}>
          <HREmpEmergencyContact />
        </Grid>

        <Grid item lg={4} md={6} xs={12}>
          <HREmpAddresss />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <HREmpCurricularActivity />
        </Grid>

        <Grid item lg={4} md={6} xs={12}>
          <HREmpLanguage />
        </Grid>

        <Grid item lg={4} md={6} xs={12}>
          <HREmpNominee />
        </Grid>

        <Grid item lg={4} md={6} xs={12}>
          <HREmpGovtDocuments />
        </Grid>

        {/* <Grid item xs={12}>
          <HREmpGovtDocuments />
        </Grid> */}

        {/* <Grid item lg={4} md={6} xs={12}>
          <CustomerBillings />
        </Grid>

        <Grid item lg={4} md={6} xs={12}>
          <CustomerEmailSender />
        </Grid>

        <Grid item lg={4} md={6} xs={12}>
          <CustomerActions />
      
        </Grid> */}


      </Grid>
    </Fade>
  );
};

export default HREmpProfile;


