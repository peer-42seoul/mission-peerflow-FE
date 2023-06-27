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
import EditDeleteButton from './EditDeleteButton'

export interface IComment {
  id?: number
  nickname: string
  password: string
  content: string
  created: string
  updated?: string
}

const Comment = ({ comment }: { comment: IComment | null }) => {
  const [hidden, setHidden] = useState(true)
  const handleButton = () => {
    console.log('click')
    setHidden(!hidden)
  }

  return (
    <>
      <Card sx={{ my: 1 }} variant="outlined">
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
                      <Stack margin={'5px'}>
                        <Typography fontWeight={'bolder'}>
                          {comment.nickname}
                        </Typography>
                        <Typography width={'max-content'} fontSize={'12px'}>
                          {comment.created}
                        </Typography>
                      </Stack>
                      <Typography my={1}>{comment.content}</Typography>
                    </Stack>
                    <EditDeleteButton />
                  </Stack>
                </CardContent>
                <TextForm />
              </Card>
            </>
          )
        ) : (
          <br />
        )}
      </Card>
    </>
  )
}

export default Comment
