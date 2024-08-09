import { openDB } from "idb";

export type DataItem = {
  id: number;
  created_dt: string;
  // data_source_modified_dt: string;
  entity_type: string;
  // operating_status: string;
  legal_name: string;
  // dba_name: string;
  // physical_address: string;
  // phone: string;
  // usdot_number: number;
  // mc_mx_ff_number: string;
  // power_units: number;
  // out_of_service_date: string;
};

const DB_NAME = "FMSCA_db";

export const STORES = {
  RECORDS: "record_store",
  COLUMNS: "column_store",
};

export const initialRows = Array.from(new Array(100000)).map((_, i) => ({
  id: i,
  created_dt: new Date(i + 1000).toString(),
  entity_type: i % 2 ? "CARRIER" : "BROKER",
  legal_name: `C ${i + 1}`,
})) satisfies DataItem[];

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
