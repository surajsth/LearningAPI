
// import './App.css';

import { useContext } from "react";
import ForImage from "./CompImage/ForImage";
import ContainUser from "./Component/ContainUser";
import Dashboard from "./Component/Dashboard";
import Layout from "./Component/Layout/Layout";
import Login from "./Component/Login";
// import Navbar from "./Component/Navbar";
// import Sidebar from "./Component/Sidebar";
import StateUser from "./Component/StateUser";
import TableData from "./Component/TableData";
import { Routes, Route } from "react-router-dom";
import AuthContext from "./Component/AuthContext";
import RoleName from "./Role/RoleName";
import RoleState from "./Role/RoleState";
import FiscalTab from "./fiscal/FiscalTab";
import FiscalState from "./fiscal/FiscalState";
import TimeoutComponent from "./TimeOut";
import NoPage from "./Action/NoPage";


function App() {
  const { User } = useContext(AuthContext)
  console.log(User)
  return (
    <>
      <Routes>
        {!User && <Route path="/" element={<Login />} />}

      </Routes>
      <div className="App">
        {User && (
          <>
            <StateUser>
              <RoleState>
                <FiscalState>
                  <Layout>


                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/user" element={<TableData />} />
                      <Route path="/role" element={<RoleName />} />
                      <Route path="/fiscal" element={<FiscalTab />} />
                      <Route path="*" element={<NoPage />} />


                    </Routes>
                  </Layout>
                </FiscalState>
              </RoleState>
            </StateUser>
          </>
        )}
      </div>


      {/* <Router>
        <Routes>
          <Route path="/" element={<TableData />} />
          <Route path="/data" element={<ContainUser />} />
        </Routes>
      </Router> */}

      {/* <ForImage /> */}
    </>
  );
}

export default App;
