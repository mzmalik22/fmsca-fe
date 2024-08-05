import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Record } from "./tableWrapper";
import { COLUMNS } from "./utils";

type TableViewProps = {
  rows: Record[];
  fields: string[];
};

function TableView(props: TableViewProps) {
  const { rows, fields } = props;

  const columns = COLUMNS.filter((col) => {
    return !!fields.find((f) => f === col.id);
  });

  return (
    <TableContainer sx={{ width: "100%", overflowX: "auto" }}>
      <Table size="small" sx={{ width: "100%", overflowX: "auto" }}>
        <TableHead>
          <TableRow
            sx={{ backgroundColor: (theme) => theme.palette.action.focus }}
          >
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => {
            return (
              <TableRow
                hover
                role="checkbox"
                tabIndex={-1}
                key={row._id}
                sx={{
                  "&:nth-of-type(odd)": {
                    backgroundColor: (theme) => theme.palette.action.hover,
                  },
                }}
              >
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: 350,
                      }}
                      title={
                        column.format
                          ? column.format(value).toString()
                          : value.toString()
                      }
                    >
                      {column.format ? column.format(value) : value}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableView;
