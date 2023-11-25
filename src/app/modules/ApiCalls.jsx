import axios from 'axios';

function ApiCalls(url, method) {
  const base = axios({
    url: `http://192.168.2.87:9411/${url}`,
    method: `${method}`,
    headers: {
      Accept: 'application/json',
      Authorization:
      'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY5NzAyNjE2NSwiZXhwIjoxNjk3MDI5NzY1fQ.03xI6Yyq8UvFlJqKilhsxhdM2crvgcc5VTbiRLsVX0jYI3UxQqqO2zj44NYqyauc9OJrNxvJdPLAuDbIhsCSSA'

    }
  });
  return <></>;
}

export default ApiCalls;

