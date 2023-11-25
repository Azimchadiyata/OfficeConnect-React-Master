
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
    Select,
    MenuItem,
    Snackbar,
    Alert,
    Grid,
    FormControl,
    InputLabel,
    TablePagination,
} from '@mui/material';
import { Edit, Delete, Close, Check } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { H4, H6 } from '../Typography';
import { APIbackend } from '../../../APIbackendurl';



const SubModuleTable = () => {
    const [data, setData] = useState([]);
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newSubModuleName, setNewSubModuleName] = useState('');
    const [selectedSubModuleId, setSelectedSubModuleId] = useState(null);
    const [editingSubModuleId, setEditingSubModuleId] = useState(null);
    const [editSubModuleName, setEditSubModuleName] = useState('');
    const [selectedModule, setSelectedModule] = useState('');
    const [showSubModuleNameInput, setShowSubModuleNameInput] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');
    const { APIbackendURl } = useContext(APIbackend);


    const apiUrl = `${APIbackendURl.basePointUrl}applicationservice/Admin/ApplicationAdmin/SubModuleMaster`;
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        fetchData();
        fetchModules();
    }, []);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);


    const fetchData = async () => {
        try {
            const response = await axios.get(`${apiUrl}/View`, {
                params: {
                    subModuleName: searchQuery,
                    page: 1,
                    size: 0,
                    // page: page + 1, // Page number is 1-based
                    // size: rowsPerPage,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setData(response.data.Models); // Update data
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };


    const fetchModules = async () => {
        try {
            const response = await axios.get(`${APIbackendURl.basePointUrl}applicationservice/Admin/ApplicationAdmin/ModuleMaster/View`, {
                params: {
                    moduleName: '',
                    page: 1,
                    size: 0,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setModules(response.data.Models);
        } catch (error) {
            console.error('Error fetching modules:', error);
        }
    };

    const validationSchema = Yup.object().shape({
        newSubModuleName: Yup.string()
            .required('SubModule Name is required')
            .max(50, 'SubModule Name must be at most 50 characters'),
    });

    const formik = useFormik({
        initialValues: {
            newSubModuleName: '',
        },
        validationSchema,
        onSubmit: (values) => createNewSubModule(values),
    });

    const resetModuleSelection = () => {
        setSelectedModule(''); // Reset the selected module to an empty string
    };

    const createNewSubModule = async (values) => {
        try {
            // Fetch the moduleId based on the selected moduleName
            const selectedModuleData = modules.find((module) => module.moduleName === selectedModule);
            if (!selectedModuleData) {
                console.error('Selected module not found.');
                return;
            }

            // Check if a submodule with the same name already exists in the data
            const submoduleExists = data.some(
                (submodule) =>
                    submodule.moduleName === selectedModule &&
                    submodule.subModuleName.toLowerCase() === values.newSubModuleName.toLowerCase()
            );

            if (submoduleExists) {
                handleOpenAlert('SubModule with the same name already exists', 'error');
            } else {
                const response = await axios.post(`${apiUrl}/Create`, {
                    moduleId: selectedModuleData.moduleId,
                    moduleName: selectedModule,
                    subModuleName: values.newSubModuleName,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 200) {
                    // Add the new SubModule to the top of the data array
                    setData([response.data, ...data]); // Prepend the new SubModule
                    formik.resetForm();
                    setShowSubModuleNameInput(false);
                    resetModuleSelection();
                    handleOpenAlert('SubModule created successfully', 'success');
                } else {
                    console.error('Error creating submodule:', response);
                    handleOpenAlert('Error creating submodule', 'error');
                }
            }
        } catch (error) {
            console.error('Error creating submodule:', error);
            handleOpenAlert('Error creating submodule', 'error');
        }
    };
    const editSubModule = async () => {
        if (!selectedSubModuleId) {
            console.error('No submodule selected for editing.');
            return;
        }

        try {
            // Fetch the moduleId based on the selected submodule
            const selectedSubModule = data.find(row => row.subModuleId === selectedSubModuleId);
            if (!selectedSubModule) {
                console.error('Selected submodule not found.');
                return;
            }

            // Find the moduleId for the selected module
            const selectedModuleData = modules.find(module => module.moduleName === selectedSubModule.moduleName);
            if (!selectedModuleData) {
                console.error('Selected module not found.');
                return;
            }

            await validationSchema.validate({
                newSubModuleName: editSubModuleName,
            });

            const response = await axios.put(
                `${apiUrl}/Edit`,
                {
                    subModuleId: selectedSubModuleId,
                    moduleId: selectedModuleData.moduleId, // Include moduleId in the payload
                    moduleName: selectedSubModule.moduleName,
                    subModuleName: editSubModuleName,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                // Update the data array with the edited SubModule
                const updatedData = data.map((submodule) => {
                    if (submodule.subModuleId === selectedSubModuleId) {
                        return { ...submodule, subModuleName: editSubModuleName };
                    }
                    return submodule;
                });

                setData(updatedData);
                setEditSubModuleName('');
                setSelectedSubModuleId(null);
                resetModuleSelection();
                handleOpenAlert('SubModule edited successfully', 'success');
            } else {
                console.error('Error editing submodule:', response);
                handleOpenAlert('Error editing submodule', 'error');
            }
        } catch (error) {
            console.error('Error editing submodule:', error);
            handleOpenAlert(error.message, 'error');
        }
    };

    const deleteSubModule = async (subModuleId, moduleId, moduleName, subModuleName) => {
        try {
            const response = await axios.post(
                `${apiUrl}/Delete`,
                {
                    moduleId: moduleId,
                    moduleName: moduleName,
                    subModuleId: subModuleId,
                    subModuleName: subModuleName,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                // Remove the deleted SubModule from the data array
                const updatedData = data.filter((submodule) => submodule.subModuleId !== subModuleId);
                setData(updatedData);
                resetModuleSelection();
                handleOpenAlert('SubModule deleted successfully', 'success');
            } else {
                console.error('Error deleting submodule:', response);
                handleOpenAlert('Error deleting submodule', 'error');
            }
        } catch (error) {
            console.error('Error deleting submodule:', error);
            handleOpenAlert('Error deleting submodule', 'error');
        }
    };

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

    const filterData = () => {
        return data.filter((row) =>
            row.subModuleName.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    const columns = [
        { id: 'subModuleName', label: 'SubModule Name', minWidth: 200 },
        { id: 'moduleName', label: 'Module Name', minWidth: 200 },
        {
            id: 'actions',
            label: 'Actions',
            align: 'center',
            minWidth: 100,
        },
    ];

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <H4 style={{ textAlign: 'center', background: 'lightblue', padding: '5px' }}>SubModule Master</H4>
            </Grid>
            <Grid item xs={12}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <TextField
                            label="Search SubModule"
                            variant="outlined"
                            fullWidth
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </Grid>
                    <Grid item>
                        {showSubModuleNameInput ? (
                            <form
                                onSubmit={formik.handleSubmit}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '16px',
                                }}
                            >
                                <TextField
                                    label="New SubModule Name"
                                    variant="outlined"
                                    name="newSubModuleName"
                                    fullWidth
                                    value={formik.values.newSubModuleName}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.newSubModuleName &&
                                        Boolean(formik.errors.newSubModuleName)
                                    }
                                    helperText={
                                        formik.touched.newSubModuleName &&
                                        formik.errors.newSubModuleName
                                    }
                                />
                                <FormControl variant="outlined" style={{ width: '100%', minWidth: '200px' }} >
                                    <InputLabel id="select-module-label">Select Module</InputLabel>

                                    <Select
                                        value={selectedModule}
                                        onChange={(e) => setSelectedModule(e.target.value)}
                                        variant="outlined"
                                        label="Select Module"
                                        style={{ width: '100%', minWidth: '200px' }} // Adjust the minWidth to your desired size

                                    >
                                        <MenuItem value="">
                                            <em>Select Module</em>
                                        </MenuItem>
                                        {modules.map((module) => (
                                            <MenuItem key={module.moduleId} value={module.moduleName}>
                                                {module.moduleName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <Button variant="contained" color="primary" type="submit">
                                    Add SubModule
                                </Button>
                                <IconButton
                                    color="secondary"
                                    onClick={() => setShowSubModuleNameInput(false)}
                                >
                                    <Close />
                                </IconButton>
                            </form>
                        ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => setShowSubModuleNameInput(true)}
                            >
                                Add SubModule
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
                                <TableRow key={row.subModuleId}>
                                    <TableCell>{row.subModuleName}</TableCell>
                                    <TableCell>{row.moduleName}</TableCell>
                                    <TableCell align="center">
                                        {editingSubModuleId === row.subModuleId ? (
                                            <div>
                                                <TextField
                                                    variant="outlined"
                                                    value={editSubModuleName}
                                                    onChange={(e) => setEditSubModuleName(e.target.value)}
                                                />
                                                <IconButton
                                                    color="primary"
                                                    onClick={() => {
                                                        editSubModule(row.subModuleId);
                                                        setEditingSubModuleId(null);
                                                    }}
                                                >
                                                    <Check />
                                                </IconButton>
                                                <IconButton
                                                    color="secondary"
                                                    onClick={() => setEditingSubModuleId(null)}
                                                >
                                                    <Close />
                                                </IconButton>
                                            </div>
                                        ) : (
                                            <div>
                                                <IconButton
                                                    color="primary"
                                                    onClick={() => {
                                                        setEditSubModuleName(row.subModuleName);
                                                        setSelectedSubModuleId(row.subModuleId);
                                                        setEditingSubModuleId(row.subModuleId);
                                                    }}
                                                >
                                                    <Edit />
                                                </IconButton>

                                                <IconButton
                                                    color="secondary"
                                                    onClick={() => deleteSubModule(row.subModuleId, row.moduleId, row.moduleName, row.subModuleName)}
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
                        count={data.length}
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

export default SubModuleTable;