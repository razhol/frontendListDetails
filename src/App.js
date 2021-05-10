
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  useLocation,
  useParams,
  Link
} from 'react-router-dom';

let fromFunc = false ;


function App() {

  return (
    <Switcher />

  );




  function Switcher() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/Table:id">
            <Table />
          </Route>
          <Route path="/Dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </Router>
    )
  }




    function Home() {
        let [Name, setName] = useState('');
        let [Color, setColor] = useState('');
        let [Checked, setChecked] = useState(false);
    const history = useHistory();
    let query = new URLSearchParams(useLocation().search); 
     if(fromFunc === true){
      setTimeout( ()=>{
        let isChecked = query.get("checked") == '1' ? true : false;
        setName(query.get("name")); 
        setColor(query.get("color")); 
        setChecked(isChecked);
        fromFunc = false;
      },0)
     }


   const submmitReview =  () => {
         Axios.post('http://localhost:5000/api/insert',
        { Name: Name, Color: Color, Checked: Checked }).then(
          alert("succesful insert")
          
        ).then()  
          history.push("/Dashboard");
    }
 

    return (
      <div className="App container justify-content-center">
        <h1>Application</h1>
        <div className=" border rounded  p-5 mt-5">
          <div className="mb-3 justify-content-sm-center">
            <label className="form-label text-left col-form-label">Name</label>
            <div>
              <input value={Name} className="form-control" type="text" name="Name" onChange={
                (e) => {
                  setName(e.target.value)
                }
              } />
            </div>
          </div>


          <div className="mb-3 justify-content-sm-center">

            <label className="form-label text-left col-form-label">Favourite Color</label>
            <div>
              <input value={Color} className="form-control" type="text" name="Color" onChange={
                (e) => setColor(e.target.value)
              } />
            </div>
          </div>
          <div className="mb-3 form-check">
            <input checked = {Checked} type="checkbox" className="form-check-input" name="Checked"  onChange={() => setChecked(!Checked)} />
            <label className="form-check-label">Enabled</label>
          </div>


          <button type="submit" className="btn btn-primary" onClick={submmitReview}>Submit</button>
         


        </div>
      </div>
    );
  }

  function Table() {
    const [Name, setName] = useState('');
    const [Color, setColor] = useState('');
    const [checked, setChecked] = useState(false);
    return (
      <div>
        <h1>About</h1>
      </div>
    );
  }

  function Dashboard() {
    const [listPersopns, setPersonslist] = useState([]);
    const history = useHistory();
    setTimeout(() => {
      Axios.get('http://localhost:5000/read').then((response) => {
        setPersonslist(response.data);
      })
    }, 0);

    const PersonDetails = (name, color, checked) => {
      let url = '/?' + 'name=' + name + '&color=' + color + '&checked=' + (checked);
      fromFunc = true;
      history.push(''+url);

    }
  

    return (
      <div className="App container">
        <h1>Dashboard</h1>
        {listPersopns.map((val, i) => {
          return <div key={val.name + "" + i}>
            <h1>
              <button onClick={()=>{PersonDetails(val.name, val.color, val.enabled)}}>{val.id}  </button> | id: {val.name} | color: {val.color}| enabled: {val.enabled}
            
            </h1>
          </div>
        })}
      </div>
    );
  }
}

export default App;


