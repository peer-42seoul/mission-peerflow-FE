'use client'
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Drawer,
  useMediaQuery,
  Stack,
  Button,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import TagIcon from '@mui/icons-material/Tag'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import React, { useContext, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import GnbContext from '../hooks/GnbContext'
import { ArrowBackIosNew } from '@mui/icons-material'

const Category = ({ children, setGnb, gnb }) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const router = useRouter()
  const isTablet = useMediaQuery('(max-width: 900px)')
  const drawerWidth = isTablet ? 180 : 240

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <div>
      <Toolbar>
        <Link href={'/'}>
          <Typography
            onClick={() => {
              setGnb({ title: '전체 보기', add: true, back: false })
            }}
            fontWeight={'bold'}
          >
            Peer-flow
          </Typography>
        </Link>
      </Toolbar>
      <Divider />
      <List sx={{ padding: 0, height: '100%' }}>
        {['Minishell', 'Minirt', 'Fdf'].map((text) => (
          <ListItem key={text} disablePadding sx={{ px: 2, py: 1 }}>
            <ListItemButton
              onClick={() => {
                setGnb({ title: text, add: true, back: false })
                router.push('/')
              }}
            >
              <ListItemText
                primary={
                  <Stack direction={'row'} spacing={0.5}>
                    <TagIcon />
                    <Typography>{text}</Typography>
                  </Stack>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  )

  const container =
    typeof window !== 'undefined' ? () => window.document.body : undefined

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <Stack
            direction={'row'}
            alignItems={'center'}
            flex={1}
            justifyContent={'space-between'}
          >
            {gnb.back ? (
              <IconButton onClick={() => router.back()} edge="start">
                <ArrowBackIosNew sx={{ color: 'white' }} />
              </IconButton>
            ) : (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ visibility: { sm: 'hidden' } }}
              >
                <MenuIcon sx={{ color: 'white' }} />
              </IconButton>
            )}
            <Typography noWrap component="div" color={'white'}>
              {gnb.title}
            </Typography>
            {gnb.add && (
              <Link href={'/write'}>
                <IconButton sx={{ visibility: { sm: 'hidden' } }}>
                  <AddOutlinedIcon sx={{ color: 'white' }} />
                </IconButton>
              </Link>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}

const MainLayout = ({ children }) => {
  const [gnb, setGnb] = useState<{
    title: string
    back: boolean
    add: boolean
  }>({
    title: '전체 보기',
    back: false,
    add: true,
  })

  return (
    <GnbContext.Provider value={{ gnb, setGnb }}>
      <Category setGnb={setGnb} gnb={gnb}>
        {children}
      </Category>
    </GnbContext.Provider>
  )
}

export default MainLayout
