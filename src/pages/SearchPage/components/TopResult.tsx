import { Box, Typography } from "@mui/material";
import { Track } from "../../../models/track";

const TopResult = ({ track }: { track: Track }) => {
  return (
    <Box p={2}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Top Result
      </Typography>
      <Box
        component="img"
        src={track.album?.images[0]?.url}
        alt="앨범 이미지"
        sx={{
          width: 100,
          height: 100,
          objectFit: "cover",
          borderRadius: 1,
          marginBottom: 2,
        }}
      />
      <Typography variant="h6">{track.name}</Typography>
      <Typography variant="body2" color="textSecondary">
        {track.artists?.map((a) => a.name).join(", ")}
      </Typography>
    </Box>
  );
};

export default TopResult;
