/**
 * @author Abhijit Baldawa
 */

import {
  Box,
  Button,
  DialogContent,
  DialogContentText,
  DialogTitle,
  styled,
} from "@mui/material";

const Container = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  padding: "1.5rem",
  gap: "1rem",
}));

Container.defaultProps = {
  component: "article",
};

const Title = styled(DialogTitle)(() => ({
  padding: 0,
  margin: 0,
  lineHeight: "unset",
}));

const BodyContainer = styled(DialogContent)(() => ({
  margin: 0,
  padding: 0,
  display: "flex",
  flexDirection: "column",
  gap: "5px",
}));

const BodyText = styled(DialogContentText)(() => ({
  lineHeight: "unset",
}));

const ConfirmButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

ConfirmButton.defaultProps = {
  disableRipple: true,
  disableFocusRipple: true,
  disableElevation: true,
  variant: "contained",
  size: "medium",
};

export { Container, Title, BodyContainer, BodyText, ConfirmButton };
