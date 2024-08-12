import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, CircularProgress, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

import { ChangeEventHandler, MouseEventHandler, useRef, useState } from "react";

import * as XLSX from "xlsx";
import { DataItem } from "../../services/db";
import RecordService from "../../services/db/Records";

type ImportDialogProps = {
  isOpen: boolean;
  handleClose: () => void;
};

function ImportDialog(props: ImportDialogProps) {
  const { isOpen, handleClose } = props;

  const [isLoading, setLoading] = useState(false);
  const [isUploaded, setUploaded] = useState(false);
  const [data, setData] = useState<DataItem[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      const getData = () => {
        return new Promise<DataItem[]>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            try {
              if (!event.target?.result) return;

              const data = new Uint8Array(
                event.target.result as ArrayBufferLike
              );
              const workbook = XLSX.read(data, { type: "array" });
              const sheetName = workbook.SheetNames[0];
              const sheet = workbook.Sheets[sheetName];
              const jsonData = XLSX.utils.sheet_to_json(sheet);

              resolve(jsonData as DataItem[]);
            } catch (ex) {
              reject(ex);
            }
          };
          reader.readAsArrayBuffer(file);
        });
      };

      setLoading(true);
      setUploaded(false);
      getData()
        .then((data) => {
          setUploaded(true);
          setData(data);
        })
        .finally(() => setLoading(false));
    }
  };

  const handleImport: MouseEventHandler<HTMLButtonElement> = () => {
    setLoading(true);

    RecordService.removeAllAndSave(data).then(() => window.location.reload());
  };

  return (
    <Dialog
      fullWidth
      open={isOpen}
      onClose={handleClose}
      sx={{ minWidth: 400 }}
    >
      <input
        ref={inputRef}
        onChange={handleFileChange}
        type="file"
        hidden
        name="file-upload"
      />

      {isLoading ? (
        <Box
          sx={{
            minHeight: 300,
            minWidth: 300,
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
          <h3>Parsing Records</h3>
        </Box>
      ) : isUploaded ? (
        <>
          <DialogTitle id="alert-dialog-title">
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3>Import Data?</h3>
              <IconButton onClick={handleClose}>
                <Close />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: 2,
              }}
            >
              <p>
                Received {data.length} records from the uploaded spreadsheet. Do
                you want to continue?
              </p>
              <p style={{ fontSize: 14, color: "grey" }}>
                Note: The previously present data will be replaced by the newly
                imported data. There will not be any way of recovering the
                previous data.
              </p>

              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Button variant="outlined" size="small" sx={{ maxWidth: 200 }}>
                  Discard
                </Button>
                <Button
                  variant="contained"
                  onClick={handleImport}
                  size="small"
                  sx={{ maxWidth: 200 }}
                >
                  Continue
                </Button>
              </Box>
            </Box>
          </DialogContent>
        </>
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
              <h3>Import a Spreadsheet</h3>
              <IconButton onClick={handleClose}>
                <Close />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                border: "1px dashed lightgrey",
                gap: 2,
                padding: "20px",
              }}
            >
              <p style={{ textAlign: "center" }}>
                Please note that the current data will be replaced with the new
                data form the spreadsheet.
              </p>

              <Button
                onClick={() => inputRef.current?.click()}
                variant="outlined"
                size="small"
                sx={{ maxWidth: 200 }}
              >
                Upload Spreadsheet
              </Button>
            </Box>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
}

export default ImportDialog;
