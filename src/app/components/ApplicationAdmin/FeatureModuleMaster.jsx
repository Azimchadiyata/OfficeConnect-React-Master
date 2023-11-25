import { Box, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import FeatureModuleTable from "./FeatureModuleTable";

const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
        marginBottom: "30px",
        [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
})
);

function FeatureModuleMaster() {
    const pathName = "/feature-master";
    return (
        <Container>
            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: "Feature Module", path: pathName }]} />
            </Box>

            <SimpleCard>
                <FeatureModuleTable path={pathName} />
            </SimpleCard>
        </Container>
    )
}

export default FeatureModuleMaster;