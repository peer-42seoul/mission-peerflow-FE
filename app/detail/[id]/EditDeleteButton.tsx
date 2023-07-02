'use client'

import { Stack, IconButton, Popper, Box, Modal, Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import React, { useState } from 'react'
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
  edit,
  objs,
  id,
}: {
  setter: React.Dispatch<React.SetStateAction<any[]>>
  edit?: (param) => void
  objs: any[]
  id: number
}) => {
  const [open, setOpen] = useState<boolean>(false)
  const [action, setAction] = useState('')

  const handleOpen = (action) => {
    setOpen(true)
    setAction(action)
  }

  const handleClose = () => setOpen(false)

  const eventDelete = () => {
    setter(objs.splice(id + 1))
    handleClose()
  }

  const eventEdit = () => {
    edit(id)
    handleClose()
  }

  return (
    <Stack direction={'row'} height={'20px'}>
      <IconButton
        aria-describedby={'edit-button'}
        size="small"
        onClick={() => handleOpen('수정')}
      >
        <EditIcon fontSize="inherit" />
      </IconButton>
      <IconButton
        aria-describedby={'delete-button'}
        size="small"
        onClick={() => handleOpen('삭제')}
      >
        <DeleteIcon fontSize="inherit" />
      </IconButton>
      <DeleteAndEditModal
        open={open}
        handleClose={handleClose}
        evtHandler={action === '삭제' ? eventDelete : eventEdit}
        action={action}
      />
    </Stack>
  )
}

export default EditDeleteButton
