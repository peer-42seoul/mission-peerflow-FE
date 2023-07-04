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
import DefaultPagination from '../DefaultPagination'
import { getData } from './detailPageWrap'

export interface IComment {
  id?: number
  nickname: string
  password: string
  content: string
  created?: string
  updated?: string
}

const Comment = ({ type, questId }: { type: string; questId: number }) => {
  const [hidden, setHidden] = useState(true)
  const [edit, setEdit] = useState(false)
  const [page, setPage] = useState(1)
  const [comments, setComments] = useState<IComment[]>([])
  const [target, setTarget] = useState(null)
  const [targetId, setTargeId] = useState(0)

  const handleButton = () => {
    setHidden(!hidden)
  }

  async function fetchAndSet() {
    const fetchData = await getData(
      `${type}/comment?${type}Id=${questId}&page=${page}&size=${5}`,
    )

    setComments(fetchData)
  }

  useEffect(() => {
    fetchAndSet()
  }, [])

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
          !comments?.length ? (
            <Card>
              <CardContent>
                <Typography>첫 댓글의 주인공이 되보세요!</Typography>
              </CardContent>
              <TextForm setter={setComments} unique_id={questId} type={type} />
            </Card>
          ) : (
            <>
              <Card>
                <>
                  {comments?.map((com, id) => (
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
                          targetId={id}
                          // type={}
                        />
                      </Stack>
                    </CardContent>
                  ))}
                </>
                <Stack alignItems={'center'} margin={2}>
                  <DefaultPagination count={5} page={page} setPage={setPage} />
                </Stack>
                <TextForm
                  setter={setComments}
                  editSetter={setEdit}
                  isEdit={edit}
                  editTarget={target}
                  editTargetId={targetId}
                  unique_id={questId}
                  type={type + '/comment'}
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
