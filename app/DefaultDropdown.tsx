import React, { useState } from 'react'
import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material'

const DefaultDropdown = ({
  changeUrl,
}: {
  changeUrl: (url: string) => void
}) => {
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
        <MenuItem value={'recent'} onClick={() => changeUrl('createdAt')}>
          최신순
        </MenuItem>
        <MenuItem value={'view'} onClick={() => changeUrl('view')}>
          조회순
        </MenuItem>
        <MenuItem value={'recommend'} onClick={() => changeUrl('recommend')}>
          추천순
        </MenuItem>
      </Select>
    </FormControl>
  )
}

export default DefaultDropdown
