'use client'

import {
  Card,
  CardContent,
  Typography,
  Stack,
  IconButton,
  Box,
} from '@mui/material'
import { useCallback, useEffect, useState } from 'react'

import Comment from './Comment'
import TextForm from './TextForm'
import { IAnswer } from '../../types/Answer'

import EditDeleteButton from './EditDeleteButton'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import DefaultPagination from '../DefaultPagination'
import CheckIcon from '@mui/icons-material/Check'
import DefaultPassword from '../DefaultPassword'

const Answer = ({
  param,
  quest_id,
}: {
  param: IAnswer[]
  quest_id: number
}) => {
  const [answers, setAnswers] = useState<IAnswer[]>([])

  const [adopt, setAdopt] = useState<boolean>(false)
  const [adoptAnswer, setAdoptAnswer] = useState<IAnswer | null>(null)
  const [edit, setEdit] = useState(false)
  const [target, setTarget] = useState(null)
  const [targetId, setTargeId] = useState(0)

  const [targetRaw, setTargetRaw] = useState(0)

  useEffect(() => {
    setAnswers(param)
  }, [param])

  useEffect(() => {
    setAnswers(answers)
  }, [answers])

  const handleAdopt = useCallback(
    (ans: IAnswer) => {
      if (
        adopt === true &&
        (ans.adopted === false || ans.adopted === undefined)
      )
        return alert('채택은 한번밖에 안됩니다.')
      ans.adopted = !ans.adopted
      setAdopt(!adopt)
      if (!adoptAnswer) setAdoptAnswer(ans)
      else setAdoptAnswer(null)
    },
    [adopt, adoptAnswer],
  )

  const handleEdit = (id: number, targetRawId: number) => {
    setEdit(true)
    setTarget(answers[id])
    setTargeId(id)
    setTargetRaw(targetRawId)
  }

  return (
    <>
      <Card variant="outlined">
        <CardContent sx={{ padding: '10px' }}>
          <Typography variant="h5">답변</Typography>
        </CardContent>
        {adoptAnswer ? (
          <Card sx={{ margin: 2, maxWidth: '100%' }}>
            <CheckIcon sx={{ margin: 2, color: '#44ff44' }} />
            <Stack direction={'row'} justifyContent={'space-between'}>
              <CardContent
                sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
              >
                <Typography variant="h6">{adoptAnswer.nickname}</Typography>
                <Typography
                  sx={{ wordWrap: 'break-word', whiteSpace: 'pre-line' }}
                >
                  {adoptAnswer.content}
                </Typography>
              </CardContent>
            </Stack>
            <CardContent>
              <IconButton onClick={() => handleAdopt(adoptAnswer)}>
                <CheckCircleOutlineIcon />
                <Typography>채택풀기</Typography>
              </IconButton>
              {/* <DefaultPassword /> */}
              <Comment
                questId={quest_id}
                type="answer"
                rawkey={adoptAnswer.answerId}
              />
            </CardContent>
          </Card>
        ) : (
          <></>
        )}
        {answers?.map((ans, id) => (
          <Box key={id}>
            {!ans.adopted && (
              <Card key={id} sx={{ margin: 2, maxWidth: '100%' }}>
                {ans.adopted ? <p>채택</p> : <br />}
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
                      targetId={id}
                      edit={handleEdit}
                      type="answer"
                      targetRawId={answers[id].answerId}
                    />
                  </CardContent>
                </Stack>
                <CardContent>
                  <IconButton onClick={() => handleAdopt(ans)}>
                    <CheckCircleIcon />
                    <Typography>채택하기</Typography>
                  </IconButton>
                  <Comment
                    questId={quest_id}
                    type="answer"
                    rawkey={answers[id].answerId}
                  />
                </CardContent>
              </Card>
            )}
          </Box>
        ))}
        <TextForm
          trigger={null}
          setter={setAnswers}
          editSetter={setEdit}
          isEdit={edit}
          editTarget={target}
          editTargetId={targetId}
          unique_id={quest_id}
          type={'answer'}
          targetRawId={targetRaw}
        />
      </Card>
    </>
  )
}

export default Answer
