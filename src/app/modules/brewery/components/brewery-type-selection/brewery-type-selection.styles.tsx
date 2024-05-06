import { Select, styled } from "@mui/material";
import type { SelectedBreweryType } from "./brewery-type-selection";

const BootstrapSelect = styled(Select<SelectedBreweryType>)(({ theme }) => ({
  height: "1.4rem",
  border: "1px solid rgb(118, 118, 118)",
  "& .MuiOutlinedInput-notchedOutline": {
    border: 0,
  },
}));

export { BootstrapSelect };
