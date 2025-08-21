import { Suspense } from "react";
import NewReleases from "./components/NewReleases";
import Tracks from "./components/Tracks";
import LoadingSpinner from "../../common/components/LoadingSpinner";
import { Helmet } from "react-helmet";

const Homepage = () => {
  return (
    <div>
      <Helmet>
        <title>Spotify 클론 - 홈</title>
        <meta
          name="description"
          content="Spotify 클론에서 최신 앨범과 인기 트랙을 탐색하세요."
        />
        <meta property="og:title" content="Spotify 클론" />
        <meta
          property="og:image"
          content="https://lucky-buttercream-2b6ce4.netlify.app/spotify_logo.webp"
        />
      </Helmet>

      <Suspense fallback={<LoadingSpinner />}>
        <NewReleases />
        <Tracks />
      </Suspense>
    </div>
  );
};

export default Homepage;
