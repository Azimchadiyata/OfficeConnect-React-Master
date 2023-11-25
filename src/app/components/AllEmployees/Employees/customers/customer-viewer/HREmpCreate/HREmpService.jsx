import axios from 'axios';

// Fetch all employees
export const getAllUser = () => {
    return axios.get('http://192.168.2.87:9411/employeeservice/employeeDetails/allEmployeeDetails');
};

// // Delete an employee
// export const deleteEmployee = (empId) => {
//     return axios.delete(`http://api.example.com/employees/${empId}`);
// };
