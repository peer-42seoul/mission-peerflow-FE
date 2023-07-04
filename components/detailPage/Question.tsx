'use client'

import { Card, CardContent, Typography, Stack, IconButton } from '@mui/material'
import Comment from './Comment'
import RecommendIcon from '@mui/icons-material/Recommend'
import { useCallback, useState, useRef, useEffect } from 'react'

const Question = ({
  content,
  recomment,
  questId,
}: {
  content: string
  recomment: number
  questId: number
}) => {
  const [recomments, setRecomments] = useState<number>(0)
  const check = useRef<Boolean>(false)

  useEffect(() => {
    setRecomments(recomment)
  }, [])

  const handleRecomments = useCallback(() => {
    if (check.current === true) {
      setRecomments((prev) => prev - 1)
      check.current = false
    } else {
      setRecomments((prev) => prev + 1)
      check.current = true
    }
  }, [])

  return (
    <>
      <Card variant="outlined">
        <CardContent sx={{ minHeight: '150px' }}>
          <Typography my={1}>{content}</Typography>
        </CardContent>
        <CardContent sx={{ margin: 0 }}>
          <Stack direction={'row'} spacing={1} my={1} margin={0} padding={0}>
            <IconButton size="small" onClick={handleRecomments}>
              <RecommendIcon fontSize="inherit" />
              {recomments}
            </IconButton>
          </Stack>
          <Comment questId={questId} type="question" />
        </CardContent>
      </Card>
    </>
  )
}

export default Question
