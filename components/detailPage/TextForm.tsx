'use client'

import { Button, Stack, useMediaQuery } from '@mui/material'
import { TextField } from '@mui/material'
import { useEffect, useState, useCallback } from 'react'
import { IComment } from './Comment'
import { IAnswer } from '../../types/Answer'
import dayjs from 'dayjs'

const setNow = () => {
  const now = dayjs().format('YYYY-MM-DDTHH:mm:ss')

  return now
}

const TextForm = ({
  trigger,
  setter,
  editSetter,
  isEdit,
  editTarget,
  editTargetId,
  unique_id,
  type,
  targetRawId,
}: {
  trigger: Function
  setter: React.Dispatch<React.SetStateAction<any[]>>
  editSetter?: React.Dispatch<React.SetStateAction<boolean>>
  isEdit?: boolean
  editTarget?: IAnswer
  editTargetId?: number
  unique_id: number
  type: string
  targetRawId?: number
}) => {
  const isTablet = useMediaQuery('(max-width: 900px)')
  const textDirection = isTablet ? 'column' : 'row'
  const textWidth = isTablet ? false : true

  const [comment, setComment] = useState<string>('')
  const [nickname, setNickname] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  useEffect(() => {
    if (isEdit === true) {
      setNickname(editTarget.nickname)
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

      if (isEdit === true) {
        const editComments: IComment = {
          nickname: nickname,
          password: password,
          content: comment,
          createdAt: editTarget.createdAt,
          updatedAt: setNow(),
        }

        fetch(`http://paulryu9309.ddns.net:80/v1/${type}/${targetRawId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify({
            questionId: unique_id,
            type: type,
            nickname: editComments.nickname,
            password: editComments.password,
            content: editComments.content,
          }),
        })
          .then((res) => {
            if (res.status === 403) throw new Error('잘못된 패스워드 입니다.')
            setter((prev) => {
              const arr = Array.isArray(prev) ? [...prev] : []
              arr[editTargetId] = editComments
              return arr
            })
            setComment('')
            setNickname('')
            setPassword('')

            editSetter(false)
            trigger()
          })
          .catch((e) => {
            console.log(e)
            return alert(e)
          })
      } else {
        const newComments: IComment = {
          nickname: nickname,
          password: password,
          content: comment,
          createdAt: setNow(),
        }

        console.log(type)

        fetch(`http://paulryu9309.ddns.net:80/v1/${type}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify({
            type: type,
            questionId: unique_id,
            nickname: newComments.nickname,
            password: newComments.password,
            content: newComments.content,
            createdAt: newComments.createdAt,
          }),
        })
          .then((res) => {
            if (res.status === 403) throw new Error('잘못된 패스워드입니다.')
            setter((prev) => {
              const arr = Array.isArray(prev) ? [...prev] : []
              return [...arr, newComments]
            })

            setComment('')
            setNickname('')
            setPassword('')
            if (trigger !== null) trigger()
          })
          .catch((e) => {
            console.log(e)
            return alert(e)
          })
      }
    },
    [comment, password, nickname],
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
