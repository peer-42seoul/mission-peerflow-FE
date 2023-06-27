'use client'

import { Card, CardContent, Typography } from '@mui/material'
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import Comment, { IComment } from './Comment'
import TextForm from './TextForm'
import { Answer } from '../../../types/Answer'

const minishell_answer: Answer = {
  question_id: 0,
  answer_id: 0,
  nickname: 'hyeokim2',
  password: '4242',
  content:
    'ㄹㅇㅋㅋ ㄹㅇㅋㅋ ㄹㅇㅋㅋ ㄹㅇㅋㅋ ㄹㅇㅋㅋ ㄹㅇㅋㅋ ㄹㅇㅋㅋ ㄹㅇㅋㅋ ㄹㅇㅋㅋ ㄹㅇㅋㅋ ㄹㅇㅋㅋ ㄹㅇㅋㅋ ㄹㅇㅋㅋ ㄹㅇㅋㅋ ㄹㅇㅋㅋ ㄹㅇㅋㅋ ',
  created: '2023-06-24 14:01',
  is_adopted: true,
  recommended: 80,
}

const minishell_answer_comment: IComment = {
  nickname: 'jujeon',
  password: '4242',
  content:
    '나도 통과했는데 ㅋㅋ나도 통과했는데 ㅋㅋ나도 통과했는데 ㅋㅋ나도 통과했는데 ㅋㅋ나도 통과했는데 ㅋㅋ나도 통과했는데 ㅋㅋ나도 통과했는데 ㅋㅋ나도 통과했는데 ㅋㅋ나도 통과했는데 ㅋㅋ나도 통과했는데 ㅋㅋ나도 통과했는데 ㅋㅋ나도 통과했는데 ㅋㅋ나도 통과했는데 ㅋㅋ나도 통과했는데 ㅋㅋ나도 통과했는데 ㅋㅋ나도 통과했는데 ㅋㅋ나도 통과했는데 ㅋㅋ',
  created: '2023-06-26 19:30',
}

const Answer = () => {
  const [answers, setAnswers] = useState<Answer[]>([])
  const [comments, setComments] = useState<IComment[]>([])

  const commentId = useRef()

  return (
    <>
      <Card variant="outlined">
        <CardContent>
          <Typography>{minishell_answer.nickname}</Typography>
          <Typography>{minishell_answer.content}</Typography>
          {/* map */}
          <Comment comment={minishell_answer_comment} />
        </CardContent>
        <TextForm />
      </Card>
    </>
  )
}

export default Answer
