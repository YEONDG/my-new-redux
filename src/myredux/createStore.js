// 미들웨어 생략
export const createStore = (reducer, preloadedState) => {
  let currentReducer = reducer;
  let currentState = preloadedState;
  let currentListeners = new Map();
  let nextListeners = currentListeners;
  let listenerIdCounter = 0;

  // 리듀서의 순수성을 강제하기 위한 보호 장치치
  let isDispatching = false;

  // 액션이 디스패치되어 리스너 함수들이 실행되는 도중에, 그 리스너 함수 안에서 또 다른 구독이나 구독 해지가 일어나는 경우를 안전하게 처리
  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = new Map();
      currentListeners.forEach((listener, key) => {
        nextListeners.set(key, listener);
      });
    }
  }

  function getState() {
    return currentState;
  }

  function subscribe(listener) {
    if (isDispatching) {
      throw new Error('에러');
    }

    let isSubscribed = true;

    ensureCanMutateNextListeners();
    const listenerId = listenerIdCounter++;
    nextListeners.set(listenerId, listener);

    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      if (isDispatching) {
        throw new Error('리듀서 실행 중에는 구독해지 못합니다.');
      }

      isSubscribed = false;

      ensureCanMutateNextListeners();
      nextListeners.delete(listenerId);
      currentListeners = null;
    };
  }

  function dispatch(action) {
    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    const listeners = (currentListeners = nextListeners);
    listeners.forEach((listener) => {
      listener();
    });

    return action;
  }

  dispatch({ type: '@@INIT' });

  const store = {
    dispatch,
    subscribe,
    getState,
  };

  return store;
};
