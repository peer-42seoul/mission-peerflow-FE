'use client'
import {
  Box,
  CardContent,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Typography,
  Card,
  Chip,
  TextField,
  IconButton,
  InputAdornment,
  FormControl,
  Stack,
  Container,
} from '@mui/material'
import React, { useState } from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'

const DefaultPagination = () => {
  const [page, setPage] = useState(1)
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }
  return <Pagination count={5} page={page} onChange={handleChange} />
}

const DefaultDropdown = () => {
  const [sort, setSort] = useState<'recent' | 'view' | 'recommend'>('recent')

  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value as 'recent' | 'view' | 'recommend')
  }
  return (
    <FormControl size="small">
      <Select
        sx={{ minWidth: 100 }}
        id="post-sort"
        value={sort}
        onChange={handleChange}
      >
        <MenuItem value={'recent'}>최신순</MenuItem>
        <MenuItem value={'view'}>조회순</MenuItem>
        <MenuItem value={'recommend'}>추천순</MenuItem>
      </Select>
    </FormControl>
  )
}

const DefaultCard = ({ title }: Post[]) => {
  const card = (
    <React.Fragment>
      <CardContent sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
        <Box>
          <Chip label="카테고리" variant="outlined" />
        </Box>
        <Typography variant="h5" component="div">
          <strong style={{ color: 'green' }}>Q. </strong>
          {title}
        </Typography>
        <Stack spacing={1}>
          <Typography variant="body2">작성자</Typography>
          <Typography color="text.secondary" variant="body2">
            작성날짜
          </Typography>
        </Stack>
        <Typography
          variant="body2"
          color="text.secondary"
          maxHeight={40}
          textOverflow={'ellipsis'}
          overflow={'hidden'}
        >
          minishell 너무 어려워요 너무 어려워요 너무 어려워요 minishell 너무
          어려워요 너무 어려워요 너무 어려워요minishell 너무 어려워요 너무
          어려워요 너무 어려워요minishell 너무 어려워요 너무 어려워요 너무
          어려워요minishell 너무 어려워요 너무 어려워요 너무 어려워요minishell
          너무 어려워요 너무 어려워요 너무 어려워요minishell 너무 어려워요 너무
          어려워요 너무 어려워요minishell 너무 어려워요 너무 어려워요 너무
          어려워요 minishell 너무 어려워요 너무 어려워요 너무 어려워요minishell
          너무 어려워요 너무 어려워요 너무 어려워요minishell 너무 어려워요 너무
          어려워요 너무 어려워요minishell 너무 어려워요 너무 어려워요 너무
          어려워요
        </Typography>
        <Stack spacing={1} direction="row">
          <Typography variant="body2">
            조회 <span>0</span>
          </Typography>
          <Typography variant="body2">
            추천 <span>0</span>
          </Typography>
          <Typography variant="body2">
            답변 <span>0</span>
          </Typography>
        </Stack>
      </CardContent>
    </React.Fragment>
  )

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  )
}

const MainPage = () => {
  const datas = [
    {
      title: 'minishell',
      content: 'minishell 너무 어려워요',
      category: 0,
      nickname: 'nickname',
      recomment: 1,
      views: 2,
      created: '2023-06-23',
    },
    {
      title: 'minishell2',
      content: 'minishell 너무 어려워요2',
      category: 0,
      nickname: 'nickname',
      recomment: 2,
      views: 2,
      created: '2023-06-23',
    },
  ]
  return (
    <Container sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
      <Stack justifyContent={'space-between'} direction="row" mt={1}>
        <TextField
          id="outlined-search"
          type="search"
          placeholder="제목 검색"
          size={'small'}
          InputProps={{
            endAdornment: (
              <InputAdornment position={'end'}>
                <IconButton>
                  <SearchOutlinedIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <DefaultDropdown />
      </Stack>
      {datas?.map((item) => {
        return <DefaultCard props={item} />
      })}
      <Stack justifyContent={'center'} direction="row" m={1}>
        <DefaultPagination />
      </Stack>
    </Container>
  )
}
export default MainPage
