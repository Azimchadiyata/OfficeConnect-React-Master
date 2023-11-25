import { authRoles } from 'app/auth/authRoles';


import Loadable from "app/components/Loadable";
import { lazy } from "react";
import TaskCreate from './TaskCreate';
import TaskList from './TaskList';
import TaskApproval from './TaskApproval';
// import ModuleMaster from './ModuleMaster';
// import SubModuleMaster from './SubModuleMaster';
// import SubMenuModuleMaster from './SubMenuModuleMaster';

// const HREmpCrudTable = Loadable(lazy(() => import("../AllEmployees/Employees/HREmpCrudTable")));
// const CustomerViewer = Loadable(lazy(() => import("./Employees/customers/customer-viewer/HREmpProfileView")));
// const EmployeesForm = Loadable(lazy(() => import("../AllEmployees/Employees/customers/customer-form/EmployeesForm")));
// const HREmpProfileMain = Loadable(lazy(() => import("./Employees/customers/customer-viewer/HREmpProfileMain")));





const TaskRoute = [
    { path: "/tasklist", element: < TaskList />, auth: authRoles.editor },
    { path: "/taskapproval", element: < TaskApproval />, auth: authRoles.editor },

];

export default TaskRoute;
