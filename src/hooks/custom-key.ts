import { useCallback, useState } from "react";
import { uniqueId } from "lodash";

type Key = string;
type UpdateKey = () => void;

const useCustomKey = (): [Key, UpdateKey] => {
  const getKey = useCallback(() => uniqueId("id_"), []);

  const [key, setKey] = useState(() => getKey());

  const updateKey = useCallback(() => setKey(getKey()), [getKey]);

  return [key, updateKey];
};

export default useCustomKey;
