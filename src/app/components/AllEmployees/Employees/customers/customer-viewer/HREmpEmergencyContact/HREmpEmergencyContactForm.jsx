import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Grid,
} from '@mui/material';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Person Name is required'),
    relationship: Yup.string().required('Relationship is required'),
    mobile1: Yup.string().required('Contact Number 1 is required'),
    mobile2: Yup.string().required('Contact Number 2 is required'),
});

const HREmpEmergencyContactForm = ({ open, onClose, onSave, contactDetails }) => {
    const formik = useFormik({
        initialValues: {
            empEmgcontactId: contactDetails ? contactDetails.empEmgcontactId : 0,
            empId: contactDetails ? contactDetails.empId : 0,
            name: contactDetails ? contactDetails.name : '',
            relationship: contactDetails ? contactDetails.relationship : '',
            mobile1: contactDetails ? contactDetails.mobile1 : '',
            mobile2: contactDetails ? contactDetails.mobile2 : '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            onSave(values);
            formik.resetForm();
        },
    });

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Emergency Contact</DialogTitle>
            <DialogContent>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                size="small"
                                name="name"
                                label="*Person Name"
                                variant="outlined"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                fullWidth
                                margin="normal"
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                size="small"
                                name="relationship"
                                label="
                *Relationship"
                                variant="outlined"
                                value={formik.values.relationship}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                fullWidth
                                margin="normal"
                                error={formik.touched.relationship && Boolean(formik.errors.relationship)}
                                helperText={formik.touched.relationship && formik.errors.relationship}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                size="small"
                                name="mobile1"
                                label="*Contact Number 1"
                                variant="outlined"
                                value={formik.values.mobile1}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                fullWidth
                                margin="normal"
                                error={formik.touched.mobile1 && Boolean(formik.errors.mobile1)}
                                helperText={formik.touched.mobile1 && formik.errors.mobile1}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                size="small"
                                name="mobile2"
                                label="*Contact Number 2"
                                variant="outlined"
                                value={formik.values.mobile2}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                fullWidth
                                margin="normal"
                                error={formik.touched.mobile2 && Boolean(formik.errors.mobile2)}
                                helperText={formik.touched.mobile2 && formik.errors.mobile2}
                            />
                        </Grid>
                    </Grid>
                    <DialogActions>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={!formik.isValid || formik.isSubmitting}
                        >
                            Save
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default HREmpEmergencyContactForm;
