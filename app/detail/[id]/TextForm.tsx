'use client'

import { Button, Stack } from '@mui/material'
import { TextField } from '@mui/material'
import { useEffect, useState, useCallback } from 'react'
import { IComment } from './Comment'

const TextForm = () => {
  const [comments, setComments] = useState<IComment[]>([])
  const [comment, setComment] = useState<string>('')
  const [nickname, setNickname] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  useEffect(() => {
    const commentsHandler = (comment: IComment) =>
      setComments((prev) => [...prev, comment])
  }, [])

  const handleComments = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!comment) return alert('댓글을 입력하시오')
      if (!nickname) return alert('닉네임을 작성해주세요')
      if (!password) return alert('비밀번호를 입력해주세요')

      const now = new Date()
      const newComments: IComment = {
        nickname: nickname,
        password: password,
        content: comment,
        created: now.toString(),
      }
      setComments((prev) => [...prev, newComments])
      setComment('')
      setNickname('')
      setPassword('')
    },
    [comment, password, nickname],
  )

  return (
    <>
      <Stack
        component={'form'}
        direction={'row'}
        sx={{ mb: 1 }}
        onSubmit={handleComments}
      >
        <Stack spacing={2} sx={{ mx: 2, my: 1 }}>
          <TextField
            label="Nickname"
            size="small"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setNickname(e.target.value)
            }}
          />
          <TextField
            label="Password"
            size="small"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value)
            }}
          />
        </Stack>
        <TextField
          fullWidth
          multiline
          rows={4}
          autoComplete="off"
          label="Press your words"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setComment(e.target.value)
          }}
        />
        <Button type="submit">입력</Button>
      </Stack>
    </>
  )
}

export default TextForm
