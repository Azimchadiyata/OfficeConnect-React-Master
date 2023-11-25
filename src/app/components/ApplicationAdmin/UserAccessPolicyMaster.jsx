import { Box, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import UserAccessPolicyTable from "./UserAcessPolicyTable";

const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
        marginBottom: "30px",
        [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
})
);

function UserAccessPolicyMaster() {
    const pathName = "/user-access-policy";
    return (
        <Container>
            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: "User-Access-Policy", path: pathName }]} />
            </Box>

            <SimpleCard>
                <UserAccessPolicyTable path={pathName} />
            </SimpleCard>
        </Container>
    )
}

export default UserAccessPolicyMaster;