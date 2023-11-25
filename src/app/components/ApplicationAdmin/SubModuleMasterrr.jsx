import { Box, styled } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import SubModuleTableee from './SubModuleMasterTableee';

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
    }
}));

function SubModuleMasterrr() {
    const pathname = '/sub-module-master';
    return (
        <Container>
            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: 'SubModule', path: pathname }]} />
            </Box>
            <SimpleCard>
                <SubModuleTableee path={pathname} />
            </SimpleCard>
        </Container>
    );
}

export default SubModuleMasterrr;
