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
  type,
  targetRawId,
}: {
  setter: React.Dispatch<React.SetStateAction<any[]>>
  edit?: (id: number, targetRawId: number) => void
  objs: any[]
  targetId: number
  type: string
  targetRawId: number
}) => {
  const [open, setOpen] = useState<boolean>(false)
  const [action, setAction] = useState('')

  const handleOpen = (action: string) => {
    setOpen(true)
    setAction(action)
  }

  const handleClose = () => setOpen(false)

  const eventDelete = (password: number) => {
    fetch(`http://paulryu9309.ddns.net:80/v1/${type}/${targetRawId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        type: type,
        password: password,
      }),
    })
      .then((res) => {
        console.log(res)
        if (res.status === 403) throw new Error('잘못된 패스워드 입니다.')

        const newObjs = [...objs]
        newObjs.splice(targetId, 1)
        setter(newObjs)
      })
      .catch((e) => {
        return alert(e)
      })

    handleClose()
  }

  const eventEdit = () => {
    edit(targetId, targetRawId)
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
