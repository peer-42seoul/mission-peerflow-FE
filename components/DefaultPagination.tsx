import React from 'react'
import { Pagination } from '@mui/material'
import { Category, Page } from '../app/MainPage'

const DefaultPagination = ({
  count,
  page,
  setPage,
  category,
}: {
  count: number
  page: Page
  setPage: React.Dispatch<React.SetStateAction<Page>>
  category: Category
}) => {
  const pageCategory = category ? category : 'main'
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage({ ...page, [pageCategory]: value })
  }
  return (
    <Pagination
      count={count}
      page={page[pageCategory]}
      onChange={handleChange}
    />
  )
}

export default DefaultPagination
