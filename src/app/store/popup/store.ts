/**
 * @author Abhijit Baldawa
 *
 * Central store to manage adding/removing popups data.
 */

import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";
import { immer } from "zustand/middleware/immer";
import { ApiErrorPopupDetails, InfoPopupDetails } from "./popup-types";

type PopupDetails = ApiErrorPopupDetails | InfoPopupDetails;
type PopupDetailsWithId = PopupDetails & { id: string };

export interface PopupStore {
  popups: PopupDetailsWithId[];
  showPopup: (popupDetails: PopupDetails) => string;
  dismissPopup: (popupId: string) => void;
}

const usePopupStore = createWithEqualityFn<PopupStore>()(
  immer((set, get) => ({
    popups: [],
    showPopup: (popupDetails) => {
      const popupId = crypto.randomUUID();
      const popupDetailsWithId: PopupDetailsWithId = {
        ...popupDetails,
        id: popupId,
      };

      set((state) => void state.popups.push(popupDetailsWithId));

      return popupId;
    },

    dismissPopup: (popupId) => {
      const prevPopups = get().popups;
      const filteredPopups = prevPopups.filter(
        (prevPopup) => prevPopup.id !== popupId
      );

      set((state) => void (state.popups = filteredPopups));
    },
  })),
  shallow
);

export type { PopupDetailsWithId };
export { usePopupStore };
