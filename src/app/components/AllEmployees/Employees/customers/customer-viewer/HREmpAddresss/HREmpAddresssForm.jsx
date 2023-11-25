import React, { useState } from 'react';
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
    Divider,
} from '@mui/material';

const numberRegex = /^\d+$/;
const stringRegex = /^.+$/;
const pincodeRegex = /^\d{6}$/;

const validationSchema = Yup.object().shape({
    doorNumber: Yup.string().matches(numberRegex, 'Must be a valid number').required('Door Number is required'),
    buildingName: Yup.string().matches(stringRegex, 'Must be a non-empty string').required('Building Name is required'),
    street: Yup.string().matches(stringRegex, 'Must be a non-empty string').required('Street is required'),
    location: Yup.string().matches(stringRegex, 'Must be a non-empty string').required('Landmark is required'),
    city: Yup.string().matches(stringRegex, 'Must be a non-empty string').required('City is required'),
    district: Yup.string().matches(stringRegex, 'Must be a non-empty string').required('District is required'),
    state: Yup.string().matches(stringRegex, 'Must be a non-empty string').required('State is required'),
    country: Yup.string().matches(stringRegex, 'Must be a non-empty string').required('Country is required'),
    pincode: Yup.string().matches(pincodeRegex, 'Must be a valid 6-digit pincode').required('Pincode is required'),
    localDoorNumber: Yup.string().when('localAddressSameAsPermanent', {
        is: false,
        then: Yup.string().matches(numberRegex, 'Must be a valid number').required('Door Number is required'),
    }),
    localBuildingName: Yup.string().when('localAddressSameAsPermanent', {
        is: false,
        then: Yup.string().matches(stringRegex, 'Must be a non-empty string').required('Building Name is required'),
    }),
    localStreet: Yup.string().when('localAddressSameAsPermanent', {
        is: false,
        then: Yup.string().matches(stringRegex, 'Must be a non-empty string').required('Street is required'),
    }),
    localLocation: Yup.string().when('localAddressSameAsPermanent', {
        is: false,
        then: Yup.string().matches(stringRegex, 'Must be a non-empty string').required('Location is required'),
    }),
    localCity: Yup.string().when('localAddressSameAsPermanent', {
        is: false,
        then: Yup.string().matches(stringRegex, 'Must be a non-empty string').required('City is required'),
    }),
    localDistrict: Yup.string().when('localAddressSameAsPermanent', {
        is: false,
        then: Yup.string().matches(stringRegex, 'Must be a non-empty string').required('District is required'),
    }),
    localState: Yup.string().when('localAddressSameAsPermanent', {
        is: false,
        then: Yup.string().matches(stringRegex, 'Must be a non-empty string').required('State is required'),
    }),
    localCountry: Yup.string().when('localAddressSameAsPermanent', {
        is: false,
        then: Yup.string().matches(stringRegex, 'Must be a non-empty string').required('Country is required'),
    }),
    localPincode: Yup.string().when('localAddressSameAsPermanent', {
        is: false,
        then: Yup.string().matches(pincodeRegex, 'Must be a valid 6-digit pincode').required('Pincode is required'),
    }),
});

const HREmpAddressForm = ({ open, onClose, onSave }) => {
    const [localAddressSameAsPermanent, setLocalAddressSameAsPermanent] = useState(true);

    const formik = useFormik({
        initialValues: {
            contactId: 0,
            empId: 0,
            doorNumber: '',
            buildingName: '',
            street: '',
            location: '',
            city: '',
            district: '',
            state: '',
            country: '',
            pincode: '',
            localDoorNumber: '',
            localBuildingName: '',
            localStreet: '',
            localLocation: '',
            localCity: '',
            localDistrict: '',
            localState: '',
            localCountry: '',
            localPincode: '',
            localAddressSameAsPermanent: true,
        },
        validationSchema,
        onSubmit: (values) => {
            onSave(values);
        },
    });

    const handleToggleLocalAddress = () => {
        setLocalAddressSameAsPermanent((prevValue) => !prevValue);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Employee Address</DialogTitle>
            <DialogContent>
                <form onSubmit={formik.handleSubmit}>
                    <h4>Permanent Address</h4>
                    <Grid container spacing={2}>
                        {/* Permanent address form fields */}
                        <Grid item xs={4}>
                            <TextField
                                size="small"
                                name="doorNumber"
                                label="Door Number"
                                variant="outlined"
                                value={formik.values.doorNumber}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                fullWidth
                                margin="normal"
                                error={formik.touched.doorNumber && formik.errors.doorNumber}
                                helperText={formik.touched.doorNumber && formik.errors.doorNumber}
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
                                fullWidth
                                margin="normal"
                                error={formik.touched.buildingName && formik.errors.buildingName}
                                helperText={formik.touched.buildingName && formik.errors.buildingName}
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
                                fullWidth
                                margin="normal"
                                error={formik.touched.street && formik.errors.street}
                                helperText={formik.touched.street && formik.errors.street}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                size="small"
                                name="location"
                                label="Landmark"
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
                        <Grid item xs={4}>
                            <TextField
                                size="small"
                                name="city"
                                label="City"
                                variant="outlined"
                                value={formik.values.city}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                fullWidth
                                margin="normal"
                                error={formik.touched.city && formik.errors.city}
                                helperText={formik.touched.city && formik.errors.city}
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
                                fullWidth
                                margin="normal"
                                error={formik.touched.district && formik.errors.district}
                                helperText={formik.touched.district && formik.errors.district}
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
                                fullWidth
                                margin="normal"
                                error={formik.touched.state && formik.errors.state}
                                helperText={formik.touched.state && formik.errors.state}
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
                                fullWidth
                                margin="normal"
                                error={formik.touched.country && formik.errors.country}
                                helperText={formik.touched.country && formik.errors.country}
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
                                fullWidth
                                margin="normal"
                                error={formik.touched.pincode && formik.errors.pincode}
                                helperText={formik.touched.pincode && formik.errors.pincode}
                            />
                        </Grid>
                    </Grid>

                    <Divider style={{ margin: '16px 0' }} />

                    <h4>Local Address</h4>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleToggleLocalAddress}
                        style={{ marginBottom: '16px' }}
                    >
                        {localAddressSameAsPermanent ? 'Same as Permanent Address' : 'Different Local Address'}
                    </Button>

                    {!localAddressSameAsPermanent && (
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <TextField
                                    size="small"
                                    name="localDoorNumber"
                                    label="Door Number"
                                    variant="outlined"
                                    value={formik.values.localDoorNumber}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    fullWidth
                                    margin="normal"
                                    error={formik.touched.localDoorNumber && formik.errors.localDoorNumber}
                                    helperText={formik.touched.localDoorNumber && formik.errors.localDoorNumber}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    size="small"
                                    name="localBuildingName"
                                    label="Building Name"
                                    variant="outlined"
                                    value={formik.values.localBuildingName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    fullWidth
                                    margin="normal"
                                    error={formik.touched.localBuildingName && formik.errors.localBuildingName}
                                    helperText={formik.touched.localBuildingName && formik.errors.localBuildingName}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    size="small"
                                    name="localStreet"
                                    label="Street"
                                    variant="outlined"
                                    value={formik.values.localStreet}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    fullWidth
                                    margin="normal"
                                    error={formik.touched.localStreet && formik.errors.localStreet}
                                    helperText={formik.touched.localStreet && formik.errors.localStreet}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    size="small"
                                    name="localLocation"
                                    label="Location"
                                    variant="outlined"
                                    value={formik.values.localLocation}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    fullWidth
                                    margin="normal"
                                    error={formik.touched.localLocation && formik.errors.localLocation}
                                    helperText={formik.touched.localLocation && formik.errors.localLocation}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    size="small"
                                    name="localCity"
                                    label="City"
                                    variant="outlined"
                                    value={formik.values.localCity}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    fullWidth
                                    margin="normal"
                                    error={formik.touched.localCity && formik.errors.localCity}
                                    helperText={formik.touched.localCity && formik.errors.localCity}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    size="small"
                                    name="localDistrict"
                                    label="District"
                                    variant="outlined"
                                    value={formik.values.localDistrict}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    fullWidth
                                    margin="normal"
                                    error={formik.touched.localDistrict && formik.errors.localDistrict}
                                    helperText={formik.touched.localDistrict && formik.errors.localDistrict}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    size="small"
                                    name="localState"
                                    label="State"
                                    variant="outlined"
                                    value={formik.values.localState}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    fullWidth
                                    margin="normal"
                                    error={formik.touched.localState && formik.errors.localState}
                                    helperText={formik.touched.localState && formik.errors.localState}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    size="small"
                                    name="localCountry"
                                    label="Country"
                                    variant="outlined"
                                    value={formik.values.localCountry}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    fullWidth
                                    margin="normal"
                                    error={formik.touched.localCountry && formik.errors.localCountry}
                                    helperText={formik.touched.localCountry && formik.errors.localCountry}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    size="small"
                                    name="localPincode"
                                    label="Pincode"
                                    variant="outlined"
                                    value={formik.values.localPincode}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    fullWidth
                                    margin="normal"
                                    error={formik.touched.localPincode && formik.errors.localPincode}
                                    helperText={formik.touched.localPincode && formik.errors.localPincode}
                                />
                            </Grid>
                        </Grid>
                    )}

                    <DialogActions>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button type="submit" variant="contained" color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default HREmpAddressForm;
