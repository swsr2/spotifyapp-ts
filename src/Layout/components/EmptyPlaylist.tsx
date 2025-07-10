import { Button, Card, styled, Typography } from '@mui/material'
import React from 'react'
import useHandlePlaylistCreate from './hooks/HandlePlaylistCreate';

const EmptyPlaylistCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: "20px",
  borderRadius: "8px",
}));

const CreatePlaylistButton = styled(Button)({
  marginTop: "20px",
  fontWeight: "700",
});

// 빈 플레이리스트 컴포넌트    
const EmptyPlaylist = () => {
 const { handleCreate } = useHandlePlaylistCreate()
 
  return (
    <EmptyPlaylistCard>
     <Typography variant="h2" fontWeight={700}>
        Create your first playlist
      </Typography>
      <Typography variant="body2">It's easy, we'll help you</Typography>
      <CreatePlaylistButton variant="contained" color="secondary" onClick={handleCreate}>
        Create playlist
      </CreatePlaylistButton>  
    </EmptyPlaylistCard>
  )
}

export default EmptyPlaylist