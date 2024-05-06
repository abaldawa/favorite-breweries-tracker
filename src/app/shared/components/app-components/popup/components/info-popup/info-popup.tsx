/**
 * @author Abhijit Baldawa
 */

import React from "react";
import { JSONTree } from "react-json-tree";
import { InfoPopupDetails } from "../../../../../../store/popup/popup-types";
import * as SCommonPopupComponents from "../common.styles";
import * as S from "./info-popup.styles";

interface InfoPopupProps extends InfoPopupDetails {
  onClose: () => void;
}

const InfoPopup: React.FC<InfoPopupProps> = (props) => {
  const { variant, title, description, details, onClose, buttons } = props;

  return (
    <SCommonPopupComponents.Container role="alert" aria-label="Info popup">
      <SCommonPopupComponents.Title
        color={variant === "warning" ? "#FF9800" : undefined}
      >
        {title}
      </SCommonPopupComponents.Title>

      {Boolean(description || details) && (
        <SCommonPopupComponents.BodyContainer>
          {!!description && (
            <SCommonPopupComponents.BodyText>
              {description}
            </SCommonPopupComponents.BodyText>
          )}
          {!!details &&
            typeof details === "object" &&
            !!Object.keys(details).length && (
              <S.DetailsWrapper>
                <JSONTree data={details} />
              </S.DetailsWrapper>
            )}
        </SCommonPopupComponents.BodyContainer>
      )}

      <SCommonPopupComponents.ConfirmButton
        onClick={() => {
          onClose();
        }}
      >
        {buttons.confirm.label}
      </SCommonPopupComponents.ConfirmButton>
    </SCommonPopupComponents.Container>
  );
};

export { InfoPopup };
