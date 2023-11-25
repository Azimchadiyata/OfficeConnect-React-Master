import { Box, styled } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import ModuleTable from './ModuleTable';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

function SubModuleMaster() {
  const pathname = '/sub-module-master';
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'Sub Module Master', path: pathname }]} />
      </Box>
      <SimpleCard>
        <ModuleTable path={pathname} />
      </SimpleCard>
    </Container>
  );
}

export default SubModuleMaster;
