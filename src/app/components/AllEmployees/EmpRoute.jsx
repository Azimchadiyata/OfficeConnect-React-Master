import { authRoles } from 'app/auth/authRoles';


import Loadable from "app/components/Loadable";
import { lazy } from "react";

const HREmpCrudTable = Loadable(lazy(() => import("../AllEmployees/Employees/HREmpCrudTable")));
// const CustomerViewer = Loadable(lazy(() => import("./Employees/customers/customer-viewer/HREmpProfileView")));
// const EmployeesForm = Loadable(lazy(() => import("../AllEmployees/Employees/customers/customer-form/EmployeesForm")));
const HREmpProfileMain = Loadable(lazy(() => import("./Employees/customers/customer-viewer/HREmpProfileMain")));


const empRoute = [
        { path: "employees/emp-list", element: <HREmpCrudTable />, auth: authRoles.editor },
        // { path: "employees/emp-profile", element: <CustomerViewer />, auth: authRoles.editor },
        // { path: "employees/new-emp", element: <EmployeesForm />, auth: authRoles.editor },
        { path: "/employees/emp-profile/:empId", element: <HREmpProfileMain />, auth: authRoles.editor }





];

export default empRoute;


// testing 