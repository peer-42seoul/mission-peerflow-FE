'use client'
import {
  TextField,
  IconButton,
  InputAdornment,
  Stack,
  Container,
  Skeleton,
  Box,
} from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import GnbContext from '../hooks/GnbContext'
import DefaultPagination from '../components/DefaultPagination'
import DefaultDropdown from './DefaultDropdown'
import DefaultCard from './DefaultCard'
import axios from 'axios'

type Category = null | 'ft_irc' | 'minishell' | 'minirt' | 'search'
export type Sort = 'lastest' | 'views' | 'recommends'

const MainPage = () => {
  const { setGnb, gnb } = useContext(GnbContext)
  const [page, setPage] = useState(1)
  const [data, setData] = useState<Result>(null)
  const [error, setError] = useState(false)
  const [category, setCategory] = useState<Category>(null)
  const [sort, setSort] = useState<Sort>('lastest')
  const [title, setTitle] = useState<string>('')

  useEffect(() => {
    setGnb({ title: '전체 보기', back: false, add: true })
  }, [])

  const fetchData = async () => {
    try {
      const response = await axios.get(
        category
          ? category === 'search'
            ? `http://paulryu9309.ddns.net/v1/search?title=${title}&sort=${sort}`
            : `http://paulryu9309.ddns.net/v1?category=${category}&sort=${sort}&pageIndex=${page}&pageSize=${5}`
          : `http://paulryu9309.ddns.net/v1?sort=${sort}&pageIndex=${page}&pageSize=${5}`,
      )
      setData(response?.data)
    } catch (error) {
      console.error(error)
      setError(true)
    }
  }

  useEffect(() => {
    changeCategory(
      category !== 'search'
        ? gnb.title === '전체 보기'
          ? null
          : gnb.title
        : 'search',
    )

    fetchData()
  }, [category, page, gnb, sort])

  const changeCategory = (category: Category) => {
    setCategory(category)
    setPage(1)
  }

  if (!data && error)
    return (
      <Stack direction={'row'} justifyContent={'center'} width={'100%'}>
        <Box>문제가 발생했습니다</Box>
      </Stack>
    )
  if (!data) return <Skeleton variant="rectangular" width={210} height={118} />
  if (!data?.content?.length)
    return (
      <Stack direction={'row'} justifyContent={'center'} width={'100%'}>
        <Box>게시글이 없습니다</Box>
      </Stack>
    )
  return (
    <Container sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
      <Stack justifyContent={'space-between'} direction="row" mt={1}>
        <TextField
          id="outlined-search"
          type="search"
          placeholder="제목 검색"
          size={'small'}
          onChange={(e) => {
            if (category === 'search') {
              setTitle(e.target.value)
            }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position={'end'}>
                <IconButton
                  onClick={() => {
                    changeCategory('search')
                  }}
                >
                  <SearchOutlinedIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <DefaultDropdown setSort={setSort} sort={sort} />
      </Stack>
      {data?.content.map((item: Post) => {
        return <DefaultCard data={item} key={item.questionId} />
      })}
      <Stack justifyContent={'center'} direction="row" m={1}>
        <DefaultPagination
          count={data?.totalPages}
          page={page}
          setPage={setPage}
        />
      </Stack>
    </Container>
  )
}
export default MainPage
