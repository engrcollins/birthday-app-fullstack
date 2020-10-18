import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './components/Header';
import Form from './components/Form';
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Grid, Divider} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import axios from 'axios';
import './App.css';

function App() {
  //const [ user, setUser ] = useState(null);
  const [ users, setUsers ] = useState([]);
  const [genData, setGenData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const listHeight = 500;
  const listWidth = 520;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setIsLoading(true);
    axios.get('/birthday-wishes')
    .then((response) => {
      let data = response.data;
      setUsers(response.data)
      setGenData(response.data)
      console.log(users);
      setIsLoading(false);
    })
    .catch(() => alert('Error fetching new users'));
};

const { isEmpty } = require('lodash');

const searchList= (e) =>{ 
  let searchInput = e.target.value;
  searchInput = searchInput.toLowerCase();
  let newData = genData.filter(function (item) {
      return item.name.toLowerCase().includes(searchInput);
  });
  setUsers(newData);
}
let list =[]
list= users.map(customer => {
    return customer
})

const Row = ({ index, style }) => (
  <div style={style} key={index} className={index % 2 ? 'ListItemOdd' : 'ListItemEven'}>
    <ListItem className="list-group-item" id="listing">
          {console.log(list[index])}
          <Card border="info" style={{ width:'62rem', textAlign:'center'}} className={'cardy'}>
            <Card.Body>
              <Card.Title>{list[index]['msgTitle']}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Date: {list[index]['date']}</Card.Subtitle>
              <Card.Text>
                {list[index]['msgContent']}
              </Card.Text>
            </Card.Body>
            <Card.Footer><button>Edit</button> <button>Delete</button>...with love from {list[index]['name']}</Card.Footer>
          </Card>
          <br />
          <br />
    </ListItem>
  </div>
);

const flip = (e) =>{
  var element = document.getElementById('flipper');
  if (element.className === "card") {
    if(element.style.transform == "rotateY(180deg)") {
      element.style.transform = "rotateY(0deg)";
    }
    else {
      element.style.transform = "rotateY(180deg)";
    }
  }
};
  return (
    <div className="App">
      <div align="center">
        <h4>Hurray!!! It's Queen's Birthday!</h4>
      </div>
    <Grid container>
    <Grid item xs={11} sm={6} className="appContent">
    <div className="flipContainer">
      <div class="card" id="flipper">
        <div class="front">
          <Form users={users} fetchUsers={fetchUsers} flip={flip}/>
        </div>
        <div class="back">
          <h4>Thank you 
            <br />
            for sending 
            <br />
            your wishes</h4>
            <button onClick={flip}>Flip</button>
        </div>
      </div>
    </div>
    </Grid>
    <Grid item xs={11} sm={6} className="appContent">
    {isLoading ? (<p>Data loading, please wait.. 
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
     </p>) : (
      <div className="article-list">
        <h3><strong>ALL BIRTHDAY WISHES</strong></h3>
        <div className="article-search" id="list-search">
          <input
              type="text"
              id="article-searcher"
              className="searchbox"
              placeholder="Search list with names"
              onKeyUp={searchList}
          />
        </div>
          <div align="center">
            <FixedSizeList
              className="List"
              height={500}
              width={listWidth}
              itemSize={340}
              itemCount={users.length}
              >
              {Row}
            </FixedSizeList>
          </div>
      </div>
     )}
    </Grid>
    </Grid>
  </div>
  );
}

export default App;