import DB, { DataItem, STORES } from ".";

class RecordService {
  public static async getAll() {
    const db = await DB.initDB();
    const tx = db.transaction(STORES.RECORDS, "readonly");
    const store = tx.objectStore(STORES.RECORDS);
    const data = await store.getAll();
    return data ?? [];
  }

  public static async bulkSave(data: DataItem[]) {
    const db = await DB.initDB();
    const tx = db.transaction(STORES.RECORDS, "readwrite");
    const store = tx.objectStore(STORES.RECORDS);

    data.forEach(async (item) => {
      const { id, ...rest } = item;
      await store.put({ id, ...rest });
    });

    await tx.done;
  }

  public static async saveOne(item: DataItem) {
    const db = await DB.initDB();
    const tx = db.transaction(STORES.RECORDS, "readwrite");
    const store = tx.objectStore(STORES.RECORDS);

    const { id, ...rest } = item;
    await store.put({ id, ...rest });

    await tx.done;
  }
}

export const initialRows = Array.from(new Array(100000)).map((_, i) => ({
  id: i,
  created_dt: new Date(i + 1000).toString(),
  entity_type: i % 2 ? "CARRIER" : "BROKER",
  legal_name: `C ${i + 1}`,
})) satisfies DataItem[];

export default RecordService;
