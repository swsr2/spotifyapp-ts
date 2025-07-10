// AlbumSection.tsx

import { Box, Grid, Typography } from "@mui/material";
import { FullAlbum } from "../../../models/album";

interface AlbumSectionProps {
  albums: FullAlbum[];
}

const AlbumSection = ({ albums }: AlbumSectionProps) => {
  return (
    <Box p={2}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Albums
      </Typography>
      <Grid container spacing={2}>
        {albums
          .filter((album) => !!album.images?.[0])
          .slice(0, 6)
          .map((album) => (
            <Grid size={{ xs: 6, sm: 4, md: 2 }} key={album.id}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Box
                  component="img"
                  src={album.images[0].url}
                  alt={album.name}
                  sx={{
                    width: { xs: 80, sm: 100, md: 120 },
                    height: { xs: 80, sm: 100, md: 120 },
                    borderRadius: 1,
                    objectFit: "cover",
                    mb: 1,
                  }}
                />
                <Typography
                  variant="body2"
                  noWrap
                  sx={{
                    maxWidth: { xs: 80, sm: 100, md: 120 },
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {album.name}
                </Typography>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  noWrap
                  sx={{
                    maxWidth: { xs: 80, sm: 100, md: 120 },
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {album.artists.map((a) => a.name).join(", ")}
                </Typography>
              </Box>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default AlbumSection;
