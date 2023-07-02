import React from 'react'
import { Pagination } from '@mui/material'

const DefaultPagination = ({
  count,
  page,
  setPage,
}: {
  count: number
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
}) => {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }
  return <Pagination count={count} page={page} onChange={handleChange} />
}

export default DefaultPagination
