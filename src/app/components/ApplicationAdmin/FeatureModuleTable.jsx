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
    Select,
    IconButton,
    MenuItem,
    Snackbar,
    Alert,
    Grid,
    FormControl,
    InputLabel,
    TablePagination,
    Chip,

} from '@mui/material';
import { Edit, Delete, Close, Check } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { APIbackend } from '../../../APIbackendurl';


const FeatureTable = () => {
    const [data, setData] = useState([]);
    const [modules, setModules] = useState([]);
    const [subModules, setSubModules] = useState([]);
    const [subModuleMenus, setSubModuleMenus] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newFeatureName, setNewFeatureName] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [editFeatureType, setEditFeatureType] = useState([]); // Changed from editFeatureName to editFeatureType
    const [featureTypes, setFeatureTypes] = useState([
        { id: 'Create', name: 'Create' },
        { id: 'View', name: 'View' },
        { id: 'Edit', name: 'Edit' },
        { id: 'Delete', name: 'Delete' },
        { id: 'Import', name: 'Import' },
        { id: 'Export', name: 'Export' },
    ]);
    const [selectedFeatureTypes, setSelectedFeatureTypes] = useState([]); // New state for selected feature types
    const [selectedModuleId, setSelectedModuleId] = useState(null);

    const [selectedSubModuleId, setSelectedSubModuleId] = useState(null);
    const [selectedSubModuleMenuId, setSelectedSubModuleMenuId] = useState(null);

    const [selectedFeatureId, setSelectedFeatureId] = useState(null);
    const [editingFeatureId, setEditingFeatureId] = useState(null);
    const [editFeatureName, setEditFeatureName] = useState('');
    const [selectedModule, setSelectedModule] = useState('');
    const [selectedSubModule, setSelectedSubModule] = useState('');
    const [selectedSubModuleMenu, setSelectedSubModuleMenu] = useState('');
    const [selectedFeatures, setSelectedFeatures] = useState([]);
    const [showFeatureTypeInput, setShowFeatureTypeInput] = useState(false);

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');

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

    const { APIbackendURl } = useContext(APIbackend);

    const apiUrl = `${APIbackendURl.basePointUrl}applicationservice/Admin/ApplicationAdmin/FeatureMaster`;
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        fetchData();
        fetchModules();
        fetchSubModules();
        fetchSubModuleMenus();
    }, []);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${apiUrl}/View`, {
                params: {
                    moduleName: selectedModule,
                    subModuleName: selectedSubModule,
                    subModuleMenuName: selectedSubModuleMenu,
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
            const response = await axios.get(
                `${APIbackendURl.basePointUrl}applicationservice/Admin/ApplicationAdmin/ModuleMaster/View`,
                {
                    params: {
                        moduleName: searchQuery,

                        page: 1,
                        size: 0,
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setModules(response.data.Models);
        } catch (error) {
            console.error('Error fetching modules:', error);
        }
    };

    const fetchSubModules = async (selectedModule) => {
        try {
            const response = await axios.get(
                `${APIbackendURl.basePointUrl}applicationservice/Admin/ApplicationAdmin/SubModuleMaster/View`,
                {
                    params: {
                        moduleName: selectedModule,
                        subModuleName: searchQuery,
                        page: 1,
                        size: 0,
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setSubModules(response.data.Models);
        } catch (error) {
            console.error('Error fetching sub-modules:', error);
        }
    };

    const fetchSubModuleMenus = async (selectedSubModule) => {
        try {
            const response = await axios.get(
                `${APIbackendURl.basePointUrl}applicationservice/Admin/ApplicationAdmin/SubModuleMenuMaster/View`,
                {
                    params: {
                        moduleName: selectedModule,
                        subModuleName: selectedSubModule,
                        subModuleMenuName: searchQuery,
                        page: 1,
                        size: 0,
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setSubModuleMenus(response.data.Models);
        } catch (error) {
            console.error('Error fetching sub-module menus:', error);
        }
    };

    const validationSchema = Yup.object().shape({
        newFeatureType: Yup.array().required('Feature Type is required'),
    });

    const formik = useFormik({
        initialValues: {
            newFeatureType: [],
        },
        validationSchema,
        onSubmit: (values) => createNewFeature(values),
    });

    const resetSelections = () => {
        setSelectedModule('');
        setSelectedSubModule('');
        setSelectedSubModuleMenu('');
        setSelectedFeatures([]);
    };


    const handleModuleChange = (event) => {
        const selectedModule = event.target.value;
        setSelectedModule(selectedModule);

        // Update the SubModule dropdown options based on the selectedModule
        fetchSubModules(selectedModule);
        const moduleWithId = modules.find((module) => module.moduleName === selectedModule);
        if (moduleWithId) {
            setSelectedModuleId(moduleWithId.moduleId);
        }

    };

    const handleSubModuleChange = (event) => {
        const selectedSubModule = event.target.value;
        setSelectedSubModule(selectedSubModule);

        // Update the SubModule Menu dropdown options based on the selectedSubModule
        fetchSubModuleMenus(selectedSubModule);
        const subModuleWithId = subModules.find((subModule) => subModule.subModuleName === selectedSubModule);
        if (subModuleWithId) {
            setSelectedSubModuleId(subModuleWithId.subModuleId);
        }
    };

    const handleSubModuleMenuChange = (event) => {
        const selectedSubModuleMenu = event.target.value;
        setSelectedSubModuleMenu(selectedSubModuleMenu);

        // Update the SubModule Menu dropdown options based on the selectedSubModule
        fetchSubModuleMenus(selectedSubModule);

        // Set the selectedSubModuleId here if you have access to it
        // Similar to the module, you can find the sub-module ID based on the selectedSubModule
        const subModuleMenuWithId = subModuleMenus.find((subModuleMenu) => subModuleMenu.subModuleMenuName === selectedSubModuleMenu);
        if (subModuleMenuWithId) {
            setSelectedSubModuleMenuId(subModuleMenuWithId.subModuleMenuId);
        }
    };

    const createNewFeature = async (values) => {
        const selectedFeatureTypes = values.newFeatureType;

        if (selectedFeatureTypes.length === 0) {
            handleOpenAlert('Please select at least one feature type', 'error');
            return;
        }

        const isDuplicate = data.some((feature) =>
            feature.moduleName === selectedModule &&
            feature.subModuleName === selectedSubModule &&
            feature.subModuleMenuName === selectedSubModuleMenu
        );

        if (isDuplicate) {
            handleOpenAlert('Feature with the same criteria already exists', 'error');
            return;
        }

        const featureNamesMasterNpdModel = selectedFeatureTypes.map((featureType) => ({
            featureType,
        }));

        const payload = {
            featureId: selectedFeatureId,
            featureNamesMasterOfcModel: selectedFeatureTypes.map((featureType) => ({
                featureId: selectedFeatureId,
                featureNamesId: 0, // You can set this as needed, possibly an ID for the feature name.
                featureType: featureType,
            })),
            moduleId: selectedModuleId,
            moduleName: selectedModule,
            subModuleId: selectedSubModuleId,
            subModuleMenuId: selectedSubModuleMenuId,
            subModuleMenuName: selectedSubModuleMenu,
            subModuleName: selectedSubModule,
        };

        try {
            const response = await axios.post(`${apiUrl}/Create`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                setData([response.data, ...data]);
                formik.resetForm();
                setShowFeatureTypeInput(false);
                resetSelections();
                handleOpenAlert('Feature created successfully', 'success');
            } else {
                console.error('Error creating feature:', response);
                handleOpenAlert('Error creating feature', 'error');
            }
        } catch (error) {
            console.error('Error creating feature:', error);
            handleOpenAlert('Error creating feature', 'error');
        }
    };



    const editFeature = async () => {
        if (!selectedFeatureId) {
            console.error('No feature selected for editing.');
            return;
        }

        try {
            const response = await axios.put(
                `${apiUrl}/Edit`,
                {
                    featureId: selectedFeatureId,
                    moduleName: selectedModule,
                    subModuleName: selectedSubModule,
                    subModuleMenuName: selectedSubModuleMenu,
                    featureName: editFeatureName,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                // Update the data array with the edited Feature
                const updatedData = data.map((feature) => {
                    if (feature.featureId === selectedFeatureId) {
                        return { ...feature, featureName: editFeatureName };
                    }
                    return feature;
                });

                setData(updatedData);
                setEditFeatureName('');
                setSelectedFeatureId(null);
                resetSelections();
                handleOpenAlert('Feature edited successfully', 'success');
            } else {
                console.error('Error editing feature:', response);
                handleOpenAlert('Error editing feature', 'error');
            }
        } catch (error) {
            console.error('Error editing feature:', error);
            handleOpenAlert(error.message, 'error');
        }
    };

    const deleteFeature = async (featureId, featureType, featureNamesId, moduleId, moduleName, subModuleId, subModuleMenuId, subModuleMenuName, subModuleName) => {
        try {
            const response = await axios.post(
                `${apiUrl}/Delete`,
                {
                    featureId: featureId,
                    featureNamesMasterOfcModel: [
                        {
                            featureId: featureId,
                            featureNamesId: featureNamesId, // You can set this as needed
                            featureType: featureType // You can set this as needed
                        }
                    ],
                    moduleId: moduleId,
                    moduleName: moduleName,
                    subModuleId: subModuleId,
                    subModuleMenuId: subModuleMenuId,
                    subModuleMenuName: subModuleMenuName,
                    subModuleName: subModuleName
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

            if (response.status === 200) {
                // Remove the deleted Feature from the data array
                const updatedData = data.filter((feature) => feature.featureId !== featureId);
                setData(updatedData);
                resetSelections();
                handleOpenAlert('Feature deleted successfully', 'success');
            } else {
                console.error('Error deleting feature:', response);
                handleOpenAlert('Error deleting feature', 'error');
            }
        } catch (error) {
            console.error('Error deleting feature:', error);
            handleOpenAlert('Error deleting feature', 'error');
        }
    };


    const filterData = () => {
        return data.filter((row) =>
            row.moduleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.subModuleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.subModuleMenuName.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    const columns = [
        { id: 'moduleName', label: 'Module Name', minWidth: 200 },
        { id: 'subModuleName', label: 'SubModule Name', minWidth: 200 },
        { id: 'subModuleMenuName', label: 'SubModule Menu Name', minWidth: 200 },
        { id: 'featureType', label: 'Feature Type', minWidth: 200 }, // Updated label
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
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        {showFeatureTypeInput ? (
                            <form
                                onSubmit={formik.handleSubmit}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '16px',
                                }}
                            >
                                <FormControl variant="outlined" style={{ width: '100%', minWidth: '200px' }}>
                                    <InputLabel id="select-module-label">Select Module</InputLabel>
                                    <Select
                                        value={selectedModule}
                                        onChange={handleModuleChange}
                                        variant="outlined"
                                        label="Select Module"
                                        style={{ width: '100%', minWidth: '200px' }}
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
                                <FormControl variant="outlined" style={{ width: '100%', minWidth: '200px' }}>
                                    <InputLabel id="select-submodule-label">Select SubModule</InputLabel>
                                    <Select
                                        value={selectedSubModule}
                                        onChange={handleSubModuleChange}
                                        variant="outlined"
                                        label="Select SubModule"
                                        style={{ width: '100%', minWidth: '200px' }}
                                    >
                                        <MenuItem value="">
                                            <em>Select SubModule</em>
                                        </MenuItem>
                                        {subModules.map((subModule) => (
                                            <MenuItem key={subModule.subModuleId} value={subModule.subModuleName}>
                                                {subModule.subModuleName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl variant="outlined" style={{ width: '100%', minWidth: '200px' }}>
                                    <InputLabel id="select-submodulemenu-label">Select SubModule Menu</InputLabel>
                                    <Select
                                        value={selectedSubModuleMenu}
                                        onChange={handleSubModuleMenuChange}

                                        // onChange={(e) => setSelectedSubModuleMenu(e.target.value)}
                                        variant="outlined"
                                        label="Select SubModule Menu"
                                        style={{ width: '100%', minWidth: '200px' }}
                                    >
                                        <MenuItem value="">
                                            <em>Select SubModule Menu</em>
                                        </MenuItem>
                                        {subModuleMenus.map((subModuleMenu) => (
                                            <MenuItem key={subModuleMenu.subModuleMenuId} value={subModuleMenu.subModuleMenuName}>
                                                {subModuleMenu.subModuleMenuName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl variant="outlined" style={{ width: '100%', minWidth: '200px' }}>
                                    <InputLabel id="select-feature-types-label">Select Feature Types</InputLabel>
                                    <Select
                                        value={formik.values.newFeatureType}
                                        onChange={formik.handleChange}
                                        name="newFeatureType"
                                        multiple
                                        label="Select Feature Types"
                                        style={{ width: '100%', minWidth: '200px' }}
                                        renderValue={(selected) => (
                                            <div>
                                                {selected.map((value) => (
                                                    <Chip
                                                        key={value}
                                                        label={value}
                                                        onDelete={() => {
                                                            // Remove the selected feature type
                                                            const updatedSelected = formik.values.newFeatureType.filter(
                                                                (type) => type !== value
                                                            );
                                                            formik.setFieldValue('newFeatureType', updatedSelected);
                                                        }}
                                                        style={{ margin: '2px' }}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    >
                                        {featureTypes.map((featureType) => (
                                            <MenuItem key={featureType.id} value={featureType.id}>
                                                {featureType.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <Button variant="contained" color="primary" type="submit">
                                    Add Feature
                                </Button>
                                <IconButton color="secondary" onClick={() => setShowFeatureTypeInput(false)}>
                                    <Close />
                                </IconButton>
                            </form>
                        ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => setShowFeatureTypeInput(true)}
                            >
                                Add Feature
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
                                <TableRow key={row.featureId}>
                                    <TableCell>{row.moduleName}</TableCell>
                                    <TableCell>{row.subModuleName}</TableCell>
                                    <TableCell>{row.subModuleMenuName}</TableCell>
                                    <TableCell>
                                        {row.featureNamesMasterOfcModel.map((feature) => (
                                            <span key={feature.featureNamesId}>{feature.featureType}, </span>
                                        ))}
                                    </TableCell>
                                    <TableCell align="center">
                                        {editingFeatureId === row.featureId ? (
                                            <div>
                                                <TextField
                                                    variant="outlined"
                                                    value={editFeatureName}
                                                    onChange={(e) => setEditFeatureType(e.target.value)}
                                                />
                                                <IconButton
                                                    color="primary"
                                                    onClick={() => {
                                                        editFeature(row.featureId);
                                                        setEditingFeatureId(null);
                                                    }}
                                                >
                                                    <Check />
                                                </IconButton>
                                                <IconButton
                                                    color="secondary"
                                                    onClick={() => setEditingFeatureId(null)}
                                                >
                                                    <Close />
                                                </IconButton>
                                            </div>
                                        ) : (
                                            <div>
                                                <IconButton
                                                    color="primary"
                                                    onClick={() => {
                                                        setEditFeatureType(row.featureType);
                                                        setSelectedFeatureId(row.featureId);
                                                        setEditingFeatureId(row.featureId);
                                                    }}
                                                >
                                                    <Edit />
                                                </IconButton>
                                                <IconButton
                                                    color="secondary"
                                                    onClick={() => deleteFeature(row.featureId, row.featureType, row.featureNamesId, row.subModuleId, row.moduleId, row.moduleName, row.subModuleMenuId, row.subModuleMenuName, row.subModuleName)}
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

export default FeatureTable;

