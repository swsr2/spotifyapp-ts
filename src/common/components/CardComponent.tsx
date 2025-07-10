import { Card, CardMedia, Typography, Box, styled } from '@mui/material'
import PlayButton from './PlayButton'

const CardContainer = styled(Box)({
  position: 'relative',
  '&:hover .play-button': {
    opacity: 1,
    transform: 'translateY(-10px)',
  }
});

const PlayButtonWrapper = styled(Box)({
  position: 'absolute',
  right: 8,
  bottom: '0',
  transform: 'translateY(20%)',
  opacity: 0,
  transition: 'all 0.3s ease-in-out',
  zIndex: 1
});

interface CardProps {
  image: string
  name: string
  artistName: string | undefined
}

const CardComponent = ({image, name, artistName}: CardProps) => {
  return (
    <CardContainer>
      <Card sx={{ backgroundColor: 'black', boxShadow: 'none', marginTop: '10px', position: 'relative' }}>
        <Box sx={{ position: 'relative' }}>
          <CardMedia component="img" image={image} alt={name} />
          <PlayButtonWrapper className="play-button">
            <PlayButton />
          </PlayButtonWrapper>
        </Box>
        <Typography sx={{
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: '100%',
        display: 'block'
      }}>
        {name}
          </Typography>
        <Typography sx={{fontSize: '12px', color: 'gray'}}>{artistName}</Typography>
      </Card>
    </CardContainer>
  )
}

export default CardComponent
