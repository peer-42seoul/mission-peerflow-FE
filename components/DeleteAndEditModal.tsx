import { Modal } from '@mui/base'
import { Box, Typography, Button, Stack } from '@mui/material'
import React from 'react'
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
// 상위 컴포넌트에서 필요한 state

// const [open, setOpen] = useState(false)
// const handleOpen = () => setOpen(true)
// const handleClose = () => setOpen(false)

const DeleteAndEditModal = ({ open, handleClose, evtHandler, action }) => {
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {/* <Typography id="modal-modal-title" variant="h7" component="h2"> */}
        <h2 style={{ textAlign: 'center', marginBottom: '14px' }}>
          정말로 {action}하시겠어요?
        </h2>
        {/* </Typography> */}
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}> */}
          <Button variant="contained" onClick={evtHandler}>
            <RadioButtonUncheckedRoundedIcon />
          </Button>
          <Button variant="contained" onClick={handleClose}>
            <CloseRoundedIcon />
          </Button>
        </Stack>
      </Box>
    </Modal>
  )
}

export default DeleteAndEditModal
