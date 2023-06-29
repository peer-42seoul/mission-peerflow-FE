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
  Tooltip,
} from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import Link from 'next/link'
import RecommendIcon from '@mui/icons-material/Recommend'
import PageviewIcon from '@mui/icons-material/Pageview'
import GnbContext from '../hooks/GnbContext'

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
        sx={{ minWidth: 80 }}
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

const DefaultCard = ({ data }) => {
  console.log('data', data)
  const card = (
    <React.Fragment>
      <CardContent sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
        <Box>
          <Chip label={data?.category} />
        </Box>
        <Link href={`/detail/1`}>
          <Tooltip title={data.title} arrow>
            <Typography
              variant="h5"
              fontWeight={'bold'}
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: '2',
                WebkitBoxOrient: 'vertical',
              }}
            >
              <strong style={{ color: 'skyblue' }}>Q. </strong>
              {data?.title}
            </Typography>
          </Tooltip>
        </Link>
        <Stack spacing={1} direction={'row'} justifyContent={'space-between'}>
          <Typography variant="body2"> {data?.nickname}</Typography>
          <Typography color="text.secondary" variant="body2" pr={1}>
            {data?.created}
          </Typography>
        </Stack>
        <Link href={`/detail/1`}>
          <Typography
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
            }}
            variant="body2"
            color="text.secondary"
            maxHeight={40}
          >
            {data.content}
          </Typography>
        </Link>
        <Stack
          direction={'row'}
          spacing={1}
          my={1}
          margin={0}
          padding={0}
          fontSize={'12px'}
        >
          <RecommendIcon />
          <span>{data?.recomment}</span>
          <PageviewIcon viewBox="조회수" />
          <span>{data?.views}</span>
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
  const { changeGnb } = useContext(GnbContext)

  useEffect(() => {
    changeGnb({ title: '전체 보기', back: false, add: true })
  }, [])

  const datas = [
    {
      title:
        'minishell minishell 너무 어려워요minishell 너무 어려워요minishell 너무 어려워요minishell 너무 어려워요minishell 너무 어려워요minishell 너무 어려워요minishell 너무 어려워요',
      content:
        'minishell 너무 어려워요 minishell 너무 어려워요minishell 너무 어려워요minishell 너무 어려워요minishell 너무 어려워요minishell 너무 어려워요minishell 너무 어려워요minishell 너무 어려워요',
      category: 0,
      nickname: 'nickname',
      recomment: 1,
      views: 2,
      created: '2023-06-23 12:17',
    },
    {
      title:
        'minishell2 minishell 너무 어려워요minishell 너무 어려워요minishell 너무 어려워요minishell 너무 어려워요minishell 너무 어려워요minishell 너무 어려워요minishell 너무 어려워요minishell 너무 어려워요minishell 너무 어려워요minishell 너무 어려워요minishell 너무 어려워요minishell 너무 어려워요minishell 너무 어려워요minishell 너무 어려워요',
      content:
        'minishell 너무 어려워요2 minishell 너무 어려워요minishell 너무 어려워요minishell 너무 어려워요minishell 너무 어려워요minishell 너무 어려워요minishell 너무 어려워요minishell 너무 어려워요minishell 너무 어려워요minishell 너무 어려워요minishell 너무 어려워요minishell 너무 어려워요',
      category: 0,
      nickname: 'nickname',
      recomment: 2,
      views: 2,
      created: '2023-06-23 12:17',
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
      {datas?.map((item: Post) => (
        <DefaultCard data={item} key={item.title} />
      ))}
      <Stack justifyContent={'center'} direction="row" m={1}>
        <DefaultPagination />
      </Stack>
    </Container>
  )
}
export default MainPage
