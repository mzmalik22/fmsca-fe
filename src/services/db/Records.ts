import DB, { DataItem, STORES } from ".";
import { serialToDate } from "../../utils";

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

  public static async removeAllAndSave(data: DataItem[]) {
    const db = await DB.initDB();
    const tx = db.transaction(STORES.RECORDS, "readwrite");
    const store = tx.objectStore(STORES.RECORDS);

    store.clear();

    data.forEach(async (item) => {
      const { id, out_of_service_date, legal_name, ...rest } = item;

      let d: Date | undefined;

      d = serialToDate(out_of_service_date);

      if (legal_name === "DAISY SNOW") {
        console.log(d, out_of_service_date, item);
      }

      await store.put({
        id,
        legal_name,
        ...(d ? { out_of_service_date: d } : {}),
        ...rest,
      });
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

export default RecordService;
