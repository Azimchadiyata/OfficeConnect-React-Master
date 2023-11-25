import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
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
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import { DatePicker } from '@mui/lab';

const validationSchema = yup.object().shape({
    project: yup.string().required('Project is required'),
    task: yup.string().required('Task is required'),
    taskWorkDate: yup
        .date()
        .required('Date is required'),
    // .min(startOfMonth(subMonths(new Date(), 1)), 'Date must be after the 1st of the previous month')
    // .max(endOfDay(subMonths(new Date(), 0)), 'Date must be before today'),

    empWorkedHours: yup
        .number()
        .required('Work Hours is required')
        .positive('Work Hours must be a positive number')
        .max(24, 'Work Hours cannot be more than 24 hours'), // Add this validation
    empRemarks: yup.string().required('Employee Remarks is required'),
});

const TaskCreate = ({ open, onClose, onSave, initialTaskData }) => {
    const [projectList, setProjectList] = useState([]);
    const [taskList, setTaskList] = useState([]);
    const isEditMode = !!initialTaskData;

    const formik = useFormik({
        initialValues: {
            project: isEditMode ? initialTaskData.project : '',
            task: isEditMode ? initialTaskData.task : '',
            approvedWorkedHrs: 0,
            approverRemarks: '0',
            compId: 0,
            createdBy: 0,
            createdDate: '',
            efficiency: 0,
            // empId: 0,
            empRemarks: isEditMode ? initialTaskData.empRemarks : '',
            empWorkHrsId: 0,
            empWorkedHours: isEditMode ? initialTaskData.empWorkedHours : 0,
            empno: sessionStorage.getItem('userName'),
            ipCreated: '',
            ipModify: '',
            jobOwnerId: '',
            modifiedBy: 0,
            modifiedDate: '',
            project: '',
            projectType: '',
            recordStatus: true,
            selectedTaskId: 0,
            shortageHrs: 0,
            status: true,
            task: '',
            taskSelName: '',
            taskType: '',
            taskWorkDate: isEditMode ? new Date(initialTaskData.taskWorkDate) : null,
            taskmap: '',
            wrkbnchTaskId: 0,

        },
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            if (isEditMode) {
                // If in edit mode, add the necessary fields
                values.empWorkHrsId = initialTaskData.empWorkHrsId;
                values.empno = initialTaskData.empno;
                values.projectType = initialTaskData.projectType;
                values.taskType = initialTaskData.taskType;
            }
            onSave(values);
            resetForm();
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

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{isEditMode ? 'Edit Task' : 'Log Task'}</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
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
                            {Array.isArray(projectList) && projectList.map((project) => (
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

                            {Array.isArray(taskList) && taskList.map((task) => (
                                <MenuItem key={task.taskID} value={task.taskName}>
                                    {task.taskName}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    {/* <TextField
                            size="small"
                            name="date"
                            label="Date"
                            type="date"
                            variant="outlined"
                            value={formik.values.date}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.date && Boolean(formik.errors.date)}
                            helperText={formik.touched.date && formik.errors.date}
                            fullWidth
                            margin="normal"
                        /> */}

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
                    {/* <Grid item xs={6}>
                        <TextField
                            size="small"
                            name="clockHours"
                            label="Clock Hours"
                            variant="outlined"
                            value={formik.values.clockHours}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.clockHours && Boolean(formik.errors.clockHours)}
                            helperText={formik.touched.clockHours && formik.errors.clockHours}
                            fullWidth
                            margin="normal"
                        />
                    </Grid> */}
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

                    {/* <Grid item xs={6}>
                        <TextField
                            size="small"
                            name="utilizedHours"
                            label="Utilized Hours"
                            variant="outlined"
                            value={formik.values.utilizedHours}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.utilizedHours && Boolean(formik.errors.utilizedHours)}
                            helperText={formik.touched.utilizedHours && formik.errors.utilizedHours}
                            fullWidth
                            margin="normal"
                        />
                    </Grid> */}

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
                            value={formik.values.empRemarks}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.empRemarks && Boolean(formik.errors.empRemarks)}
                            helperText={formik.touched.empRemarks && formik.errors.empRemarks}
                            fullWidth
                            margin="normal"
                            multiline
                            rows={3}
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
                // disabled={!formik.isValid || formik.isSubmitting}
                >
                    {isEditMode ? 'Update' : 'Save'}

                </Button>
            </DialogActions>
        </Dialog>
    );
};
export default TaskCreate;