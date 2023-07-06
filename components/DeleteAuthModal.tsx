import { Modal } from '@mui/base'
import { Box, Button, Stack, TextField } from '@mui/material'
import React, { useCallback } from 'react'
import useInput from '../hooks/useInput'
import axios from 'axios'
import { useRouter } from 'next/navigation'

// 상위 컴포넌트에서 필요한 state

// const [open, setOpen] = useState(false)
// const handleOpen = () => setOpen(true)
// const handleClose = () => setOpen(false)

{
  /* <DeleteAuthModal
open={open}
handleClose={handleClose}
questionId={questionId}
/> */
}

const DeleteAuthModal = ({ open, handleClose, questionId }) => {
  const router = useRouter()

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

  const [password, changePassword] = useInput('')

  const deleteHandler = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      axios
        .post(`http://localhost:8080/v1/question/${questionId}`, {
          type: 'question',
          password,
        })
        .then((res) => {
          router.push('/')
        })
        .catch((err) => {
          alert('존재하지 않는 게시물입니다.')
        })
    },
    [password],
  )

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h2 style={{ textAlign: 'center', marginBottom: '14px' }}>
          비밀번호를 입력하세요
        </h2>
        <Stack>
          <TextField
            id="standard-basic"
            type="password"
            label="비밀번호"
            name="password"
            onChange={changePassword}
            // defaultValue={password}
            style={{ width: '100%' }}
          />
          <Stack
            sx={{ marginTop: '12px' }}
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Button variant="text" onClick={deleteHandler}>
              확인
            </Button>
            <Button variant="text" onClick={handleClose}>
              취소
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  )
}

export default DeleteAuthModal
