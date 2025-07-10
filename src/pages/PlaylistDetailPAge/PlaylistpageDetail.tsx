import React, { useEffect } from "react";
import { useParams } from "react-router";
import {
  Box,
  Typography,
  Avatar,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  styled,
} from "@mui/material";
import { useInView } from "react-intersection-observer";
import { isAxiosError } from "axios";

import useGetPlaylist from "../../hooks/useGetPlaylist";
import useGetPlaylistItems from "../../hooks/useGetPlaylistItems";

import LoadingSpinner from "../../common/components/LoadingSpinner";
import ErrorMessage from "../../common/components/ErrorMessage";
import { PAGE_LIMIT } from "../../configs/commonConfig";
import useRequireAuth from "../hooks/RequireAuth"; // ✅ 커스텀 인증 훅
import EmptyPlaylistWithSearch from "./components/EmptyPlaylistWithSearch";
import DesktopPlaylistItem from "./components/DesktopPlaylistItem";

const DEFAULT_ALBUM = "/music_album.webp";

const ResponsiveAlbumImage = styled(Avatar)(({ theme }) => ({
  borderRadius:
    typeof theme.shape.borderRadius === "number"
      ? theme.shape.borderRadius * 2
      : parseInt(theme.shape.borderRadius, 10) * 2,
  width: 200,
  height: 200,
  background: "gray",
  [theme.breakpoints.down("md")]: { width: 140, height: 140 },
  [theme.breakpoints.down("sm")]: { width: 120, height: 120 },
}));

const getStatusCode = (error: unknown): number | null =>
  isAxiosError(error) && error.response?.status ? error.response.status : null;

const PlaylistpageDetail = () => {
  const { id } = useParams<{ id: string }>();
  const playlistId = id ?? "";
  const authStatus = useRequireAuth();
  const { ref, inView } = useInView();

  // API 호출
  const {
    data: playlist,
    isLoading,
    error: playlistError,
  } = useGetPlaylist({ playlist_id: playlistId });

  const {
    data: playlistItems,
    error: playlistItemsError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetPlaylistItems({ playlist_id: playlistId });

  // 기타 에러
  const hasOtherError =
    (playlistError && getStatusCode(playlistError) !== 401) ||
    (playlistItemsError && getStatusCode(playlistItemsError) !== 401);

  // 무한 스크롤
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 인증 흐름 처리
  if (authStatus === "redirect" || authStatus === "unauthorized") return null;

  if (isLoading) return <LoadingSpinner />;
  if (hasOtherError)
    return (
      <ErrorMessage errorMessage="플레이리스트를 불러오는 데 실패했습니다." />
    );
  if (!playlist?.name)
    return <ErrorMessage errorMessage="잘못된 플레이리스트입니다." />;

  const imageUrl = playlist.images?.[0]?.url || DEFAULT_ALBUM;

  return (
    <div>
      <Box gap={4}>
        <Box
          display="flex"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
          gap={4}
          sx={{ pl: 1.5 }}
        >
          <ResponsiveAlbumImage
            variant="square"
            style={{ background: "gray", borderRadius: "8px" }}
            src={imageUrl}
            alt={playlist.name}
          />
          <Box
            sx={{
              mt: { xs: 2, sm: 0 },
              textAlign: "left",
              width: "100%",
            }}
          >
            <Typography variant="h1" fontSize={28} fontWeight={600}>
              {playlist.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" mt={1}>
              by {playlist.owner.display_name}
            </Typography>
            {playlist.description && (
              <Typography mt={2} variant="body1" color="text.primary">
                {playlist.description}
              </Typography>
            )}
            <Typography mt={2} variant="body2" color="text.secondary">
              곡 수: {playlist.tracks?.total ?? 0}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          maxHeight: "520px",
          overflowY: "scroll",
          "::-webkit-scrollbar": { display: "none" },
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {playlist?.tracks?.total === 0 ? (
          <EmptyPlaylistWithSearch />
        ) : (
          <Table stickyHeader sx={{ backgroundColor: "background.paper" }}>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Album</TableCell>
                <TableCell>Date added</TableCell>
                <TableCell>Duration</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {playlistItems?.pages.flatMap((page, pageIndex) =>
                page.items.map((item, itemIndex) => (
                  <DesktopPlaylistItem
                    key={item.track.id + "_" + itemIndex}
                    item={item}
                    index={pageIndex * PAGE_LIMIT + itemIndex + 1}
                  />
                ))
              )}
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
        )}
      </Box>
    </div>
  );
};

export default PlaylistpageDetail;
