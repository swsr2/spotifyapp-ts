import React from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import PlaylistHead from "../Layout/components/PlaylistHead";
import Playlist from "../Layout/components/Playlist";

const PlaylistContainer = styled(Box)({
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
});

const PlaylistScrollArea = styled("div")({
  flexGrow: 1,
  overflowY: "auto",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
});

const Playlistpage = () => {
  return (
    <PlaylistContainer>
      <Box sx={{ flexShrink: 0 }}>
        <PlaylistHead />
      </Box>
      <PlaylistScrollArea>
        <Playlist />
      </PlaylistScrollArea>
    </PlaylistContainer>
  );
};

export default Playlistpage;
