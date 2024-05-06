import { FormControl, MenuItem } from "@mui/material";
import React, { useState } from "react";
import {
  breweryTypes as fullBreweryTypes,
  BreweryType,
} from "../../../../shared/services/brewery/types";
import { useEventCallback } from "../../../../shared/hooks/use-event-callback";
import * as S from "./brewery-type-selection.styles";

/**
 * There is a bug in @see openbrewerydb backend API i.e.
 * 'taproom' exists in the backend but throws error if you
 * use it as a selection for filtering. Hence removing it
 * from the selection possibilities
 */
const breweryTypesToExcludeFromSelection = [
  "taproom",
] as const satisfies readonly BreweryType[];

type SelectableBreweryType = Exclude<
  BreweryType,
  (typeof breweryTypesToExcludeFromSelection)[number]
>;

const selectableBreweryTypes = fullBreweryTypes.filter(
  (breweryType) =>
    /**
     * Using `breweryType` as `any` due to how `Array.includes` TS type
     * method is written. It ONLY accepts the elements in the array
     * when it should accept any searchElement to check whether they
     *  are present in the array
     */
    !breweryTypesToExcludeFromSelection.includes(breweryType as any)
) as SelectableBreweryType[];

interface BreweryTypeSelectionProps {
  onSelectionChange: (
    newSelection: SelectableBreweryType | undefined,
    clearSelections: () => void
  ) => void;
  children?: never;
}

type SelectedBreweryType = SelectableBreweryType | "";

const BreweryTypeSelection: React.FC<BreweryTypeSelectionProps> = (props) => {
  const { onSelectionChange } = props;

  const [selectedBreweryType, setSelectedBreweryType] =
    useState<SelectedBreweryType>("");

  const clearSelection = useEventCallback(() => {
    updateBreweryTypeSelection("");
  });

  const updateBreweryTypeSelection = (
    newBreweryTypeSelection: SelectedBreweryType
  ) => {
    setSelectedBreweryType(newBreweryTypeSelection);
    onSelectionChange(
      newBreweryTypeSelection ? newBreweryTypeSelection : undefined,
      clearSelection
    );
  };

  return (
    <FormControl
      sx={{
        minWidth: 120,
        bgcolor: "white",
        padding: 0,
      }}
      size="small"
    >
      <S.BootstrapSelect
        value={selectedBreweryType}
        onChange={(e) =>
          updateBreweryTypeSelection(e.target.value as SelectedBreweryType)
        }
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {selectableBreweryTypes.map((breweryType) => (
          <MenuItem key={breweryType} value={breweryType}>
            {breweryType}
          </MenuItem>
        ))}
      </S.BootstrapSelect>
    </FormControl>
  );
};

export type { SelectedBreweryType };
export { BreweryTypeSelection };
