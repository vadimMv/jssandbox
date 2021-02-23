import { useTypedSelector } from "./use-typed-selector";
export const useCombineCode = (cellId: string) => {
  return useTypedSelector((state) => {
    const code = [];
    const { data, order } = state.cells;
    const orderedData = order.map((id) => data[id]);
    for (const current of orderedData) {
      if (current.type === "code") {
        code.push(current.content);
      }
      if (current.id === cellId) break;
    }
    return code;
  }).join("\n");
};
