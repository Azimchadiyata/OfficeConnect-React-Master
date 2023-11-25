import { Box, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import TaskApprovalTable from "./TaskApprovalTable";


const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
        marginBottom: "30px",
        [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
})
);


function TaskApproval() {
    const pathName = "/task-approval"; // Update with the correct path
    return (
        <Container>
            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: "Task Approval", path: pathName }]} />
            </Box>

            <SimpleCard>
                <TaskApprovalTable path={pathName} /> {/* Make sure to pass the correct path and import TaskApprovalTable */}
            </SimpleCard>
        </Container>
    );
}

export default TaskApproval;
