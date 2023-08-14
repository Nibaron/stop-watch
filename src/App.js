import React, { useEffect, useReducer } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'START':
      return {
        time: action.payload.currentTime,
        isRunning: true,
      };

    case 'STOP':
      return {
        time: action.payload.currentTime,
        isRunning: false,
      };

    case 'RESET':
      return {
        time: 0,
        isRunning: false,
      };

    case 'UPDATE':
      return {
        time: action.payload.currentTime + 100,
        isRunning: true,
      };

    default:
      return state;
  }
};

function App() {
  const [timer, dispatch] = useReducer(reducer, { time: 0, isRunning: false });

  useEffect(() => {
    let interval;

    if (timer.isRunning) {
      interval = setInterval(() => {
        dispatch({ type: 'UPDATE', payload: { currentTime: timer.time } });
      }, 100);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timer]);

  const handleClick = (action) => {
    dispatch({ type: action, payload: { currentTime: timer.time } });
  };

  return (
    <div className='text-center mt-5'>
      <div>
        <span className='display-1'>
          {('0' + Math.floor((timer.time / 60000) % 60)).slice(-2) +':'}
        </span>
        <span className='display-1'>
          {('0' + Math.floor((timer.time / 1000) % 60)).slice(-2) +':'}
        </span>
        <span className='display-1'>
          {('0' + Math.floor((timer.time / 10) % 100)).slice(-2) }
        </span>
      </div>
      <div className='display-1'>
      <i className="bi bi-skip-start-circle" onClick={() => handleClick('START')}></i>
      <i className="bi bi-stop-circle" onClick={() => handleClick('STOP')}></i>
      <i className="bi bi-x-circle" onClick={() => handleClick('RESET')}></i>
      </div>
    </div>
  );
}

export default App;
