import { Box, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import ModuleTable from "./ModuleTable";

const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
      marginBottom: "30px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
  })
  );

function ModuleMaster() {
  const pathName = "/module-master";
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Module Master", path: pathName }]} />
      </Box>

      <SimpleCard>
        <ModuleTable path= {pathName}/>
      </SimpleCard>
    </Container>
  )
}

export default ModuleMaster;