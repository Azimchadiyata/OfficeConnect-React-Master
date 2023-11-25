export const navigations = [
  { name: 'Dashboard', path: '/dashboard/default', icon: 'dashboard' },
  // { label: 'PAGES', type: 'label' },
  // {
  //   name: 'Session/Auth',
  //   icon: 'security',
  //   children: [
  //     { name: 'Sign in', iconText: 'SI', path: '/session/signin' },
  //     { name: 'Sign up', iconText: 'SU', path: '/session/signup' },
  //     { name: 'Forgot Password', iconText: 'FP', path: '/session/forgot-password' },
  //     { name: 'Error', iconText: '404', path: '/session/404' }
  //   ]
  // },

  // { label: "Employees", type: "label" },

  {
    name: "Employees",
    icon: "people",
    children: [
      { name: "All Employees", path: "/employees/emp-list", iconText: "AE" },
      // { name: "Attendance", path: "*", iconText: "VC" },
      // { name: "Leave", path: "*", iconText: "NC" },
    ],
  },

  { label: "Admins", type: "label" },
  {
    name: 'Application - Admin',
    icon: 'account_box',
    children: [
      { name: 'Module', path: '/application-admin/module', iconText: 'MO' },
      { name: 'SubModule', path: '/application-admin/sub-module', iconText: 'SM' },
      { name: 'SubModuleMenu', path: '/application-admin/sub-module-menu', iconText: 'SMM' },
      { name: 'Feature Module', path: '/application-admin/feature', iconText: 'FE' },
      { name: 'User Access Policy', path: '/application-admin/user-access-policy', iconText: 'UA' },
    ],
  },

  { label: "Tasks", type: "label" },
  {
    name: 'TaskSheet',
    icon: 'people',
    children: [
      { name: 'Task List', path: '/tasklist', iconText: 'TL' },
      { name: 'Task Approval', path: '/taskapproval', iconText: 'TA' },

    ],
  },



  // { label: 'Components', type: 'label' },
  // {
  //   name: 'Components',
  //   icon: 'favorite',
  //   badge: { value: '30+', color: 'secondary' },
  //   children: [
  //     { name: 'Auto Complete', path: '/material/autocomplete', iconText: 'A' },
  //     { name: 'Buttons', path: '/material/buttons', iconText: 'B' },
  //     { name: 'Checkbox', path: '/material/checkbox', iconText: 'C' },
  //     { name: 'Dialog', path: '/material/dialog', iconText: 'D' },
  //     { name: 'Expansion Panel', path: '/material/expansion-panel', iconText: 'E' },
  //     { name: 'Form', path: '/material/form', iconText: 'F' },
  //     { name: 'Icons', path: '/material/icons', iconText: 'I' },
  //     { name: 'Menu', path: '/material/menu', iconText: 'M' },
  //     { name: 'Progress', path: '/material/progress', iconText: 'P' },
  //     { name: 'Radio', path: '/material/radio', iconText: 'R' },
  //     { name: 'Switch', path: '/material/switch', iconText: 'S' },
  //     { name: 'Slider', path: '/material/slider', iconText: 'S' },
  //     { name: 'Snackbar', path: '/material/snackbar', iconText: 'S' },
  //     { name: 'Table', path: '/material/table', iconText: 'T' }
  //   ]
  // },
  // {
  //   name: 'Charts',
  //   icon: 'trending_up',
  //   children: [{ name: 'Echarts', path: '/charts/echarts', iconText: 'E' }]
  // },
  // {
  //   name: 'Documentation',
  //   icon: 'launch',
  //   type: 'extLink',
  //   path: 'http://demos.ui-lib.com/matx-react-doc/'
  // }
];
