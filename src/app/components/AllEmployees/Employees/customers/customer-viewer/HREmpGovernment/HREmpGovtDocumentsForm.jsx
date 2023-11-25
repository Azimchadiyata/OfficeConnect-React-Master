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
} from '@mui/material';
import { AttachmentOutlined, CloudUpload, Delete } from '@mui/icons-material';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';


const validationSchema = Yup.object().shape({
    aadharCard: Yup.string().required('Aadhar Card is required'),
    drivingLicenseNo: Yup.string().required('Driving License Number is required'),
    panNumber: Yup.string().required('PAN Number is required'),
    passport: Yup.string().required('Passport Number is required'),
    passportIssueplace: Yup.string().required('Passport Issue Place is required'),
    voterId: Yup.string().required('Voter ID is required'),
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
const HREmpGovtDocumentsForm = ({ open, onClose, onSave, document }) => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedFileNames, setSelectedFileNames] = useState([]);
    const [documentTypes, setDocumentTypes] = useState([]);

    useEffect(() => {
        if (document) {
            // Populate existing documents when editing
            setSelectedFileNames(document.govtIssueDocumentsModel.map(doc => doc.fileName));
            setDocumentTypes(document.govtIssueDocumentsModel.map(doc => doc.documentType));
        }
    }, [document]);

    const formik = useFormik({
        initialValues: {
            aadharCard: document ? document.aadharCard : '',
            drivingLicenseNo: document ? document.drivingLicenseNo : '',
            empId: document ? document.empId : 0,
            panNumber: document ? document.panNumber : '',
            passIssueDate: document ? new Date(document.passIssueDate) : null,
            passport: document ? document.passport : '',
            passportExpiryDate: document ? new Date(document.passportExpiryDate) : null,
            passportIssueplace: document ? document.passportIssueplace : '',
            voterId: document ? document.voterId : '',
            govtIssueDocumentsModel: [], // Initialize as an empty array
            // Add other fields here
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            // Convert files to base64 and populate the govtIssueDocumentsModel array
            const documentModels = await Promise.all(
                selectedFiles.map(async (file, index) => {
                    const base64 = await convertFileToBase64(file);
                    const fileExt = file.name.split('.').pop(); // Extract file extension
                    const fileNameWithoutExt = file.name.replace(`.${fileExt}`, ''); // Remove extension from file name

                    return {
                        govtDocId: 0,
                        empId: 0,
                        documentType: documentTypes[index], // Use documentType from state
                        fileName: `${documentTypes[index]}-${fileNameWithoutExt}`, // Set the correct format
                        documentExt: fileExt, // Set the correct format
                        base64: base64,
                    };
                })
            );

            const updatedValues = {
                ...values,
                govtIssueDocumentsModel: documentModels,
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
                {document ? 'Edit Government Documents' : 'Add Government Documents'}
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            size="small"
                            name="aadharCard"
                            label="Aadhar Card"
                            variant="outlined"
                            value={formik.values.aadharCard}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.aadharCard && Boolean(formik.errors.aadharCard)}
                            helperText={formik.touched.aadharCard && formik.errors.aadharCard}
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            size="small"
                            name="drivingLicenseNo"
                            label="Driving License Number"
                            variant="outlined"
                            value={formik.values.drivingLicenseNo}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.drivingLicenseNo && Boolean(formik.errors.drivingLicenseNo)}
                            helperText={formik.touched.drivingLicenseNo && formik.errors.drivingLicenseNo}
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            size="small"
                            name="panNumber"
                            label="PAN Number"
                            variant="outlined"
                            value={formik.values.panNumber}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.panNumber && Boolean(formik.errors.panNumber)}
                            helperText={formik.touched.panNumber && formik.errors.panNumber}
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                fullWidth
                                value={formik.values.passIssueDate}
                                onChange={(date) => formik.setFieldValue('passIssueDate', date)}
                                renderInput={(props) => (
                                    <TextField
                                        {...props}
                                        label="Passport Issue Date"
                                        id="mui-pickers-passIssueDate"
                                        sx={{ mb: 1, width: '100%' }}
                                        size="small"
                                        margin="normal"
                                        error={formik.touched.passIssueDate && formik.errors.passIssueDate}
                                        helperText={formik.touched.passIssueDate && formik.errors.passIssueDate}
                                    />
                                )}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            size="small"
                            name="passport"
                            label="Passport Number"
                            variant="outlined"
                            value={formik.values.passport}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.passport && Boolean(formik.errors.passport)}
                            helperText={formik.touched.passport && formik.errors.passport}
                            fullWidth
                            margin="normal"
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                fullWidth
                                value={formik.values.passportExpiryDate}
                                onChange={(date) => formik.setFieldValue('passportExpiryDate', date)}
                                renderInput={(props) => (
                                    <TextField
                                        {...props}
                                        label="Passport Expiry Date"
                                        id="mui-pickers-passportExpiryDate"
                                        sx={{ mb: 1, width: '100%' }}
                                        size="small"
                                        margin="normal"
                                        error={formik.touched.passportExpiryDate && formik.errors.passportExpiryDate}
                                        helperText={formik.touched.passportExpiryDate && formik.errors.passportExpiryDate}
                                    />
                                )}
                            />
                        </LocalizationProvider>
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            size="small"
                            name="passportIssueplace"
                            label="Passport Issue Place"
                            variant="outlined"
                            value={formik.values.passportIssueplace}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.passportIssueplace && Boolean(formik.errors.passportIssueplace)}
                            helperText={formik.touched.passportIssueplace && formik.errors.passportIssueplace}
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            size="small"
                            name="voterId"
                            label="Voter ID"
                            variant="outlined"
                            value={formik.values.voterId}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.voterId && Boolean(formik.errors.voterId)}
                            helperText={formik.touched.voterId && formik.errors.voterId}
                            fullWidth
                            margin="normal"
                        />
                    </Grid>

                    {/* Document Details */}
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
                                            <TableCell>Aadhar Card</TableCell>
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
                                                    id="aadhardetail"
                                                    name="aadhardetail"
                                                    onChange={(e) => handleFileSelect(e, 'aadhardetail')}
                                                    style={{ display: 'none' }}
                                                />
                                                <label htmlFor="aadhardetail">
                                                    <IconButton component="span">
                                                        <CloudUpload />
                                                    </IconButton>
                                                </label>
                                            </TableCell>
                                        </TableRow>
                                        {/* Repeat for other document fields */}
                                        <TableRow>
                                            <TableCell>PAN Card</TableCell>
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
                                                    id="panCarddetail"
                                                    name="panCarddetail"
                                                    onChange={(e) => handleFileSelect(e, 'panCarddetail')}
                                                    style={{ display: 'none' }}
                                                />
                                                <label htmlFor="panCarddetail">
                                                    <IconButton component="span">
                                                        <CloudUpload />
                                                    </IconButton>
                                                </label>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Voter ID</TableCell>
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
                                                    id="voterIddetail"
                                                    name="voterIddetail"
                                                    onChange={(e) => handleFileSelect(e, 'voterIddetail')}
                                                    style={{ display: 'none' }}
                                                />
                                                <label htmlFor="voterIddetail">
                                                    <IconButton component="span">
                                                        <CloudUpload />
                                                    </IconButton>
                                                </label>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Driving License</TableCell>
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
                                                    id="drivingLincensedetail"
                                                    name="drivingLincensedetail"
                                                    onChange={(e) => handleFileSelect(e, 'drivingLincensedetail')}
                                                    style={{ display: 'none' }}
                                                />
                                                <label htmlFor="drivingLincensedetail">
                                                    <IconButton component="span">
                                                        <CloudUpload />
                                                    </IconButton>
                                                </label>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Passport</TableCell>
                                            <TableCell>
                                                {selectedFileNames[4] && (
                                                    <Chip
                                                        label={selectedFileNames[4]}
                                                        onDelete={() => handleRemoveFile(selectedFileNames[4])}
                                                        icon={<AttachmentOutlined />}
                                                    />
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <input
                                                    accept="application/pdf"
                                                    multiple
                                                    type="file"
                                                    id="passportdetail"
                                                    name="passportdetail"
                                                    onChange={(e) => handleFileSelect(e, 'passportdetail')}
                                                    style={{ display: 'none' }}
                                                />
                                                <label htmlFor="passportdetail">
                                                    <IconButton component="span">
                                                        <CloudUpload />
                                                    </IconButton>
                                                </label>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </FormControl>
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

export default HREmpGovtDocumentsForm;
