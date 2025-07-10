import { styled, TableCell, TableRow } from "@mui/material"
import { Episode, Track } from "../../../models/track";
import { PlaylistTrack } from "../../../models/playlist";


interface DesktopPlaylistItemProps{
    index:number
    item:PlaylistTrack

}
const HoverableRow = styled(TableRow)(({ theme }) => ({
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.08)',
    },
    '& td': {
      borderBottom: 'none',
    },
  }));

  
const DesktopPlaylistItem = ({item, index}:DesktopPlaylistItemProps)=>{
    // 타입 좁히기
    const isEpisode = (track:Track|Episode):track is Episode => {
        return "description" in track 
    }

    // 날짜 포맷팅 (YYYY-MM-DD)
    const formattedDate = item.added_at
    ? new Date(item.added_at).toISOString().split("T")[0]
    : "Unknown";
    // 시간 포맷팅
    const formatDuration = (ms: number | undefined) => {
        if (ms === undefined) return "Unknown";
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
      };

    return <HoverableRow >
        <TableCell>{index}</TableCell>
        <TableCell>{item.track.name || 'No name'}</TableCell>
        <TableCell>{isEpisode(item.track)?'N/A':item.track.album?.name}</TableCell>
        <TableCell>{formattedDate || 'Unknown'}</TableCell>
        <TableCell>{formatDuration(item.track.duration_ms) || 'Unknown'}</TableCell>
    </HoverableRow>
}

export default DesktopPlaylistItem