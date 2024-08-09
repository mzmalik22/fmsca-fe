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
const STORE_NAME = "FMSCA_store";

export const initialRows = Array.from(new Array(100000)).map((_, i) => ({
  id: i,
  created_dt: new Date(i + 1000).toString(),
  entity_type: i % 2 ? "CARRIER" : "BROKER",
  legal_name: `C ${i + 1}`,
})) satisfies DataItem[];

const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    },
  });
};

export const saveData = async (data: DataItem[]) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  await store.put({ id: 1, rows: data });
  await tx.done;
};

export const getData = async () => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readonly");
  const store = tx.objectStore(STORE_NAME);
  const data = await store.get(1);
  return data?.rows || [];
};
