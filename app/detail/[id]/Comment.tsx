'use client'

import {
  Button,
  CardContent,
  IconButton,
  Stack,
  Typography,
  Box,
} from '@mui/material'
import Card from '@mui/material/Card'
import TextForm from './TextForm'
import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

export interface IComment {
  id: number
  nickname: string
  password: string
  content: string
  created: string
  updated?: string
}

const Comment = ({ comment }: { comment: IComment | null }) => {
  const [hidden, setHidden] = useState(true)

  const handleButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('click')
    setHidden(!hidden)
  }

  return (
    <>
      <Box my={1}>
        <Button onClick={handleButton}>댓글</Button>
        {!hidden ? (
          !comment ? (
            <Card>
              <CardContent>
                <Typography>첫 댓글의 주인공이 되보세요!</Typography>
              </CardContent>
              <TextForm />
            </Card>
          ) : (
            <>
              <Card>
                <CardContent>
                  <Stack direction={'row'} justifyContent={'space-between'}>
                    <Stack direction={'row'}>
                      <Typography
                        fontWeight={'bolder'}
                        width={'100px'}
                        minWidth={'100px'}
                        my={1}
                      >
                        {comment.nickname}
                      </Typography>
                      <Typography my={1}>{comment.content}</Typography>
                    </Stack>
                    <Stack direction={'row'}>
                      <Typography width={'max-content'} my={1}>
                        {comment.created}
                      </Typography>
                      <IconButton size="small">
                        <EditIcon fontSize="inherit" />
                      </IconButton>
                      <IconButton size="small">
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                    </Stack>
                  </Stack>
                </CardContent>
                <TextForm />
              </Card>
            </>
          )
        ) : (
          <br />
        )}
      </Box>
    </>
  )
}

export default Comment
