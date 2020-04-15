import {combineReducers} from "redux";
import {offers} from "./offers/offers.js";
import {user} from "./user/user.js";
import {application} from "./application/application.js";

export const rootReducer = combineReducers({
  offers,
  user,
  application
});
