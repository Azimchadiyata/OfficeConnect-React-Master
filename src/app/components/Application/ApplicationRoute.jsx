import { DesktopDateRangePicker } from '@mui/lab';
import { authRoles } from 'app/auth/authRoles';


import Loadable from "app/components/Loadable";
import { lazy } from "react";

const SubModuleCrudTable = Loadable(lazy(() => import("../Application/SubModuleCrudTable")));


const ApplicationRoute = [{ path: "application/submodule", element: <SubModuleCrudTable />, auth: authRoles.editor }];


export default ApplicationRoute;