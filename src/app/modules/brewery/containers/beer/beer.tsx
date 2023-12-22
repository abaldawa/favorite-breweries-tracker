import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FullscreenControl,
  GeolocateControl,
  Map,
  Marker,
  NavigationControl,
  Popup,
  ScaleControl,
  ViewState,
} from "react-map-gl";
import { Typography } from "@mui/material";
import { useCallApi } from "../../../../shared/hooks/use-call-api";
import { getBeer } from "../../../../shared/services/brewery/api";
import { BreweryAddress } from "../../components/brewery-address/brewery-address";
import { MapMarkerPin } from "../../components/map-marker-pin/map-market-pin";
import { getEnvironmentVariables } from "../../../../config/env";
import { usePopupStore } from "../../../../store/popup/store";
import { Loading } from "../../../../shared/components/app-components/loading/loading";
import "mapbox-gl/dist/mapbox-gl.css";

const Beer = () => {
  const { id } = useParams<{ id: string }>();

  const [viewport, setViewport] = useState<ViewState>();
  const [showAddressOnMap, setShowAddressOnMap] = useState<boolean>(true);

  const beer = useCallApi(getBeer);

  const { showPopup } = usePopupStore((state) => ({
    showPopup: state.showPopup,
  }));

  const envVariables = useMemo(() => {
    try {
      return getEnvironmentVariables();
    } catch (error: unknown) {
      showPopup({
        type: "api-error",
        title: "Improper environment variables",
        dismissible: true,
        error: error,
        buttons: {
          confirm: {
            label: "OK",
          },
        },
      });
    }
  }, []);

  useEffect(() => {
    if (id) {
      beer.callApi(
        {
          apiErrorMessage: `Error fetching beerId = '${id}' from server`,
          errorPopupDismissible: true,
        },
        id
      );
    }
  }, [id]);

  if (!envVariables?.REACT_APP_MAPBOX_ACCESS_TOKEN) {
    return null;
  }

  if (beer.loading) {
    return <Loading />;
  }

  return (
    <article>
      <section>
        <main
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          {!!beer.data?.latitude && !!beer.data.longitude ? (
            <>
              <Typography variant="h5">{beer.data.name}</Typography>
              <Map
                mapboxAccessToken={envVariables.REACT_APP_MAPBOX_ACCESS_TOKEN}
                mapStyle="mapbox://styles/mapbox/streets-v12"
                initialViewState={{
                  latitude: +beer.data.latitude,
                  longitude: +beer.data?.longitude,
                  zoom: 3.5,
                  bearing: 0,
                  pitch: 0,
                }}
                onMove={(evt) => setViewport(evt.viewState)}
                latitude={viewport?.latitude ?? +beer.data.latitude}
                longitude={viewport?.longitude ?? +beer.data?.longitude}
                style={{ width: 800, height: 500 }}
              >
                <GeolocateControl position="top-left" />
                <FullscreenControl position="top-left" />
                <NavigationControl position="top-left" />
                <ScaleControl />

                <Marker
                  longitude={+beer.data.longitude}
                  latitude={+beer.data.latitude}
                  anchor="bottom"
                  onClick={(e) => {
                    /**
                     * handle this or else the map will handle it and close
                     * the popup immediately if we don't stop the event from
                     * propagating
                     */
                    e.originalEvent.stopPropagation();
                    setShowAddressOnMap(true);
                  }}
                >
                  <MapMarkerPin />
                </Marker>

                {showAddressOnMap && (
                  <Popup
                    anchor="top"
                    longitude={+beer.data.longitude}
                    latitude={+beer.data.latitude}
                    onClose={() => setShowAddressOnMap(false)}
                  >
                    <BreweryAddress beer={beer.data} />
                  </Popup>
                )}
              </Map>
            </>
          ) : (
            !!beer.data && (
              <>
                <Typography variant="subtitle1">
                  Oops...no geo coordinates available but below is the address
                </Typography>
                <BreweryAddress
                  beer={beer.data}
                  sx={{ padding: "1rem", alignSelf: "flex-start" }}
                />
              </>
            )
          )}
        </main>
      </section>
    </article>
  );
};

export { Beer };
