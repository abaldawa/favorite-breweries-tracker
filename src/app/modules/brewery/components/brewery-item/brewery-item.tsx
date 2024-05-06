/**
 * @author Abhijit Baldawa
 */

import React, { ComponentProps } from "react";
import * as S from "./brewery-item.styles";
import { Beer } from "../../../../shared/services/brewery/types";
import { Avatar } from "@mui/material";
import { SportsBar } from "@mui/icons-material";

type SearchedBeer = Pick<Beer, "name" | "brewery_type" | "country">;

interface BreweryItemProps extends SearchedBeer {
  showHoverEffect?: boolean;
  disabled?: boolean;
  isHovered?: (isHovered: boolean) => void;
  onClick?: () => void | Promise<void>;
  renderBreweryActionItem?: () => React.ReactNode;
  sx?: ComponentProps<typeof S.Container>["sx"];
}

const BreweryItem: React.FC<BreweryItemProps> = (props) => {
  const {
    name,
    brewery_type,
    country,
    disabled,
    isHovered,
    onClick,
    showHoverEffect,
    renderBreweryActionItem,
    sx,
  } = props;

  return (
    <S.Container
      disabled={disabled}
      showHoverEffect={showHoverEffect}
      onMouseEnter={isHovered && (() => isHovered(true))}
      onMouseLeave={isHovered && (() => isHovered(false))}
      onClick={!disabled ? onClick && (() => onClick()) : undefined}
      sx={sx}
    >
      <S.PosterWrapper>
        <Avatar>
          <SportsBar />
        </Avatar>
      </S.PosterWrapper>

      <S.BreweryDetailsWrapper>
        <S.BreweryName>{name}</S.BreweryName>
        <S.BreweryDescription>
          {brewery_type}{" "}
          <span style={{ textDecoration: "underline" }}>({country})</span>
        </S.BreweryDescription>
      </S.BreweryDetailsWrapper>

      {!disabled && renderBreweryActionItem?.()}
    </S.Container>
  );
};

export type { BreweryItemProps };
export { BreweryItem };
