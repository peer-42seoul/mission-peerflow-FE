'use client'

import {
  Button,
  CardContent,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
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

const Comment = () => {
  const [hidden, setHidden] = useState(true)
  const [comments, setComments] = useState<IComment[]>([])
  const handleButton = () => {
    setHidden(!hidden)
  }

  return (
    <>
      <Card sx={{ my: 1 }} variant="outlined">
        <Button onClick={handleButton}>댓글</Button>
        {!hidden ? (
          !comments ? (
            <Card>
              <CardContent>
                <Typography>첫 댓글의 주인공이 되보세요!</Typography>
              </CardContent>
              <TextForm setter={setComments} />
            </Card>
          ) : (
            <>
              <Card>
                <>
                  {comments.map((com, id) => (
                    <CardContent key={id}>
                      <Stack
                        direction={'row'}
                        sx={{ maxWidth: '100%' }}
                        justifyContent={'space-between'}
                      >
                        <Stack direction={'row'}>
                          <Stack margin={'5px'} minWidth={'110px'}>
                            <Typography fontWeight={'bolder'}>
                              {com.nickname}
                            </Typography>
                            <Typography fontSize={'12px'}>
                              {com.created}
                            </Typography>
                          </Stack>
                          <Typography
                            sx={{
                              wordWrap: 'break-word',
                              whiteSpace: 'pre-line',
                            }}
                          >
                            {com.content}
                          </Typography>
                        </Stack>
                        <EditDeleteButton setter={setComments} />
                      </Stack>
                    </CardContent>
                  ))}
                </>
                <Typography variant="h5" margin={1}>
                  댓글쓰기
                </Typography>
                <TextForm setter={setComments} />
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
