import React, { useEffect, useState } from "react";
import { InputAdornment, TextField, Typography, Box } from "@mui/material";
import { Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import useSearchItemsByKeyword from "../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../models/search";
import LoadingSpinner from "../../common/components/LoadingSpinner";
import useGetCategory from "../../hooks/useGetCategory";
import CategoryCard from "./components/CategoryCard";
import SearchResultSection from "./components/SearchResultSection";
import { useNavigate, useParams } from "react-router";

const Searchpage = () => {
  const [keyword, setKeyword] = useState<string>("");
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams<{ keyword?: string }>();

  const accessToken = localStorage.getItem("access_token");
  const isLoggedIn = !!accessToken;
  // console.log(isLoggedIn);

  const {
    data: searchData,
    isLoading,
    isFetchingNextPage,
  } = useSearchItemsByKeyword({
    q: keyword,
    type: [SEARCH_TYPE.Track],
  });

  const isSearching = isLoading || isFetchingNextPage;
  const hasTyped = keyword.trim() !== "";

  const flatTrackList =
    searchData?.pages.flatMap((page) => page.tracks?.items ?? []) ?? [];

  const artistIds = [
    ...new Set(
      flatTrackList
        .flatMap((track) => track.artists?.map((a) => a.id) ?? [])
        .filter((id): id is string => !!id)
    ),
  ];
  const albumIds = [
    ...new Set(
      flatTrackList
        .map((track) => track.album?.id)
        .filter((id): id is string => !!id)
    ),
  ];

  const { data: categoryData, isLoading: isLoadingCategories } =
    useGetCategory();

  // console.log("서치데이터", flatTrackList);

  useEffect(() => {
    if (urlKeyword && keyword !== decodeURIComponent(urlKeyword)) {
      setKeyword(decodeURIComponent(urlKeyword));
    }
  }, [urlKeyword]);

  const handleSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newKeyword = e.target.value;
    setKeyword(newKeyword);

    if (newKeyword.trim() && newKeyword !== urlKeyword) {
      navigate(`/search/${encodeURIComponent(newKeyword.trim())}`);
    } else if (!newKeyword.trim()) {
      navigate("/search");
    }
  };

  return (
    <Box
      p={3}
      sx={{
        width: "100%",
        maxWidth: "1440px",
        margin: "0 auto",
        overflowX: "hidden",
      }}
    >
      <TextField
        value={keyword}
        onChange={handleSearchKeyword}
        placeholder="What do you want to play?"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "white" }} />
            </InputAdornment>
          ),
        }}
        sx={{
          width: {
            xs: "100%",
            sm: "400px",
            md: "500px",
          },
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#424242",
            borderRadius: "24px",
            color: "#fff",
          },
          marginBottom: "2rem",
        }}
      />

      {/* 로그인 안 됨 */}
      {!hasTyped && !isLoggedIn && (
        <Box textAlign="center" mt={4}>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            카테고리를 보려면 Spotify 로그인이 필요합니다.
          </Typography>
        </Box>
      )}

      {!hasTyped && isLoggedIn && (
        <>
          <Typography variant="h5" fontWeight={600} mb={2}>
            Browse All
          </Typography>
          {isLoadingCategories ? (
            <LoadingSpinner />
          ) : (
            <Box
              sx={{
                maxHeight: "72vh",
                overflowY: "auto",
                pr: 1,
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              <Grid container spacing={2}>
                {categoryData?.categories.items.map((category) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={category.id}>
                    <CategoryCard
                      name={category.name}
                      image={category.icons?.[0]?.url}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </>
      )}

      {/* 🔍 검색 중 */}
      {hasTyped && isSearching && <LoadingSpinner />}

      {/* 🔍 검색 결과 없음 */}
      {hasTyped && !isSearching && flatTrackList.length === 0 && (
        <Typography variant="h6" my={4}>
          No results for: <strong>{keyword}</strong>
        </Typography>
      )}

      {/* 🔍 검색 결과 있음 */}
      {hasTyped && flatTrackList.length >= 4 && (
        <SearchResultSection
          trackList={flatTrackList.filter((t) => !!t.id)}
          artistIds={artistIds}
          albumIds={albumIds}
        />
      )}
    </Box>
  );
};

export default Searchpage;
