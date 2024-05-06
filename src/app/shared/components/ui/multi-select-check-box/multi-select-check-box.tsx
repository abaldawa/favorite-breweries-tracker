/**
 * @author Abhijit Baldawa
 */

import React, { ChangeEvent, useState } from "react";
import { useEventCallback } from "../../../hooks/use-event-callback";
import { useDidUpdate } from "../../../hooks/use-did-update";
import { MinimisableList } from "../minimisable-list/minimisable-list";
import * as S from "./multi-select-check-box.styles";

interface MultiSelectCheckboxProps {
  values: string[];
  alwaysShowSelectionText?: boolean;
  selectedValues?: { [key: string]: string };
  selectionText: string;
  onSelectionChange: (
    newSelections: string[] | undefined,
    clearSelections: () => void
  ) => void;
}

export const MultiSelectCheckbox: React.FC<MultiSelectCheckboxProps> = ({
  values,
  selectedValues = {},
  selectionText,
  alwaysShowSelectionText,
  onSelectionChange,
}) => {
  const [selected, setSelected] = useState<{ [key: string]: string }>(
    selectedValues
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "checkbox") {
      const { checked: value, name } = e.target;

      if (value) {
        setSelected({ ...selected, [name]: name });
      } else {
        delete selected[name];
        setSelected({ ...selected });
      }
    }
  };

  const clearSelections = useEventCallback(() => {
    setSelected({});
  });

  useDidUpdate(() => {
    const selectedKeys = Object.keys(selected);

    if (selectedKeys.length) {
      const selectedKeysToUpdate = selectedKeys
        .filter((k) => values.includes(k))
        .reduce((acc, k) => {
          acc[k] = k;
          return acc;
        }, {} as Record<string, string>);

      setSelected(selectedKeysToUpdate);
    }
  }, [values]);

  useDidUpdate(() => {
    const newSelection = Object.values(selected);

    if (newSelection.length) {
      onSelectionChange(newSelection, clearSelections);
    } else {
      onSelectionChange(undefined, clearSelections);
    }
  }, [selected]);

  return (
    <MinimisableList
      renderSelectionText={() => {
        return (
          <>
            {Object.keys(selected).length > 0 && !alwaysShowSelectionText
              ? Object.values(selected).join(", ")
              : selectionText}
          </>
        );
      }}
      renderSelectionList={() => {
        return values.map((value) => {
          return (
            <S.ListItem key={value}>
              <label>
                <input
                  type="checkbox"
                  name={value}
                  checked={!!selected[value]}
                  onChange={handleInputChange}
                />
                {value}
              </label>
            </S.ListItem>
          );
        });
      }}
    />
  );
};
