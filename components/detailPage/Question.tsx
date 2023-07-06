'use client'

import { Card, CardContent, Typography, Stack, IconButton } from '@mui/material'
import CommentQuestion from './CommentQuestion'
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

  useEffect(() => {
    if (Number.isNaN(recomment)) recomment = 0
    setRecomments(recomment)
  }, [recomment])

  const handleRecomments = useCallback(() => {
    setRecomments((prev) => prev + 1)
    // fetch(`http://localhost:8080/v1/question/${questId}/recommend`, {
    //   method: 'POST',
    // })
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
          <CommentQuestion questId={questId} />
        </CardContent>
      </Card>
    </>
  )
}

export default Question
