import {createStore,combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { userLoginReducer, userRegisterReducer, userUpdateReducer } from "./reducers/userReducer";
import { noteCreateReducer, noteDeleteReducer, noteListReducer, noteUpdateReducer } from "./reducers/noteReducer";

const reducer=combineReducers({
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    noteList:noteListReducer,
    noteCreate:noteCreateReducer,
    noteUpdate:noteUpdateReducer,
    noteDelete:noteDeleteReducer,
    userUpdate:userUpdateReducer
})
const userInfofromstorage=localStorage.getItem("userdet")?
   JSON.parse(localStorage.getItem("userdet")):null;

const initialState={
     userLogin:{userDet:userInfofromstorage}
};

const middleware=[thunk];

const store=createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))

)

export default store;
