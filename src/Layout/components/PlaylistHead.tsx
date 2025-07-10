import BookmarkIcon from '@mui/icons-material/Bookmark';
import AddIcon from '@mui/icons-material/Add';  
import { styled, Box, Typography, Button } from '@mui/material';
import useHandlePlaylistCreate from './hooks/HandlePlaylistCreate';


const PlaylistHeadContainer = styled("div")({
    display: "flex",
    alignItems: "center",
    padding: "8px",
    justifyContent: "space-between",

})

// 플레이리스트 헤더 컴포넌트 
const PlaylistHead = () => {
  const { handleCreate } = useHandlePlaylistCreate()

  return (
    <PlaylistHeadContainer>
      <Box display="flex">
        <BookmarkIcon sx={{ marginRight: "20px" }} />
        <Typography variant="h2" fontWeight={700}>My Playlist</Typography>
        </Box>
        <Button onClick={handleCreate}>
        <AddIcon color="primary" />
        </Button>
    </PlaylistHeadContainer>
  
  )
}

export default PlaylistHead