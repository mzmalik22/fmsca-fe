import { Refresh } from "@mui/icons-material";
import { Button } from "@mui/material";
import ColumnService from "../../services/db/Columns";

function ResetAction() {
  function resetHandler() {
    ColumnService.removeAllAndReset().then(() => window.location.reload());
  }

  return (
    <Button onClick={resetHandler}>
      <Refresh fontSize="small" />
      &nbsp;Reset Table Layout
    </Button>
  );
}

export default ResetAction;
