import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { AddCircleOutline } from "@mui/icons-material";
import { Button, Card, Divider, IconButton, Chip } from "@mui/material";
import { useParams } from "react-router-dom";
import HREmpCurricularActivityForm from "./HREmpCurricularActivityForm";
import { H4 } from "app/components/Typography";
import { APIbackend } from '../../../../../../../APIbackendurl';


const HREmpCurricularActivity = () => {
    const [open, setOpen] = useState(false);
    const [activities, setActivities] = useState([]);
    const [newActivity, setNewActivity] = useState("");
    const [postedActivities, setPostedActivities] = useState([]);
    const { empId } = useParams();
    const { APIbackendURl } = useContext(APIbackend);


    const handleNewActivityChange = (event) => {
        if (event && event.target) {
            setNewActivity(event.target.value);
        }
    };

    const handleAddActivity = (activity) => {
        setActivities((prevActivities) => [...prevActivities, activity]);
    };

    const handleRemoveActivity = (activity) => {
        setActivities((prevActivities) => prevActivities.filter((a) => a !== activity));
    };

    const handleSave = async () => {
        try {
            // Make POST request to the API endpoint
            const response = await axios.post(
                `${APIbackendURl.basePointUrl}employeeservice/EmpCurricular/createEmpCurricular`,
                {
                    curricularId: 0,
                    empId: empId,
                    activity: activities,
                }
            );
            console.log(response.data); // Optional: Handle the response from the API

            setOpen(false);
            fetchPostedActivities(); // Fetch the updated activities data after posting
        } catch (error) {
            console.error("Error:", error);
            // Handle error condition
        }
    };

    const fetchPostedActivities = async () => {
        try {
            // Make POST request to retrieve the activities data from the API
            const response = await axios.post(
                `${APIbackendURl.basePointUrl}employeeservice/EmpCurricular/getCurricularByEmpId`,
                { empId }
            );
            console.log(response.data); // Optional: Handle the response from the API

            // Update the state with the fetched activities data
            setPostedActivities(response.data); // Assuming the response contains the activity data directly
        } catch (error) {
            console.error("Error:", error);
            // Handle error condition
        }
    };

    useEffect(() => {
        fetchPostedActivities(); // Fetch the activities data when the component mounts
    }, [empId]);

    return (
        <Card elevation={3}>
            <div style={{ position: "relative" }}>
                <IconButton
                    sx={{ position: "absolute", top: 0, right: 0, zIndex: 1 }}
                    onClick={() => setOpen(true)}
                >
                    <AddCircleOutline />
                </IconButton>
                <H4 sx={{ p: 2 }}>Curricular Activities</H4>
                <Divider />

                {/* Display the posted activities data */}
                {postedActivities && postedActivities.activity && postedActivities.activity.length > 0 ? (
                    postedActivities.activity.map((activity) => (
                        <Chip key={activity} label={activity} variant="outlined" sx={{ m: 1 }} />
                    ))
                ) : (
                    <p>No activities found.</p>
                )}
            </div>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Add Curricular Activities</DialogTitle>
                <DialogContent>
                    <HREmpCurricularActivityForm
                        activities={activities}
                        onAddActivity={handleAddActivity}
                        onRemoveActivity={handleRemoveActivity}
                        newActivity={newActivity}
                        onNewActivityChange={handleNewActivityChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
};

export default HREmpCurricularActivity;
