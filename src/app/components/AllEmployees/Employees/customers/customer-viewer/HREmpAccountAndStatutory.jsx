import { Fade, Grid } from "@mui/material";
import CustomerActions from "./CustomerActions";
import CustomerBillings from "./CustomerBillings";
import CustomerEmailSender from "./CustomerEmailSender";
import CustomerInfo from "./HREmpInfo";
import HREmpEmergencyContact from "./HREmpEmergencyContact/HREmpEmergencyContact";

import HREmpBankDetails from "./Account&statutory/HREmpBankInfo/HREmpBankDetails";




const CustomerInvoice = () => {
  return (
    <Fade in timeout={300}>
      <Grid container spacing={3}>
        {/* <Grid item xs={12}>
          <CustomerInfo />
        </Grid> */}
        <Grid item xs={12}>
          <HREmpBankDetails />
        </Grid>


      </Grid>


    </Fade>
  );
};

export default CustomerInvoice;


