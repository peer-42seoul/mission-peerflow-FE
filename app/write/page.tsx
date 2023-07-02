'use client'
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material'
import Stack from '@mui/material/Stack'
import axios, { AxiosResponse } from 'axios'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import useInput from '../../hooks/useInput'
import GnbContext from '../../hooks/GnbContext'

const Page = () => {
  const { setGnb } = useContext(GnbContext)

  useEffect(() => {
    setGnb({ title: '새 글', back: true, add: false })
  }, [])
  const [title, changeTitle] = useInput('')
  const [nickname, changeNickname] = useInput('')
  const [password, changePassword] = useInput('')
  const [mainText, changeMainText] = useInput('')
  const [category, setCategory] = useState<WritingForm['category'][]>([
    { value: 1, name: 'Minishell' },
    { value: 2, name: 'Minirt' },
    { value: 3, name: 'Fdf' },
  ])

  const [name, setName] = useState('')

  const [showError, setShowError] = useState(false)

  const categoryHandler = useCallback((e: SelectChangeEvent) => {
    setName(e.target.value)
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
      console.log(
        `Data: ${title}, ${
          category.find((item) => item.value === name)?.value
        }, ${nickname}, ${password}, ${mainText}`,
      )

      axios
        .post('/v1/question', {
          title,
          nickname,
          password,
          mainText,
          category: category.find((item) => item.value === name)?.value,
        })
        .then((res: AxiosResponse<any>) => {
          console.log(`res : ${res}`)
        })
        .catch((err) => {
          console.log(`err ${err}`)
        })
    },
    [title, nickname, password, mainText, category],
  )

  return (
    <Container>
      <form onSubmit={submitHnadler}>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="stretch"
          spacing={2}
        >
          <TextField
            id="standard-basic"
            label="제목"
            fullWidth
            onChange={changeTitle}
          />
          {showError && title.trim().length === 0 && (
            <div style={{ color: 'red' }}>제목을 입력해주세요.</div>
          )}
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">게시판 타입</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={name}
              label="name"
              onChange={categoryHandler}
            >
              {category.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Stack
            spacing={{ xs: 1, sm: 2 }}
            direction="row"
            useFlexGap
            flexWrap="wrap"
            justifyContent="space-between"
          >
            <Stack width={'45%'}>
              <TextField
                type="text"
                placeholder="닉네임"
                name="nickname"
                onChange={changeNickname}
                style={{ width: '100%' }}
              />
              {showError && nickname.trim().length === 0 && (
                <div style={{ color: 'red', marginTop: '16px' }}>
                  닉네임을 입력해주세요.
                </div>
              )}
            </Stack>
            <Stack width={'45%'}>
              <TextField
                type="password"
                placeholder="비밀번호"
                name="password"
                onChange={changePassword}
                style={{ width: '100%' }}
              />
              {showError && password.trim().length === 0 && (
                <div style={{ color: 'red', marginTop: '16px' }}>
                  비밀번호를 입력해주세요.
                </div>
              )}
            </Stack>
          </Stack>
          <TextField
            id="outlined-multiline-static"
            multiline
            rows={4}
            // defaultValue={title}
            fullWidth
            onChange={changeMainText}
          />
          {showError && mainText.trim().length === 0 && (
            <div style={{ color: 'red' }}>텍스트를 입력해주세요 </div>
          )}
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={2}
          >
            <Button type="submit" variant="outlined">
              작성하기
            </Button>
          </Stack>
        </Stack>
      </form>
    </Container>
  )
}

export default Page
