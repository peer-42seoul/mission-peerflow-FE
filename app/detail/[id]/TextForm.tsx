'use client'

import { Button, Stack } from '@mui/material'
import { TextField } from '@mui/material'

const TextForm = () => {
  return (
    <>
      <Stack component={'form'} direction={'row'} sx={{ my: 1 }}>
        <Stack spacing={2} sx={{ mx: 2, my: 1 }}>
          <TextField label="Nickname" size="small" />
          <TextField label="Password" size="small" />
        </Stack>
        <TextField
          fullWidth
          multiline
          rows={4}
          autoComplete="off"
          label="Press your words"
        />
        <Button type="submit">입력</Button>
      </Stack>
    </>
  )
}

export default TextForm
