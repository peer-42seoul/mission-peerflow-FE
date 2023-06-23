'use client'

// import { Button, Textarea } from 'flowbite-react'
import { Button, Stack } from '@mui/material'
import { TextField } from '@mui/material'

const TextForm = () => {
  return (
    <>
      <Stack component={'form'} spacing={1} useFlexGap flexWrap={'wrap'}>
        <Stack direction={'row'}>
          <TextField
            label="Nickname"
            size="small"
            inputProps={{ sx: { height: 12 } }}
          />
          <TextField
            label="Password"
            size="small"
            inputProps={{ sx: { height: 12 } }}
          />
        </Stack>
        <Stack direction={'row'}>
          <TextField
            fullWidth
            multiline
            rows={4}
            autoComplete="off"
            label="Press your words"
          />
          <Button type="submit">입력</Button>
        </Stack>
      </Stack>
    </>
  )
}

export default TextForm
