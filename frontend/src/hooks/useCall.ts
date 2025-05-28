import { useEffect, useState } from "react";

export type QueryAttributes = {
  data: Object;
  loading: boolean;
};

export function useCall(
  callFn: Function,
  dependencyList?: React.DependencyList
): QueryAttributes {
  const [data, setData] = useState<Object>({});
  const [loading, setLoading] = useState<boolean>(false);

  if (!dependencyList) {
    dependencyList = [];
  }

  useEffect(() => {
    setLoading(true);
    setData(callFn());
    setLoading(false);
  }, dependencyList);

  const query: QueryAttributes = { data, loading };
  return query;
}
