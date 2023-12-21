/**
 * @author Abhijit Baldawa
 */

import { Box, Typography, styled } from "@mui/material";
import type { BreweryItemProps } from "./brewery-item";

const Container = styled(Box, {
  shouldForwardProp: (prop) => prop !== "showHoverEffect",
})<Pick<BreweryItemProps, "showHoverEffect">>(({ showHoverEffect }) => ({
  display: "flex",
  alignItems: "center",
  gap: "1.25rem",
  borderRadius: "0.5rem",
  cursor: `pointer`,
  ...(showHoverEffect && {
    "&:hover": {
      backgroundColor: "#F5FAFF",
    },
  }),
}));

Container.defaultProps = {
  component: "article",
};

const PosterWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "2rem",
  height: "3rem",
  flexShrink: 0,
});

const NoPosterAvailable = styled(Box)({
  backgroundColor: "#706c6c",
  color: "#fff",
  flexGrow: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "0.6rem",
});

const Poster = styled("img")({
  flexGrow: 1,
  height: "100%",
  objectFit: "cover",
});

const BreweryDetailsWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
});

const BreweryName = styled(Typography)({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  fontSize: "1rem",
});

BreweryName.defaultProps = {
  variant: "h6",
};

const BreweryDescription = styled(Typography)({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

BreweryDescription.defaultProps = {
  variant: "subtitle1",
};

export {
  Container,
  PosterWrapper,
  NoPosterAvailable,
  Poster,
  BreweryDetailsWrapper,
  BreweryName,
  BreweryDescription,
};
