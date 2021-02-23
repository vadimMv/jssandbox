import './cell-list-item.css';
import TextEditor from "./text-editor";
import ActionBar from "./action-bart";
import CodeCell from './code-cell';
import { Cell } from '../state';
interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  let child;
  if (cell.type === "code") {
    child = (
      <>
        <div className="action-bar-wrapper">
          <ActionBar id={cell.id} />
        </div>
        <CodeCell  cell={cell}/>
      </>
    );
  } else {
    child = (
      <>
        <TextEditor cell={cell}/>
        <ActionBar id={cell.id} />
      </>
    );
  }
  return <div className="cell-list-item">{child}</div>;
};

export default CellListItem;
