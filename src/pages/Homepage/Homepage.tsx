import { Suspense } from "react";
import NewReleases from "./components/NewReleases";
import Tracks from "./components/Tracks";
import LoadingSpinner from "../../common/components/LoadingSpinner";

const Homepage = () => {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <NewReleases />
        <Tracks />
      </Suspense>
    </div>
  );
};

export default Homepage;
