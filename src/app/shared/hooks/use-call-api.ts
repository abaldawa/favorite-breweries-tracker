/**
 * @author Abhijit Baldawa
 */

import { CanceledError } from "axios";
import { useEffect, useRef, useState } from "react";
import { usePopupStore } from "../../store/popup/store";

/**
 * @public
 *
 * Convenient central API handler which provides `error`, `loading`, `data`
 * and `completedTimestamp` properties by inferring types from the provided
 * api function to call.
 *
 * It also handles the api error and shows the error popup accordingly
 *
 * @param apiFunction - the api function to call
 * @returns
 */
const useCallApi = <ApiFunction extends (...args: any[]) => Promise<any>>(
  apiFunction: ApiFunction
) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Awaited<ReturnType<ApiFunction>>>();
  const [error, setError] = useState<unknown>();
  const [completedTimestamp, setCompletedTimestamp] = useState<Date>();

  const { showPopup } = usePopupStore((state) => ({
    showPopup: state.showPopup,
  }));

  const mountedRef = useRef<boolean>(true);

  useEffect(() => {
    mountedRef.current = true;

    return () => void (mountedRef.current = false);
  }, []);

  const callApi = async (
    errorHandling:
      | {
          apiErrorMessage: string;
          errorPopupDismissible: boolean;
        }
      | undefined,
    ...args: Parameters<ApiFunction>
  ): Promise<void> => {
    try {
      setLoading(true);
      setData(undefined);
      setError(undefined);
      setCompletedTimestamp(undefined);

      const data = await apiFunction(...args);

      if (mountedRef.current) {
        setData(data);
        setCompletedTimestamp(new Date());
      }
    } catch (error) {
      // Only handle the error if its not aborted
      if (mountedRef.current && !(error instanceof CanceledError)) {
        setError(error);

        if (errorHandling) {
          showPopup({
            type: "api-error",
            title: errorHandling.apiErrorMessage,
            dismissible: errorHandling.errorPopupDismissible,
            error,
            buttons: {
              confirm: {
                label: "OK",
              },
            },
          });
        } else {
          console.error(error);
        }
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  };

  return {
    loading,
    error,
    data,
    completedTimestamp,
    callApi,
  };
};

export { useCallApi };
