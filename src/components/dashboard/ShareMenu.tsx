import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Share } from "@mui/icons-material";
import ColumnService from "../../services/db/Columns";

import TokenService from "../../services/token";
import ShareDialog from "./ShareDialog";

function ShareMenu() {
  const [isShareDialogOpen, setShareDialogOpen] = React.useState(false);
  const [url, setUrl] = React.useState("");

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  async function handleLayoutShare() {
    const data = await ColumnService.getAll();
    const token = TokenService.encode(data);

    setUrl(`${window.location}?layout=${token}`);
    setShareDialogOpen(true);

    handleClose();
  }

  const handleCloseShareDialog = () => {
    setShareDialogOpen(false);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant="outlined"
      >
        <Share fontSize="medium" sx={{ pr: 1 }} />
        Share
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleLayoutShare}>Share Table Layout</MenuItem>
      </Menu>
      <ShareDialog
        isShareDialogOpen={isShareDialogOpen}
        handleClose={handleCloseShareDialog}
        url={url}
      />
    </div>
  );
}

export default ShareMenu;
