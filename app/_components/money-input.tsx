import React, { forwardRef } from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";
//import { Input, InputProps} from "@/app/_components/ui/input"; //não estava importando o inputprops
import { Input } from "@/app/_components/ui/input";
import { InputProps } from "react-day-picker"; // solucao de importacao (teste)

export const MoneyInput = forwardRef(
  (
    props: NumericFormatProps<InputProps>,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <NumericFormat
        {...props}
        thousandSeparator="."
        decimalSeparator=","
        prefix="R$ "
        allowNegative={false}
        customInput={Input}
        getInputRef={ref}
      />
    );
  },
);

MoneyInput.displayName = "MoneyInput";
