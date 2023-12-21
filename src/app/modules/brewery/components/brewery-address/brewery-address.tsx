import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  SxProps,
  Typography,
} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import PhoneIcon from "@mui/icons-material/Phone";
import { Beer } from "../../../../shared/services/brewery/types";

interface BreweryAddressProps {
  beer: Beer;
  sx?: SxProps;
}

const BreweryAddress: React.FC<BreweryAddressProps> = (props) => {
  const { beer, sx } = props;

  return (
    <Card elevation={0} sx={sx}>
      <CardContent sx={{ padding: 0 }}>
        <Typography
          noWrap
          variant="caption"
          fontSize="1rem"
          sx={{ textDecoration: "underline" }}
        >
          Brewery Type - {beer.brewery_type}
        </Typography>
        <Typography noWrap variant="h6" fontSize="1rem">
          {beer.name}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {[
            beer.address_1,
            beer.address_2,
            beer.address_3,
            beer.postal_code,
            beer.city,
          ]
            .filter(Boolean)
            .join(", ")}
        </Typography>

        {/* <Typography variant="body2" color="text.secondary">
          {beer.postal_code}
        </Typography> */}
        <Typography variant="body2" color="text.secondary">
          {beer.state}, {beer.country}
        </Typography>
      </CardContent>
      {(!!beer.website_url || !!beer.phone) && (
        <CardActions>
          {!!beer.website_url && (
            <IconButton
              title="Website"
              onClick={() => window.open(beer.website_url!, "_blank")}
            >
              <LanguageIcon />
            </IconButton>
          )}
          {!!beer.phone && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <PhoneIcon /> {beer.phone}
            </Typography>
          )}
        </CardActions>
      )}
    </Card>
  );
};

export { BreweryAddress };
