import { TextField, Box, Button, Chip } from "@mui/material";
import { useState } from "react";

const HREmpCurricularActivityForm = ({
  activities,
  onAddActivity,
  onRemoveActivity,
  newActivity,
  onNewActivityChange,
}) => {
  const [inputValue, setInputValue] = useState(""); // Add state for input value

  const handleAddActivity = () => {
    if (inputValue.trim() !== "") {
      onAddActivity(inputValue.trim());
      setInputValue(""); // Clear the input field after adding the activity
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    onNewActivityChange(event); // Call the parent component's onNewActivityChange function
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      {activities.map((activity) => (
        <Box key={activity} sx={{ m: 1 }}>
          <Chip label={activity} onDelete={() => onRemoveActivity(activity)} variant="outlined" />
        </Box>
      ))}
      <Box sx={{ display: "flex", alignItems: "center", marginTop: 1 }}>
        <TextField
          autoFocus
          margin="dense"
          label="Activity"
          type="text"
          fullWidth
          value={newActivity}
          onChange={handleInputChange}
        />
        <Button onClick={handleAddActivity}>Add</Button>
      </Box>
    </Box>
  );
};

export default HREmpCurricularActivityForm;
