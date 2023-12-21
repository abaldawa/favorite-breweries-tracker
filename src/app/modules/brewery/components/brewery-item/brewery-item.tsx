/**
 * @author Abhijit Baldawa
 */

import React, { ComponentProps } from "react";
import * as S from "./brewery-item.styles";
import { Beer } from "../../../../shared/services/brewery/types";
import { Avatar } from "@mui/material";
import { SportsBar } from "@mui/icons-material";

type SearchedBeer = Pick<Beer, "name" | "brewery_type">;

interface BreweryItemProps extends SearchedBeer {
  showHoverEffect?: boolean;
  isHovered?: (isHovered: boolean) => void;
  onClick?: () => void | Promise<void>;
  renderBreweryActionItem?: () => React.ReactNode;
  sx?: ComponentProps<typeof S.Container>["sx"];
}

const BreweryItem: React.FC<BreweryItemProps> = (props) => {
  const {
    name,
    brewery_type,
    isHovered,
    onClick,
    showHoverEffect,
    renderBreweryActionItem,
    sx,
  } = props;

  return (
    <S.Container
      showHoverEffect={showHoverEffect}
      onMouseEnter={isHovered && (() => isHovered(true))}
      onMouseLeave={isHovered && (() => isHovered(false))}
      onClick={onClick && (() => onClick())}
      sx={sx}
    >
      <S.PosterWrapper>
        <Avatar>
          <SportsBar />
        </Avatar>
      </S.PosterWrapper>

      <S.BreweryDetailsWrapper>
        <S.BreweryName>{name}</S.BreweryName>
        <S.BreweryType>{brewery_type}</S.BreweryType>
      </S.BreweryDetailsWrapper>

      {renderBreweryActionItem?.()}
    </S.Container>
  );
};

export type { BreweryItemProps };
export { BreweryItem };
