'use client'

import { Stack, IconButton, Popper, Box } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { useState } from 'react'

const EditDeleteButton = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : e.currentTarget)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popper' : undefined
  return (
    <Stack direction={'row'} height={'20px'}>
      <IconButton size="small">
        <EditIcon fontSize="inherit" />
      </IconButton>
      <IconButton aria-describedby={id} size="small" onClick={handleClick}>
        <DeleteIcon fontSize="inherit" />
      </IconButton>
      <Popper anchorEl={anchorEl} open={open}>
        <Box sx={{ border: 1, p: 1, bgcolor: 'white' }}>
          정말로 삭제하시겠습니까?
        </Box>
      </Popper>
    </Stack>
  )
}

export default EditDeleteButton
