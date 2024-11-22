import { ReactNode } from "react";
import { Button } from "@mui/material";

type BasicButtonProps = {
  children: ReactNode;
  onClick: () => void;
}

export const BasicButton = (props: BasicButtonProps) => {
  const { children, onClick } = props;
  return (
    <Button
      variant="contained"
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
