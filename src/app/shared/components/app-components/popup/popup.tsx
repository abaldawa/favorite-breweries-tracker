/**
 * @author Abhijit Baldawa
 */

import React from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import {
  PopupDetailsWithId,
  usePopupStore,
} from "../../../../store/popup/store";
import { ApiErrorPopup } from "./components/api-error-popup/api-error-popup";
import { InfoPopup } from "./components/info-popup/info-popup";

const Transition = React.forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
  ) => {
    return <Slide direction="up" ref={ref} {...props} />;
  }
);

/**
 * @public
 *
 * Central popup handler which listens for any popup data
 * added or removed from the popup store and displays/removes
 * those popup on the UI
 *
 * @returns
 */
const Popup: React.FC = () => {
  const { popups, dismissPopup } = usePopupStore((state) => ({
    popups: state.popups,
    showPopup: state.showPopup,
    dismissPopup: state.dismissPopup,
  }));

  const getPopup = (popupDetails: PopupDetailsWithId) => {
    switch (popupDetails.type) {
      case "api-error":
        return (
          <ApiErrorPopup
            {...popupDetails}
            onClose={() => dismissPopup(popupDetails.id)}
          />
        );
      case "info":
        return (
          <InfoPopup
            {...popupDetails}
            onClose={() => dismissPopup(popupDetails.id)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {popups.map((popupDetail) => (
        <Dialog
          key={popupDetail.id}
          open={true}
          TransitionComponent={Transition}
          keepMounted
          onClose={
            popupDetail.dismissible
              ? () => dismissPopup(popupDetail.id)
              : undefined
          }
        >
          {getPopup(popupDetail)}
        </Dialog>
      ))}
    </>
  );
};

export { Popup };
