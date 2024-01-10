import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function PaginationSkeleton() {
    return (
      <>
         <Box sx={{ width: 500 }}>
            <Skeleton animation="wave" height={50} />
        </Box>
      </>
    );
  }