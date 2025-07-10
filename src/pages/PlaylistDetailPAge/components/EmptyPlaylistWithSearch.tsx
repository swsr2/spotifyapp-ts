import { InputAdornment, TextField, Typography } from "@mui/material"
import { useState } from "react"
import useSearchItemsByKeyword from "../../../hooks/useSearchItemsByKeyword"
import { SEARCH_TYPE } from "../../../models/search"
import SearchResultList from "./SearchResultList"
import LoadingSpinner from "../../../common/components/LoadingSpinner"
import SearchIcon from "@mui/icons-material/Search";


const EmptyPlaylistWithSearch = ()=>{
    const handleSearchKeyword = (event:React.ChangeEvent<HTMLInputElement>)=>{
        setKeyword(event.target.value)
    }
    const [ keyword, setKeyword] = useState<string>("")

    const {data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading} = useSearchItemsByKeyword({
        q:keyword,
        type:[SEARCH_TYPE.Track]
    })

    const flatTrackList = data?.pages.flatMap(page => page.tracks?.items ?? []) ?? [];

    const isSearching = isLoading || isFetchingNextPage
    const hasTyped = keyword.trim() !== ""


    return (
        <div>
            <Typography variant="h1" my="10px">
                Let's find somthing for your playlist
            </Typography>
            <TextField  value={keyword} onChange={handleSearchKeyword} placeholder="Search for tracks..."  InputProps={{
            startAdornment: (
            <InputAdornment position="start">
                <SearchIcon />
            </InputAdornment>
            ),
        }}
        sx={{
            width: {
                xs: '100%',   
                sm: '400px',  
                md: '500px',  
            },
            }}

        />
             {/* 검색어 없음 */}
            {!hasTyped && <></>}

            {/* 검색 중 */}
            {hasTyped && isSearching && <LoadingSpinner />}

            {/* 검색 완료 but 결과 없음 */}
            {hasTyped && !isSearching && flatTrackList.length === 0 && (
            <Typography variant="h6" my="20px">
                No results for: <strong>{keyword}</strong>
            </Typography>
            )}

            {/* 검색 결과 있음 */}
            {flatTrackList.length > 0 && (
            <SearchResultList
                list={flatTrackList}
                fetchNextPage={fetchNextPage}
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
            />
            )}
        </div>
    )
}

export default EmptyPlaylistWithSearch