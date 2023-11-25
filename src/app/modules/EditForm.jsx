import { Button } from '@mui/material';
import { Icon } from '@mui/material';
import { useState } from 'react';

function EditForm({ edit, record, handleEditClick, handleSubmitClick }) {
  const [input, setInput] = useState(record['moduleName']);

  const handleEdit = (e) => {
    setInput(e.target.value);
  };
  const handleClose = () => {
    handleEditClick();
    setInput(record['moduleName']);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSubmitClick(input);
    handleEditClick();
    setInput(input);
  };
  return (
    // <form onSubmit={handleSubmit} style={{ visibility: `${edit ? 'visible' : 'hidden'}` }}>
    //   <input value={input} onChange={handleEdit} type="text" style={{ width: '100%' }} />
    //   <div style={{ display: 'flex', justifyContent: 'center' }}>
    //     <Button variant="done" type="submit">
    //       <Icon>done</Icon>
    //     </Button>
    //     <Button variant="clear" onClick={handleClose}>
    //       <Icon>clear</Icon>
    //     </Button>
    //   </div>
    // </form>
    <form onSubmit={handleSubmit} style={{ visibility: `${edit ? 'visible' : 'hidden'}` }}>
      <input
        value={input}
        onChange={handleEdit}
        type="text"
        style={{ width: '50%', padding: '7px' }}
      />
      <Button variant="done" type="submit">
        <Icon>done</Icon>
      </Button>
      <Button variant="clear" onClick={handleClose}>
        <Icon>clear</Icon>
      </Button>
    </form>
  );
}

export default EditForm;
