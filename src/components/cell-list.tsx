import CellListItem from "./cell-list-item";
import AddCell from "./add-cell";
import { Fragment, useState } from "react";
import { useTypedSelector } from "../hooks/use-typed-selector";
const CellList = () => {
  const cells = useTypedSelector(({ cells: { data, order } }) =>
    order.map((id) => data[id])
  );
  return (
    <div>
      <AddCell forceVisible={cells.length === 0} previousCellId={null} />
      {cells.map((cell) => (
        <Fragment key={cell.id}>
          <CellListItem cell={cell} />
          <AddCell previousCellId={cell.id} />
        </Fragment>
      ))}
    </div>
  );
};
export default CellList;
