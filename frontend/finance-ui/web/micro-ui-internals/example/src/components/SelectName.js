import React from "react";
import { FormStep } from "@mcd89/finance-ui-react-components";

const SelectName = ({ config, onSelect, onSkip, t }) => {
  return <FormStep config={config} onSelect={onSelect} t={t}></FormStep>;
};

export default SelectName;
