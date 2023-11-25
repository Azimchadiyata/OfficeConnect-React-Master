import { authRoles } from 'app/auth/authRoles';


import Loadable from "app/components/Loadable";
import { lazy } from "react";


import ModuleMasterrr from './ModuleMasterrr';
import SubModuleMasterrr from './SubModuleMasterrr';
import SubModuleMenuMasterrr from './SubModuleMenuMasterrr';
import FeatureModuleMaster from './FeatureModuleMaster';
import UserAccessPolicyMaster from './UserAccessPolicyMaster';


const applicationAdminRoute = [
    { path: "/application-admin/module", element: <ModuleMasterrr />, auth: authRoles.editor },
    { path: "/application-admin/sub-module", element: <SubModuleMasterrr />, auth: authRoles.editor },
    { path: "/application-admin/sub-module-menu", element: <SubModuleMenuMasterrr />, auth: authRoles.editor },
    { path: "/application-admin/feature", element: <FeatureModuleMaster />, auth: authRoles.editor },
    { path: "/application-admin/user-access-policy", element: <UserAccessPolicyMaster />, auth: authRoles.editor },


];

export default applicationAdminRoute;
