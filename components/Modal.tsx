import { Button } from '@mui/base'
import { Box, Typography } from '@mui/material'
import React from 'react'

const Modal = () => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          네
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <Button variant="contained">네</Button>
          <Button variant="outlined" onClick={handleClose}>
            아니요
          </Button>
        </Typography>
      </Box>
    </Modal>
  )
}

export default Modal
