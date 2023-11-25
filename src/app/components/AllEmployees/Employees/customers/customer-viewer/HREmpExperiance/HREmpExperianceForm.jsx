import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
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
    Paper,
    Select,
    MenuItem,
} from '@mui/material';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { DatePicker } from '@mui/lab';
import { AttachmentOutlined, CloudUpload, Delete } from '@mui/icons-material';
import Progressbar from '../../../../../utilies/progressbar/Progressbar';

import { DownloaGetAPI } from '../../../../../../AxiosAPI/FetchData'; // Make sure to import the required Axios functionality

const validationSchema = Yup.object().shape({
    company: Yup.string().required('Company Name is required'),
    jobTitle: Yup.string().required('Previous Designation is required'),
    fromDate: Yup.date().required('From Date is required'),
    toDate: Yup.date()
        .required('To Date is required')
        .min(Yup.ref('fromDate'), 'To Date must be after From Date'),
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

const HREmpExperienceForm = ({ open, onClose, onSave, experience }) => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedFileNames, setSelectedFileNames] = useState([]);
    const [documentTypes, setDocumentTypes] = useState([]);

    useEffect(() => {
        if (experience) {
            // Populate existing documents when editing
            setSelectedFileNames(experience.empWorkExpDocumentsModel.map(doc => doc.fileName));
            setDocumentTypes(experience.empWorkExpDocumentsModel.map(doc => doc.documentType));
        }
    }, [experience]);

    const formik = useFormik({
        initialValues: {
            company: experience ? experience.company : '',
            empId: experience ? experience.empId : 0,
            jobTitle: experience ? experience.jobTitle : '',
            fromDate: experience ? experience.fromDate : '',
            toDate: experience ? experience.toDate : '',
            comments: experience ? experience.comments : '',
            workId: experience ? experience.workId : 0,
            empWorkExpDocumentsModel: [], // Initialize as an empty array
            // Add other fields here
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            // Convert files to base64 and populate the empWorkExpDocumentsModel array
            const documentModels = await Promise.all(
                selectedFiles.map(async (file, index) => {
                    const base64 = await convertFileToBase64(file);
                    const fileExt = file.name.split('.').pop(); // Extract file extension
                    const fileNameWithoutExt = file.name.replace(`.${fileExt}`, ''); // Remove extension from file name

                    return {
                        workExpdocId: 0,
                        empId: 0,
                        workId: 0,
                        documentType: documentTypes[index], // Use documentType from state
                        fileName: `${documentTypes[index]}-${fileNameWithoutExt}`, // Set the correct format
                        documentExt: fileExt, // Set the correct format
                        base64: base64,
                    };
                })
            );

            const updatedValues = {
                ...values,
                empWorkExpDocumentsModel: documentModels,
            };

            onSave(updatedValues);
            formik.resetForm();
            setSelectedFiles([]);
            setSelectedFileNames([]);
            setDocumentTypes([]);
        },
    });

    const handleFileSelect = (event, documentType) => {
        const files = Array.from(event.target.files);
        setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
        setSelectedFileNames((prevNames) =>
            prevNames.concat(files.map((file) => file.name))
        );
        setDocumentTypes((prevTypes) => [...prevTypes, documentType]);
    };

    const handleRemoveFile = (fileName) => {
        setSelectedFiles((prevFiles) =>
            prevFiles.filter((file) => file.name !== fileName)
        );
        setSelectedFileNames((prevNames) =>
            prevNames.filter((name) => name !== fileName)
        );
        setDocumentTypes((prevTypes) =>
            prevTypes.filter((type, index) => selectedFileNames[index] !== fileName)
        );
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                {experience ? 'Edit Experience Details' : 'Add Experience Details'}
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            size="small"
                            name="company"
                            label="Company Name"
                            variant="outlined"
                            value={formik.values.company}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.company && Boolean(formik.errors.company)}
                            helperText={formik.touched.company && formik.errors.company}
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            size="small"
                            name="jobTitle"
                            label="Previous Designation"
                            variant="outlined"
                            value={formik.values.jobTitle}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.jobTitle && Boolean(formik.errors.jobTitle)}
                            helperText={formik.touched.jobTitle && formik.errors.jobTitle}
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                fullWidth
                                multiline
                                value={formik.values.fromDate}
                                onChange={(date) => formik.setFieldValue('fromDate', date)}
                                renderInput={(props) => (
                                    <TextField
                                        {...props}
                                        label="*From Date"
                                        id="mui-pickers-date"
                                        sx={{ mb: 1, width: '100%' }}
                                        size="small"
                                        margin="normal"
                                        error={formik.touched.fromDate && formik.errors.fromDate}
                                        helperText={formik.touched.fromDate && formik.errors.fromDate}
                                    />
                                )}
                            />
                        </LocalizationProvider>
                    </Grid>

                    <Grid item xs={6}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                fullWidth
                                multiline
                                value={formik.values.toDate}
                                onChange={(date) => formik.setFieldValue('toDate', date)}
                                renderInput={(props) => (
                                    <TextField
                                        {...props}
                                        label="*To Date"
                                        id="mui-pickers-date"
                                        sx={{ mb: 1, width: '100%' }}
                                        size="small"
                                        margin="normal"
                                        error={formik.touched.toDate && formik.errors.toDate}
                                        helperText={formik.touched.toDate && formik.errors.toDate}
                                    />
                                )}
                            />
                        </LocalizationProvider>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth margin="normal">
                            <FormLabel component="legend">Document Details:</FormLabel>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>File Name</TableCell>
                                            <TableCell>Documents</TableCell>
                                            <TableCell>Upload</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Offer letter</TableCell>
                                            <TableCell>
                                                {selectedFileNames[0] && (
                                                    <Chip
                                                        label={selectedFileNames[0]}
                                                        onDelete={() => handleRemoveFile(selectedFileNames[0])}
                                                        icon={<AttachmentOutlined />}
                                                    />
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <input
                                                    accept="application/pdf"
                                                    multiple
                                                    type="file"
                                                    id="offerLetter"
                                                    name="offerLetter"
                                                    onChange={(e) => handleFileSelect(e, 'offerLetter')}
                                                    style={{ display: 'none' }}
                                                />
                                                <label htmlFor="offerLetter">
                                                    <IconButton component="span">
                                                        <CloudUpload />
                                                    </IconButton>
                                                </label>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Last 3 payslips</TableCell>
                                            <TableCell>
                                                {selectedFileNames[1] && (
                                                    <Chip
                                                        label={selectedFileNames[1]}
                                                        onDelete={() => handleRemoveFile(selectedFileNames[1])}
                                                        icon={<AttachmentOutlined />}
                                                    />
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <input
                                                    accept="application/pdf"
                                                    multiple
                                                    type="file"
                                                    id="payslips"
                                                    name="payslips"
                                                    onChange={(e) => handleFileSelect(e, 'payslips')}
                                                    style={{ display: 'none' }}
                                                />
                                                <label htmlFor="payslips">
                                                    <IconButton component="span">
                                                        <CloudUpload />
                                                    </IconButton>
                                                </label>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Relieve letter</TableCell>
                                            <TableCell>
                                                {selectedFileNames[2] && (
                                                    <Chip
                                                        label={selectedFileNames[2]}
                                                        onDelete={() => handleRemoveFile(selectedFileNames[2])}
                                                        icon={<AttachmentOutlined />}
                                                    />
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <input
                                                    accept="application/pdf"
                                                    multiple
                                                    type="file"
                                                    id="relieveLetter"
                                                    name="relieveLetter"
                                                    onChange={(e) => handleFileSelect(e, 'relieveLetter')}
                                                    style={{ display: 'none' }}
                                                />
                                                <label htmlFor="relieveLetter">
                                                    <IconButton component="span">
                                                        <CloudUpload />
                                                    </IconButton>
                                                </label>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Experience letter</TableCell>
                                            <TableCell>
                                                {selectedFileNames[3] && (
                                                    <Chip
                                                        label={selectedFileNames[3]}
                                                        onDelete={() => handleRemoveFile(selectedFileNames[3])}
                                                        icon={<AttachmentOutlined />}
                                                    />
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <input
                                                    accept="application/pdf"
                                                    multiple
                                                    type="file"
                                                    id="experienceLetter"
                                                    name="experienceLetter"
                                                    onChange={(e) => handleFileSelect(e, 'experienceLetter')}
                                                    style={{ display: 'none' }}
                                                />
                                                <label htmlFor="experienceLetter">
                                                    <IconButton component="span">
                                                        <CloudUpload />
                                                    </IconButton>
                                                </label>
                                            </TableCell>
                                        </TableRow>
                                        {/* Repeat for other rows */}
                                        {/* ... */}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            size="small"
                            name="comments"
                            label="Remarks"
                            variant="outlined"
                            value={formik.values.comments}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            fullWidth
                            margin="normal"
                            error={formik.touched.comments && formik.errors.comments}
                            helperText={formik.touched.comments && formik.errors.comments}
                        />
                    </Grid>
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

export default HREmpExperienceForm;

