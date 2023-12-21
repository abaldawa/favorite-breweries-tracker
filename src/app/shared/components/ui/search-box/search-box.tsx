/**
 * @author Abhijit Baldawa
 */

import React, { useLayoutEffect, useRef, useState } from "react";
import { useDetectOutsideClick } from "../../../hooks/use-detect-outside-click";
import { SxProps } from "@mui/material";
import * as S from "./search-box.styles";

interface SearchBoxProps {
  placeholder?: string;
  startAdornment?: React.ReactNode;
  sx?: SxProps;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  renderSearchResults: () => React.ReactNode;
}

const SearchBox: React.FC<SearchBoxProps> = (props) => {
  const {
    startAdornment,
    placeholder,
    value,
    sx,
    onChange,
    renderSearchResults,
  } = props;

  // Used to position search results container below search input
  const [
    searchResultContainerTopPosition,
    setSearchResultContainerTopPosition,
  ] = useState(0);

  // Used to decide whether to show/hide search results container
  const containerRef = useRef<HTMLElement>();
  const userClickedOutsideSearchboxContainer =
    useDetectOutsideClick(containerRef);

  // If the user is typing then we want to show search results container
  const [searchInputFocused, setSearchInputFocused] = useState<boolean>();

  // Used to calculate the position of search results container below search input
  const inputSearchContainerRef = useRef<HTMLElement>(null);
  const searchResults = renderSearchResults();

  /**
   * Search result container is ONLY displayed if the
   * search results are available and user is focused
   * on search box or user is clicking inside the entire
   * search box
   */
  const searchResultsDisplayed =
    Boolean(searchResults) &&
    (!userClickedOutsideSearchboxContainer || searchInputFocused);

  useLayoutEffect(() => {
    setSearchResultContainerTopPosition(
      inputSearchContainerRef.current?.getBoundingClientRect().height ?? 0
    );
  }, []);

  return (
    <S.Container ref={containerRef} sx={sx}>
      <S.InputSearchContainer
        ref={inputSearchContainerRef}
        searchResultDisplayed={searchResultsDisplayed}
      >
        {startAdornment}
        <S.Input
          type="search"
          onFocus={() => setSearchInputFocused(true)}
          onBlur={() => setSearchInputFocused(false)}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </S.InputSearchContainer>
      {searchResultsDisplayed && (
        <S.SearchResultsWrapper top={`${searchResultContainerTopPosition}px`}>
          {searchResults}
        </S.SearchResultsWrapper>
      )}
    </S.Container>
  );
};

export { SearchBox };
