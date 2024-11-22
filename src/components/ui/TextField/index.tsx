import { ReactNode } from "react";
import TextField from '@mui/material/TextField';

type BasicTextFieldProps = {
  // children: ReactNode;
  label: string,
  // onChange: () => void;
}

type LargeTextFieldProps = {
  // children: ReactNode;
  label: string,
  // onChange: () => void;
}

export const BasicTextField = (props: BasicTextFieldProps) => {
  const { label } = props;

  return (
    <TextField label={label} variant="outlined" />
  );
}

export const LargeTextField = (props: LargeTextFieldProps) => {
  const { label } = props;

  return (
    <TextField
      id="standard-multiline-flexible"
      label={label}
      multiline
      maxRows={4}
      variant="standard"
    />
  );
}



