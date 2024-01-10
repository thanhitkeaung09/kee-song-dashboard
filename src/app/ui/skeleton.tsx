import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';


export default function DashboardSkeleton() {
    return (
      <>
         <Box sx={{ width: 1000 }}>
            <Skeleton />
            <Skeleton animation="wave" height={100} />
            <Skeleton animation={false} />

            <Skeleton />
            <Skeleton animation="wave" height={100} />
            <Skeleton animation={false} />
        </Box>
      </>
    );
  }

