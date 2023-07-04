'use client'

import { Button, CardContent, Stack, Typography } from '@mui/material'
import Card from '@mui/material/Card'
import TextForm from './TextForm'
import React, { useCallback, useEffect, useState } from 'react'
import EditDeleteButton from './EditDeleteButton'
import DefaultPagination from '../DefaultPagination'
import { getData } from './detailPageWrap'
import dayjs from 'dayjs'

export interface IComment {
  answerCommentId?: number
  nickname: string
  password: string
  content: string
  createdAt?: string
  updatedAt?: string
}

const CommentAnswer = ({
  questId,
  rawkey,
}: {
  questId: number
  rawkey?: number
}) => {
  const type = 'answer'
  const [hidden, setHidden] = useState(true)
  const [edit, setEdit] = useState(false)
  const [page, setPage] = useState(1)

  const [comments, setComments] = useState<IComment[]>([])
  const [target, setTarget] = useState(null)
  const [targetId, setTargeId] = useState(0)
  const [totalPage, setTotalPage] = useState(5)
  const [targetRaw, setTargetRaw] = useState(0)

  const handleButton = () => {
    fetchAndSet()
    setHidden(!hidden)
  }

  async function fetchAndSet() {
    let key: number
    if (!rawkey) key = questId
    else key = rawkey

    const fetchData = await getData(
      `answer/comment?answerId=${key}&page=${page - 1}&size=5`,
    )

    console.log(fetchData.content)

    setTotalPage(fetchData.totalPage)
    setComments(fetchData.content)
  }

  useEffect(() => {
    setTargetRaw(rawkey)
  }, [rawkey])

  useEffect(() => {
    fetchAndSet()
  }, [])

  const handleEdit = (id: number, targetRawId: number) => {
    if (!targetRawId) return
    setEdit(true)
    setTarget(comments[id])
    setTargeId(id)
    setTargetRaw(targetRawId)
  }

  return (
    <>
      <Card sx={{ my: 1 }} variant="outlined">
        <Button onClick={handleButton}>댓글</Button>
        {!hidden ? (
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
                          {dayjs(com.createdAt).format('YYYY-MM-DD HH:mm')}
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
                      trigger={fetchAndSet}
                      objs={comments}
                      setter={setComments}
                      edit={handleEdit}
                      targetId={id}
                      type={type + '/comment'}
                      targetRawId={comments[id].answerCommentId}
                    />
                  </Stack>
                </CardContent>
              ))}
            </>
            <Stack alignItems={'center'} margin={2}>
              <DefaultPagination
                count={totalPage}
                page={page}
                setPage={setPage}
              />
            </Stack>
            <TextForm
              trigger={fetchAndSet}
              setter={setComments}
              editSetter={setEdit}
              isEdit={edit}
              editTarget={target}
              editTargetId={targetId}
              unique_id={questId}
              type={type + '/comment'}
              targetRawId={targetRaw}
            />
          </Card>
        ) : (
          <br />
        )}
      </Card>
    </>
  )
}

export default CommentAnswer
