export const initialState = [
  { id: 1, text: '리덕스 배우기', isDone: false },
  { id: 2, text: '운동하기', isDone: true },
  { id: 3, text: '투두 리스트 만들기', isDone: false },
];

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TODO': {
      const newTodo = {
        id: new Date().getTime(),
        text: action.payload.text,
        isDone: false,
      };
      return [...state, newTodo];
    }

    case 'TOGGLE_TODO': {
      return state.map((todo) => (todo.id === action.payload.id ? { ...todo, isDone: !todo.isDone } : todo));
    }

    case 'DELETE_TODO': {
      return state.filter((todo) => todo.id !== action.payload.id);
    }

    case 'DELETE_COMPLETED': {
      return state.filter((todo) => !todo.isDone);
    }

    case 'TOGGLE_ALL_TODOS': {
      return state.map((todo) => ({ ...todo, isDone: action.payload.isDone }));
    }

    default:
      return state;
  }
};

export default todoReducer;
