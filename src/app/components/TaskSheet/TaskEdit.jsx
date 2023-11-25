import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Grid,
    MenuItem,
    Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers';
import { format } from 'date-fns';
import { subMonths, startOfMonth, endOfDay, isBefore, isAfter } from 'date-fns';

const validationSchema = yup.object().shape({
    // Define your validation schema here for form fields
});

const TaskEdit = ({ open, onClose, task, onSave }) => {
    const [projectList, setProjectList] = useState([]);
    const [taskList, setTaskList] = useState([]);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success'); // You can change this to 'error', 'warning', or 'info' as needed

    const API_BASE_URL = 'http://192.168.2.87:8086';

    const handleOpenAlert = (message, severity) => {
        setAlertMessage(message);
        setAlertSeverity(severity);
        setAlertOpen(true);
    };

    // Define your formik initialValues object here

    const formik = useFormik({
        initialValues: {
            // Initialize your form fields with task data here
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // Handle form submission here
        },
    });

    useEffect(() => {
        const fetchProjectList = async () => {
            try {
                const response = await axios.post('http://192.168.2.87:8086/apiListing/taskProjectDetails', {
                    searchBYSpinner: 'ALL',
                    userName: sessionStorage.getItem('userName'), // Retrieve username from session storage
                    userType: sessionStorage.getItem('userType'), // Retrieve userType from session storage
                });
                setProjectList(response.data); // Assuming the API response is an array of project names
            } catch (error) {
                console.error('Error fetching project list:', error);

            }
        };

        fetchProjectList();
    }, []);


    useEffect(() => {
        const fetchTaskList = async () => {
            try {
                const response = await axios.post('http://192.168.2.87:8086/apiListing/taskDetails', {
                    projectName: formik.values.project,
                    searchBYSpinner: 'ALL',
                    searchTxt: '',
                    userID: sessionStorage.getItem('userId'),
                    userType: sessionStorage.getItem('userType'),
                });
                setTaskList(response.data); // Assuming the API response is an array of task names
            } catch (error) {
                console.error('Error fetching task list:', error);
            }
        };

        if (formik.values.project) {
            fetchTaskList();
        }
    }, [formik.values.project]);

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogContent>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        {/* Example form fields, replace with your actual form fields */}
                        <Grid item xs={12}>

                            <TextField
                                select
                                size="small"
                                name="project"
                                label="Project"
                                variant="outlined"
                                value={formik.values.project}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.project && Boolean(formik.errors.project)}
                                helperText={formik.touched.project && formik.errors.project}
                                fullWidth
                                margin="normal"
                            >
                                {projectList.map((project) => (
                                    <MenuItem key={project.projectID} value={project.projectName}>
                                        {project.projectName}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>

                            <TextField
                                select
                                size="small"
                                name="task"
                                label="Task"
                                variant="outlined"
                                value={formik.values.task}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.task && Boolean(formik.errors.task)}
                                helperText={formik.touched.task && formik.errors.task}
                                fullWidth
                                margin="normal"
                            >
                                {taskList.map((task) => (
                                    <MenuItem key={task.taskID} value={task.taskName}>
                                        {task.taskName}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    fullWidth
                                    format='dd-MM-yyyy'
                                    value={formik.values.taskWorkDate}
                                    onChange={(date) => formik.setFieldValue('taskWorkDate', date)}
                                    renderInput={(props) => (
                                        <TextField
                                            {...props}
                                            label="*Date"
                                            id="mui-pickers-date"
                                            sx={{ mb: 1, width: '100%' }}
                                            size="small"
                                            margin="normal"
                                            // Format the date in DD-MM-YYYY format for display
                                            value={format(formik.values.taskWorkDate, 'dd-MM-yyyy')}
                                            error={formik.touched.taskWorkDate && Boolean(formik.errors.taskWorkDate)}
                                            helperText={formik.touched.taskWorkDate && formik.errors.taskWorkDate}
                                        />
                                    )}
                                // shouldDisableDate={isDateDisabled}
                                />
                            </LocalizationProvider>
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                size="small"
                                name="empWorkedHours"
                                label="Worked Hours"
                                variant="outlined"
                                value={formik.values.empWorkedHours}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type="number"
                                error={formik.touched.empWorkedHours && Boolean(formik.errors.empWorkedHours)}
                                helperText={formik.touched.empWorkedHours && formik.errors.empWorkedHours}
                                fullWidth
                                margin="normal"
                            />
                        </Grid>
                        {/* Add more form fields as needed */}
                    </Grid>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={formik.handleSubmit}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default TaskEdit;
