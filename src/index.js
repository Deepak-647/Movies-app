import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { createStore ,applyMiddleware } from 'redux';
import rootReducer from './reducers';

//curried function logger (obj,next,action) 
const  logger = function ({dispatch,getState}){
  return function (next){
    return function(action){
      //middleware code
      console.log('ACTION TYPE =',action.type);
      next(action);
    }
  }
}
const store = createStore(rootReducer ,applyMiddleware(logger));
console.log('STORE',store);
// console.log('BEFORE STATE',store.getState());

// store.dispatch({
//   type : "ADD_MOVIES",
//   movies: [{name:"Superman"}]
// });

// console.log('AFTER STATE',store.getState());



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App store={store} />
  </React.StrictMode>
);


