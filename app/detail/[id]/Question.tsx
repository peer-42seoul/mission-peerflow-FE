'use client'

import { Card, CardContent, Typography, Stack } from '@mui/material'
import Comment from './Comment'
import { Question } from '../../types/Question'
import { IComment } from './Comment'
import PageviewIcon from '@mui/icons-material/Pageview'
import RecommendIcon from '@mui/icons-material/Recommend'

const minishell: Question = {
  question_id: 0,
  title: 'minishell 하는 중인데',
  content:
    'minishell 너무 어려워요 minishell 너무 어려워요 minishell 너무 어려워요 minishell 너무 어려워요 minishell 너무 어려워요 minishell 너무 어려워요 minishell 너무 어려워요 minishell 너무 어려워요 ',
  category: 0,
  password: '1234',
  nickname: 'hoslim',
  recomment: 98,
  views: 1230,
  created: '2023-06-23',
}

const minishell_comments: IComment = {
  id: 0,
  nickname: 'hyunjung',
  password: '4242',
  content: '난 통과했는데 ㅋㅋ',
  created: '2023-06-25 15:03',
}

const Question = () => {
  return (
    <>
      <Card variant="outlined">
        <CardContent>
          <Typography my={1}>{minishell.content}</Typography>
        </CardContent>
        <CardContent sx={{ margin: 0, padding: 1, paddingBottom: 0 }}>
          <Stack direction={'row'} spacing={1} my={1} margin={0} padding={0}>
            <RecommendIcon /> <span>{minishell.recomment}</span>
            <PageviewIcon viewBox="조회수" /> <span>{minishell.views}</span>
          </Stack>
          <Comment comment={minishell_comments} />
        </CardContent>
      </Card>
    </>
  )
}

export default Question
