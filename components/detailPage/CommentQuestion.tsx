'use client'

import {
  Button,
  CardContent,
  Pagination,
  Stack,
  Typography,
} from '@mui/material'
import Card from '@mui/material/Card'
import TextForm from './TextForm'
import React, { useEffect, useState } from 'react'
import EditDeleteButton from './EditDeleteButton'
// import { getData } from './detailPageWrap'
import dayjs from 'dayjs'
import { commentMockData } from '../../mocks/commentMockData'

export interface IComment {
  questionCommentId?: number
  nickname: string
  password: string
  content: string
  createdAt?: string
  updatedAt?: string
}

const CommentAnswer = ({ questId }: { questId: number }) => {
  const type = 'question'
  const [hidden, setHidden] = useState(true)
  const [edit, setEdit] = useState(false)
  const [page, setPage] = useState(1)

  const [comments, setComments] = useState<IComment[]>([])
  const [target, setTarget] = useState(null)
  const [targetId, setTargeId] = useState(0)
  const [totalPage, setTotalPage] = useState(5)
  const [targetRaw, setTargetRaw] = useState(0)

  const handleButton = () => {
    setHidden(!hidden)
    fetchAndSet()
  }

  async function fetchAndSet() {
    // const fetchData = await getData(
    //   `${type}/comment?${type}Id=${questId}&page=${page - 1}&size=5`,
    // )

    // setTotalPage(fetchData.totalPages)
    // setComments(fetchData.content)
    setTotalPage(1)
    setComments(commentMockData)
  }

  useEffect(() => {
    fetchAndSet()
  }, [page])

  const handleEdit = (id: number, targetRaw: number) => {
    setEdit(true)
    setTarget(comments[id])
    setTargeId(id)
    setTargetRaw(targetRaw)
  }

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
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
              <TextForm
                trigger={null}
                setter={setComments}
                unique_id={questId}
                type={type + '/comment'}
                targetRawId={targetRaw}
              />
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
                          targetRawId={comments[id].questionCommentId}
                        />
                      </Stack>
                    </CardContent>
                  ))}
                </>
                <Stack alignItems={'center'} margin={2}>
                  <Pagination
                    count={totalPage}
                    page={page}
                    onChange={handleChange}
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
            </>
          )
        ) : (
          <br />
        )}
      </Card>
    </>
  )
}

export default CommentAnswer
