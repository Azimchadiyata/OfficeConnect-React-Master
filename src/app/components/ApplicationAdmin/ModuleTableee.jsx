//
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TextField,
    Button,
    IconButton,
    Snackbar,
    Alert,
    Grid,
    TablePagination,
} from '@mui/material';
import { Edit, Delete, Close, Check } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { H4, H6 } from '../Typography';
import { APIbackend } from '../../../APIbackendurl';


const ModuleTableee = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newModuleName, setNewModuleName] = useState('');
    const [editModuleName, setEditModuleName] = useState('');
    const [selectedModuleId, setSelectedModuleId] = useState(null);
    const [editingModuleId, setEditingModuleId] = useState(null);
    const [showModuleNameInput, setShowModuleNameInput] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');
    const { APIbackendURl } = useContext(APIbackend);


    const apiUrl = `${APIbackendURl.basePointUrl}applicationservice/Admin/ApplicationAdmin/ModuleMaster`;
    const token = sessionStorage.getItem('token');


    useEffect(() => {
        fetchData();
    }, []);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${apiUrl}/View`, {
                params: {
                    moduleName: '',
                    page: 1,
                    size: 0,
                    // page: page + 1, // Page number is 1-based
                    // size: rowsPerPage,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setData(response.data.Models);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    const validationSchema = Yup.object().shape({
        newModuleName: Yup.string()
            .required('Module Name is required')
            .max(50, 'Module Name must be at most 50 characters'),
    });

    const formik = useFormik({
        initialValues: {
            newModuleName: '',
        },
        validationSchema,
        onSubmit: (values) => createNewModule(values),
    });

    const createNewModule = async (values) => {
        try {
            // Convert the new module name to lowercase for consistency
            const newModuleNameLowerCase = values.newModuleName.toLowerCase();

            // Check if a module with the same name already exists (case-insensitive)
            const moduleExists = data.some((module) => module.moduleName.toLowerCase() === newModuleNameLowerCase);

            if (moduleExists) {
                handleOpenAlert('Module with the same name already exists', 'error');
            } else {
                const response = await axios.post(`${apiUrl}/Create`, {
                    moduleName: values.newModuleName,
                }, {
                    headers: {
                        Authorization: token,
                    },
                });

                if (response.status === 200) {
                    // Prepend the new SubModule only if it doesn't already exist
                    setData([response.data, ...data]);
                    formik.resetForm();
                    setShowModuleNameInput(false);
                    // Show success alert
                    handleOpenAlert('Module created successfully', 'success');
                } else {
                    console.error('Error creating module:', response);
                    // Show error alert
                    handleOpenAlert('Error creating module', 'error');
                }
            }
        } catch (error) {
            console.error('Error creating module:', error);
            // Show error alert
            handleOpenAlert('Error creating module', 'error');
        }
    };

    const editModule = async () => {
        if (!selectedModuleId) {
            console.error('No module selected for editing.');
            return;
        }

        // Validate the editModuleName using the Yup schema
        try {
            await validationSchema.validate({
                newModuleName: editModuleName,
            });

            // Proceed with the edit request
            const response = await axios.put(
                `${apiUrl}/Edit`,
                {
                    moduleId: selectedModuleId,
                    moduleName: editModuleName,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                // Update the data array with the edited module
                // fetchData(); // Refresh data

                const updatedData = data.map((module) => {
                    if (module.moduleId === selectedModuleId) {
                        return { ...module, moduleName: editModuleName };
                    }
                    return module;
                });

                setData(updatedData);

                setEditModuleName('');
                setSelectedModuleId(null);
                // Show success alert
                handleOpenAlert('Module edited successfully', 'success');
            } else {
                console.error('Error editing module:', response);
                // Show error alert
                handleOpenAlert('Error editing module', 'error');
            }
        } catch (error) {
            console.error('Error editing module:', error);
            // Show error alert for validation errors
            handleOpenAlert(error.message, 'error');
        }
    };



    const deleteModule = async (moduleId, moduleName) => {
        try {
            const response = await axios.post(
                `${apiUrl}/Delete`,
                {
                    moduleId: moduleId,
                    moduleName: moduleName,
                },

                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                // Remove the deleted module from the data array
                // fetchData(); // Refresh data

                const updatedData = data.filter((module) => module.moduleId !== moduleId);
                setData(updatedData);

                // Show success alert
                handleOpenAlert('Module deleted successfully', 'success');
            } else {
                console.error('Error deleting module:', response);
                // Show error alert
                handleOpenAlert('Error deleting module', 'error');
            }
        } catch (error) {
            console.error('Error deleting module:', error);
            // Show error alert
            handleOpenAlert('Error deleting module', 'error');
        }
    };


    const filterData = () => {
        return data.filter((row) => row.moduleName.toLowerCase().includes(searchQuery.toLowerCase()));
    };

    const columns = [
        { id: 'moduleName', label: 'Module Name', minWidth: 200 },
        {
            id: 'actions',
            label: 'Actions',
            align: 'center',
            minWidth: 100,
        },
    ];

    const handleOpenAlert = (message, severity) => {
        setAlertMessage(message);
        setAlertSeverity(severity);
        setAlertOpen(true);
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertOpen(false);
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <H4 style={{ textAlign: 'center', background: 'lightblue', padding: '5px' }}>Module Master</H4>
            </Grid>
            <Grid item xs={12}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <TextField
                            label="Search Module"
                            variant="outlined"
                            fullWidth
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </Grid>
                    <Grid item>
                        {showModuleNameInput ? (
                            <form
                                onSubmit={formik.handleSubmit}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '16px',
                                }}
                            >
                                <TextField
                                    label="New Module Name"
                                    variant="outlined"
                                    name="newModuleName"
                                    fullWidth
                                    value={formik.values.newModuleName}
                                    onChange={formik.handleChange}
                                    error={formik.touched.newModuleName && Boolean(formik.errors.newModuleName)}
                                    helperText={formik.touched.newModuleName && formik.errors.newModuleName}
                                />
                                <Button variant="contained" color="primary" type="submit">
                                    Add Module
                                </Button>
                                <IconButton
                                    color="secondary"
                                    onClick={() => setShowModuleNameInput(false)}
                                >
                                    <Close />
                                </IconButton>
                            </form>
                        ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => setShowModuleNameInput(true)}
                            >
                                Add Module
                            </Button>
                        )}
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filterData().map((row) => (
                                <TableRow key={row.moduleId}>
                                    <TableCell>{row.moduleName}</TableCell>
                                    <TableCell align="center">
                                        {editingModuleId === row.moduleId ? (
                                            <div>
                                                <TextField
                                                    variant="outlined"
                                                    value={editModuleName}
                                                    onChange={(e) => setEditModuleName(e.target.value)}
                                                />
                                                <IconButton
                                                    color="primary"
                                                    onClick={() => {
                                                        editModule(row.moduleId);
                                                        setEditingModuleId(null);
                                                    }}
                                                >
                                                    <Check />
                                                </IconButton>
                                                <IconButton
                                                    color="secondary"
                                                    onClick={() => setEditingModuleId(null)}
                                                >
                                                    <Close />
                                                </IconButton>
                                            </div>
                                        ) : (
                                            <div>
                                                <IconButton
                                                    color="primary"
                                                    onClick={() => {
                                                        setEditModuleName(row.moduleName);
                                                        setSelectedModuleId(row.moduleId);
                                                        setEditingModuleId(row.moduleId);
                                                    }}
                                                >
                                                    <Edit />
                                                </IconButton>
                                                <IconButton
                                                    color="secondary"
                                                    onClick={() => deleteModule(row.moduleId, row.moduleName)}
                                                >
                                                    <Delete />
                                                </IconButton>
                                            </div>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        component="div"
                        count={data.length} // Total number of rows
                        page={page}
                        onPageChange={(e, newPage) => setPage(newPage)}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={(e) => {
                            setRowsPerPage(+e.target.value);
                            setPage(0); // Reset page to 0 when changing rowsPerPage
                        }}
                    />
                </TableContainer>
            </Grid>
            <Snackbar
                open={alertOpen}
                autoHideDuration={3000}
                onClose={handleCloseAlert}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert elevation={6} variant="filled" onClose={handleCloseAlert} severity={alertSeverity}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </Grid>
    );
};

export default ModuleTableee;


