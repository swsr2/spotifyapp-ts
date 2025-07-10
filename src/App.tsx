import "./App.css";
import { Route, Routes } from "react-router";
import React, { Suspense, useEffect } from "react";
import LoadingSpinner from "./common/components/LoadingSpinner";
import useExchangeToken from "./hooks/useExchangeToken";

// lazy loading - 레이지 로딩 기법 사용 (번들사이즈 감소, 초기 로딩 시간 감소)
const AppLayout = React.lazy(() => import("./Layout/AppLayout"));
const Homepage = React.lazy(() => import("./pages/Homepage/Homepage"));
const Searchpage = React.lazy(() => import("./pages/SearchPage/Searchpage"));
const PlaylistpageDetail = React.lazy(
  () => import("./pages/PlaylistDetailPAge/PlaylistpageDetail")
);
const Playlistpage = React.lazy(() => import("./pages/Playlistpage"));

function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  const codeVerifier = localStorage.getItem("code_verifier");

  const { mutate: exchangeToken } = useExchangeToken();

  useEffect(() => {
    if (code && codeVerifier) {
      exchangeToken({ code, codeVerifier });
    }
    window.history.replaceState({}, document.title, "/");
  }, [code, codeVerifier, exchangeToken]);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Homepage />} />
          <Route path="/search" element={<Searchpage />} />
          <Route path="/search/:keyword" element={<Searchpage />} />
          <Route path="playlist/:id" element={<PlaylistpageDetail />} />
          <Route path="playlist" element={<Playlistpage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
