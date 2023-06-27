'use client'

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
} from '@mui/material'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

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
  return (
    <>
      <Button type="button">뒤로</Button>
      <Card variant="outlined">
        <CardContent>
          <Chip label={`home/${minishell.category}`}></Chip>
          <Stack direction={'row'}>
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
          <Stack direction={'row'} justifyContent={'space-between'}>
            <Stack>
              <Typography variant="h6" my={1}>
                {minishell.nickname}{' '}
              </Typography>
            </Stack>
            <Stack direction={'row'}>
              <Typography my={1} variant="h6">
                {minishell.updated ? minishell.updated : minishell.created}
              </Typography>
              <IconButton size="small">
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton size="small">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </>
  )
}

export default PageInfo
