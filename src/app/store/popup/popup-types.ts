/**
 * @author Abhijit Baldawa
 *
 * Types representing all possible types of supported popups details
 */

/**
 * Popup details common to all popups
 */
interface BasePopupDetails {
  /**
   * Title of the popup
   */
  title: string;

  /**
   * Whether the popup can be dismissed
   * by clicking outside the popup or not
   */
  dismissible: boolean;
}

/**
 * Popup to show API error details
 */
interface ApiErrorPopupDetails extends BasePopupDetails {
  type: "api-error";

  /**
   * Error received from the API
   */
  error: unknown;
  buttons: {
    confirm: {
      label: string;
    };
  };
}

/**
 * Popup to show any information/warning message
 */
interface InfoPopupDetails extends BasePopupDetails {
  type: "info";
  variant: "warning" | "success";
  description?: string;

  /**
   * Any detailed object describing
   * more detailed information
   */
  details?: Record<string, unknown>;
  buttons: {
    confirm: {
      label: string;
    };
  };
}

export type { ApiErrorPopupDetails, InfoPopupDetails };
