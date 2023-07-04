'use client'

import { useState } from 'react'
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
import DeleteAndEditModal from '..//DeleteAndEditModal'
import { IQuestion } from '../../types/Question'
import dayjs from 'dayjs'

const PageInfo = ({ param }: { param: IQuestion }) => {
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

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
              <DeleteAndEditModal
                open={open}
                handleClose={handleClose}
                evtHandler={handleOpen}
                action={'삭제'}
              />
              <IconButton
                size="small"
                onClick={handleOpen}
                sx={{
                  height: 'max-content',
                  marginTop: 'auto',
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
              <DeleteAndEditModal
                open={open}
                handleClose={handleClose}
                evtHandler={handleOpen}
                action={'수정'}
              />
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </>
  )
}

export default PageInfo
