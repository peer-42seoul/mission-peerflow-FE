'use client'
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextareaAutosize,
} from '@mui/material'
import Stack from '@mui/material/Stack'
import axios, { AxiosResponse } from 'axios'
import { log } from 'console'
import React, { useCallback, useEffect, useState } from 'react'
import useInput from '../../hooks/useInput'

interface Options {
  value: number
  name: string
}
const Page = () => {
  const [title, changeTitle] = useInput('')
  const [nickname, changeNickname] = useInput('')
  const [password, changePassword] = useInput('')
  const [mainText, changeMainText] = useInput('')
  const [option, setOptions] = useState<Options[]>([
    { value: 1, name: '자유 게시판' },
    { value: 2, name: '정보 게시판' },
    { value: 3, name: '42 게시판' },
  ])
  const [name, setName] = useState('')

  const [showError, setShowError] = useState(false)

  const optionHandler = useCallback((e: SelectChangeEvent) => {
    setName(e.target.value as string)
  }, [])

  const submitHnadler = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (title.trim().length === 0) {
        setShowError(true)
        return
      } else if (nickname.trim().length === 0) {
        setShowError(true)
        return
      } else if (password.trim().length === 0) {
        setShowError(true)
        return
      } else if (mainText.trim().length === 0) {
        setShowError(true)
        return
      }
      // console.log(
      //   `Data: ${title}, ${
      //     option.find((item) => item.value === name)?.value
      //   }, ${nickname}, ${password}, ${mainText}`,
      // )

      axios
        .post('/v1/question', {
          title,
          nickname,
          password,
          mainText,
          option: option.find((item) => item.value === name)?.value,
        })
        .then((res: AxiosResponse<any>) => {
          console.log(`res : ${res}`)
        })
        .catch((err) => {
          console.log(`err ${err}`)
        })
    },
    [title, nickname, password, mainText, option],
  )

  return (
    <Stack spacing={2}>
      <form onSubmit={submitHnadler}>
        <input
          required
          type="text"
          placeholder="제목"
          name="title"
          onChange={changeTitle}
        />
        {showError && title.trim().length === 0 && (
          <span>제목을 입력해주세요.</span>
        )}
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">게시판 타입</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={name}
            label="name"
            onChange={optionHandler}
          >
            {option.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <input
          type="text"
          placeholder="닉네임"
          name="nickname"
          onChange={changeNickname}
        />
        {showError && nickname.trim().length === 0 && (
          <span>닉네임을 입력해주세요.</span>
        )}

        <input
          type="password"
          placeholder="비밀번호"
          name="password"
          onChange={changePassword}
        />
        {showError && password.trim().length === 0 && (
          <span>비밀번호를 입력해주세요.</span>
        )}
        <TextareaAutosize
          name="mainText"
          color="neutral"
          disabled={false}
          minRows={2}
          placeholder={'입력해주세요 ...'}
          size="lg"
          variant="solid"
          onChange={changeMainText}
        />
        {showError && mainText.trim().length === 0 && (
          <span>텍스트를 입력해주세요 </span>
        )}
        <Button type="submit" variant="outlined">
          작성하기
        </Button>
      </form>
    </Stack>
  )
}

export default Page
