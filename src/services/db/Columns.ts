import { GridColDef } from "@mui/x-data-grid";
import DB, { DataItem, STORES } from ".";

export type ExtendedCol = GridColDef<DataItem> & {
  visible: boolean;
};

export type RawCol = {
  field: string;
  width: number;
  order: number;
  visible: boolean;
};

export const initialColumns = [
  {
    field: "id",
    headerName: "ID",
    editable: false,
    width: 200,
    visible: true,
  },
  {
    field: "created_dt",
    headerName: "Created_DT",
    type: "dateTime",
    editable: true,
    width: 200,
    valueGetter: (value) => (value ? new Date(value) : ""),
    visible: true,
  },
  {
    field: "data_source_modified_dt",
    headerName: "Modified_DT",
    type: "dateTime",
    editable: true,
    width: 200,
    valueGetter: (value) => (value ? new Date(value) : ""),
    visible: true,
  },
  {
    field: "entity_type",
    headerName: "Entity",
    editable: true,
    width: 200,
    visible: true,
  },
  {
    field: "operating_status",
    headerName: "Operating Status",
    editable: true,
    width: 200,
    visible: true,
  },
  {
    field: "legal_name",
    headerName: "Legal Name",
    editable: true,
    width: 200,
    visible: true,
  },
  {
    field: "dba_name",
    headerName: "DBA Name",
    editable: true,
    width: 200,
    visible: true,
  },
  {
    field: "physical_address",
    headerName: "Physical Address",
    editable: true,
    width: 200,
    visible: true,
  },
  {
    field: "phone",
    headerName: "Phone",
    editable: true,
    width: 200,
    visible: true,
  },
  {
    field: "usdot_number",
    headerName: "DOT",
    editable: true,
    width: 200,
    visible: true,
  },
  {
    field: "mc_mx_ff_number",
    headerName: "MC/MX/FF",
    editable: true,
    width: 200,
    visible: true,
  },
  {
    field: "power_units",
    headerName: "Power Units",
    editable: true,
    width: 200,
    visible: true,
  },
  {
    field: "out_of_service_date",
    headerName: "Out of service date",
    type: "dateTime",
    valueGetter: (value) => (value ? new Date(value) : ""),
    editable: true,
    width: 200,
    visible: true,
  },
] satisfies ExtendedCol[];

class ColumnService {
  public static async getAll() {
    const db = await DB.initDB();
    const tx = db.transaction(STORES.COLUMNS, "readonly");
    const store = tx.objectStore(STORES.COLUMNS);
    const data = await store.getAll();
    return data ?? [];
  }

  public static async removeAllAndSave(data: RawCol[]) {
    const db = await DB.initDB();
    const tx = db.transaction(STORES.COLUMNS, "readwrite");
    const store = tx.objectStore(STORES.COLUMNS);

    store.clear();
    data
      .sort((a, b) => a.order - b.order)
      .forEach(async (item, i) => {
        await store.put({
          field: item.field,
          width: item.width,
          order: i,
          visible: item.visible,
        });
      });

    await tx.done;
  }

  public static async bulkSave(data: ExtendedCol[]) {
    const db = await DB.initDB();
    const tx = db.transaction(STORES.COLUMNS, "readwrite");
    const store = tx.objectStore(STORES.COLUMNS);

    data.forEach(async (item, i) => {
      await store.put({
        field: item.field,
        width: item.width,
        order: i,
        visible: item.visible,
      });
    });

    await tx.done;
  }

  public static async updateCol(
    field: string,
    { width, visible = true }: { width?: number; visible?: boolean }
  ) {
    const db = await DB.initDB();
    const tx = db.transaction(STORES.COLUMNS, "readwrite");
    const store = tx.objectStore(STORES.COLUMNS);

    const item = await store.get(field);
    if (item) await store.put({ ...item, width, visible });

    await tx.done;
  }
}

export default ColumnService;
