import { Backdrop, CircularProgress } from '@mui/material'
import React from 'react'

interface Props {
  open: boolean
}

const Loading: React.FC<Props> = ({ open }) => {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}

export default Loading