import React, { useEffect, useState } from "react";
import EmptyPlaylist from "./EmptyPlaylist";
import useGetCurrentUserPlaylist from "../../hooks/useGetCurrentUserPlaylist";
import LoadingSpinner from "../../common/components/LoadingSpinner";
import ErrorMessage from "../../common/components/ErrorMessage";
import { useInView } from "react-intersection-observer";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import { useNavigate } from "react-router";
import { PAGE_LIMIT } from "../../configs/commonConfig";
import { styled } from "@mui/material";

const DEFAULT_ALBUM = "/music_album.webp?v=1";

interface PlaylistItemProps {
  selected?: boolean;
}

const HoverablePlaylistItem = styled("div", {
  shouldForwardProp: (prop) => prop !== "selected",
})<PlaylistItemProps>(({ theme, selected }) => ({
  display: "flex",
  alignItems: "center",
  margin: "20px 0",
  padding: "8px",
  borderRadius: "6px",
  cursor: "pointer",
  transition: "background-color 0.3s, color 0.3s",
  color: selected ? "#1ed760" : theme.palette.text.primary,
  "&:hover": {
    backgroundColor: "rgba(255,255,255,0.08)",
  },
}));

const Playlist = () => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { ref, inView } = useInView();
  const {
    data,
    isLoading,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetCurrentUserPlaylist({ limit: PAGE_LIMIT, offset: 0 });

  const { data: user } = useGetCurrentUserProfile();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (!user) return <EmptyPlaylist />;
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage errorMessage={error.message} />;

  const playlists = data?.pages.flatMap((page) => page.items) || [];

  return (
    <div
      style={{
        maxHeight: "100vh",
        overflowY: "auto",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      {playlists.length === 0 ? (
        <EmptyPlaylist />
      ) : (
        <>
          {playlists.map((playlist) => {
            const imageUrl = playlist.images?.[0]?.url || DEFAULT_ALBUM;
            const isSelected = selectedId === playlist.id;
            const handleClick = (id: string) => {
              setSelectedId(id);
              navigate(`/playlist/${id}`);
            };

            return (
              <HoverablePlaylistItem
                key={playlist.id}
                selected={isSelected}
                onClick={() => handleClick(playlist.id!)}
              >
                <img
                  src={imageUrl}
                  alt={playlist.name}
                  onError={(e) => {
                    e.currentTarget.src = DEFAULT_ALBUM;
                  }}
                  style={{
                    width: 40,
                    height: 40,
                    objectFit: "cover",
                    background: "gray",
                    marginRight: 8,
                    borderRadius: "8px",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <div>{playlist.name}</div>
                  <div>플레이리스트 {playlist.owner.display_name}</div>
                </div>
              </HoverablePlaylistItem>
            );
          })}
          <div ref={ref} style={{ height: "1px" }} />
          {isFetchingNextPage && <LoadingSpinner />}
        </>
      )}
    </div>
  );
};

export default Playlist;
