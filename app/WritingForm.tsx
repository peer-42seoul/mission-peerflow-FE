'use client'
import Dropdown from '@/components/Dropdown'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextareaAutosize,
} from '@mui/material'
import Stack from '@mui/material/Stack'
import React, { useEffect, useState } from 'react'

const WritingForm = () => {
  const [options, setOptions] = useState<string>([
    '자유 게시판',
    '정보 게시판',
    '핫딜',
  ])

  const changeOptions = (e: SelectChangeEvent) => {
    setOptions(e.target.value)
  }

  return (
    <Stack spacing={2}>
      <input type="text" placeholder="제목" />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={options}
          label="options"
          onChange={changeOptions}
        >
          <MenuItem value={10}>자유 게시판</MenuItem>
          <MenuItem value={20}>정보 게시판</MenuItem>
          <MenuItem value={30}>핫딜</MenuItem>
        </Select>
      </FormControl>
      <input type="text" placeholder="닉네임" />
      <input type="text" placeholder="비밀번호" />
      <TextareaAutosize
        color="neutral"
        disabled={false}
        minRows={2}
        placeholder="입력해주세요 ..."
        size="lg"
        variant="solid"
      />
    </Stack>
  )
}

export default WritingForm
