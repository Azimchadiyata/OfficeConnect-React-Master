import React from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    FormControlLabel,
    Checkbox,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
    language: yup.string().required('Language is required'),
});

const HREmpLanguageForm = ({ open, onClose, onSave, onUpdate }) => {
    const formik = useFormik({
        initialValues: {
            language: '',
            read: false,
            write: false,
            speak: false,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if (onUpdate) {
                onUpdate(values);
            }
            else {
                onSave(values);
            }
            formik.resetForm();
        },
    });

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{onUpdate ? 'Update' : 'Add'} Language Details</DialogTitle>
            <DialogContent>
                <TextField
                    size="small"
                    name="language"
                    label="Language"
                    variant="outlined"
                    value={formik.values.language}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.language && Boolean(formik.errors.language)}
                    helperText={formik.touched.language && formik.errors.language}
                    fullWidth
                    margin="normal"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={formik.values.read}
                            onChange={formik.handleChange}
                            name="read"
                        />
                    }
                    label="Read"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={formik.values.write}
                            onChange={formik.handleChange}
                            name="write"
                        />
                    }
                    label="Write"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={formik.values.speak}
                            onChange={formik.handleChange}
                            name="speak"
                        />
                    }
                    label="Speak"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    onClick={formik.handleSubmit}
                    variant="contained"
                    color="primary"
                    disabled={!formik.isValid || formik.isSubmitting}
                >
                    {onUpdate ? 'Update' : 'Save'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default HREmpLanguageForm;
