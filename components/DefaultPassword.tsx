import { Box, Button, Modal, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'

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

export default function DefaultPassword({
  open,
  handleClose,
  evtHandler,
  action,
}) {
  const [value, setValue] = useState('')

  const evtSubmit = (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault()
    evtHandler(value)
    setValue('')
  }

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 style={{ textAlign: 'center', marginBottom: '14px' }}>
            정말로 {action}하시겠어요?
          </h2>
          <Stack
            component={'form'}
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            onSubmit={evtSubmit}
          >
            <TextField
              required
              type="password"
              autoComplete="off"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setValue(e.target.value)
              }}
              value={value}
              focused={true}
              label={'비밀번호를 입력하세요'}
            />
            <Button type="submit">입력</Button>
          </Stack>
        </Box>
      </Modal>
    </>
  )
}
