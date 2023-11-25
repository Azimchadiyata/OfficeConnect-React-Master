import React, { useState, useEffect } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    FormControl,
    FormLabel,
    Input,
    Box,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    IconButton,
} from '@mui/material';

import { useFormik } from 'formik';
import * as yup from 'yup';
import { AttachmentOutlined } from '@mui/icons-material';

const validationSchema = yup.object().shape({
    institute: yup.string().required('Institute is required'),
    qulification: yup.string().required('Qualification is required'),
    passoutYear: yup
        .number()
        .required('Passout Year is required')
        .integer('Passout Year must be an integer')
        .min(1900, 'Passout Year must be after 1900')
        .max(new Date().getFullYear(), 'Passout Year must be the current year or earlier'),
    percentage: yup
        .number()
        .required('Percentage is required')
        .min(0, 'Percentage must be at least 0')
        .max(100, 'Percentage must be at most 100'),
    // Add validation rules for other fields if needed
});

const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            resolve(event.target.result);
        };
        reader.onerror = (error) => {
            reject(error);
        };
        reader.readAsDataURL(file);
    });
};

const HREmpEducationForm = ({ open, onClose, onSave, education }) => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedFileNames, setSelectedFileNames] = useState([]);
    useEffect(() => {
        if (education) {
            // Populate existing documents when editing
            setSelectedFileNames(education.empQulificationDocumentsModel.map(doc => doc.fileName));
        }
    }, [education]);

    const formik = useFormik({
        initialValues: {
            eduQualificationId: education ? education.eduQualificationId : 0,
            empId: education ? education.empId : 0,
            institute: education ? education.institute : '',
            qulification: education ? education.qulification : '',
            passoutYear: education ? education.passoutYear : '',
            percentage: education ? education.percentage : '',
            specialization: education ? education.specialization : '',
            empQulificationDocumentsModel: [], // Initialize as an empty array
            // Add other fields here
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            // Convert files to base64 and populate the empQulificationDocumentsModel array
            const documentModels = await Promise.all(
                selectedFiles.map(async (file) => {
                    const base64 = await convertFileToBase64(file);
                    const fileExt = file.name.split('.').pop(); // Extract file extension
                    const fileNameWithoutExt = file.name.replace(`.${fileExt}`, ''); // Remove extension from file name

                    return {
                        quldocId: 0,
                        empId: 0,
                        eduQualificationId: 0,
                        documentType: 'DocumentFile',
                        fileName: `DocumentFile-${fileNameWithoutExt}`, // Set the correct format
                        documentExt: fileExt, // Set the correct format
                        base64: base64,
                    };
                })
            );

            const updatedValues = {
                ...values,
                empQulificationDocumentsModel: documentModels,
            };

            onSave(updatedValues);
            formik.resetForm();
        },
    });

    const handleFileSelect = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
        setSelectedFileNames((prevNames) =>
            prevNames.concat(files.map((file) => file.name))
        );
    };

    const handleRemoveFile = (fileName) => {
        setSelectedFiles((prevFiles) =>
            prevFiles.filter((file) => file.name !== fileName)
        );
        setSelectedFileNames((prevNames) =>
            prevNames.filter((name) => name !== fileName)
        );
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                {education
                    ? 'Edit Education Details'
                    : 'Add Education Details'}
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            size="small"
                            name="institute"
                            label="Institute / University"
                            variant="outlined"
                            value={formik.values.institute}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            fullWidth
                            margin="normal"
                            error={
                                formik.touched.institute &&
                                Boolean(formik.errors.institute)
                            }
                            helperText={
                                formik.touched.institute && formik.errors.institute
                            }

                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            size="small"
                            name="qulification"
                            label="Qualification"
                            variant="outlined"
                            value={formik.values.qulification}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            fullWidth
                            margin="normal"
                            error={
                                formik.touched.qulification &&
                                Boolean(formik.errors.qulification)
                            }
                            helperText={
                                formik.touched.qulification &&
                                formik.errors.qulification
                            }
                        />
                    </Grid>
                    {/* ... (other form fields) */}
                    <Grid item xs={6}>
                        <TextField
                            size="small"
                            name="specialization"
                            label="Specialization / Department"
                            variant="outlined"
                            value={formik.values.specialization}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            fullWidth
                            margin="normal"
                            error={
                                formik.touched.specialization &&
                                Boolean(formik.errors.specialization)
                            }
                            helperText={
                                formik.touched.specialization &&
                                formik.errors.specialization
                            }
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            size="small"
                            name="passoutYear"
                            label="Passout Year"
                            variant="outlined"
                            value={formik.values.passoutYear}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            fullWidth
                            margin="normal"
                            error={
                                formik.touched.passoutYear &&
                                Boolean(formik.errors.passoutYear)
                            }
                            helperText={
                                formik.touched.passoutYear &&
                                formik.errors.passoutYear
                            }
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            size="small"
                            name="percentage"
                            label="Percentage"
                            variant="outlined"
                            value={formik.values.percentage}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            fullWidth
                            margin="normal"
                            error={
                                formik.touched.percentage &&
                                Boolean(formik.errors.percentage)
                            }
                            helperText={
                                formik.touched.percentage &&
                                formik.errors.percentage
                            }
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth margin="normal">
                            <FormLabel component="legend">Document Details:</FormLabel>
                            <Box display="flex" alignItems="center">
                                <Input
                                    type="file"
                                    id="document"
                                    name="document"
                                    onChange={handleFileSelect}
                                    inputProps={{ accept: '.pdf,.doc,.docx' }}
                                />
                                <Button
                                    component="label"
                                    variant="contained"
                                    color="primary"
                                    htmlFor="document"
                                >
                                    Upload
                                </Button>
                            </Box>
                        </FormControl>
                    </Grid>
                    {selectedFileNames.length > 0 && (
                        <Grid item xs={12}>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>File Name</TableCell>
                                            <TableCell>Document</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {selectedFileNames.map((fileName, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{fileName}</TableCell>
                                                <TableCell>
                                                    <Chip
                                                        label={fileName}
                                                        onDelete={() =>
                                                            handleRemoveFile(fileName)
                                                        }
                                                        icon={<AttachmentOutlined />}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    {/* Here you can add additional actions */}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    )}
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

export default HREmpEducationForm;