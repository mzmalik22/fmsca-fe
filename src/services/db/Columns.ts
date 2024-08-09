import { GridColDef } from "@mui/x-data-grid";
import DB, { DataItem, STORES } from ".";

export const initialColumns = [
  {
    field: "id",
    headerName: "ID",
    editable: false,
    width: 200,
  },
  {
    field: "created_dt",
    headerName: "Creation Date",
    type: "dateTime",
    editable: true,
    width: 200,
    valueGetter: (value) => new Date(value),
  },
  {
    field: "legal_name",
    headerName: "Legal Name",
    editable: true,
    width: 200,
  },
  {
    field: "entity_type",
    headerName: "Entity Type",
    editable: true,
    width: 150,
  },
] satisfies GridColDef<DataItem>[];

class ColumnService {
  public static async getAll() {
    const db = await DB.initDB();
    const tx = db.transaction(STORES.COLUMNS, "readonly");
    const store = tx.objectStore(STORES.COLUMNS);
    const data = await store.getAll();

    console.log("Getting Columns", data);
    return data ?? [];
  }

  public static async bulkSave(data: GridColDef<DataItem>[]) {
    console.log("Saving Columns", data);
    const db = await DB.initDB();
    const tx = db.transaction(STORES.COLUMNS, "readwrite");
    const store = tx.objectStore(STORES.COLUMNS);

    data.forEach(async (item, i) => {
      await store.put({ field: item.field, width: item.width, order: i });
    });

    await tx.done;
  }

  public static async updateColWidth(field: string, width: number) {
    const db = await DB.initDB();
    const tx = db.transaction(STORES.COLUMNS, "readwrite");
    const store = tx.objectStore(STORES.COLUMNS);

    const item = await store.get(field);
    if (item) await store.put({ ...item, width });

    await tx.done;
  }
}

export default ColumnService;
