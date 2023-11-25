import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { AddCircleOutline } from "@mui/icons-material";
import { Button, Card, Divider, IconButton, Chip } from "@mui/material";
import { useParams } from "react-router-dom";
import { H4 } from "app/components/Typography";
import HREmpSkillForm from "./HREmpSkillsForm";
import { APIbackend } from '../../../../../../APIbackendurl';


const HREmpSkill = () => {
  const [open, setOpen] = useState(false);
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [postedSkills, setPostedSkills] = useState([]);
  const { empId } = useParams();
  const { APIbackendURl } = useContext(APIbackend);


  const handleNewSkillChange = (event) => {
    if (event && event.target) {
      setNewSkill(event.target.value);
    }
  };

  const handleAddSkill = (skill) => {
    setSkills((prevSkills) => [...prevSkills, skill]);
  };

  const handleRemoveSkill = (skill) => {
    setSkills((prevSkills) => prevSkills.filter((s) => s !== skill));
  };

  const handleSave = async () => {
    try {
      // Make POST request to the API endpoint
      const response = await axios.post(
        `${APIbackendURl.basePointUrl}applicationservice/empSkill/createEmpSkill`,
        {
          skillId: 0,
          empId: empId,
          skill: skills,
        }
      );
      console.log(response.data); // Optional: Handle the response from the API

      setOpen(false);
      fetchPostedSkills(); // Fetch the updated skills data after posting
    } catch (error) {
      console.error("Error:", error);
      // Handle error condition
    }
  };

  const fetchPostedSkills = async () => {
    try {
      // Make POST request to retrieve the skills data from the API
      const response = await axios.post(
        `${APIbackendURl.basePointUrl}applicationservice/empSkill/getSkillByEmpId`,
        { empId }
      );
      console.log(response.data); // Optional: Handle the response from the API

      // Update the state with the fetched skills data
      setPostedSkills(response.data); // Assuming the response contains the skill data directly
    } catch (error) {
      console.error("Error:", error);
      // Handle error condition
    }
  };

  useEffect(() => {
    fetchPostedSkills(); // Fetch the skills data when the component mounts
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
        <H4 sx={{ p: 2 }}>Skills</H4>
        <Divider />

        {/* Display the posted skills data */}
        {postedSkills && postedSkills.skill && postedSkills.skill.length > 0 ? (
          postedSkills.skill.map((skill) => (
            <Chip key={skill} label={skill} variant="outlined" sx={{ m: 1 }} />
          ))
        ) : (
          <p>No skills found.</p>
        )}
      </div>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Skills</DialogTitle>
        <DialogContent>
          <HREmpSkillForm
            skills={skills}
            onAddSkill={handleAddSkill}
            onRemoveSkill={handleRemoveSkill}
            newSkill={newSkill}
            onNewSkillChange={handleNewSkillChange}
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

export default HREmpSkill;