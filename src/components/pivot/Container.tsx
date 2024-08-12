import Plot from "react-plotly.js";
import TableRenderers from "react-pivottable/TableRenderers";
import createPlotlyRenderers from "react-pivottable/PlotlyRenderers";
import PivotTableUI, { PivotTableUIProps } from "react-pivottable/PivotTableUI";
import { useState } from "react";
import { useRecords } from "../../context/Record.context";
import { Box } from "@mui/material";
import ImportAction from "../dashboard/ImportAction";

// create Plotly renderers via dependency injection
const PlotlyRenderers = createPlotlyRenderers(Plot);

function PivotContainer() {
  const { records } = useRecords();

  const [pivotTableProps, setPivotTableProps] = useState<PivotTableUIProps>();

  return (
    <Box>
      {records.length > 0 ? (
        <PivotTableUI
          data={records as unknown as Array<{ [K: string]: string }>}
          onChange={(s) => setPivotTableProps(s)}
          renderers={Object.assign({}, TableRenderers, PlotlyRenderers)}
          {...pivotTableProps}
        />
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
            color: "black",
          }}
        >
          <img
            src="/truck.png"
            style={{ objectFit: "contain", width: "250px" }}
            alt="Empty Truck"
          />
          <p
            style={{
              fontSize: "18px",
              fontWeight: "normal",
              marginTop: "15px",
              marginBottom: "15px",
              maxWidth: 370,
              textAlign: "center",
            }}
          >
            No records were found. You can import a spreadsheet by clicking the
            Import button.
          </p>
          <ImportAction variant="contained" />
        </Box>
      )}
    </Box>
  );
}

export default PivotContainer;
