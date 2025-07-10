import { Card, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const getRandomColor = () => {
  const colors = [
    "#EF9A9A",
    "#CE93D8",
    "#90CAF9",
    "#A5D6A7",
    "#FFF59D",
    "#FFCC80",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== "bgcolor",
})<{ bgcolor: string }>(({ bgcolor }) => ({
  // height: 240,
  aspectRatio: "3 / 2",
  borderRadius: 16,
  padding: 16,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  color: "#fff",
  position: "relative",
  overflow: "hidden",
  backgroundColor: bgcolor,
}));

const CategoryImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "contain",
  opacity: 0.9,
  transform: "rotate(15deg)",
  transformOrigin: "bottom right",
});
const ImageWrapper = styled(Box)({
  position: "absolute",
  bottom: -18,
  right: 0,
  width: "50%",
  aspectRatio: "1/1",
  overflow: "visible",
});

const CategoryCard = ({ name, image }: { name: string; image: string }) => {
  const randomColor = getRandomColor();

  return (
    <StyledCard bgcolor={randomColor}>
      <Typography variant="h6" fontWeight={600}>
        {name}
      </Typography>
      <ImageWrapper>
        <CategoryImage src={image} alt={name} />
      </ImageWrapper>
    </StyledCard>
  );
};

export default CategoryCard;
