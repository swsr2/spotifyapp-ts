// SearchResultSection.tsx

import { Grid } from "@mui/material";
import { Track } from "../../../models/track";
import { useArtistsByIds } from "../../../hooks/useArtists";
import { useAlbumsByIds } from "../../../hooks/useAlbums";
import { useState } from "react";
import { addItemsPlaylist } from "../../../apis/playlistApi";
import PlaylistSelectPopover from "./PlaylistSelectPopover";
import TopResult from "./TopResult";
import TrackTable from "./TrackTable";
import ArtistSection from "./ArtistSection";
import AlbumSection from "./AlbumSection";
import { getSpotifyAuthUrl } from "../../../utils/auth";

interface SearchResultSectionProps {
  trackList: Track[];
  artistIds: string[];
  albumIds: string[];
}

const SearchResultSection = ({
  trackList,
  artistIds,
  albumIds,
}: SearchResultSectionProps) => {
  const { data: artistsData } = useArtistsByIds(artistIds);
  const { data: albumsResponse } = useAlbumsByIds(albumIds);
  const albumsData = albumsResponse?.albums ?? [];

  const [popoverAnchor, setPopoverAnchor] = useState<HTMLElement | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

  const handlePopoverOpen = (
    e: React.MouseEvent<HTMLElement>,
    track: Track
  ) => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("로그인이 필요합니다.");
      getSpotifyAuthUrl();
      return;
    }
    setSelectedTrack(track);
    setPopoverAnchor(e.currentTarget);
  };

  const handlePopoverClose = () => {
    setPopoverAnchor(null);
  };

  const handleAddTrack = async (playlistId: string, trackUri: string) => {
    try {
      await addItemsPlaylist(playlistId, { uris: [trackUri] });
      alert("플레이리스트에 추가되었습니다.");
    } catch (error) {
      alert("추가 실패");
    }
  };

  if (trackList.length < 4) return null;

  const artistMap = new Map(
    artistsData?.map((artist) => [artist.id, artist]) ?? []
  );
  const albumMap = new Map(albumsData.map((album) => [album.id, album]));

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TopResult track={trackList[0]} />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TrackTable
          tracks={trackList.slice(0, 5)}
          onAddClick={handlePopoverOpen}
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        {" "}
        <ArtistSection artists={[...artistMap.values()]} />
      </Grid>
      <Grid size={{ xs: 12 }}>
        {" "}
        <AlbumSection albums={[...albumMap.values()]} />
      </Grid>

      {selectedTrack && (
        <PlaylistSelectPopover
          open={Boolean(popoverAnchor)}
          anchorEl={popoverAnchor}
          onClose={handlePopoverClose}
          onSelect={async (playlistId) => {
            if (!selectedTrack?.uri) return;
            await handleAddTrack(playlistId, selectedTrack.uri);
          }}
        />
      )}
    </Grid>
  );
};

export default SearchResultSection;
