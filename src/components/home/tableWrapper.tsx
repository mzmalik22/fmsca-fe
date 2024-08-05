import * as React from "react";

import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { Box, CircularProgress } from "@mui/material";

import axios from "axios";
import TableHeader, { COLS } from "./tableHeader";
import TableView from "./tableView";

export interface Record {
  _id: string;
  created_dt: string;
  data_source_modified_dt: string;
  entity_type: string;
  operating_status: string;
  legal_name: string;
  dba_name: string;
  physical_address: string;
  phone: string;
  usdot_number: number;
  mc_mx_ff_number: string;
  power_units: number;
  out_of_service_date: string;
}

function TableWrapper() {
  const [isLoading, setLoading] = React.useState(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [total, setTotal] = React.useState(0);

  const [rows, setRows] = React.useState<Record[]>([]);

  const [query, setQuery] = React.useState("");

  const [from, setFrom] = React.useState("");
  const [to, setTo] = React.useState("");

  const [min, setMin] = React.useState(0);
  const [max, setMax] = React.useState(999999);

  const [fields, setFields] = React.useState<string[]>(
    COLS.map((col) => col.key)
  );

  const callCounterRef = React.useRef<number>(0);

  const refresh = (page: number = 0) => {
    setLoading(true);

    const counter = ++callCounterRef.current;

    axios
      .get(
        `http://localhost:8000/records?page=${
          page + 1
        }&limit=${rowsPerPage}&query=${query}&from=${from}&to=${to}&min=${min}&max=${max}&fields=${fields.join(
          ","
        )}`
      )
      .then((response) => {
        const result = response.data;

        if (result.success) {
          if (counter === callCounterRef.current) {
            setTotal(result.total || 0);
            setRows(result.data || []);
          }
        }
      })
      .finally(() => setLoading(false));
  };

  React.useEffect(() => {
    refresh(page);
  }, [page]);

  React.useEffect(() => {
    setPage(0);
    refresh(0);
  }, [rowsPerPage, query, fields]);

  React.useEffect(() => {}, []);

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: "10px" }}>
      <TableHeader
        query={query}
        setQuery={setQuery}
        from={from}
        setFrom={setFrom}
        to={to}
        setTo={setTo}
        min={min}
        setMin={setMin}
        max={max}
        setMax={setMax}
        fields={fields}
        setFields={setFields}
      />
      {rows.length > 0 ? (
        <>
          {isLoading ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "300px",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <TableView rows={rows} fields={fields} />
          )}
          <TablePagination
            rowsPerPageOptions={[15, 25, 100]}
            component="div"
            count={total}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      ) : (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            padding: "30px",
            paddingBottom: "40px",
          }}
        >
          <img
            src="/truck.png"
            style={{ objectFit: "contain", width: "250px" }}
            alt="Empty Truck"
          />
          <p
            style={{ fontSize: "22px", fontWeight: "bold", marginTop: "15px" }}
          >
            No records were found
          </p>
          <p style={{ fontSize: "16px" }}>
            Try searching for something else...
          </p>
        </Box>
      )}
    </Paper>
  );
}

export default TableWrapper;
