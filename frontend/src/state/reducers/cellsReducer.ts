import produce from "immer";
import { ActionType } from "../actions-type";
import { Action } from "../actions";
import { Cell } from "../cell";

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};
const cellsReducer = produce(
  (state: CellsState = initialState, action: Action) => {
    switch (action.type) {
      case ActionType.UPDATE_CELL:
        const { id, content } = action.payload;
        state.data[id].content = content;
        return state;
      case ActionType.INSERT_CELL_AFTER:
        const { type } = action.payload;
        const cell: Cell = {
          id: randomId(),
          type,
          content: "",
        };
        state.data[cell.id] = cell;
        state.order.unshift(cell.id);
        return state;
      case ActionType.MOVE_CELL:
        const index = state.order.findIndex((id) => id === action.payload.id);
        const direction = action.payload.direction;
        const targetId = direction === "up" ? index - 1 : index + 1;
        if (targetId < 0 || targetId > state.order.length - 1) {
          return state;
        }
        let temp = state.order[targetId];
        state.order[targetId] = state.order[index];
        state.order[index] = temp;
        return state;
      case ActionType.DELETE_CELL:
        delete state.data[action.id];
        state.order = state.order.filter((id) => id !== action.id);
        return state;
      default:
        return state;
    }
  }
);
const randomId = () => Math.random().toString(36).substr(2, 5);
export default cellsReducer;
