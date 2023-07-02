'use client'

import {
  Button,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import Card from '@mui/material/Card'
import TextForm from './TextForm'
import React, { useEffect, useState } from 'react'
import EditDeleteButton from './EditDeleteButton'

export interface IComment {
  id?: number
  nickname: string
  password: string
  content: string
  created?: string
  updated?: string
}

const Comment = () => {
  const [hidden, setHidden] = useState(true)
  const [edit, setEdit] = useState(false)
  const [comments, setComments] = useState<IComment[]>([])
  const [target, setTarget] = useState(null)
  const [targetId, setTargeId] = useState(0)

  const handleButton = () => {
    setHidden(!hidden)
  }

  useEffect(() => {}, [comments])

  const handleEdit = (id: number) => {
    setEdit(true)
    setTarget(comments[id])
    setTargeId(id)
  }

  return (
    <>
      <Card sx={{ my: 1 }} variant="outlined">
        <Button onClick={handleButton}>댓글</Button>
        {!hidden ? (
          !comments.length ? (
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
                        sx={{
                          maxWidth: '100%',
                        }}
                        justifyContent={'space-between'}
                      >
                        <Stack
                          direction={'row'}
                          sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
                        >
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
                        <EditDeleteButton
                          objs={comments}
                          setter={setComments}
                          edit={handleEdit}
                          id={id}
                        />
                      </Stack>
                    </CardContent>
                  ))}
                </>
                <TextForm
                  setter={setComments}
                  editSetter={setEdit}
                  isEdit={edit}
                  editTarget={target}
                  editTargetId={targetId}
                />
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
