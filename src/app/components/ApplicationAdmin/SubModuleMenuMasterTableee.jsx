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



const SubModuleMenuMasterTableee = () => {
    const [data, setData] = useState([]);
    const [modules, setModules] = useState([]);
    const [subModuleNames, setSubModuleNames] = useState([]); // New state for subModuleNames
    const [loading, setLoading] = useState(true);
    const [newSubModuleMenuName, setNewSubModuleMenuName] = useState('');
    const [selectedSubModuleId, setSelectedSubModuleId] = useState(null);
    const [editingSubModuleId, setEditingSubModuleId] = useState(null);
    const [editSubModuleMenuName, setEditSubModuleMenuName] = useState('');
    const [selectedModule, setSelectedModule] = useState('');
    const [subModules, setSubModules] = useState([]);
    const [selectedSubModule, setSelectedSubModule] = useState('');

    const [selectedSubModuleName, setSelectedSubModuleName] = useState(''); // State for selected subModuleName
    const [showSubModuleMenuNameInput, setShowSubModuleMenuNameInput] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');
    const { APIbackendURl } = useContext(APIbackend);


    const apiUrl = `${APIbackendURl.basePointUrl}applicationservice/Admin/ApplicationAdmin/SubModuleMenuMaster`;
    const moduleApiUrl = `${APIbackendURl.basePointUrl}applicationservice/Admin/ApplicationAdmin/ModuleMaster`;
    const subModuleApiUrl = `${APIbackendURl.basePointUrl}applicationservice/Admin/ApplicationAdmin/SubModuleMaster`;
    // `${APIbackendURl.basePointUrl}applicationservice/Admin/ApplicationAdmin/SubModuleMenuMaster/View?moduleName=x&subModuleName=xx&subModuleMenuName=xxxxx&page=1&size=10`;

    const token = sessionStorage.getItem('token');

    useEffect(() => {
        fetchData();
        fetchModules();
        fetchSubModules(); // Fetch subModuleNames when the component mounts
    }, []);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);


    const fetchData = async () => {
        try {
            const response = await axios.get(`${apiUrl}/View`, {
                params: {
                    moduleName: selectedModule,
                    subModuleName: selectedSubModule,
                    subModuleMenuName: searchQuery,
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

    const fetchModules = async () => {
        try {
            const response = await axios.get(`${moduleApiUrl}/View`, {
                params: {
                    moduleName: '', // Replace with the desired module name
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

    const fetchSubModules = async (selectedModule) => {
        try {
            const response = await axios.get(`${subModuleApiUrl}/View`, {
                params: {
                    moduleName: selectedModule,
                    subModuleName: searchQuery,
                    page: 1,
                    size: 0,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setSubModules(response.data.Models);
        } catch (error) {
            console.error('Error fetching submodules:', error);
        }
    };


    const validationSchema = Yup.object().shape({
        newSubModuleMenuName: Yup.string()
            .required('SubModule Menu Name is required')
            .max(50, 'SubModule Menu Name must be at most 50 characters'),
    });

    const formik = useFormik({
        initialValues: {
            newSubModuleMenuName: '',
        },
        validationSchema,
        onSubmit: (values) => createNewSubModuleMenu(values),
    });

    const resetModuleSelection = () => {
        setSelectedModule('');
        setSelectedSubModuleName(''); // Reset selected subModuleName
    };

    const createNewSubModuleMenu = async (values) => {
        try {
            const selectedModuleData = modules.find((module) => module.moduleName === selectedModule);
            if (!selectedModuleData) {
                console.error('Selected module not found.');
                return;
            }

            // Find the subModuleId based on the selectedSubModuleName
            const selectedSubModule = subModules.find((submodule) => submodule.subModuleName === selectedSubModuleName);
            if (!selectedSubModule) {
                console.error('Selected subModule not found.');
                return;
            }

            // Check if a SubModuleMenu with the same name already exists in the data
            const subModuleMenuExists = data.some(
                (submodulemenu) =>
                    submodulemenu.moduleName === selectedModule &&
                    submodulemenu.subModuleName === selectedSubModuleName &&
                    submodulemenu.subModuleMenuName.toLowerCase() === values.newSubModuleMenuName.toLowerCase()
            );

            if (subModuleMenuExists) {
                handleOpenAlert('SubModuleMenu with the same name already exists', 'error');
            } else {
                const response = await axios.post(`${apiUrl}/Create`, {
                    moduleId: selectedModuleData.moduleId,
                    moduleName: selectedModule,
                    subModuleName: selectedSubModuleName,
                    subModuleId: selectedSubModule.subModuleId,
                    subModuleMenuName: values.newSubModuleMenuName,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 200) {
                    setData([response.data, ...data]); // Prepend the new record
                    formik.resetForm();
                    setShowSubModuleMenuNameInput(false);
                    resetModuleSelection();
                    handleOpenAlert('SubModule Menu created successfully', 'success');
                } else {
                    console.error('Error creating SubModuleMenu:', response);
                    handleOpenAlert('Error creating SubModuleMenu', 'error');
                }
            }
        } catch (error) {
            console.error('Error creating SubModuleMenu:', error);
            handleOpenAlert('Error creating SubModuleMenu', 'error');
        }
    };

    const editSubModuleMenu = async () => {
        if (!selectedSubModuleId) {
            console.error('No subModuleMenu selected for editing.');
            return;
        }

        try {
            const selectedSubModule = data.find((row) => row.subModuleId === selectedSubModuleId);
            if (!selectedSubModule) {
                console.error('Selected subModuleMenu not found.');
                return;
            }

            const selectedModuleData = modules.find((module) => module.moduleName === selectedSubModule.moduleName);
            if (!selectedModuleData) {
                console.error('Selected module not found.');
                return;
            }

            await validationSchema.validate({
                newSubModuleMenuName: editSubModuleMenuName,
            });

            const response = await axios.put(
                `${apiUrl}/Edit`,
                {
                    subModuleId: selectedSubModuleId,
                    moduleId: selectedModuleData.moduleId,
                    moduleName: selectedSubModule.moduleName,
                    subModuleName: selectedSubModule.selectedSubModuleName, // Include selected subModuleName
                    subModuleMenuId: selectedSubModule.subModuleMenuId, // Include subModuleMenuId
                    subModuleMenuName: editSubModuleMenuName,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                fetchData(); // updated data() need to improve in future
                setEditSubModuleMenuName('');
                setSelectedSubModuleId(null);
                resetModuleSelection();
                handleOpenAlert('SubModule Menu edited successfully', 'success');
            } else {
                console.error('Error editing subModuleMenu:', response);
                handleOpenAlert('Error editing subModuleMenu', 'error');
            }
        } catch (error) {
            console.error('Error editing subModuleMenu:', error);
            handleOpenAlert(error.message, 'error');
        }
    };



    const deleteSubModuleMenu = async (subModuleId, moduleId, moduleName, subModuleMenuId, subModuleMenuName, subModuleName) => {
        try {
            const response = await axios.post(
                `${apiUrl}/Delete`,
                {
                    moduleId: moduleId,
                    moduleName: moduleName,
                    subModuleId: subModuleId,
                    subModuleMenuId: subModuleMenuId,
                    subModuleMenuName: subModuleMenuName,
                    subModuleName: subModuleName,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

            if (response.status === 200) {
                const updatedData = data.filter((submodulemenu) => submodulemenu.subModuleMenuId !== subModuleMenuId);
                setData(updatedData);
                resetModuleSelection();
                handleOpenAlert('SubModule Menu deleted successfully', 'success');
            } else {
                console.error('Error deleting subModuleMenu:', response);
                handleOpenAlert('Error deleting subModuleMenu', 'error');
            }
        } catch (error) {
            console.error('Error deleting subModuleMenu:', error);
            handleOpenAlert('Error deleting subModuleMenu', 'error');
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
            row.subModuleMenuName.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    const columns = [
        { id: 'subModuleMenuName', label: 'SubModule Menu Name', minWidth: 200 },
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
                <H4 style={{ textAlign: 'center', background: 'lightblue', padding: '5px' }}>SubModuleMenu Master</H4>
            </Grid>
            <Grid item xs={12}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <TextField
                            label="Search SubModuleMenu"
                            variant="outlined"
                            fullWidth
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </Grid>
                    <Grid item>
                        {showSubModuleMenuNameInput ? (
                            <form
                                onSubmit={formik.handleSubmit}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '16px',
                                }}
                            >
                                <TextField
                                    label="New SubModuleMenu Name"
                                    variant="outlined"
                                    name="newSubModuleMenuName"
                                    fullWidth
                                    value={formik.values.newSubModuleMenuName}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.newSubModuleMenuName &&
                                        Boolean(formik.errors.newSubModuleMenuName)
                                    }
                                    helperText={
                                        formik.touched.newSubModuleMenuName &&
                                        formik.errors.newSubModuleMenuName
                                    }
                                />
                                <FormControl variant="outlined" style={{ width: '100%', minWidth: '200px' }} >
                                    <InputLabel id="select-module-label">Select Module</InputLabel>

                                    <Select
                                        labelId="select-module-label"

                                        value={selectedModule}
                                        onChange={(e) => {
                                            setSelectedModule(e.target.value);
                                            setSelectedSubModuleName(''); // Reset subModuleName when module changes
                                            fetchSubModules(e.target.value); // Fetch subModuleNames based on the selected module
                                        }}
                                        variant="outlined"
                                        label="Select Module"

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

                                <FormControl variant="outlined" style={{ width: '100%', minWidth: '200px' }} >
                                    <InputLabel id="select-submodule-label">Select SubModule</InputLabel>
                                    <Select
                                        labelId="select-submodule-label"

                                        value={selectedSubModuleName}
                                        onChange={(e) => setSelectedSubModuleName(e.target.value)}
                                        variant="outlined"
                                        label="Select SubModule"
                                        style={{ width: '100%', minWidth: '200px' }} // Adjust the minWidth to your desired size

                                    >
                                        <MenuItem value="">
                                            <em>Select SubModule</em>
                                        </MenuItem>
                                        {subModules.map((submodule) => (
                                            <MenuItem key={submodule.subModuleId} value={submodule.subModuleName}>
                                                {submodule.subModuleName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>


                                <Button variant="contained" color="primary" type="submit">
                                    Add SubModuleMenu
                                </Button>
                                <IconButton
                                    color="secondary"
                                    onClick={() => setShowSubModuleMenuNameInput(false)}
                                >
                                    <Close />
                                </IconButton>
                            </form>
                        ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => setShowSubModuleMenuNameInput(true)}
                            >
                                Add SubModuleMenu
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
                                <TableRow key={row.subModuleMenuId}>
                                    <TableCell>{row.subModuleMenuName}</TableCell>
                                    <TableCell>{row.subModuleName}</TableCell>
                                    <TableCell>{row.moduleName}</TableCell>
                                    <TableCell align="center">
                                        {editingSubModuleId === row.subModuleId ? (
                                            <div>
                                                <TextField
                                                    variant="outlined"
                                                    value={editSubModuleMenuName}
                                                    onChange={(e) => setEditSubModuleMenuName(e.target.value)}
                                                />
                                                <IconButton
                                                    color="primary"
                                                    onClick={() => {
                                                        editSubModuleMenu(row.subModuleId);
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
                                                        setEditSubModuleMenuName(row.subModuleMenuName);
                                                        setSelectedSubModuleId(row.subModuleId);
                                                        setEditingSubModuleId(row.subModuleId);
                                                    }}
                                                >
                                                    <Edit />
                                                </IconButton>

                                                <IconButton
                                                    color="secondary"
                                                    onClick={() => deleteSubModuleMenu(row.subModuleId, row.moduleId, row.moduleName, row.subModuleMenuId, row.subModuleMenuName, row.subModuleName)}

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

export default SubModuleMenuMasterTableee;
