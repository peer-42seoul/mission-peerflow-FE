'use client'

import { Card, CardContent, Typography, Stack, IconButton } from '@mui/material'
import { useEffect, useState } from 'react'
import Comment from './Comment'
import TextForm from './TextForm'
import { Answer } from '../../../types/Answer'
import EditDeleteButton from './EditDeleteButton'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

const Answer = () => {
  const [answers, setAnswers] = useState<Answer[]>([])

  const [adopt, setAdopt] = useState<boolean>(false)
  const [adoptAnswer, setAdoptAnswer] = useState<Answer | null>(null)
  const [edit, setEdit] = useState(false)
  const [target, setTarget] = useState(null)
  const [targetId, setTargeId] = useState(0)

  useEffect(() => {}, [answers, adoptAnswer])

  const handleAdopt = (ans: Answer) => {
    if (
      adopt === true &&
      (ans.is_adopted === false || ans.is_adopted === undefined)
    )
      return alert('채택은 한번밖에 안됩니다.')
    ans.is_adopted = !ans.is_adopted
    setAdopt(!adopt)
  }

  const handleEdit = (id: number) => {
    setEdit(true)
    setTarget(answers[id])
    setTargeId(id)
  }

  return (
    <>
      <Card variant="outlined" sx={{ borderBottom: 1 }}>
        <CardContent sx={{ padding: '10px' }}>
          <Typography variant="h5">답변</Typography>
        </CardContent>
        {answers.map((ans, id) => (
          <Card key={id} sx={{ margin: 2, maxWidth: '100%' }}>
            {ans.is_adopted ? <p>채택</p> : <br />}
            <Stack direction={'row'} justifyContent={'space-between'}>
              <CardContent
                sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
              >
                <Typography variant="h6">{ans.nickname}</Typography>
                <Typography
                  sx={{ wordWrap: 'break-word', whiteSpace: 'pre-line' }}
                >
                  {ans.content}
                </Typography>
              </CardContent>
              <CardContent>
                <EditDeleteButton
                  objs={answers}
                  setter={setAnswers}
                  id={id}
                  edit={handleEdit}
                />
              </CardContent>
            </Stack>
            <CardContent>
              <IconButton onClick={() => handleAdopt(ans)}>
                <CheckCircleIcon />
                <Typography>채택하기</Typography>
              </IconButton>
              <Comment />
            </CardContent>
          </Card>
        ))}

        <TextForm
          setter={setAnswers}
          editSetter={setEdit}
          isEdit={edit}
          editTarget={target}
          editTargetId={targetId}
        />
      </Card>
    </>
  )
}

export default Answer
