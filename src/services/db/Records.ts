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
      const {
        id,
        created_dt,
        data_source_modified_dt,
        legal_name,
        dba_name,
        entity_type,
        operating_status,
        physical_address,
        phone,
        power_units,
        mc_mx_ff_number,
        usdot_number,
        out_of_service_date,
      } = item;

      let d: Date | undefined;

      d = serialToDate(out_of_service_date);

      await store.put({
        id,
        created_dt,
        data_source_modified_dt,
        legal_name,
        dba_name,
        entity_type,
        operating_status,
        physical_address,
        phone,
        power_units,
        mc_mx_ff_number,
        usdot_number,
        ...(d ? { out_of_service_date: d } : {}),
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
