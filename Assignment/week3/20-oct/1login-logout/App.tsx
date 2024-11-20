import React from "react";
import { AuthProvider } from "./component/AuthProvider";
import UserProfile from "./component/UserProfile";
 

const App: React.FC = () => (
  <AuthProvider>
    <UserProfile />
  </AuthProvider>
);

export default App;
