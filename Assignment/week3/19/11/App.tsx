`import React from "react";
import logo from "./logo.svg";
import "./App.css";
import GridHoc from "./component/GridHoc";

function App() {
  return (
    <div className="App">
      <br></br><br></br>
    2.  Implement the following requirement using HOC concept:
		<br></br>	a.  Create a HOC that takes url, dataProperties as properties
    <br></br>b.  HOC should generate the grid (table format)  with the data return by the url.
    <br></br>c.   dataProperties  help us to iterate the columns in table 
    <br></br>d.   HOC returns the component that display data. 
			
    <br></br>gridHoc ---  urls:string,  dataProperties: string[]
    <br></br><br></br>

      <div>
        <GridHoc
          url="https://jsonplaceholder.typicode.com/users"
          dataProperties={[
            " id",
            "	name",
            "username",
            "email",
            "phone",
            "website",
            // 'address'
          ]}
        />
      </div>
    </div>
  );
}

export default App;
