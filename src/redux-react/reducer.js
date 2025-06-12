const initialState = [
  { id: 1, text: '리덕스 배우기', completed: false },
  { id: 2, text: '운동하기', completed: true },
];

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      const newTodo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      };

      return [...state, newTodo];

    case 'TOGGLE_TODO':
      return state.map((todo) => (todo.id === action.payload.id ? { ...todo, completed: !todo.completed } : todo));

    case 'DELETE_TODO':
      return state.filter((todo) => todo.id !== action.payload.id);

    default:
      return state;
  }
};

export default todoReducer;
