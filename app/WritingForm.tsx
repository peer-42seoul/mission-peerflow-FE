'use client'
import Dropdown from '@/components/Dropdown'
import useInput from '@/hooks/useInput'
import { Button, TextareaAutosize } from '@mui/material'
import Stack from '@mui/material/Stack'
import axios, { AxiosResponse } from 'axios'
import React, { ChangeEvent, useEffect, useState } from 'react'

interface options {
  value: number
  name: string
}
const WritingForm = () => {
  const [title, changeTitle] = useInput('')
  const [nickname, changeNickname] = useInput('')
  const [password, changePassword] = useInput('')
  const [mainText, changeMainText] = useInput('')
  const [option, setOption] = useState<options[]>([
    {
      value: 1,
      name: '자유 게시판',
    },
    {
      value: 2,
      name: '정보 게시판',
    },
    {
      value: 3,
      name: '핫딜 게시판',
    },
  ])
  const [showError, setShowError] = useState(false)

  // const changeOptions = (e: React.ChangeEvent<{ value: unknown }>) => {
  //   const selectionOption = option.find((o) => o.value === e.target.value)
  //   if (selectionOption) {
  //     setOption(selectionOption)
  //   }
  // }

  const changeOptions = (e: React.ChangeEvent<{ value: unknown }>) => {
    const selectedValue = e.target.value as number
    const selectedOption = option.find((o) => o.value === selectedValue)
    if (selectedOption) {
      setOption(selectedOption)
    }
  }
  // const changeInputHandler = (
  //   e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  // ) => {
  //   const { name, value } = e.target
  //   if (name === 'mainText') {
  //     setMainText(value)
  //   }
  // }

  const submitHnadler = (e: React.FormEvent<HTMLFormElement>) => {
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
    console.log(
      `Data : ${title}, ${option} ${nickname}, ${password}, ${mainText}`,
    )
    axios
      .post('/v1/question', {
        title,
        nickname,
        password,
        mainText,
        option,
      })
      .then((res: AxiosResponse<any>) => {
        console.log(`res : ${res}`)
      })
      .catch((err) => {
        console.log(`err ${err}`)
      })
  }

  return (
    <Stack spacing={2}>
      <form action={'/somewhere'} onSubmit={submitHnadler}>
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

        <Dropdown changeOptions={changeOptions} option={option} />
        {/* </FormControl> */}
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

export default WritingForm
