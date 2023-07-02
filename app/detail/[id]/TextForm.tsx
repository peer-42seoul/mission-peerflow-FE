'use client'

import { Button, Stack, useMediaQuery } from '@mui/material'
import { TextField } from '@mui/material'
import { useEffect, useState, useCallback } from 'react'
import { IComment } from './Comment'
import { Answer } from '../../../types/Answer'

const TextForm = ({
  setter,
  editSetter,
  isEdit,
  editTarget,
  editTargetId,
}: {
  setter: React.Dispatch<React.SetStateAction<any[]>>
  editSetter?: React.Dispatch<React.SetStateAction<boolean>>
  isEdit?: boolean
  editTarget?: Answer
  editTargetId?: number
}) => {
  const isTablet = useMediaQuery('(max-width: 900px)')
  const textDirection = isTablet ? 'column' : 'row'
  const textWidth = isTablet ? false : true

  const [comment, setComment] = useState<string>('')
  const [nickname, setNickname] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  useEffect(() => {
    const commentsHandler = (comment: IComment) =>
      setter((prev) => [...prev, comment])
  }, [setter])

  useEffect(() => {
    if (isEdit === true) {
      setNickname(editTarget.nickname)
      setPassword(editTarget.password)
      setComment(editTarget.content)
    }
  }, [isEdit, editTarget])

  const handleComments = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (e.nativeEvent.isComposing) return

      if (!nickname) return alert('닉네임을 작성해주세요')
      if (!password) return alert('비밀번호를 입력해주세요')
      if (!comment) return alert('댓글을 입력하시오')
      if (nickname.length > 10) {
        alert('10자 이하인 닉네임만 가능합니다.')
        return setNickname('')
      }

      const setNow = () => {
        const leftPad = (value) => {
          if (value >= 10) return value
          return `0${value}`
        }
        const source = new Date()

        const year = source.getFullYear()
        const month = leftPad(source.getMonth() + 1)
        const day = leftPad(source.getDate())

        return [year, month, day].join('-')
      }

      if (isEdit === true) {
        console.log(1)
        const editComments: IComment = {
          nickname: nickname,
          password: password,
          content: comment,
          created: editTarget.created,
          updated: setNow(),
        }

        setter((prev) => {
          const arr = [...prev]
          arr[editTargetId] = editComments
          return arr
        })

        setComment('')
        setNickname('')
        setPassword('')

        editSetter(false)
      } else {
        const newComments: IComment = {
          nickname: nickname,
          password: password,
          content: comment,
          created: setNow(),
        }
        setter((prev) => [...prev, newComments])

        setComment('')
        setNickname('')
        setPassword('')
      }
    },
    [comment, password, nickname, setter],
  )

  return (
    <>
      <Stack
        component={'form'}
        direction={textDirection}
        sx={{ mb: 1 }}
        onSubmit={handleComments}
      >
        <Stack spacing={2} sx={{ mx: 2, my: 1 }}>
          <TextField
            required
            type="text"
            inputProps={{ pattern: '[a-zA-Z0-9]+$' }}
            label="Nickname"
            size="small"
            value={nickname}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setNickname(e.target.value)
            }}
          />
          <TextField
            required
            inputProps={{ pattern: '[0-9]+$' }}
            type="password"
            label="Password"
            size="small"
            value={password}
            autoComplete="off"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value)
            }}
          />
        </Stack>
        <TextField
          sx={{ mx: 2 }}
          required
          type="text"
          multiline
          fullWidth={textWidth}
          rows={4}
          value={comment}
          autoComplete="off"
          label="Enter answer"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setComment(e.target.value)
          }}
          onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleComments(e as any)
            }
          }}
        />
        <Button type="submit">입력</Button>
      </Stack>
    </>
  )
}

export default TextForm
