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
    headerName: "Creation Date",
    type: "dateTime",
    editable: true,
    width: 200,
    valueGetter: (value) => new Date(value),
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
    field: "entity_type",
    headerName: "Entity Type",
    editable: true,
    width: 150,
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
