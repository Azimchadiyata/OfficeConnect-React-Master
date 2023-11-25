import React from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Grid,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
    name: yup.string().required('Nominee Name is required'),
    relationship: yup.string().required('Relationship is required'),
    age: yup
        .number()
        .required('Age is required')
        .integer('Age must be an integer')
        .positive('Age must be a positive number')
        .min(18, 'Age must be at least 18')
        .max(120, 'Age must be less than 120'),
    pincode: yup
        .string()
        .required('Pincode is required')
        .matches(/^\d{6}$/, 'Pincode must be a 6-digit number'),
    doorNumber: yup.string().required('Door Number is required'),
    buildingName: yup.string().required('Building Name is required'),
    location: yup.string().required('Location is required'),
    city: yup.string().required('City is required'),
    district: yup.string().required('District is required'),
    state: yup.string().required('State is required'),
    country: yup.string().required('Country is required'),
    // Add validation rules for other fields if needed
});



const HREmpNomineeForm = ({ open, onClose, onSave, nominee }) => {
    const formik = useFormik({
        initialValues: {
            nomineeId: nominee ? nominee.nomineeId : 0,
            empId: nominee ? nominee.empId : 0,
            name: nominee ? nominee.name : '',
            relationship: nominee ? nominee.relationship : '',
            age: nominee ? nominee.age : '',
            doorNumber: nominee ? nominee.doorNumber : '',
            buildingName: nominee ? nominee.buildingName : '',
            street: nominee ? nominee.street : '',
            location: nominee ? nominee.location : '',
            city: nominee ? nominee.city : '',
            district: nominee ? nominee.district : '',
            state: nominee ? nominee.state : '',
            country: nominee ? nominee.country : '',
            pincode: nominee ? nominee.pincode : '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            onSave(values);
            formik.resetForm();
        },
    });

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{nominee ? 'Edit Nominee Details' : 'Add Nominee Details'}</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <TextField
                            size="small"
                            name="name"
                            label="Nominee Name"
                            variant="outlined"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            size="small"
                            name="relationship"
                            label="Relationship"
                            variant="outlined"
                            value={formik.values.relationship}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.relationship && Boolean(formik.errors.relationship)}
                            helperText={formik.touched.relationship && formik.errors.relationship}
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            size="small"
                            name="age"
                            label="Age"
                            variant="outlined"
                            value={formik.values.age}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.age && Boolean(formik.errors.age)}
                            helperText={formik.touched.age && formik.errors.age}
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            size="small"
                            name="doorNumber"
                            label="Door Number"
                            variant="outlined"
                            value={formik.values.doorNumber}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.doorNumber && Boolean(formik.errors.doorNumber)}
                            helperText={formik.touched.doorNumber && formik.errors.doorNumber}
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            size="small"
                            name="buildingName"
                            label="Building Name"
                            variant="outlined"
                            value={formik.values.buildingName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.buildingName && Boolean(formik.errors.buildingName)}
                            helperText={formik.touched.buildingName && formik.errors.buildingName}
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            size="small"
                            name="street"
                            label="Street"
                            variant="outlined"
                            value={formik.values.street}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.street && Boolean(formik.errors.street)}
                            helperText={formik.touched.street && formik.errors.street}
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            size="small"
                            name="location"
                            label="Location"
                            variant="outlined"
                            value={formik.values.location}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.location && Boolean(formik.errors.location)}
                            helperText={formik.touched.location && formik.errors.location}
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            size="small"
                            name="city"
                            label="City"
                            variant="outlined"
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.city && Boolean(formik.errors.city)}
                            helperText={formik.touched.city && formik.errors.city}
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            size="small"
                            name="district"
                            label="District"
                            variant="outlined"
                            value={formik.values.district}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.district && Boolean(formik.errors.district)}
                            helperText={formik.touched.district && formik.errors.district}
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            size="small"
                            name="state"
                            label="State"
                            variant="outlined"
                            value={formik.values.state}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.state && Boolean(formik.errors.state)}
                            helperText={formik.touched.state && formik.errors.state}
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            size="small"
                            name="country"
                            label="Country"
                            variant="outlined"
                            value={formik.values.country}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.country && Boolean(formik.errors.country)}
                            helperText={formik.touched.country && formik.errors.country}
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            size="small"
                            name="pincode"
                            label="Pincode"
                            variant="outlined"
                            value={formik.values.pincode}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.pincode && Boolean(formik.errors.pincode)}
                            helperText={formik.touched.pincode && formik.errors.pincode}
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    {/* Add other fields here with similar structure */}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    onClick={formik.handleSubmit}
                    variant="contained"
                    color="primary"
                    disabled={!formik.isValid || formik.isSubmitting}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default HREmpNomineeForm;
