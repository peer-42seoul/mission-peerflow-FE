'use client'
import {
  TextField,
  IconButton,
  InputAdornment,
  Stack,
  Container,
  Typography,
  Skeleton,
} from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import GnbContext from '../hooks/GnbContext'
import DefaultPagination from '../components/DefaultPagination'
import DefaultDropdown from './DefaultDropdown'
import DefaultCard from './DefaultCard'
import axios from 'axios'
const MainPage = () => {
  const { setGnb, gnb } = useContext(GnbContext)
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])
  const [error, setError] = useState(false)
  const [url, setUrl] = useState('createdAt')

  useEffect(() => {
    setGnb({ title: '전체 보기', back: false, add: true })
  }, [])

  useEffect(() => {
    axios
      .get(
        gnb.title === '전체 보기'
          ? `http://localhost:3001/${url ?? 'createdAt'}-${page ?? 1}`
          : `http://localhost:3001/${gnb.title}`,
      )
      .then((res) => {
        setData(res.data)
      })
      .catch((error) => {
        console.error(error)
        setError(true)
      })
  }, [url, page, gnb])

  const changeUrl = (url: string) => {
    setUrl(url)
    setPage(1)
  }

  if (error) return <Typography>error</Typography>
  if (!data) return <Skeleton variant="rectangular" width={210} height={118} />

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
                <IconButton
                  onClick={() => {
                    changeUrl('search')
                  }}
                >
                  <SearchOutlinedIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <DefaultDropdown changeUrl={changeUrl} />
      </Stack>
      {data?.map((item: Post) => (
        <DefaultCard data={item} key={item.title} />
      ))}
      <Stack justifyContent={'center'} direction="row" m={1}>
        <DefaultPagination count={2} page={page} setPage={setPage} />
      </Stack>
    </Container>
  )
}
export default MainPage
