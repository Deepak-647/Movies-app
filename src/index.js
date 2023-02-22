import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { createStore ,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

//curried function logger (obj,next,action) 
// const  logger = function ({dispatch,getState}){
//   return function (next){
//     return function(action){
//       //middleware code
//       console.log('ACTION TYPE =',action.type);
//       next(action);
//     }
//   }
// }

const logger =({dispatch,getState}) => (next) =>(action) =>{
  //logger code
  if (typeof action !== 'function'){
    console.log('ACTION TYPE =',action.type);
  }
    
  
   
      next(action);
}

// const thunk =({dispatch, getState}) =>(next)=>(action) =>{
//   //logger code
//   if(typeof action ==='function'){
//     action(dispatch);
//     return;
//   }
//   next(action);
// }

const store = createStore(rootReducer ,applyMiddleware(logger,thunk));
console.log('STORE',store);
// console.log('BEFORE STATE',store.getState());


export const StoreContext = createContext();

console.log("StoreContext",StoreContext);
// store.dispatch({
//   type : "ADD_MOVIES",
//   movies: [{name:"Superman"}]
// });

// console.log('AFTER STATE',store.getState());

class Provider extends React.Component{
  render(){
    const {store} =this.props;
return <StoreContext.Provider value={store}>
  {this.props.children}
</StoreContext.Provider>
  }
}



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>
);


