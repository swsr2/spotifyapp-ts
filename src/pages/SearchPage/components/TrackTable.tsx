import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  styled,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Track } from "../../../models/track";

const AddButtonWrapper = styled(Box)({
  opacity: 0,
  transition: "opacity 0.3s ease",
  cursor: "pointer",
  "&:hover": {
    opacity: 1,
  },
});

const HoverRow = styled(TableRow)({
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    "& .add-button": {
      opacity: 1,
    },
  },
});

const formatDuration = (ms?: number) => {
  if (typeof ms !== "number") return "-";
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

interface TrackTableProps {
  tracks: Track[];
  onAddClick: (e: React.MouseEvent<HTMLElement>, track: Track) => void;
}

const TrackTable = ({ tracks, onAddClick }: TrackTableProps) => {
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Songs
      </Typography>
      <Table sx={{ width: "100%" }}>
        <TableBody>
          {tracks.slice(0, 5).map((track, index) => (
            <HoverRow key={index} sx={{ height: 50 }}>
              <TableCell sx={{ width: 60, p: 1, pl: 1, borderBottom: "none" }}>
                <Box>
                  <Box
                    component="img"
                    src={track.album?.images[0]?.url}
                    alt="앨범 이미지"
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 1,
                      objectFit: "cover",
                    }}
                  />
                </Box>
              </TableCell>

              <TableCell
                sx={{ pl: 1, py: 0.5, borderBottom: "none", width: "100%" }}
              >
                <Typography variant="body2" fontWeight="bold" noWrap>
                  {track.name}
                </Typography>
                <Typography variant="caption" color="text.secondary" noWrap>
                  {track.artists?.map((a) => a.name).join(", ")}
                </Typography>
              </TableCell>

              <TableCell
                align="right"
                sx={{
                  px: 1,
                  py: 0.5,
                  borderBottom: "none",
                  whiteSpace: "nowrap",
                  position: "relative",
                }}
              >
                <AddButtonWrapper
                  className="add-button"
                  onClick={(e) => onAddClick(e, track)}
                >
                  <AddIcon sx={{ fontSize: 20 }} />
                </AddButtonWrapper>
              </TableCell>

              <TableCell
                align="right"
                sx={{ px: 1, py: 0.5, borderBottom: "none" }}
              >
                {formatDuration(track.duration_ms)}
              </TableCell>
            </HoverRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default TrackTable;
