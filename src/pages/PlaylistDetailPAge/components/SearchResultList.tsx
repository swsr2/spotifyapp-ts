import {
  Box,
  Typography,
  Avatar,
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Snackbar,
} from "@mui/material";
import { Track } from "../../../models/track";
import { useInView } from "react-intersection-observer";
import { use, useEffect, useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import LoadingSpinner from "../../../common/components/LoadingSpinner";
import useAddItemsPlaylist from "../../../hooks/useAddItemsPlaylist";
import useGetPlaylist from "../../../hooks/useGetPlaylist";
import { useParams } from "react-router";
import { useQueryClient } from "@tanstack/react-query";

interface SearchResultListProps {
  list: Track[];
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
}

const SearchResultList = ({
  list,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: SearchResultListProps) => {
  const { ref, inView } = useInView();
  const { mutate: addTrackToPlaylist } = useAddItemsPlaylist();
  const { id: playlistId } = useParams<{ id: string }>();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const queryClient = useQueryClient();
  const [pendingPlaylistId, setPendingPlaylistId] = useState<string | null>(
    null
  );
  // console.log('아이디 있냐',playlistId)

  const handlePlaylistAddClick = (trackUri: string) => {
    if (!playlistId) return; // 방어 코드

    addTrackToPlaylist(
      {
        playlistId,
        params: {
          uris: [trackUri],
          position: 0,
        },
      },
      {
        onSuccess: () => {
          setSnackbarOpen(true);
          setPendingPlaylistId(playlistId);
        },
      }
    );
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);

    if (pendingPlaylistId) {
      queryClient.refetchQueries({
        queryKey: ["playlist-detail", pendingPlaylistId],
      });
      queryClient.refetchQueries({
        queryKey: ["playlist-items", pendingPlaylistId],
      });
      setPendingPlaylistId(null); // cleanup
    }
  };

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage?.();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  console.log("searchlist", list);
  if (list.length === 0) return null;

  return (
    <Box>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>앨범</TableCell>
            <TableCell>제목</TableCell>
            <TableCell>아티스트</TableCell>
            <TableCell align="center">플레이리스트</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((track) => (
            <TableRow key={track.id} hover>
              <TableCell sx={{ borderBottom: "none" }}>
                {/* <Avatar
                  src={track.album?.images?.[0]?.url}
                  alt={track.name}
                  variant="square"
                  sx={{ width: 50, height: 50, borderRadius: 1 }}
                  loading="lazy"
                /> */}
                <img
                  src={track.album?.images?.[0]?.url}
                  alt={track.name}
                  width={50}
                  height={50}
                  loading="lazy"
                  style={{
                    objectFit: "cover",
                    borderRadius: 8,
                    background: "gray",
                  }}
                />
              </TableCell>
              <TableCell sx={{ borderBottom: "none" }}>
                <Typography fontWeight={600}>{track.name}</Typography>
              </TableCell>
              <TableCell sx={{ borderBottom: "none" }}>
                {track.artists?.map((artist) => artist.name).join(", ")}
              </TableCell>

              <TableCell align="center" sx={{ borderBottom: "none" }}>
                <Button
                  size="small"
                  color="secondary"
                  onClick={() => track.uri && handlePlaylistAddClick(track.uri)}
                >
                  <PlaylistAddIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}

          {/* 무한 스크롤 트리거 */}
          <TableRow>
            <TableCell colSpan={5} sx={{ borderBottom: "none" }}>
              <div ref={ref} style={{ height: "1px" }} />
            </TableCell>
          </TableRow>

          {isFetchingNextPage && (
            <TableRow>
              <TableCell colSpan={5} sx={{ borderBottom: "none" }}>
                <LoadingSpinner />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        message="플레이 리스트에 저장되었습니다!"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Box>
  );
};

export default SearchResultList;
