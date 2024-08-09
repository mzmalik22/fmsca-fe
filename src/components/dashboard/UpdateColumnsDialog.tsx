import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Box,
  CircularProgress,
  DialogActions,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useState } from "react";

type UpdateColumnsDialogProps = {
  isOpen: boolean;
  handleClose: () => void;
  ignoreUpdate: () => void;
  updateColumns: () => Promise<void>;
};

function UpdateColumnsDialog(props: UpdateColumnsDialogProps) {
  const { isOpen, handleClose, ignoreUpdate, updateColumns } = props;

  const [isLoading, setLoading] = useState(false);

  function handleUpdate() {
    debugger;

    setLoading(true);
    updateColumns().finally(() => {
      window.location.replace(window.location.pathname);
    });
  }

  return (
    <Dialog
      fullWidth
      open={isOpen}
      onClose={handleClose}
      sx={{ minWidth: 500 }}
    >
      {isLoading ? (
        <Box
          sx={{
            minHeight: 300,
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <CircularProgress />
          <h3>Applying</h3>
        </Box>
      ) : (
        <>
          <DialogTitle id="alert-dialog-title">
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3>Apply Table Layout?</h3>
              <IconButton onClick={handleClose}>
                <Close />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-center",
                  gap: 2,
                }}
              >
                <p>
                  Received a new table layout from the URL. Applying would
                  discard the currently used layout. Do you want to continue?
                </p>
                <DialogActions>
                  <Button onClick={ignoreUpdate}>Discard</Button>
                  <Button onClick={handleUpdate} variant="contained">
                    Apply
                  </Button>
                </DialogActions>
              </Box>
            </DialogContentText>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
}

export default UpdateColumnsDialog;
