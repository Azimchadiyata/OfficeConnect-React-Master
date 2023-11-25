import { Box, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import ModuleTableee from "./ModuleTableee";

const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
        marginBottom: "30px",
        [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
})
);

function ModuleMasterrr() {
    const pathName = "/module-master";
    return (
        <Container>
            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: "Module", path: pathName }]} />
            </Box>

            <SimpleCard>
                <ModuleTableee path={pathName} />
            </SimpleCard>
        </Container>
    )
}

export default ModuleMasterrr;