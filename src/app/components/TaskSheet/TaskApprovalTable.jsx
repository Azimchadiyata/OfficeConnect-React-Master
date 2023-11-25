
import React, { useState, useEffect } from 'react';
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Checkbox,
    styled,
    Grid,
    TablePagination,
    Select,
    MenuItem,
} from '@mui/material';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080'; // Use the correct URL of your server

// const API_BASE_URL = 'http://192.168.2.87:8086';


const TaskApprovalTable = () => {
    const [tasksForApproval, setTasksForApproval] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [page, setPage] = useState(0); // Current page
    const [rowsPerPage, setRowsPerPage] = useState(10); // Rows per page
    const [selectedTaskStatus, setSelectedTaskStatus] = useState('All'); // Dropdown for Task Status
    const [selectedEmployee, setSelectedEmployee] = useState('All'); // Dropdown for Employee

    // Function to fetch tasks for approval
    // const fetchTasksForApproval = async () => {
    //     try {
    //         const response = await axios.post(`${API_BASE_URL}/EmpWorkHours/getTasksForApproval`);
    //         const taskData = response.data.empWorkHoursModel.map((task) => ({
    //             ...task,
    //             selected: false, // Initialize selected property
    //         }));
    //         setTasksForApproval(taskData);
    //     } catch (error) {
    //         console.error('Error fetching tasks for approval:', error);
    //     }
    // };

    const fetchTasksForApproval = async () => {
        try {
            // Modify the API call based on selectedTaskStatus and selectedEmployee
            const response = await axios.post(`${API_BASE_URL}/EmpWorkHours/getTasksForApproval`, {
                taskStatus: selectedTaskStatus,
                employee: selectedEmployee,
            });

            const taskData = response.data.empWorkHoursModel.map((task) => ({
                ...task,
                selected: false,
            }));
            setTasksForApproval(taskData);
        } catch (error) {
            console.error('Error fetching tasks for approval:', error);
        }
    };


    useEffect(() => {
        fetchTasksForApproval();
    }, [selectedTaskStatus, selectedEmployee]);

    const columns = [
        {
            field: 'select',
            headerName: 'Select',
            renderCell: (params) => (
                <Checkbox
                    color="primary"
                    checked={params.value}
                    onChange={() => handleSelectTask(params.row)}
                />
            ),
            flex: 1,
        },
        { field: 'empName', headerName: 'EmpName', flex: 1 },
        { field: 'date', headerName: 'Date', flex: 1 },
        { field: 'project', headerName: 'Project', flex: 1 },
        { field: 'task', headerName: 'Task', flex: 1 },
        { field: 'empRemarks', headerName: 'Employee Remark', flex: 1 },
        { field: 'approverRemarks', headerName: 'Approver Work Remark', flex: 1 },
        { field: 'workedHours', headerName: 'WH', flex: 1 },
        { field: 'approvedWorkedHrs', headerName: 'AH', flex: 1 },
        { field: 'status', headerName: 'Status', flex: 1 },
        { field: 'efficiency', headerName: 'Efficiency', flex: 1 },
        { field: 'compOff', headerName: 'Comp off', flex: 1 },
    ];

    const handleSelectTask = (task) => {
        const updatedTasks = tasksForApproval.map((t) =>
            t === task ? { ...t, selected: !t.selected } : t
        );
        setTasksForApproval(updatedTasks);
        console.log('Selected Task:', task);
        setPage(0); // Reset to the first page
    };

    const handleApproveSelectedTasks = () => {
        // Implement the logic to approve the selected tasks
        const selectedTasks = tasksForApproval.filter((task) => task.selected);
        console.log('Selected Tasks for Approval:', selectedTasks);

        // You can now send a request to the API to approve these selected tasks.
        // Example: axios.post(`${API_BASE_URL}/approveTasks`, selectedTasks)

        setPage(0); // Reset to the first page after approval
    };


    const handleSelectAllTasks = () => {
        const updatedTasks = tasksForApproval.map((task) => ({
            ...task,
            selected: !selectAll,
        }));
        setTasksForApproval(updatedTasks);
        setSelectAll(!selectAll);
        setPage(0); // Reset to the first page
    };
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    // const nowrapCellStyle = {
    //     whiteSpace: 'nowrap',
    // };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                {/* Dropdown for Task Status */}
                <Select
                    value={selectedTaskStatus}
                    style={{ marginRight: '20px', width: '150px' }}
                    onChange={(e) => setSelectedTaskStatus(e.target.value)}
                >
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Approved">Approved</MenuItem>
                </Select>

                {/* Dropdown for Employee */}
                <Select
                    value={selectedEmployee}
                    style={{ width: '150px' }}
                    onChange={(e) => setSelectedEmployee(e.target.value)}
                >
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="Employee 1">Employee 1</MenuItem>
                    <MenuItem value="Employee 2">Employee 2</MenuItem>
                    <MenuItem value="Employee 3">Employee 3</MenuItem>
                    <MenuItem value="Employee 4">Employee 4</MenuItem>

                    {/* Add more employee options as needed */}
                </Select>
            </Grid>
            <Grid item xs={12}>
                <TableContainer style={{ maxWidth: '100%' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ padding: '8px' }}>
                                    <Checkbox
                                        color="primary"
                                        checked={selectAll}
                                        onChange={handleSelectAllTasks}
                                    />
                                </TableCell>
                                {columns.slice(1).map((column) => (
                                    <TableCell key={column.field} style={{ padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {column.headerName}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tasksForApproval.slice(startIndex, endIndex).map((task, index) => (
                                <TableRow key={index}>
                                    <TableCell style={{ padding: '8px' }}>
                                        <Checkbox
                                            color="primary"
                                            checked={task.selected}
                                            onChange={() => handleSelectTask(task)}
                                        />
                                    </TableCell>
                                    {columns.slice(1).map((column) => (
                                        <TableCell key={column.field} style={{ padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {task[column.field]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component="div"
                    count={tasksForApproval.length}
                    page={page}
                    onPageChange={(event, newPage) => setPage(newPage)}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={(event) => {
                        setRowsPerPage(parseInt(event.target.value, 10));
                        setPage(0);
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={handleApproveSelectedTasks}
                >
                    Approve
                </Button>
            </Grid>
        </Grid>
    );
};

export default TaskApprovalTable;