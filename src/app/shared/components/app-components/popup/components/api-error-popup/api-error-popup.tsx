/**
 * @author Abhijit Baldawa
 */

import React, { useMemo } from "react";
import { JSONTree } from "react-json-tree";
import { ApiErrorPopupDetails } from "../../../../../../store/popup/popup-types";
import { getErrorDetails } from "../../../../../utilities/errors/error-handler";
import * as SCommonPopupComponents from "../common.styles";
import * as S from "./api-error-popup.styles";

interface ApiErrorPopupProps extends ApiErrorPopupDetails {
  onClose: () => void;
}

const ApiErrorPopup: React.FC<ApiErrorPopupProps> = (props) => {
  const { title, buttons, error, onClose } = props;

  const { errorMessage, details } = useMemo(
    () => getErrorDetails(error, "Error occurred"),
    [error]
  );

  return (
    <SCommonPopupComponents.Container role="alert" aria-label="Api error popup">
      <SCommonPopupComponents.Title color="red">
        {title}
      </SCommonPopupComponents.Title>
      <SCommonPopupComponents.BodyContainer>
        <S.BodyItemWrapper flexDirection="column">
          <S.BodyItemKey>Error message:</S.BodyItemKey>
          <S.BodyItemValue>{errorMessage}</S.BodyItemValue>
        </S.BodyItemWrapper>

        {!!details &&
          typeof details === "object" &&
          !!Object.keys(details).length && (
            <S.BodyItemWrapper flexDirection="column">
              <S.BodyItemKey>Error Details:</S.BodyItemKey>
              <S.BodyItemValue
                component="div"
                maxHeight={400}
                minWidth={500}
                overflow="scroll"
              >
                <JSONTree data={details} />
              </S.BodyItemValue>
            </S.BodyItemWrapper>
          )}
      </SCommonPopupComponents.BodyContainer>
      <SCommonPopupComponents.ConfirmButton onClick={onClose}>
        {buttons.confirm.label}
      </SCommonPopupComponents.ConfirmButton>
    </SCommonPopupComponents.Container>
  );
};

export { ApiErrorPopup };
