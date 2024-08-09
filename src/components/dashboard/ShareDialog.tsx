import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, IconButton } from "@mui/material";
import { Close, Done } from "@mui/icons-material";
import { useState } from "react";

type ShareDialogProps = {
  isShareDialogOpen: boolean;
  handleClose: () => void;
  url: string;
};

function ShareDialog(props: ShareDialogProps) {
  const { isShareDialogOpen, handleClose, url } = props;

  const [isCopied, setCopied] = useState(false);

  function handleCopy() {
    // Copy the text inside the text field
    navigator.clipboard.writeText(url);

    setCopied(true);
    setTimeout(() => isCopied && setCopied(false), 3000);
  }

  return (
    <Dialog
      fullWidth
      open={isShareDialogOpen}
      onClose={handleClose}
      sx={{ minWidth: 500 }}
    >
      <DialogTitle id="alert-dialog-title">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3>Share via link</h3>
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
            <p>Use the link below to share the layout for the table view.</p>
            <Box
              sx={{
                width: "100%",
                wordWrap: "break-word",
                lineBreak: "anywhere",
                padding: "5px",
                borderRadius: "5px",
                fontSize: 12,
                border: "1px solid #EEE",
              }}
            >
              {url}
            </Box>
            <Button
              variant="outlined"
              size="small"
              sx={{ maxWidth: 120, marginLeft: "auto" }}
              onClick={handleCopy}
            >
              {isCopied ? (
                <Box sx={{ display: "flex", gap: 0.5 }}>
                  <Done fontSize="small" /> <span>Copied</span>
                </Box>
              ) : (
                "Copy Link"
              )}
            </Button>
          </Box>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}

export default ShareDialog;
