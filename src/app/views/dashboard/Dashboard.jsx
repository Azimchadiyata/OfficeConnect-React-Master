//
import { Box, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import Analytics from "./Analytics";
import Home from "./Home";

const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
        marginBottom: "30px",
        [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
})
);

function DashBoard() {
    const pathName = "/dashboard/default";
    return (
        <Container>
            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: "Dashboard", path: pathName }]} />
            </Box>
            <SimpleCard>
                {/* <Analytics path={pathName} /> */}
                <Home path={pathName} />

            </SimpleCard>
        </Container>
    )
}

export default DashBoard;