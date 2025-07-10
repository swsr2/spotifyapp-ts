import React from "react";
import { Typography } from "@mui/material";
import useGetNewReleases from "../../../hooks/useGetNewReleases";
import LoadingSpinner from "../../../common/components/LoadingSpinner";
import ErrorMessage from "../../../common/components/ErrorMessage";
import { Grid } from "@mui/material";
import CardComponent from "../../../common/components/CardComponent";

const NewReleases = () => {
  const { data, error } = useGetNewReleases();

  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }

  const albums = data?.albums.items.slice(0, 6);
  return (
    <>
      <Typography variant="h2" fontWeight={700}>
        New Released Albums
      </Typography>
      {albums && albums.length > 0 ? (
        <Grid container spacing={2}>
          {albums.map((album) => (
            <Grid key={album.id} size={{ xs: 6, sm: 4, md: 2 }}>
              <CardComponent
                image={album.images[0]?.url ?? ""}
                name={album.name}
                artistName={album.artists
                  .map((artist) => artist.name)
                  .join(", ")}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography></Typography>
      )}
    </>
  );
};

export default NewReleases;
