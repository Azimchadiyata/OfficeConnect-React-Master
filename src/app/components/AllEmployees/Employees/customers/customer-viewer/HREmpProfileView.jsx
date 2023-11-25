import { Divider, styled, Tab, Tabs } from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState } from "react";
import HREmpProfile from "./HREmpProfile";
import HREmpAccountAndStatutory from "./HREmpAccountAndStatutory";
import CustomerLogs from "./CustomerLogs";



const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const HREmpProfileView = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (e, value) => setTabIndex(value);

  return (
    <Container>
      <div className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: "Employees", path: "/Employees" }, { name: "Profile" }]}
        />
      </div>
      <Tabs
        sx={{ mt: 2 }}
        value={tabIndex}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
      >
        {tabList.map((item, ind) => (
          <Tab key={ind} value={ind} label={item} sx={{ textTransform: "capitalize" }} />
        ))}
      </Tabs>
      <Divider sx={{ mb: "24px" }} />

      {tabIndex === 0 && <HREmpProfile />}
      {tabIndex === 1 && <HREmpAccountAndStatutory />}
      {/* {tabIndex === 2 && <CustomerLogs />} */}
    </Container>
  );
};

const tabList = ["Profile", "Account & Statutory"];

export default HREmpProfileView;
