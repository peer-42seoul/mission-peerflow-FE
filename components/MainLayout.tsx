'use client'
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
} from '@mui/material'
import React from 'react'

const Category = () => {
  return (
    <List sx={{ backgroundColor: 'blue', padding: 0 }}>
      {['Peer-flow', '# Minishell', '# Minirt', '# Fdf'].map((text) => (
        <ListItem
          key={text}
          disablePadding
          sx={{ width: 200, backgroundColor: 'yellow', px: 2, py: 0 }}
        >
          <ListItemButton>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}

const MainLayout = ({ children }) => {
  return (
    <Stack direction={'row'}>
      <Category />
      <Stack>
        <Stack
          justifyContent={'space-between'}
          direction={'row'}
          alignItems={'center'}
          py={2}
          px={4}
          bgcolor={'red'}
        >
          <Box>사이드바 메뉴</Box>
          <Stack>
            <Button>새 글</Button>
          </Stack>
        </Stack>
        <Box width={'100%'}>{children}</Box>
      </Stack>
    </Stack>
  )
}

export default MainLayout
