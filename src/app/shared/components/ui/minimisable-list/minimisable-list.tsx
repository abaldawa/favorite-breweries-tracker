/**
 * @author Abhijit Baldawa
 */

import React, { useLayoutEffect, useRef, useState } from "react";
import { useDetectOutsideClick } from "../../../hooks/use-detect-outside-click";
import * as S from "./minimisable-list.styles";

interface MinimisableListProps {
  renderSelectionText: () => JSX.Element;
  renderSelectionList: () => JSX.Element | JSX.Element[];
  children?: never;
}

const MinimisableList: React.FC<MinimisableListProps> = (props) => {
  const { renderSelectionText, renderSelectionList } = props;

  const checkboxRef = useRef<HTMLDivElement>();
  const selectionTextBoxRef = useRef<HTMLDivElement>();

  const [listBoxTopPosition, setListBoxTopPosition] = useState(0);

  const outsideClickDetected = useDetectOutsideClick(checkboxRef);

  const showSelectionList =
    typeof outsideClickDetected === "undefined" ? false : !outsideClickDetected;

  useLayoutEffect(() => {
    if (selectionTextBoxRef.current) {
      setListBoxTopPosition(selectionTextBoxRef.current.clientHeight);
    }
  }, []);

  return (
    <S.Container ref={checkboxRef}>
      <S.SelectionTextWrapper ref={selectionTextBoxRef}>
        {renderSelectionText()}
      </S.SelectionTextWrapper>
      {showSelectionList && (
        <S.List top={listBoxTopPosition}>{renderSelectionList()}</S.List>
      )}
    </S.Container>
  );
};

export { MinimisableList };
