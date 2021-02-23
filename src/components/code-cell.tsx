import "./code-cell.css";
import Preview from "./preview";
import CodeEditor from "./code-editor";
import Resizable from "./resizable";
import { useEffect } from "react";
import { Cell } from "../state";
import { useActions } from "../hooks/use-actions";
import { useCombineCode } from "../hooks/use-combine";
import { useTypedSelector } from "../hooks/use-typed-selector";
interface CodeCellProps {
  cell: Cell;
}
const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { UpdateCell, CreateBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);
  const cumulativeCode = useCombineCode(cell.id);
  console.log(cumulativeCode);
  useEffect(() => {
    if (!bundle) {
      CreateBundle(cell.id, cell.content);
      return;
    }
    const timer = setTimeout(async () => {
      CreateBundle(cell.id, cell.content);
    }, 750);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.content, cell.id, CreateBundle]);

  return (
    <>
      <Resizable direction="vertical">
        <div
          style={{
            height: "calc(100% - 10px)",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Resizable direction="horizontal">
            <CodeEditor
              initialValue={cell.content}
              onChange={(value) => {
                UpdateCell(cell.id, value);
              }}
            />
          </Resizable>
          <div className="progress-wrapper">
            {!bundle || bundle.loading ? (
              <div className="progress-cover">
                <progress className="progress is-small is-primary" max="100">
                  Loading
                </progress>
              </div>
            ) : (
              <Preview code={bundle.code} err={bundle.err} />
            )}
          </div>
        </div>
      </Resizable>
    </>
  );
};

export default CodeCell;
