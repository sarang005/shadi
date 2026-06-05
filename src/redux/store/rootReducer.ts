import authReducer from "../slices/authSlice";
import dashboardReducer from "../slices/dashboardSlice";
import matchesReducer from "../slices/matchesSlice";
import profileRegistrationReducer from "../slices/profileRegistrationSlice";
import profileViewReducer from "../slices/profileViewSlice";

export const rootReducer = {
  auth: authReducer,
  dashboard: dashboardReducer,
  matches: matchesReducer,
  profileRegistration: profileRegistrationReducer,
  profileView: profileViewReducer,
};
