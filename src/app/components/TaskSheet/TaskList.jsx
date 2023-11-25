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
    styled,
    IconButton,
    Grid,
    MenuItem,
    Typography,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import { parse } from 'date-fns';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { format } from 'date-fns';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { DataGrid } from '@mui/x-data-grid'; // Import the DataGrid component
import axios from 'axios';
import TaskCreate from './TaskCreate';
import Breadcrumb from "app/components/Breadcrumb";
import EditIcon from '@mui/icons-material/Edit'; // Import EditIcon
import DeleteIcon from '@mui/icons-material/Delete'; // Import DeleteIcon
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers';
import { subMonths, startOfMonth, endOfDay, isBefore, isAfter } from 'date-fns';


const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: {
        margin: "16px",
    },
    "& .breadcrumb": {
        marginBottom: "30px",
        [theme.breakpoints.down("sm")]: {
            marginBottom: "16px",
        },
    },
}));

const API_BASE_URL = 'http://192.168.100.55:8086';

const TaskList = () => {
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success'); // You can change this to 'error', 'warning', or 'info' as needed
    const [editTaskData, setEditTaskData] = useState(null);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [taskWorkDateError, setTaskWorkDateError] = useState('');
    const [empWorkedHoursError, setEmpWorkedHoursError] = useState('');
    const [empRemarksError, setEmpRemarksError] = useState('');

    // const [projectList, setProjectList] = useState([]);
    // const [taskList, setTaskList] = useState([]);

    const fetchTasks = async () => {
        try {
            const response = await axios.post(`http://192.168.100.55:8086/EmpWorkHours/getEmpWorkHoursByEmpId?empNo=` + sessionStorage.getItem('userName'));
            const taskData = response.data.empWorkHoursModel; // Extract the array from the response
            setTasks(taskData);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleCreateDialogOpen = () => {
        setOpenCreateDialog(true);
    };

    const handleCreateDialogClose = () => {
        setOpenCreateDialog(false);
    };

    const handleCreateTask = async (taskData) => {
        // taskData.taskWorkDate = format(taskData.taskWorkDate, 'dd-MM-yyyy');

        try {
            await axios.post(`${API_BASE_URL}/EmpWorkHours/createEmpWorkHours`, taskData);
            handleCreateDialogClose();
            fetchTasks(); // Refresh the list of tasks
            handleOpenAlert('Task created successfully', 'success');
        } catch (error) {
            console.error('Error creating task:', error);
            handleOpenAlert('Error creating task', 'error');
        }
    };

    const fetchTaskDetails = async (empWorkHrsId) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/EmpWorkHours/getByWorkHoursId`, {
                empWorkHrsId,
            });
            const editedTaskData = response.data;

            // Convert the taskWorkDate to dd-MM-yyyy format
            if (editedTaskData.taskWorkDate) {
                editedTaskData.taskWorkDate = format(new Date(editedTaskData.taskWorkDate), 'dd-MM-yyyy');
            }

            return editedTaskData;
        } catch (error) {
            console.error('Error fetching task details:', error);
            handleOpenAlert('Error fetching task details', 'error');
            return null;
        }
    };

    const handleEditTask = async (task) => {
        const editedTaskData = await fetchTaskDetails(task.empWorkHrsId);
        if (editedTaskData) {
            // Set the selected project and task based on the API response
            setEditTaskData(editedTaskData);
            setOpenEditDialog(true);
        }
    };

    // const handleEditTask = async (task) => {
    //     const editedTaskData = await fetchTaskDetails(task.empWorkHrsId);
    //     if (editedTaskData) {
    //         setEditTaskData(editedTaskData);
    //         setOpenEditDialog(true);
    //     }
    // };


    const handleEditDialogClose = () => {
        setOpenEditDialog(false);
        setEditTaskData(null); // Clear the edit task data
    };

    const handleEditTaskSave = async (editedTaskData) => {
        // Clear previous error messages
        setTaskWorkDateError('');
        setEmpWorkedHoursError('');
        setEmpRemarksError('');

        let isValid = true;

        // Validate taskWorkDate
        if (!editedTaskData.taskWorkDate) {
            setTaskWorkDateError('Date is required');
            isValid = false;
        }

        // Validate empWorkedHours
        if (!editedTaskData.empWorkedHours) {
            setEmpWorkedHoursError('Worked Hours is required');
            isValid = false;
        } else if (isNaN(editedTaskData.empWorkedHours) || editedTaskData.empWorkedHours <= 0) {
            setEmpWorkedHoursError('Worked Hours must be a positive number');
            isValid = false;
        } else if (editedTaskData.empWorkedHours > 24) {
            setEmpWorkedHoursError('Worked Hours cannot be more than 24 hours');
            isValid = false;
        }

        // Validate empRemarks (if it's required)
        if (!editedTaskData.empRemarks) {
            setEmpRemarksError('Employee Remarks is required');
            isValid = false;
        }

        if (isValid) {
            try {
                // Format the taskWorkDate to "yyyy-MM-dd'T'HH:mm:ss" format
                const formattedTaskWorkDate = format(
                    parseDDMMYYYYToDate(editedTaskData.taskWorkDate),
                    'yyyy-MM-dd\'T\'HH:mm:ss'
                );

                // Update the editedTaskData with the formatted taskWorkDate
                editedTaskData.taskWorkDate = formattedTaskWorkDate;

                // Send a PUT request to update the task data
                await axios.post(`${API_BASE_URL}/EmpWorkHours/updateEmpWorkHours`, editedTaskData);
                handleEditDialogClose();
                fetchTasks(); // Refresh the list of tasks
                handleOpenAlert('Task updated successfully', 'success');
            } catch (error) {
                console.error('Error updating task:', error);
                handleOpenAlert('Error updating task', 'error');
            }
        }
    };


    // const handleDeleteTask = (task) => {
    //     // Implement the logic to delete the task using the task data
    //     console.log('Delete Task:', task);
    // };

    const columns = [
        {
            field: 'taskWorkDate',
            headerName: 'Date',
            flex: 1,
            valueFormatter: (params) => {
                const date = new Date(params.value);
                if (!isNaN(date.getTime())) {
                    return format(date, 'dd-MM-yyyy');
                } else {
                    return 'Invalid Date';
                }
            },
        },
        // { field: 'taskWorkDate', headerName: 'Date', flex: 1 },
        { field: 'taskOwner', headerName: 'TaskOwner', flex: 1 },
        { field: 'project', headerName: 'Project', flex: 1 },
        { field: 'task', headerName: 'Task', flex: 1 },
        { field: 'empRemarks', headerName: 'Employee Remarks', flex: 1 },
        { field: 'approverRemarks', headerName: 'Approver Remarks', flex: 1 },
        { field: 'empWorkedHours', headerName: 'Worked Hours', flex: 1 },
        { field: 'approvedWorkedHrs', headerName: 'Approved Hours', flex: 1 },
        { field: 'efficiency', headerName: 'Efficiency', flex: 1 },
        { field: 'status', headerName: 'Status', flex: 1 },

        {
            field: 'Action',
            headerName: 'Action',
            renderCell: (params) => (
                <div>
                    <IconButton
                        color="primary"
                        aria-label="Edit"
                        onClick={() => handleEditTask(params.row)}
                    >
                        <EditIcon />
                    </IconButton>

                    {/* <IconButton
                    color="secondary"
                    aria-label="Delete"
                    onClick={() => handleDeleteTask(params.row)}
                >
                    <DeleteIcon />
                </IconButton> */}
                </div>
            ),
        },];


    const isDateDisabled = (date) => {
        // Calculate the min and max allowed dates for the current month
        const currentDate = new Date();
        const minDate = startOfMonth(currentDate);
        const maxDate = endOfDay(currentDate);

        // Calculate the min date for the previous month
        const previousMonthMinDate = startOfMonth(subMonths(currentDate, 1));

        // Check if the given date is before the minDate or after the maxDate for the current month
        const isBeforeMinDate = isBefore(date, minDate);
        const isAfterMaxDate = isAfter(date, maxDate);

        // Check if the selected date is the same as the current date
        const isCurrentDate = date.getDate() === currentDate.getDate() &&
            date.getMonth() === currentDate.getMonth() &&
            date.getFullYear() === currentDate.getFullYear();

        // Check if the current date is less than the 5th day of the month
        const isBeforeFifthDay = currentDate.getDate() < 5;

        // Allow selection of dates from the previous month if the current date is less than the 5th day
        if (isBeforeFifthDay || isCurrentDate) {
            return true; // Disable current date and dates before the 5th day
        }

        // Disable all other dates
        return isBeforeMinDate || isAfterMaxDate || isBefore(date, previousMonthMinDate);
    };


    const formatDateToDDMMYYYY = (date) => {
        return format(date, 'dd-MM-yyyy');
    };
    const parseDDMMYYYYToDate = (dateString) => {
        return parse(dateString, 'dd-MM-yyyy', new Date());
    };

    const handleOpenAlert = (message, severity) => {
        setAlertMessage(message);
        setAlertSeverity(severity);
        setAlertOpen(true);
    };

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: "Task List" }]} />
            </div>

            <Button
                sx={{ mb: 2 }}
                color="primary"
                variant="contained"
                onClick={handleCreateDialogOpen}
            >
                Log Task
            </Button>
            <TaskCreate open={openCreateDialog} onClose={handleCreateDialogClose} onSave={handleCreateTask} />

            <div style={{ height: 600, width: '100%' }}>

                <DataGrid
                    rows={tasks}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10, 20, 50]}
                    getRowId={(row) => row.empWorkHrsId} // Specify the unique identifier
                />
            </div>
            <Snackbar
                open={alertOpen}
                autoHideDuration={4000} // Adjust the duration as needed
                onClose={() => setAlertOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Set anchorOrigin to 'top-right'

            >
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    onClose={() => setAlertOpen(false)}
                    severity={alertSeverity}
                >
                    {alertMessage}
                </MuiAlert>
            </Snackbar>
            {/* Edit Task Dialog */}
            {editTaskData && (
                <Dialog open={openEditDialog} onClose={handleEditDialogClose}>
                    <DialogTitle>Edit Task</DialogTitle>
                    {editTaskData && (
                        <DialogContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        select
                                        size="small"
                                        name="project"
                                        label="Project"
                                        variant="outlined"
                                        value={editTaskData.project}
                                        onChange={(e) => setEditTaskData({ ...editTaskData, project: e.target.value })}
                                        fullWidth
                                        margin="normal"
                                        disabled // Disable user input
                                        sx={{ backgroundColor: 'rgba(25, 118, 210, 0.08)' }} // Add a blue-ish background

                                    >
                                        {/* Use the project value from the API response */}
                                        <MenuItem value={editTaskData.project}>
                                            {editTaskData.project}
                                        </MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        select
                                        size="small"
                                        name="task"
                                        label="Task"
                                        variant="outlined"
                                        value={editTaskData.task}
                                        onChange={(e) => setEditTaskData({ ...editTaskData, task: e.target.value })}
                                        fullWidth
                                        margin="normal"
                                        disabled // Disable user input
                                        sx={{ backgroundColor: 'rgba(25, 118, 210, 0.08)' }} // Add a blue-ish background

                                    >
                                        {/* Use the task value from the API response */}
                                        <MenuItem value={editTaskData.task}>
                                            {editTaskData.task}
                                        </MenuItem>
                                    </TextField>
                                </Grid>

                                <Grid item xs={6}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            fullWidth
                                            format='dd-MM-yyyy'
                                            value={parseDDMMYYYYToDate(editTaskData.taskWorkDate)} // Parse the date for display
                                            onChange={(date) => setEditTaskData({ ...editTaskData, taskWorkDate: formatDateToDDMMYYYY(date) })} // Format the date before updating it
                                            renderInput={(props) => (
                                                <TextField
                                                    {...props}
                                                    label="*Date"
                                                    id="mui-pickers-date"
                                                    sx={{ mb: 1, width: '100%' }}
                                                    size="small"
                                                    margin="normal"
                                                    value={editTaskData.taskWorkDate} // Display the date in 'dd-MM-yyyy' format
                                                    error={Boolean(taskWorkDateError)}
                                                    helperText={taskWorkDateError}
                                                />
                                            )}
                                            shouldDisableDate={isDateDisabled}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        size="small"
                                        name="empWorkedHours"
                                        label="Worked Hours"
                                        variant="outlined"
                                        value={editTaskData.empWorkedHours}
                                        onChange={(e) => setEditTaskData({ ...editTaskData, empWorkedHours: e.target.value })}
                                        type="number"
                                        fullWidth
                                        margin="normal"
                                        error={Boolean(empWorkedHoursError)}
                                        helperText={empWorkedHoursError}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        size="small"
                                        name="clockHours"
                                        label="Clock Hours"
                                        variant="outlined"
                                        value={0} // Set value to 0
                                        disabled // Disable user input
                                        fullWidth
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        size="small"
                                        name="utilizedHours"
                                        label="Utilized Hours"
                                        variant="outlined"
                                        value={0} // Set value to 0
                                        disabled // Disable user input
                                        fullWidth
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        size="small"
                                        name="empRemarks"
                                        label="Employee Remarks"
                                        variant="outlined"
                                        value={editTaskData.empRemarks}
                                        onChange={(e) => setEditTaskData({ ...editTaskData, empRemarks: e.target.value })}
                                        fullWidth
                                        margin="normal"
                                        multiline
                                        rows={3}
                                        error={Boolean(empRemarksError)}
                                        helperText={empRemarksError}
                                    />
                                </Grid>
                            </Grid>
                        </DialogContent>
                    )}
                    <DialogActions>
                        <Button onClick={handleEditDialogClose} color="primary">
                            Close
                        </Button>
                        <Button
                            onClick={() => handleEditTaskSave(editTaskData)}
                            color="primary"
                            variant="contained"
                        >
                            Save Changes
                        </Button>
                    </DialogActions>
                </Dialog>

            )}
        </Container>
    );
};

export default TaskList;