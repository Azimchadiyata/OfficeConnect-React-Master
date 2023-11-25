import axios from 'axios';

const baseURL = 'http://192.168.2.87:9411/applicationservice/Admin/ApplicationAdmin/ModuleMaster/Create';

const axiosInstance = axios.create({
  baseURL,
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY5NjkzODg5OCwiZXhwIjoxNjk2OTQyNDk4fQ.znlilPnmxXqb9bSvHVX_c1g-vVUdzrUYUCabEBrGZv0lYiiXKti5CJPWpm06BzjbYE1Vc4HCvtCM-VsDDoG5gQ',
  },
});

export default axiosInstance;
