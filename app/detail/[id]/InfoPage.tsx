'use client'

import { useState } from 'react'
import { Question } from '@/types/Question'
import {
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
  IconButton,
  Tooltip,
  useMediaQuery,
} from '@mui/material'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import DeleteAndEditModal from '../../../components/DeleteAndEditModal'

const minishell: Question = {
  question_id: 0,
  title:
    'minishell 하는 중인데minishell 하는 중인데minishell 하는 중인데minishell 하는 중인데minishell 하는 중인데minishell 하는 중인데',
  content:
    'minishell 너무 어려워요 minishell 너무 어려워요 minishell 너무 어려워요 minishell 너무 어려워요 minishell 너무 어려워요 minishell 너무 어려워요 minishell 너무 어려워요 minishell 너무 어려워요 ',
  category: 0,
  password: '1234',
  nickname: 'hoslim',
  recomment: 98,
  views: 1230,
  created: '2023-06-23 12:17',
}

const PageInfo = () => {
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const isTablet = useMediaQuery('(max-width: 900px)')
  const titleWidth = isTablet ? 'column' : 'row'

  return (
    <>
      <Card variant="outlined">
        <CardContent>
          <Chip label={`home/${minishell.category}`}></Chip>
          <Stack direction={'row'} minHeight={'130px'}>
            <Typography variant="h3">Q.</Typography>
            <Tooltip title={minishell.title} arrow>
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
                {minishell.title}
              </Typography>
            </Tooltip>
          </Stack>
          <Stack direction={titleWidth} justifyContent={'space-between'}>
            <Typography variant="h6" my={1}>
              조회수 {minishell.views}
            </Typography>
            <Typography variant="h6" my={1}>
              작성자: {minishell.nickname}&nbsp;&nbsp;
            </Typography>
            <Typography my={1} variant="h6">
              작성일:&nbsp;
              {minishell.updated ? minishell.updated : minishell.created}
              &nbsp;
            </Typography>
            <Stack direction={'row-reverse'}>
              <IconButton size="small" onClick={handleOpen}>
                <EditIcon fontSize="small" />
              </IconButton>
              <DeleteAndEditModal
                open={open}
                handleClose={handleClose}
                evtHandler={handleOpen}
                action={'수정'}
              />
              <IconButton size="small" onClick={handleOpen}>
                <DeleteIcon fontSize="small" />
              </IconButton>
              <DeleteAndEditModal
                open={open}
                handleClose={handleClose}
                evtHandler={handleOpen}
                action={'삭제'}
              />
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </>
  )
}

export default PageInfo
