'use client'

import { useCallback, useState } from 'react'
import { IAnswer } from '../../types/Answer'
import {
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { IQuestion } from '../../types/Question'
import { useRouter } from 'next/navigation'
import DeleteAuthModal from '../DeleteAuthModal'
import dayjs from 'dayjs'

const PageInfo = ({ param, qid }: { param: IQuestion; qid: number }) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [action, setAction] = useState('')

  const handleOpen = (action) => {
    setAction(action)
    setOpen(true)
  }
  const handleClose = () => setOpen(false)

  const editHandler = useCallback(() => {
    router.push(`/edit/${qid}`)
  }, [])

  const removeHandler = useCallback(() => {
    console.log(`remove`)
  }, [])

  return (
    <>
      <Card variant="outlined">
        <CardContent>
          <Chip label={`${param?.category}`}></Chip>
          <Stack
            direction={'row'}
            minHeight={'max-content'}
            marginBottom={'50px'}
          >
            <Typography variant="h3">Q.</Typography>
            <Tooltip title={param?.title} arrow>
              <Typography
                variant="h4"
                fontWeight={'bold'}
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: '2',
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {param?.title}
              </Typography>
            </Tooltip>
          </Stack>
          <Stack direction={'row'} justifyContent={'space-between'}>
            <Stack direction={'column'}>
              <Typography variant="h6">조회수: {param?.view}</Typography>
              <Typography variant="h6">
                작성자: {param?.nickname}&nbsp;&nbsp;
              </Typography>
              <Typography variant="h6">
                작성일:&nbsp;
                {param?.updatedAt
                  ? dayjs(param?.updatedAt).format('YYYY-MM-DD\nHH:mm')
                  : dayjs(param?.createdAt).format('YYYY-MM-DD\nHH:mm')}
                &nbsp;
              </Typography>
            </Stack>
            <Stack direction={'row-reverse'}>
              <IconButton
                size="small"
                onClick={handleOpen}
                sx={{
                  height: 'max-content',
                  marginTop: 'auto',
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
              <DeleteAuthModal
                open={open}
                handleClose={handleClose}
                questionId={qid}
              />
              <IconButton
                size="small"
                onClick={editHandler}
                sx={{
                  height: 'max-content',
                  marginTop: 'auto',
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </>
  )
}

export default PageInfo
