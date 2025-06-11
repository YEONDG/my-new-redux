import { ArrowDown, Circle, CircleCheckBig } from 'lucide-react';
import { useState, type FormEvent } from 'react';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: '할 일1', isDone: false },
    { id: 2, text: '할 일2', isDone: true },
    { id: 3, text: '할 일3', isDone: false },
    { id: 4, text: '할 일4', isDone: true },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'active' | 'completed'>('all');

  const handleCommitNewTodo = () => {
    if (!inputValue.trim()) return;

    const newTodo = {
      id: new Date().getTime(),
      text: inputValue.trim(),
      isActive: true,
      isDone: false,
    };
    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  const handleAddTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleCommitNewTodo();
  };

  const handleToggleTodo = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, isDone: !todo.isDone } : todo)));
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleDeleteCompleted = () => {
    setTodos(todos.filter((todo) => !todo.isDone));
  };

  const handleAllCompleted = () => {
    if (isAllCompleted) {
      return setTodos(todos.map((todo) => ({ ...todo, isDone: false })));
    } else {
      return setTodos(todos.map((todo) => ({ ...todo, isDone: true })));
    }
  };

  const filteredTodos = todos
    .filter((todo) => {
      if (selectedFilter === 'all') return true;
      if (selectedFilter === 'active') return !todo.isDone;
      if (selectedFilter === 'completed') return todo.isDone;
      return false;
    })
    .reverse();

  const activeTodosCount = todos.filter((todo) => !todo.isDone).length;

  const isAllCompleted = todos.every((todo) => todo.isDone);

  const isDeleteCompleted = todos.some((todo) => todo.isDone);

  return (
    <div className='h-screen w-full flex flex-col items-center  bg-gray-100'>
      <h1 className='text-7xl text-red-900 py-6'>todos</h1>
      <div className='bg-white shadow-md  w-full max-w-lg'>
        <form onSubmit={handleAddTodo} className='relative flex items-center border-b border-gray-200'>
          <ArrowDown
            onClick={handleAllCompleted}
            className='absolute cursor-pointer left-4 top-1/2 transform -translate-y-1/2 text-gray-300'
          />
          <input
            type='text'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={handleCommitNewTodo}
            className='placeholder:text-2xl placeholder:italic w-full p-4 pl-14 focus:outline-none focus:ring-2 focus:ring-red-800'
            placeholder='What needs to be done?'
          />
        </form>

        <ul>
          {filteredTodos.map((todo) => (
            <li key={todo.id} className='group y-2 border-b border-gray-200 flex w-full items-center px-2 py-2'>
              <input type='checkbox' className='sr-only peer' />
              <div onClick={() => handleToggleTodo(todo.id)} className='cursor-pointer flex items-center'>
                {todo.isDone ? <CircleCheckBig className='mr-4 text-green-700' /> : <Circle className='mr-4' />}
              </div>
              <div className='flex justify-between items-center w-full'>
                <span className={`text-lg ${todo.isDone ? 'text-gray-400  line-through' : 'text-black'}`}>
                  {todo.text}
                </span>
                <button onClick={() => handleDeleteTodo(todo.id)} className='text-white group-hover:text-red-700'>
                  X
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className='flex mx-auto w-full items-center py-2 px-2 '>
          <span className=' text-sm px-2 py-2'>{activeTodosCount} item left</span>

          <div className='flex gap-2 justify-center px-8'>
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-3 py-1 rounded cursor-pointer ${
                selectedFilter === 'all' ? 'border border-red-200' : 'hover:border-red-200/50 border border-transparent'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedFilter('active')}
              className={`px-3 py-1 rounded cursor-pointer ${
                selectedFilter === 'active'
                  ? 'border border-red-200'
                  : 'hover:border-red-200/50 border border-transparent'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setSelectedFilter('completed')}
              className={`px-3 py-1 rounded cursor-pointer ${
                selectedFilter === 'completed'
                  ? 'border border-red-200'
                  : 'hover:border-red-200/50 border border-transparent'
              }`}
            >
              Completed
            </button>
          </div>
          <div className=''>
            {isDeleteCompleted && (
              <button className='cursor-pointer text-sm' onClick={handleDeleteCompleted}>
                Clear completed
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
