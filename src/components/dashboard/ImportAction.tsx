import { Upload } from "@mui/icons-material";
import { Button, ButtonOwnProps } from "@mui/material";
import { useState } from "react";

import ImportDialog from "./ImportDialog";

type ImportActionProps = {
  variant?: ButtonOwnProps["variant"];
};

function ImportAction(props: ImportActionProps) {
  const { variant = "text" } = props;

  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button variant={variant} onClick={() => setOpen(true)}>
        <Upload fontSize="small" />
        &nbsp;Import
      </Button>

      <ImportDialog isOpen={isOpen} handleClose={() => setOpen(false)} />
    </>
  );
}

export default ImportAction;
