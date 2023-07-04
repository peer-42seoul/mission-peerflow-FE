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
import { useRouter } from 'next/navigation'

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

// const questionId = 8

const Page = ({ params }: { params: { id: number } }) => {
  console.log('param : ', params)
  const router = useRouter()
  const [title, changeTitle, setTitle] = useInput('')
  const [nickname, changeNickname, setNickname] = useInput('')
  const [password, changePassword, setPassword] = useInput('')
  const [content, changeContent, setContent] = useInput('')
  const [showError, setShowError] = useState(false)

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

  const submitHandler = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      console.log('submit')

      if (!password) {
        setShowError(true)
        return
      } else if (!content) {
        setShowError(true)
        return
      }
      const updatedQuestionData = {
        type: 'question',
        title,
        nickname,
        password,
        content,
        category,
      }
      try {
        await updateQuestion({
          questionId: params?.id,
          data: updatedQuestionData,
        })
        router.push('/')
      } catch (err) {
        console.log(err)
      }
    },
    [password, content],
  )

  useEffect(() => {
    axios
      .get(`http://paulryu9309.ddns.net/v1/question/${params?.id}`)
      .then((res: any) => {
        setTitle(res.data.title)
        setNickname(res.data.nickname)
        setPassword(res.data.password)
        setContent(res.data.content)
        setCategory(res.data.category)
      })
      .catch((err) => {
        alert(`${err} 불러오기에 실패하였습니다.`)
      })
  }, [])

  return (
    <>
      <form onSubmit={submitHandler}>
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
            defaultValue={title}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            id="standard-basic"
            fullWidth
            defaultValue={category}
            InputProps={{
              readOnly: true,
            }}
          />
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
                style={{ width: '100%' }}
                defaultValue={nickname}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Stack>
            <Stack width={'45%'}>
              <TextField
                id="standard-basic"
                type="password"
                placeholder="비밀번호"
                name="password"
                value={password}
                onChange={changePassword}
                style={{ width: '100%' }}
              />
              {showError && !password && (
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
          {showError && !content && (
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
            evtHandler={action === '수정' && submitHandler}
            action={action}
          />
        </Stack>
      </form>
    </>
  )
}

export default Page
