import {
  Box,
  Icon,
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { Span } from 'app/components/Typography';
import { Button, Grid } from '@mui/material';
import ModuleRow from './ModuleRow';
import { APIbackend } from '../../APIbackendurl';


const StyledTable = styled(Table)(() => ({
  whiteSpace: 'pre',
  '& thead': {
    '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } }
  },
  '& tbody': {
    '& tr': { '& td': { paddingLeft: 0, textTransform: 'capitalize' } }
  }
}));

const ModuleTable = ({ path }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [records, setRecords] = useState([]);
  const [subRecords, setSubRecords] = useState([]);
  const [subMenuRecords, setSubMenuRecords] = useState([]);
  const [inputData, setInputData] = useState('');
  const { APIbackendURl } = useContext(APIbackend);



  const auth =
    ' Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY5NzA4ODM1OSwiZXhwIjoxNjk3MDkxOTU5fQ.N9340MAvx3cPTBcdhTbgJFatXRYZgj-CTy9B4OPVx5g8SfSLn7XZT_I0S-MoZ7e05PPo4IdswUbpTMXoOcZafw';

  useEffect(() => {
    // axios.get("http://localhost:3030/module-master").then(res => {
    axios({
      url: `${APIbackendURl.basePointUrl}applicationservice/Admin/ApplicationAdmin/ModuleMaster/View?page=${page + 1
        }&size=${rowsPerPage}&moduleName=${inputData}`, // Add moduleName parameter here
      method: 'get',
      headers: {
        Accept: 'application/json',
        Authorization: auth
      }
    }).then((res) => {
      setRecords(res.data.Models);
    });
    axios({
      url: `${APIbackendURl.basePointUrl}applicationservice/Admin/ApplicationAdmin/SubModuleMaster/View?page=${page + 1
        }&size=${rowsPerPage}`,
      method: 'get',
      headers: {
        Accept: 'application/json',
        Authorization: auth
      }
    }).then((subres) => {
      setSubMenuRecords(subres.data.Models);
    });
    // axios({
    //   url: `${APIbackendURl.basePointUrl}applicationservice/Admin/ApplicationAdmin/SubMenuModuleMaster/View?page=${
    //     page + 1
    //   }&size=${rowsPerPage}`,
    //   method: 'get',
    //   headers: {
    //     Accept: 'application/json',
    //     Authorization:
    //       auth
    //   }
    // }).then((res) => {
    //   setSubMenuRecords(res.data.Models);
    //   console.log(subMenuRecords);
    // });
  }, []);
  const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px'
  }));

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDeleteClick = async (rec) => {
    // await axios.delete(`http://localhost:3030/module-master/${rec.id}`);
    await axios({
      url: `${APIbackendURl.basePointUrl}applicationservice/Admin/ApplicationAdmin/ModuleMaster/Delete`,
      data: {
        moduleId: rec.moduleId
      },
      method: 'post',
      Accept: '*/*',
      headers: {
        Accept: 'application/json',
        Authorization: auth
      }
    });
    const deletedArr = records.filter((r) => {
      return r !== rec;
    });
    setRecords(deletedArr);
  };

  const handleInputChange = (ev) => {
    setInputData(ev.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputData);
    // const response = await axios.post('http://localhost:3030/module-master', {
    //   task: inputData,
    //   submodules: {}
    // });
    const response = await axios({
      url: `${APIbackendURl.basePointUrl}applicationservice/Admin/ApplicationAdmin/ModuleMaster/Create`,
      data: {
        moduleName: inputData
      },
      method: 'post',
      headers: {
        Accept: 'application/json',
        Authorization: auth
      }
    });

    if (inputData === '') {
      alert('Task cannot be empty');
    } else {
      setRecords([...records, response.data]);
      setInputData('');
    }

  };

  const handleSubmitClick = async (txt, rec) => {
    console.log(txt, rec.moduleId);
    // const response = await axios.patch(`http://localhost:3030/module-master/${rec.id}`, {
    //   task: txt
    // });
    const response = await axios({
      url: `${APIbackendURl.basePointUrl}applicationservice/Admin/ApplicationAdmin/ModuleMaster/Edit`,
      data: {
        moduleId: rec.moduleId,
        moduleName: txt
      },
      method: 'put',
      Accept: '*/*',
      headers: {
        Accept: 'application/json',
        Authorization: auth
      }
    });
    if (txt === '') {
      alert('Task cannot be empty');
    } else {
      console.log(response.data);
      console.log(rec.moduleId);
      const deletedArr = records.filter((r) => {
        return r !== rec;
      });
      setRecords([...deletedArr, response.data]);
      // setRecords([...deletedArr.splice(rec.moduleId - 1, 0, response.data)]);
      console.log(deletedArr.splice(rec.moduleId - 1, 0, response.data));
    }
  };

  const moduleDropdown = records.map((r, id) => {
    return (
      <option key={id} value={r}>
        {r['moduleName']}
      </option>
    );
  });
  const subModuleDropdown = records.map((sr, sid) => {
    return (
      <option key={sid} value={sr}>
        {sr['subModuleName']}
      </option>
    );
  });

  return (
    <Box width="100%" overflow="auto">
      <ValidatorForm onSubmit={handleSubmit}>
        <Grid
          style={{ justifyContent: 'between' }}
          item
          lg={6}
          md={6}
          sm={12}
          xs={12}
          sx={{ mt: 2 }}
        >
          <input
            style={{ width: '70%', padding: '8px', marginRight: '10px', marginBottom: '10px' }}
            type="text"
            name="task"
            value={inputData}
            label="Task"
            onChange={handleInputChange}
          />
          <div>
            {(path === '/sub-module-master' || path === '/sub-menu-module-master') && (
              <span>
                <label htmlFor="module">Module</label>
                <select
                  style={{ width: '20%', padding: '8px', marginRight: '10px' }}
                  name="module"
                  id="module"
                >
                  {moduleDropdown}
                </select>
              </span>
            )}
            {path === '/sub-menu-module-master' && (
              <span>
                <label htmlFor="sub-module">Sub Module</label>
                <select
                  style={{ width: '20%', padding: '8px', marginRight: '10px' }}
                  name="sub-module"
                  id="sub-module"
                >
                  {subModuleDropdown}
                </select>
              </span>
            )}
            <Button color="primary" variant="contained" type="submit">
              <Icon>send</Icon>
              <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Submit</Span>
            </Button>
          </div>
        </Grid>
      </ValidatorForm>
      <StyledTable>
        <TableHead>
          <TableRow>
            {path === '/sub-menu-module-master' && (
              <TableCell align="left">Sub Menu Module</TableCell>
            )}
            {(path === '/sub-module-master' || path === '/sub-menu-module-master') && (
              <TableCell align="left">Sub Module</TableCell>
            )}
            <TableCell align="left">Task</TableCell>
            <TableCell></TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((record, index) => (
              <ModuleRow
                path={path}
                key={index}
                record={record}
                handleDeleteClick={handleDeleteClick}
                submit={handleSubmitClick}
              />
            ))}
        </TableBody>
      </StyledTable>
      <TablePagination
        sx={{ px: 2 }}
        page={page}
        component="div"
        rowsPerPage={rowsPerPage}
        count={records.length}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        nextIconButtonProps={{ 'aria-label': 'Next Page' }}
        backIconButtonProps={{ 'aria-label': 'Previous Page' }}
      />
    </Box>
  );
};

export default ModuleTable;
