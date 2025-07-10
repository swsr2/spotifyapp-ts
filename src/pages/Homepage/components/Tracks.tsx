import React from "react";
import { Typography, Grid } from "@mui/material";
import useGetNewReleases from "../../../hooks/useGetNewReleases";
import LoadingSpinner from "../../../common/components/LoadingSpinner";
import ErrorMessage from "../../../common/components/ErrorMessage";
import CardComponent from "../../../common/components/CardComponent";

const Tracks = () => {
  const { data: newReleases, isLoading, error } = useGetNewReleases();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage errorMessage={error.message} />;

  const albums = newReleases?.albums.items.slice(6, 12) ?? [];

  return (
    <>
      <Typography variant="h2" fontWeight={700} marginTop={6}>
        Tracks
      </Typography>
      {albums.length > 0 ? (
        <Grid container spacing={2}>
          {albums.map((album) => (
            <Grid key={album.id} size={{ xs: 6, sm: 4, md: 2 }}>
              <CardComponent
                image={album.images[0]?.url ?? ""}
                name={album.name}
                artistName={album.artists.map((a) => a.name).join(", ")}
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

export default Tracks;
