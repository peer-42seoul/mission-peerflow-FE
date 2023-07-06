'use client'

import updateQuestion from '../../../api/updateQuestion'
import useInput from '../../../hooks/useInput'
import { Button, Stack, TextField } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import DeleteAndEditModal from '../../../components/DeleteAndEditModal'
import axios from 'axios'
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

const Page = ({ params }: { params: { id: number } }) => {
  const router = useRouter()
  const [title, changeTitle, setTitle] = useInput('')
  const [nickname, changeNickname, setNickname] = useInput('')
  const [password, changePassword, setPassword] = useInput('')
  const [content, changeContent, setContent] = useInput('')
  const [showError, setShowError] = useState(false)
  const [category, setCategory] = useState('')
  const [open, setOpen] = useState(false)
  const [action, setAction] = useState('')

  const handleOpen = (action) => {
    setAction(action)
    setOpen(!open)
  }
  const handleClose = () => setOpen(!open)

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
        await updateQuestion(params?.id, updatedQuestionData)
        router.push('/')
      } catch (err) {
        alert('수정에 실패하였습니다.')
      }
    },
    [password, content],
  )

  useEffect(() => {
    axios
      .get(`http://localhost:8080/v1/question/${params?.id}`)
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
              onClick={() => handleOpen('수정')}
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
