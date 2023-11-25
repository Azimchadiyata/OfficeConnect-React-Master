import React, { useState, useEffect, useContext } from 'react';
import { FormControl, TablePagination, InputLabel, Select, MenuItem, Table, TableHead, TableRow, TableCell, TableBody, Checkbox, Grid } from '@mui/material';
import axios from 'axios';
import { APIbackend } from '../../../APIbackendurl';



const UserAccessPolicyTable = () => {
    // Define state variables for role and user selection
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedUser, setSelectedUser] = useState('');
    // Define state variable for user access policies
    const [userAccessPolicies, setUserAccessPolicies] = useState([]);
    const { APIbackendURl } = useContext(APIbackend);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);



    const apiUrl = `${APIbackendURl.basePointUrl}applicationservice/Admin/ApplicationAdmin/UserAccessPolicy`;
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${apiUrl}/View`, {
                params: {
                    page: 1,
                    size: 0,
                    // role: selectedRole,
                    // user: selectedUser,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = response.data.Models;
            setUserAccessPolicies(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const handleCheckboxChange = async (accessPolicyId, featureType, checked) => {
        // Find the user access policy based on accessPolicyId
        const updatedUserAccessPolicies = userAccessPolicies.map((policy) => {
            if (policy.accessPolicyId === accessPolicyId) {
                // Update the feature type based on the checkbox
                policy[featureType] = checked;
            }
            return policy;
        });

        setUserAccessPolicies(updatedUserAccessPolicies); // Update state immediately

        // Find the user access policy based on accessPolicyId
        const userAccessPolicy = updatedUserAccessPolicies.find((policy) => policy.accessPolicyId === accessPolicyId);

        if (userAccessPolicy) {
            // Create a data structure similar to FeatureTable
            const dataToEdit = {
                accessPolicyId,
                subModuleId: userAccessPolicy.subModuleId,
                subModuleName: userAccessPolicy.subModuleName,
                subModuleMenuId: userAccessPolicy.subModuleMenuId,
                subModuleMenuName: userAccessPolicy.subModuleMenuName,
                moduleId: userAccessPolicy.moduleId,
                moduleName: userAccessPolicy.moduleName,
                roleId: userAccessPolicy.roleId,
                roleName: userAccessPolicy.roleName,
                userId: userAccessPolicy.userId,
                userName: userAccessPolicy.userName,
                created: featureType === 'created' ? checked : userAccessPolicy.created,
                edited: featureType === 'edited' ? checked : userAccessPolicy.edited,
                viewed: featureType === 'viewed' ? checked : userAccessPolicy.viewed,
                deleted: featureType === 'deleted' ? checked : userAccessPolicy.deleted,
                importFile: featureType === 'importFile' ? checked : userAccessPolicy.importFile,
                export: featureType === 'export' ? checked : userAccessPolicy.export,
                activeStatus: userAccessPolicy.activeStatus,
                forAll: true,
            };

            try {
                const response = await axios.put(
                    ` ${APIbackendURl.basePointUrl}applicationservice/Admin/ApplicationAdmin/UserAccessPolicy/Edit`,
                    [dataToEdit], // Send an array with a single object
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.status === 200) {
                    console.log(`User access policy edited for accessPolicyId: ${accessPolicyId}`);
                } else {
                    console.error('Error editing user access policy:', response);
                }
            } catch (error) {
                console.error('Error editing user access policy:', error);
            }
        }
    };

    const handleChangePage = (_, newPage) => setPage(newPage);

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Grid container spacing={2}>
            <Grid item>
                <FormControl variant="outlined" style={{ width: '100%', minWidth: '200px' }}>
                    <InputLabel>Select RoleName</InputLabel>
                    <Select
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        label="Select RoleName"
                    >
                        <MenuItem value="">Select RoleName</MenuItem>
                        {/* {userAccessPolicies.map((policy) => (
                            <MenuItem key={policy.roleId} value={policy.roleName}>
                                {policy.roleName}
                            </MenuItem>
                        ))} */}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item>
                <FormControl variant="outlined" style={{ width: '100%', minWidth: '200px' }}>
                    <InputLabel>Select User</InputLabel>
                    <Select
                        value={selectedUser}
                        onChange={(e) => setSelectedUser(e.target.value)}
                        label="Select User"
                    >
                        <MenuItem value="">Select User</MenuItem>
                        {/* {userAccessPolicies.map((policy) => (
                            <MenuItem key={policy.userId} value={policy.userName}>
                                {policy.userName}
                            </MenuItem>
                        ))} */}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ width: '300px' }}>SUBMODULEMENU</TableCell>
                            <TableCell>VIEW</TableCell>
                            <TableCell>CREATE</TableCell>
                            <TableCell>EDIT</TableCell>
                            <TableCell>DELETE</TableCell>
                            <TableCell>IMPORT</TableCell>
                            <TableCell>EXPORT</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userAccessPolicies
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((policy) => (
                                <React.Fragment key={policy.accessPolicyId}>
                                    <TableRow key={`${policy.accessPolicyId}-module`} style={{ backgroundColor: '#f0f0f0' }}>
                                        <TableCell colSpan={7} style={{ textAlign: 'center' }}>MODULE: {policy.moduleName}</TableCell>
                                    </TableRow>
                                    <TableRow key={`${policy.accessPolicyId}-submodule`} style={{ backgroundColor: '#e0e0f0' }}>
                                        <TableCell colSpan={7} style={{ textAlign: 'center' }}>SUBMODULE: {policy.subModuleName}</TableCell>
                                    </TableRow>
                                    <TableRow key={`${policy.accessPolicyId}-details`}>
                                        <TableCell>{policy.subModuleMenuName}</TableCell>
                                        <TableCell>
                                            <Checkbox
                                                checked={policy.viewed}
                                                onChange={() => handleCheckboxChange(policy.accessPolicyId, 'viewed', !policy.viewed)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Checkbox
                                                checked={policy.created}
                                                onChange={() => handleCheckboxChange(policy.accessPolicyId, 'created', !policy.created)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Checkbox
                                                checked={policy.edited}
                                                onChange={() => handleCheckboxChange(policy.accessPolicyId, 'edited', !policy.edited)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Checkbox
                                                checked={policy.deleted}
                                                onChange={() => handleCheckboxChange(policy.accessPolicyId, 'deleted', !policy.deleted)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Checkbox
                                                checked={policy.importFile}
                                                onChange={() => handleCheckboxChange(policy.accessPolicyId, 'importFile', !policy.importFile)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Checkbox
                                                checked={policy.export}
                                                onChange={() => handleCheckboxChange(policy.accessPolicyId, 'export', !policy.export)}
                                            />
                                        </TableCell>
                                    </TableRow>
                                </React.Fragment>
                            ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={userAccessPolicies.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Grid>
        </Grid>
    );
};

export default UserAccessPolicyTable;
