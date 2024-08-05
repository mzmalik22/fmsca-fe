export type ColumnID =
  | "created_dt"
  | "data_source_modified_dt"
  | "entity_type"
  | "operating_status"
  | "legal_name"
  | "dba_name"
  | "physical_address"
  | "phone"
  | "usdot_number"
  | "mc_mx_ff_number"
  | "power_units"
  | "out_of_service_date";

export interface Column {
  id: ColumnID;
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number | string) => number | string;
}

export const COLUMNS: readonly Column[] = [
  {
    id: "created_dt",
    label: "Created_DT",
    minWidth: 30,
    format: (value) => {
      if (!value) return "-";

      const date = new Date(value);
      return `${date.getMonth().toString().padStart(2, "0")}/${date
        .getDate()
        .toString()
        .padStart(2, "0")}/${date.getFullYear()}`;
    },
  },
  {
    id: "data_source_modified_dt",
    label: "Modifed_DT",
    minWidth: 30,
    format: (value) => {
      if (!value) return "-";

      const date = new Date(value);
      return `${date.getMonth().toString().padStart(2, "0")}/${date
        .getDate()
        .toString()
        .padStart(2, "0")}/${date.getFullYear()}`;
    },
  },
  {
    id: "entity_type",
    label: "Entity",
    minWidth: 30,
    format: (value) => value || "-",
  },
  {
    id: "operating_status",
    label: "Operating status",
    minWidth: 120,
    format: (value) => value || "-",
  },
  {
    id: "legal_name",
    label: "Legal name",
    minWidth: 300,
    format: (value) => value || "-",
  },
  {
    id: "dba_name",
    label: "DBA name",
    minWidth: 200,
    format: (value) => value || "-",
  },
  {
    id: "physical_address",
    label: "Physical address",
    minWidth: 300,
    format: (value) => value || "-",
  },
  {
    id: "phone",
    label: "Phone",
    minWidth: 100,
    format: (value) => value || "-",
  },
  {
    id: "usdot_number",
    label: "DOT",
    minWidth: 50,
    format: (value) => value || "-",
  },
  {
    id: "mc_mx_ff_number",
    label: "MC/MX/FF",
    minWidth: 80,
    format: (value) => value || "-",
  },
  {
    id: "power_units",
    label: "Power units",
    minWidth: 120,
    format: (value) => value || "-",
  },
  {
    id: "out_of_service_date",
    label: "Out of service date",
    minWidth: 200,
    format: (value) => (value ? new Date(value).toDateString() : "-"),
  },
];
