import { Upload } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useState } from "react";

import ImportDialog from "./ImportDialog";

function ImportAction() {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Upload fontSize="small" />
        &nbsp;Import
      </Button>

      <ImportDialog isOpen={isOpen} handleClose={() => setOpen(false)} />
    </>
  );
}

export default ImportAction;
