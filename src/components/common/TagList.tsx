import { Box, Chip } from '@material-ui/core'
import React from 'react'

export const TagList = ({ tags }: { tags: string[] }) => {
  return (
    <Box
      component="ul"
      sx={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        pl: 0,
        '& > *': {
          my: 0.375,
          mr: 0.75,
        },
      }}
    >
      {tags.map((tag, i) => (
        <Chip
          component="li"
          size="small"
          variant="outlined"
          label={tag}
          key={i}
        ></Chip>
      ))}
    </Box>
  )
}
