'use client'

import { Card, CardContent, Typography, Stack } from '@mui/material'
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import Comment, { IComment } from './Comment'
import TextForm from './TextForm'
import { Answer } from '../../../types/Answer'
import DeleteAndEditModal from '../../../components/DeleteAndEditModal'
import EditDeleteButton from './EditDeleteButton'

const Answer = () => {
  const [answers, setAnswers] = useState<Answer[]>([])

  return (
    <>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5">답변</Typography>
        </CardContent>
        {answers.map((ans, id) => (
          <Card key={id} sx={{ margin: 2, maxWidth: '100%' }}>
            <Stack direction={'row'} justifyContent={'space-between'}>
              <CardContent>
                <Typography variant="h6">{ans.nickname}</Typography>
                <Typography
                  sx={{ wordWrap: 'break-word', whiteSpace: 'pre-line' }}
                >
                  {ans.content}
                </Typography>
              </CardContent>
              <CardContent>
                <EditDeleteButton />
              </CardContent>
            </Stack>
            <CardContent>
              <Comment />
            </CardContent>
          </Card>
        ))}
        <Typography variant="h5" margin={1}>
          답변쓰기
        </Typography>
        <TextForm setter={setAnswers} />
      </Card>
    </>
  )
}

export default Answer
