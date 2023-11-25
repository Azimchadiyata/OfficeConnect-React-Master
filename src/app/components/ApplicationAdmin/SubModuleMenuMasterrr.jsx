// function SubMenuModuleMaster() {
//   return (
//     <div>SubMenuModuleMaster</div>
//   )
// }

// export default SubMenuModuleMaster
import { Box, styled } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import SubModuleMenuMasterTableee from './SubModuleMenuMasterTableee';

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
    }
}));

function SubModuleMenuMasterrr() {
    const pathname = '/sub-menu-module-master';
    return (
        <Container>
            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: 'SubModuleMenu', path: pathname }]} />
            </Box>
            <SimpleCard>
                <SubModuleMenuMasterTableee path={pathname} />
            </SimpleCard>
        </Container>
    );
}


export default SubModuleMenuMasterrr;
