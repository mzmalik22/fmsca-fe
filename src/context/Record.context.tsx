import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { DataItem } from "../services/db";
import RecordService from "../services/db/Records";

type T_RecordContext = {
  isLoading: boolean;
  records: DataItem[];
  setRecords: Dispatch<SetStateAction<DataItem[]>>;
};

const RecordContext = createContext<T_RecordContext>({
  isLoading: false,
  records: [],
  setRecords: () => {},
});

const RecordContextProvider = (props: PropsWithChildren) => {
  const [records, setRecords] = useState<DataItem[]>([]);
  const [isLoading, setLoading] = useState(false);

  const fetcher = () => {
    setLoading(true);
    RecordService.getAll()
      .then((data) => {
        if (data.length) setRecords(data);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => fetcher(), []);

  return (
    <RecordContext.Provider value={{ records, setRecords, isLoading }}>
      {props.children}
    </RecordContext.Provider>
  );
};

export const useRecords = () => useContext(RecordContext);

export default RecordContextProvider;
