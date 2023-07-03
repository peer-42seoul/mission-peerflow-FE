import React, { useState } from 'react'
import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { Sort } from './MainPage'

const DefaultDropdown = ({
  sort,
  setSort,
}: {
  sort: Sort
  setSort: Dispatch<SetStateAction<Sort>>
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value as Sort)
  }
  return (
    <FormControl size="small">
      <Select
        sx={{ minWidth: 80 }}
        id="post-sort"
        value={sort}
        onChange={handleChange}
      >
        <MenuItem value={'lastest'}>최신순</MenuItem>
        <MenuItem value={'views'}>조회순</MenuItem>
        <MenuItem value={'recommends'}>추천순</MenuItem>
      </Select>
    </FormControl>
  )
}

export default DefaultDropdown
