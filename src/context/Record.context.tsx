import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { DataItem } from "../services/db";

type T_RecordContext = {
  records: DataItem[];
  setRecords: Dispatch<SetStateAction<DataItem[]>>;
};

const RecordContext = createContext<T_RecordContext>({
  records: [],
  setRecords: () => {},
});

const RecordContextProvider = (props: PropsWithChildren) => {
  const [records, setRecords] = useState<DataItem[]>([]);

  return (
    <RecordContext.Provider value={{ records, setRecords }}>
      {props.children}
    </RecordContext.Provider>
  );
};

export const useRecords = () => useContext(RecordContext);

export default RecordContextProvider;
