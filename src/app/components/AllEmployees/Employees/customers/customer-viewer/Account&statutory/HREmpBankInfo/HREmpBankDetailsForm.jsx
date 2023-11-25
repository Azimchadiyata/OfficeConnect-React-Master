import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
} from "@mui/material";

const HREmpBankDetailsForm = ({ open, onClose, onSave, bankDetails }) => {
  const [bankName, setBankName] = useState("");
  const [bankBranch, setBankBranch] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [empAcNo, setEmpAcNo] = useState("");
  const [pfNo, setPfNo] = useState("");
  const [uanNo, setUanNo] = useState("");
  const [esiInsuranceNo, setEsiInsuranceNo] = useState("");
  const [healthiInsuranceNo, sethealthiInsuranceNo] = useState("");

  useEffect(() => {
    // Set the initial form values based on the bankDetails prop
    if (bankDetails) {
      setBankName(bankDetails.bankName || "");
      setBankBranch(bankDetails.bankBranch || "");
      setIfscCode(bankDetails.ifscCode || "");
      setEmpAcNo(bankDetails.empAcNo || "");
      setPfNo(bankDetails.pfNo || "");
      setUanNo(bankDetails.uanNo || "");
      setEsiInsuranceNo(bankDetails.esiInsuranceNo || "");
      sethealthiInsuranceNo(bankDetails.healthiInsuranceNo || "");
    } else {
      // Reset the form values
      setBankName("");
      setBankBranch("");
      setIfscCode("");
      setEmpAcNo("");
      setPfNo("");
      setUanNo("");
      setEsiInsuranceNo("");
      sethealthiInsuranceNo("");
    }
  }, [bankDetails]);

  const handleSaveBankDetails = () => {
    // Perform any necessary validation or API calls here
    onSave({
      empAccountDetId: bankDetails ? bankDetails.empAccountDetId : 0,
      empId: bankDetails ? bankDetails.empId : 0,
      bankName,
      bankBranch,
      ifscCode,
      empAcNo,
      pfNo,
      uanNo,
      esiInsuranceNo,
      healthiInsuranceNo,
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Employee Bank Details</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              size="small"
              variant="outlined"
              name="bankName"
              label="Bank Name"
              fullWidth
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              margin="normal"

            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              size="small"
              name="bankBranch"
              variant="outlined"
              label="Branch Name"
              fullWidth
              value={bankBranch}
              onChange={(e) => setBankBranch(e.target.value)}
              margin="normal"

            />
          </Grid>
          <Grid item xs={6}>

            <TextField
              size="small"
              name="ifscCode"
              variant="outlined"
              label="IFSC Code"
              fullWidth
              value={ifscCode}
              onChange={(e) => setIfscCode(e.target.value)}
              margin="normal"

            />
          </Grid>
          <Grid item xs={6}>

            <TextField
              size="small"
              name="empAcNo"
              variant="outlined"
              label="Bank Account Number"
              fullWidth
              value={empAcNo}
              onChange={(e) => setEmpAcNo(e.target.value)}
              margin="normal"

            />
          </Grid>
          <Grid item xs={6}>

            <TextField
              size="small"
              name="pfNo"
              variant="outlined"
              label="PF Number"
              fullWidth
              value={pfNo}
              onChange={(e) => setPfNo(e.target.value)}
              margin="normal"

            />
          </Grid>
          <Grid item xs={6}>

            <TextField
              size="small"
              name="uanNo"
              variant="outlined"
              label="UAN Number"
              fullWidth
              value={uanNo}
              onChange={(e) => setUanNo(e.target.value)}
              margin="normal"

            />
          </Grid>
          <Grid item xs={6}>

            <TextField
              size="small"
              name="esiInsuranceNo"
              variant="outlined"
              label="ESI Insurance Number"
              fullWidth
              value={esiInsuranceNo}
              onChange={(e) => setEsiInsuranceNo(e.target.value)}
              margin="normal"

            />
          </Grid>
          <Grid item xs={6}>

            <TextField
              size="small"
              name="healthiInsuranceNo"
              variant="outlined"
              label="Health Insurance Number"
              fullWidth
              value={healthiInsuranceNo}
              onChange={(e) => sethealthiInsuranceNo(e.target.value)}
              margin="normal"

            />
          </Grid>
        </Grid>

      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSaveBankDetails}
          variant="contained"
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default HREmpBankDetailsForm;
