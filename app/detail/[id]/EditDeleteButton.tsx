'use client'

import { Stack, IconButton, Popper, Box, Modal, Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import React, { useState } from 'react'
import { IComment } from './Comment'
import DeleteAndEditModal from '../../../components/DeleteAndEditModal'

const styleModal = {
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

const EditDeleteButton = ({
  setter,
}: {
  setter: React.Dispatch<React.SetStateAction<IComment[]>>
}) => {
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Stack direction={'row'} height={'20px'}>
      <IconButton
        aria-describedby={'edit-button'}
        size="small"
        onClick={handleOpen}
      >
        <EditIcon fontSize="inherit" />
      </IconButton>
      <DeleteAndEditModal
        open={open}
        handleClose={handleClose}
        evtHandler={handleOpen}
        action={'수정'}
      />
      <IconButton
        aria-describedby={'delete-button'}
        size="small"
        onClick={handleOpen}
      >
        <DeleteIcon fontSize="inherit" />
      </IconButton>
      <DeleteAndEditModal
        open={open}
        handleClose={handleClose}
        evtHandler={handleOpen}
        action={'삭제'}
      />
    </Stack>
  )
}

export default EditDeleteButton
