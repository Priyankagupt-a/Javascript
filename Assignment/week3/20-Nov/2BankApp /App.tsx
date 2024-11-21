import React from "react";
import { AuthProvider } from "./component/AuthProvider";
import UserProfile from "./component/UserProfile";
import BankApp from "./pages/BankaApp/BankApp";
 

const App: React.FC = () => (
  // <AuthProvider>
  //   <UserProfile />
  // </AuthProvider>
  <BankApp/>
);

export default App;
