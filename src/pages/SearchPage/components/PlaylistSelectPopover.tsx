import {
  List,
  ListItemButton,
  ListItemText,
  Popover,
  Typography,
} from "@mui/material";
import useGetCurrentUserPlaylist from "../../../hooks/useGetCurrentUserPlaylist";

interface PlaylistSelectModalProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onSelect: (playlistId: string) => void;
}

const PlaylistSelectPopover = ({
  open,
  anchorEl,
  onClose,
  onSelect,
}: PlaylistSelectModalProps) => {
  const { data } = useGetCurrentUserPlaylist({ limit: 20, offset: 0 });

  const playlists = data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Typography variant="h6" sx={{ p: 1.5, fontWeight: 600 }}>
        My Playlists
      </Typography>
      <List dense sx={{ width: 250 }}>
        {playlists.map((playlist) => (
          <ListItemButton
            key={playlist.id}
            onClick={() => {
              if (playlist.id) {
                onSelect(playlist.id);
                onClose();
              }
            }}
          >
            <ListItemText primary={playlist.name} />
          </ListItemButton>
        ))}
      </List>
    </Popover>
  );
};

export default PlaylistSelectPopover;
