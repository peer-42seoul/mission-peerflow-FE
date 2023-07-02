'use client'

import updateQuestion from '../../../api/updateQuestion'
import useInput from '../../../hooks/useInput'
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import DeleteAndEditModal from '../../../components/DeleteAndEditModal'
import axios, { AxiosResponse } from 'axios'
import { WritingForm } from '../../../types/WritingForm'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

// 임시로 questionId을 활용해 api 테스트

const questionId = 42

const Page = () => {
  const [questionData, setQuestionData] = useState({})
  const [title, changeTitle] = useInput('')
  const [nickname, changeNickname] = useInput('')
  const [password, changePassword] = useInput('')
  const [content, changeContent] = useInput('')
  const [name, setName] = useState('')
  const [showError, setShowError] = useState(false)
  const [category, setCategory] = useState<WritingForm['category'][]>([
    { value: 1, name: 'Minishell' },
    { value: 2, name: 'Minirt' },
    { value: 3, name: 'Fdf' },
  ])
  const [open, setOpen] = useState(false)
  const [action, setAction] = useState('')
  const handleOpen = (action) => {
    setAction(action)
    setOpen(true)
  }
  const handleClose = () => setOpen(false)

  const categoryHandler = useCallback((e: SelectChangeEvent) => {
    setName(e.target.value)
  }, [])

  const deleteHandler = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    axios.delete(`/v1/question/${questionId}`)
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
      } else if (content.trim().length === 0) {
        setShowError(true)
        return
      }

      setQuestionData((prevQuestionData) => {
        const updatedQuestionData = {
          ...prevQuestionData,
          title,
          nickname,
          password,
          content,
          category: category.find((item) => item.value.toString() === name)
            ?.value,
        }
        return updatedQuestionData
      })
      updateQuestion({ questionId: questionId, data: questionData })
    },
    [title, nickname, password, content, category],
  )

  useEffect(() => {
    axios
      .get(`/v1/question${questionId}`)
      .then((res: string) => {
        console.log(`res : ${res}`)
        changeTitle(res.title)
        changeNickname(res.nickname)
        changePassword(res.password)
        changeContent(res.content)
        setCategory(res.value)
      })
      .catch((err) => {
        console.log(`err ${err}`)
        alert('불러오기에 실패하였습니다.')
      })
  }, [])
  return (
    <>
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
            defaultValue={title}
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
                id="standard-basic"
                type="text"
                label="닉네임"
                name="nickname"
                onChange={changeNickname}
                style={{ width: '100%' }}
                defaultValue={nickname}
              />
              {showError && nickname.trim().length === 0 && (
                <div style={{ color: 'red' }}>닉네임을 입력해주세요.</div>
              )}
            </Stack>
            <Stack width={'45%'}>
              <TextField
                id="standard-basic"
                type="password"
                label="비밀번호"
                name="password"
                onChange={changePassword}
                defaultValue={password}
                style={{ width: '100%' }}
              />
              {showError && password.trim().length === 0 && (
                <div style={{ color: 'red' }}>비밀번호를 입력해주세요.</div>
              )}
            </Stack>
          </Stack>
          <TextField
            placeholder="내용을 입력해주세요."
            id="outlined-multiline-static"
            multiline
            rows={4}
            defaultValue={content}
            fullWidth
            onChange={changeContent}
          />
          {showError && content.trim().length === 0 && (
            <div style={{ color: 'red' }}>텍스트를 입력해주세요 </div>
          )}
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={2}
          >
            <Button
              type="button"
              variant="outlined"
              onClick={() => showError === false && handleOpen('수정')}
            >
              수정하기
            </Button>
            <Button
              color="error"
              type="button"
              variant="outlined"
              onClick={() => !showError && handleOpen('삭제')}
            >
              삭제하기
            </Button>
          </Stack>
          <DeleteAndEditModal
            open={open}
            handleClose={handleClose}
            evtHandler={action === '수정' ? submitHnadler : deleteHandler}
            action={action}
          />
        </Stack>
      </form>
    </>
  )
}

export default Page
