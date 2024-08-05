import * as React from "react";

import Button from "@mui/material/Button";
import {
  Box,
  Checkbox,
  Divider,
  Drawer,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";

import FilterAltIcon from "@mui/icons-material/FilterAlt";

import { Close, Search } from "@mui/icons-material";

export const COLS = [
  { id: 1, title: "Created_DT", key: "created_dt" },
  { id: 2, title: "Modified_DT", key: "data_source_modified_dt" },
  { id: 3, title: "Entity", key: "entity_type" },
  { id: 4, title: "Operating Status", key: "operating_status" },
  { id: 5, title: "Legal Name", key: "legal_name" },
  { id: 6, title: "DBA Name", key: "dba_name" },
  { id: 7, title: "Physical Address", key: "physical_address" },
  { id: 8, title: "Phone", key: "phone" },
  { id: 9, title: "DOT", key: "usdot_number" },
  { id: 10, title: "MC/MX/FF", key: "mc_mx_ff_number" },
  { id: 11, title: "Power Units", key: "power_units" },
  { id: 12, title: "Out Of Service Date", key: "out_of_service_date" },
];

type FilterDrawerProps = {
  from: string;
  setFrom: React.Dispatch<React.SetStateAction<string>>;
  to: string;
  setTo: React.Dispatch<React.SetStateAction<string>>;
  min: number;
  setMin: React.Dispatch<React.SetStateAction<number>>;
  max: number;
  setMax: React.Dispatch<React.SetStateAction<number>>;
  fields: string[];
  setFields: React.Dispatch<React.SetStateAction<string[]>>;
};

type TableHeaderProps = FilterDrawerProps & {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
};

function TableHeader(props: TableHeaderProps) {
  const { query, setQuery, ...rest } = props;

  return (
    <Box
      sx={{
        width: "100%",
        background: "#FAFAFA",
        padding: "10px 15px",
        fontWeight: "bold",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box sx={{ color: (theme) => theme.palette.primary.dark }}>
        <h1
          style={{
            fontSize: "24px",
          }}
        >
          FMCSA Trucking Records
        </h1>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <OutlinedInput
          type="search"
          size="small"
          placeholder="Search in Name, Address & Phone"
          sx={{ width: "300px", colorScheme: "light" }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          startAdornment={
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          }
        />

        <FilterDrawer {...rest} />
      </Box>
    </Box>
  );
}

function FilterDrawer(props: FilterDrawerProps) {
  const [from, setFrom] = React.useState("");
  const [to, setTo] = React.useState("");
  const [min, setMin] = React.useState(0);
  const [max, setMax] = React.useState(999999);
  const [fields, setFields] = React.useState<string[]>(props.fields);

  const [isOpen, setOpen] = React.useState(false);

  // React.useEffect(() => setTo(props.to), [props.to]);
  // React.useEffect(() => setMin(props.min), [props.min]);
  // React.useEffect(() => setMax(props.max), [props.max]);
  // React.useEffect(() => setFrom(props.from), [props.from]);
  // React.useEffect(() => setFields(props.fields), [props.fields]);

  const toggleDrawer = (newOpen: boolean) => () => setOpen(newOpen);

  const handleChangeColumnFilter = (key: string, value: boolean) => {
    setFields((prev) => {
      const isPresent = prev.find((f) => f === key);

      if (isPresent) {
        if (value === true) return prev;
        return prev.filter((f) => f !== key);
      }

      return [...prev, key];
    });
  };

  const applyHandler = () => {
    setOpen(false);

    props.setFrom(from);
    props.setTo(to);
    props.setMin(min);
    props.setMax(max);
    props.setFields(fields);
  };

  const DrawerList = (
    <Box
      sx={{
        width: 400,
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
      role="presentation"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: "10px",
        }}
      >
        <h2 style={{ fontSize: "26px", fontWeight: "normal" }}>Filters</h2>
        <IconButton onClick={toggleDrawer(false)}>
          <Close />
        </IconButton>
      </Box>

      <h3 style={{ fontSize: "16px" }}>Column Filters</h3>

      <Grid>
        {COLS.map((col) => (
          <FormControlLabel
            key={col.key}
            label={col.title}
            control={
              <Checkbox
                inputProps={{ "aria-label": col.title }}
                checked={!!fields.find((f) => f === col.key)}
                size="small"
                onChange={(e) =>
                  handleChangeColumnFilter(col.key, e.target.checked)
                }
              />
            }
          />
        ))}
      </Grid>

      <Divider sx={{ my: "5px", border: "none" }} />

      <h3 style={{ fontSize: "16px" }}>Created DT</h3>

      <Box
        sx={{ display: "flex", justifyContent: "space-between", gap: "10px" }}
      >
        <FormGroup sx={{ width: "100%" }}>
          <FormLabel htmlFor="from" style={{ fontSize: "14px" }}>
            From
          </FormLabel>
          <TextField
            id="from"
            type="date"
            size="small"
            sx={{ colorScheme: "light" }}
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </FormGroup>

        <FormGroup sx={{ width: "100%" }}>
          <FormLabel htmlFor="to" style={{ fontSize: "14px" }}>
            To
          </FormLabel>
          <TextField
            id="to"
            type="date"
            size="small"
            sx={{ colorScheme: "light" }}
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </FormGroup>
      </Box>

      <Divider sx={{ my: "5px", border: "none" }} />

      <h3 style={{ fontSize: "16px" }}>Power Units</h3>

      <Box
        sx={{ display: "flex", justifyContent: "space-between", gap: "10px" }}
      >
        <FormGroup sx={{ width: "100%" }}>
          <FormLabel htmlFor="min" style={{ fontSize: "14px" }}>
            Min
          </FormLabel>
          <TextField
            id="from"
            type="number"
            size="small"
            sx={{ colorScheme: "light" }}
            value={min}
            onChange={(e) => setMin(parseInt(e.target.value))}
          />
        </FormGroup>

        <FormGroup sx={{ width: "100%" }}>
          <FormLabel htmlFor="max" style={{ fontSize: "14px" }}>
            Max
          </FormLabel>
          <TextField
            id="max"
            type="number"
            size="small"
            sx={{ colorScheme: "light" }}
            value={max}
            onChange={(e) => setMax(parseInt(e.target.value))}
          />
        </FormGroup>
      </Box>

      <Button
        onClick={applyHandler}
        type="button"
        variant="outlined"
        sx={{ marginTop: "20px" }}
      >
        Apply Filters
      </Button>
    </Box>
  );

  return (
    <div>
      <Button color="primary" variant="outlined" onClick={toggleDrawer(true)}>
        <FilterAltIcon />
        &nbsp;<span>Filters</span>
      </Button>
      <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}

export default TableHeader;
