import { useReducer } from "react";

const initialHistoryState = {
  currentIndex: 0,
  history: []
};

function reducer(state = initialHistoryState, action) {
  switch (action.type) {
    case "SET_STATE":
      return [
        state.history.slice(0, state.currentIndex + 1).concat([action.state])
      ].map(next => ({
        currentIndex: next.length - 1,
        history: next
      }))[0];
    case "UNDO":
      return {
        ...state,
        currentIndex: Math.max(0, state.currentIndex - 1)
      };
    case "REDO":
      return {
        ...state,
        currentIndex: Math.min(state.history.length - 1, state.currentIndex + 1)
      };
    default:
      return state;
  }
}

export default function useHistoricalState(initialState) {
  const [state, dispatch] = useReducer(reducer, {
    ...initialHistoryState,
    history: [initialState]
  });
  const undo = () =>
    dispatch({
      type: "UNDO"
    });

  const redo = () =>
    dispatch({
      type: "REDO"
    });

  const setState = state =>
    dispatch({
      type: "SET_STATE",
      state
    });

  return [
    state.history[state.currentIndex],
    setState,
    state.currentIndex > 0 ? undo : undefined,
    state.currentIndex < state.history.length - 1 ? redo : undefined
  ];
}
