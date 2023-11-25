import { Icon, IconButton, TableCell, TableRow } from '@mui/material';
import EditForm from './EditForm';
import { useState } from 'react';

function ModuleRow({ path, record, handleDeleteClick, submit }) {
  const [edit, setEdit] = useState(false);

  const handleEditClick = () => {
    setEdit(!edit);
  };

  const deleteRecord = (record) => {
    handleDeleteClick(record);
    console.log(record.moduleId);
  };

  const handleSubmitClick = (e) => {
    submit(e, record);
  };

  return (
    <TableRow>
      {path === '/sub-menu-module-master' && (
        <TableCell align="left">{record['sub-menu-module-name']}</TableCell>
      )}
      {(path === '/sub-module-master' || path === '/sub-menu-module-master') && (
        <TableCell align="left"></TableCell>
      )}
      {!edit && <TableCell align="left">{record['moduleName']}</TableCell>}
      <TableCell>
        <EditForm
          handleSubmitClick={handleSubmitClick}
          handleEditClick={handleEditClick}
          edit={edit}
          record={record}
        />
      </TableCell>
      {edit && <TableCell></TableCell>}
      <TableCell align="right">
        <IconButton onClick={() => handleEditClick(record)}>
          <Icon color="edit">edit</Icon>
        </IconButton>
        <IconButton onClick={() => deleteRecord(record)}>
          <Icon color="error">close</Icon>
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

export default ModuleRow;
