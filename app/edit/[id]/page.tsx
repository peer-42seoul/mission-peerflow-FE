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
import DeleteAuthModal from '../../../components/DeleteAuthModal'

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

const questionId = 4

const Page = ({ question }: number) => {
  const [questionData, setQuestionData] = useState({})
  const [title, changeTitle, setTitle] = useInput('')
  const [nickname, changeNickname, setNickname] = useInput('')
  const [password, changePassword, setPassword] = useInput('')
  const [content, changeContent, setContent] = useInput('')
  const [name, setName] = useState('')
  const [showError, setShowError] = useState(false)

  // const [category, setCategory] = useState<WritingForm['category'][]>([
  //   { value: 'minishell', name: 'Minishell' },
  //   { value: 'minirt', name: 'Minirt' },
  //   { value: 'fdf', name: 'Fdf' },
  // ])
  const [category, setCategory] = useState<WritingForm['category'][]>([
    { value: 'minishell', name: 'Minishell' },
    { value: 'minirt', name: 'Minirt' },
    { value: 'fdf', name: 'Fdf' },
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
    axios.delete(`http://paulryu9309.ddns.net/v1/question/${questionId}`)
  }, [])

  const submitHnadler = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('work 1')

    // if (title.trim().length === 0) {
    //   setShowError(true)
    //   console.log('work 1=1')

    //   return
    // } else if (nickname.trim().length === 0) {
    //   console.log('work 1=2')

    //   setShowError(true)
    //   return
    // } else if (password.length === 0) {
    //   console.log('work 1=3')

    //   setShowError(true)
    //   return
    // } else if (content.trim().length === 0) {
    //   setShowError(true)
    //   return
    // }
    // console.log('work 2')

    setQuestionData((prevQuestionData) => {
      const updatedQuestionData = {
        ...prevQuestionData,
        type: 'question',
        title,
        nickname,
        password,
        content,
        category: category.find((item) => item.value === name)?.value,
      }
      return updatedQuestionData
    })
    console.log('work 3')

    updateQuestion({ questionId: questionId, data: questionData })
  }, [])

  useEffect(() => {
    axios
      .get(`http://paulryu9309.ddns.net/v1/question/${questionId}`)
      .then((res: any) => {
        console.log(`res : ${res}`)
        console.log(`data : ${JSON.stringify(res.data)}`)
        setTitle(res.data.title)
        setNickname(res.data.nickname)
        setPassword(res.data.password)
        setContent(res.data.content)
        setCategory(res.data.category)
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
            placeholder="제목"
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
              {/* {category.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.name}
                </MenuItem>
              ))} */}
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
                placeholder="닉네임"
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
                placeholder="비밀번호"
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
          </Stack>
          <DeleteAndEditModal
            open={open}
            handleClose={handleClose}
            evtHandler={action === '수정' && submitHnadler}
            action={action}
          />
        </Stack>
      </form>
    </>
  )
}

export default Page
