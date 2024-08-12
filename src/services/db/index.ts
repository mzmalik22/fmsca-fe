import { openDB } from "idb";

export type DataItem = {
  id: number;
  created_dt: string;
  data_source_modified_dt: string;
  entity_type: string;
  operating_status: string;
  legal_name: string;
  dba_name: string;
  physical_address: string;
  phone: string;
  usdot_number: number;
  mc_mx_ff_number: string;
  power_units: number;
  out_of_service_date: number;
};

const DB_NAME = "FMSCA_db";

export const STORES = {
  RECORDS: "record_store",
  COLUMNS: "column_store",
};

class DB {
  static async initDB() {
    return openDB(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORES.RECORDS))
          db.createObjectStore(STORES.RECORDS, {
            keyPath: "id",
            autoIncrement: true,
          });
        if (!db.objectStoreNames.contains(STORES.COLUMNS))
          db.createObjectStore(STORES.COLUMNS, {
            keyPath: "field",
          });
      },
    });
  }
}

export default DB;
