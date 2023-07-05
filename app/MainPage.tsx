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

export type Category = null | 'ft_irc' | 'minishell' | 'minirt' | 'search'
export type Sort = 'lastest' | 'views' | 'recommendations'
export type Page = {
  main: number
  minishell: number
  ft_irc: number
  minirt: number
}

const MainPage = () => {
  const { gnb } = useContext(GnbContext)
  const [page, setPage] = useState<Page>({
    main: 1,
    minishell: 1,
    ft_irc: 1,
    minirt: 1,
  })
  const [data, setData] = useState<Result>(null)
  const [error, setError] = useState(false)
  const [category, setCategory] = useState<Category>(null)
  const [sort, setSort] = useState<Sort>('lastest')
  const [title, setTitle] = useState<string>('')
  const [search, setSearch] = useState<boolean>(false)

  const fetchData = async () => {
    try {
      let url = !(category === 'search')
        ? category
          ? `http://paulryu9309.ddns.net:8080/v1?category=${category}&sort=${sort}&pagingIndex=${
              page[category ? category : 'main'] - 1
            }&pagingSize=${5}`
          : `http://paulryu9309.ddns.net:8080/v1?sort=${sort}&pagingIndex=${
              page[category ? category : 'main'] - 1
            }&pagingSize=${5}`
        : `http://paulryu9309.ddns.net:8080/v1/search?title=${title}&sort=${sort}`

      const response = await fetch(url)
      if (!response.ok) {
        console.log('Failed to fetch data')
        return
      }
      const data = await response.json()
      if (!data) {
        console.log('Invalid data received')
        return
      }
      setData(data)
    } catch (error) {
      console.error(error)
      setError(true)
    }
  }

  useEffect(() => {
    setCategory(
      !search ? (gnb.title === '전체 보기' ? null : gnb.title) : 'search',
    )
    fetchData()
    if (search) {
      setSearch(false)
    }
  }, [category, page, gnb, sort])

  if (!data && error)
    return (
      <Stack direction={'row'} justifyContent={'center'} width={'100%'}>
        <Box>문제가 발생했습니다</Box>
      </Stack>
    )
  if (!data) return <Skeleton variant="text" />
  return (
    <Container sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
      <Stack justifyContent={'space-between'} direction="row" mt={1}>
        <TextField
          id="outlined-search"
          type="search"
          placeholder="제목 검색"
          size={'small'}
          onChange={(e) => {
            setTitle(e.target.value)
          }}
          value={title}
          InputProps={{
            endAdornment: (
              <InputAdornment position={'end'}>
                <IconButton
                  onClick={() => {
                    setCategory('search')
                    setSearch(true)
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
      {data?.content?.length ? (
        data?.content.map((item: Post) => {
          return <DefaultCard data={item} key={item.questionId} />
        })
      ) : (
        <Stack direction={'row'} justifyContent={'center'} width={'100%'}>
          <Box sx={{ marginTop: '4px' }}>게시글이 없습니다</Box>
        </Stack>
      )}
      <Stack justifyContent={'center'} direction="row" m={1}>
        <DefaultPagination
          count={data?.totalPages}
          page={page}
          setPage={setPage}
          category={category}
        />
      </Stack>
    </Container>
  )
}
export default MainPage
