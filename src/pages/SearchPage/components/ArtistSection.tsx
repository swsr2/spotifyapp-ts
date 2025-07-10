// ArtistSection.tsx

import { Box, Grid, Typography, styled } from "@mui/material";
import { SeveralArtistsResponse } from "../../../models/artist";
import PlayButton from "../../../common/components/PlayButton";

interface ArtistSectionProps {
  artists: SeveralArtistsResponse[];
}

const ArtistCardContainer = styled(Box)({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "16px",
  borderRadius: "12px",
  overflow: "hidden",
  cursor: "pointer",
  "&:hover .overlay": {
    opacity: 1,
  },
  "&:hover .play-button": {
    opacity: 1,
    transform: "translateY(0)",
  },
});

const Overlay = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  borderRadius: "12px",
  opacity: 0,
  pointerEvents: "none",
  transition: "opacity 0.3s ease-in-out",
  zIndex: 1,
});

const ArtistPlayButtonWrapper = styled(Box)({
  position: "absolute",
  bottom: 16,
  right: 16,
  opacity: 0,
  transition: "all 0.3s ease-in-out",
  zIndex: 2,
});

const ArtistSection = ({ artists }: ArtistSectionProps) => {
  return (
    <Box p={2}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Artists
      </Typography>
      <Grid container spacing={2}>
        {artists
          .filter((artist) => !!artist?.images?.[0])
          .slice(0, 6)
          .map((artist) => (
            <Grid size={{ xs: 6, sm: 4, md: 2 }} key={artist.id}>
              <ArtistCardContainer>
                <Overlay className="overlay" />
                <Box
                  component="img"
                  src={artist.images?.[0]?.url}
                  alt={artist.name}
                  sx={{
                    width: { xs: 80, sm: 100, md: 120 },
                    height: { xs: 80, sm: 100, md: 120 },
                    borderRadius: "50%",
                    objectFit: "cover",
                    zIndex: 0,
                  }}
                />
                <Typography
                  variant="body2"
                  align="center"
                  noWrap
                  sx={{ mt: 1, zIndex: 2 }}
                >
                  {artist.name}
                </Typography>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  noWrap
                  sx={{ zIndex: 2 }}
                >
                  Artist
                </Typography>
                <ArtistPlayButtonWrapper className="play-button">
                  <PlayButton />
                </ArtistPlayButtonWrapper>
              </ArtistCardContainer>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default ArtistSection;
