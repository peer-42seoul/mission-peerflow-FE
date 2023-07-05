import {
  Button,
  FormControl,
  Container,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  SelectChangeEvent,
} from '@mui/material'
import { useCallback, useState } from 'react'
import { WritingForm } from '../types/WritingForm'
import { Modal } from '@mui/base'
import { Box } from '@mui/system'
import useInput from '../hooks/useInput'
import updateQuestion from '../api/updateQuestion'

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

const EditForm = ({ questionId }: { questionId: number }) => {
  const [questionData, setQuestionData] = useState({})
  const [title, changeTitle] = useInput('')
  const [nickname, changeNickname] = useInput('')
  const [password, changePassword] = useInput('')
  const [mainText, changeMainText] = useInput('')
  const [name, setName] = useState('')
  const [showError, setShowError] = useState(false)
  const [category, setCategory] = useState<WritingForm['category'][]>([
    { value: 1, name: 'Minishell' },
    { value: 2, name: 'Minirt' },
    { value: 3, name: 'Fdf' },
  ])
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const categoryHandler = useCallback((e: SelectChangeEvent) => {
    setName(e.target.value)
  }, [])

  //delete 구현해야함
  // const deleteHandler = useCallback(
  //   (e: MouseEvent<HTMLButtonElement>) => {},

  //   [],
  // )
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
      setQuestionData({
        title,
        nickname,
        password,
        mainText,
        category: category.find((item) => item.value === name)?.value,
      })
      updateQuestion(questionId, questionData)
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
            <span style={{ color: 'red' }}>제목을 입력해주세요.</span>
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
            <TextField
              type="text"
              placeholder="닉네임"
              name="nickname"
              onChange={changeNickname}
              style={{ width: '40%' }}
            />
            {showError && nickname.trim().length === 0 && (
              <span style={{ color: 'red' }}>닉네임을 입력해주세요.</span>
            )}

            <TextField
              type="password"
              placeholder="비밀번호"
              name="password"
              onChange={changePassword}
              style={{ width: '40%' }}
            />
            {showError && password.trim().length === 0 && (
              <span style={{ color: 'red' }}>비밀번호를 입력해주세요.</span>
            )}
          </Stack>
          <TextField
            id="outlined-multiline-static"
            multiline
            rows={4}
            // defaultValue={}
            fullWidth
            onChange={changeMainText}
          />
          {showError && mainText.trim().length === 0 && (
            <span style={{ color: 'red' }}>텍스트를 입력해주세요 </span>
          )}
          <Button type="submit" variant="outlined">
            수정하기
          </Button>
          <Button type="button" variant="outlined" onClick={handleOpen}>
            삭제하기
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                정말로 삭제하시겠습니까?
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Button variant="contained" onClick={handleClose}>
                  네
                </Button>
                <Button variant="outlined" onClick={handleClose}>
                  아니요
                </Button>
              </Typography>
            </Box>
          </Modal>
        </Stack>
      </form>
    </Container>
  )
}

export default EditForm
