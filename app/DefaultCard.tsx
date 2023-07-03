import React from 'react'
import {
  Box,
  Card,
  CardContent,
  Chip,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import Link from 'next/link'
import RecommendIcon from '@mui/icons-material/Recommend'
import PageviewIcon from '@mui/icons-material/Pageview'
import dayjs from 'dayjs'

const DefaultCard = ({ data }: { data: Post }) => {
  const card = (
    <React.Fragment>
      <CardContent sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
        <Box>
          <Chip label={data?.category} />
        </Box>
        <Link href={`/detail/${data?.questionId}`}>
          <Tooltip title={data?.title} arrow>
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
            {dayjs(data?.createdAt).format('YYYY-MM-DD HH:mm')}
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
            {data?.content}
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
          <span>{data?.recommend}</span>
          <PageviewIcon viewBox="조회수" />
          <span>{data?.view}</span>
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

export default DefaultCard
