import React, { useState } from "react";
import { Box, Button, Chip, TextField } from "@mui/material";

const HREmpSkillForm = ({
    skills,
    onAddSkill,
    onRemoveSkill,
    newSkill,
    onNewSkillChange,
}) => {
    const [inputValue, setInputValue] = useState("");
    const [addButtonClicked, setAddButtonClicked] = useState(false);

    const handleAddSkill = () => {
        if (inputValue.trim() !== "") {
            onAddSkill(inputValue.trim());
            setInputValue("");
            setAddButtonClicked(true); // Set the flag to true when "Add" button is clicked
        }
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        onNewSkillChange(event);
        setAddButtonClicked(false); // Reset the flag when input value changes
    };

    return (
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            {skills.map((skill) => (
                <Box key={skill} sx={{ m: 1 }}>
                    <Chip
                        label={skill}
                        onDelete={() => onRemoveSkill(skill)}
                        variant="outlined"
                    />
                </Box>
            ))}
            <Box sx={{ display: "flex", alignItems: "center", marginTop: 1 }}>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Skill"
                    type="text"
                    fullWidth
                    value={newSkill}
                    onChange={handleInputChange}
                />
                <Button onClick={handleAddSkill}>Add</Button>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", marginTop: 1 }}>
                {/* Disable the Save button until Add button is clicked */}
                <Button disabled={!addButtonClicked}>Save</Button>
            </Box>
        </Box>
    );
};

export default HREmpSkillForm;
