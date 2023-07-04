'use client'

import { Stack, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import React, { useState } from 'react'
import DeleteAndEditModal from '../DeleteAndEditModal'
import DefaultPassword from '../DefaultPassword'

const EditDeleteButton = ({
  setter,
  edit,
  objs,
  targetId,
}: // type,
// uniqueId,
{
  setter: React.Dispatch<React.SetStateAction<any[]>>
  edit?: (param: number) => void
  objs: any[]
  targetId: number
  // type: string
  // uniqueId: number
}) => {
  const [open, setOpen] = useState<boolean>(false)
  const [action, setAction] = useState('')

  const handleOpen = (action: string) => {
    setOpen(true)
    setAction(action)
  }

  const handleClose = () => setOpen(false)

  const eventDelete = () => {
    const newObjs = [...objs]
    newObjs.splice(targetId, 1)
    setter(newObjs)
    handleClose()
  }

  const eventEdit = () => {
    edit(targetId)
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
      {action === '수정' ? (
        <DeleteAndEditModal
          open={open}
          handleClose={handleClose}
          evtHandler={eventEdit}
          action={action}
        />
      ) : (
        <DefaultPassword
          open={open}
          handleClose={handleClose}
          evtHandler={eventDelete}
          action={action}
        />
      )}
    </Stack>
  )
}

export default EditDeleteButton
