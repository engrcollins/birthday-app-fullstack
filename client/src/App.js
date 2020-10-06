import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Form from './components/Form';
import { Link } from "react-router-dom";
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
      <ListItem >
          <AnchorLink href='#section1'>
            {  console.log(list[index])}
              <p className="list-group-item">{list[index]['name']}</p>
              <p>{list[index]['company']}</p>
              <p>{list[index]['position']}</p>
              <Divider />
            </AnchorLink>
      </ListItem>
    </div>
  );

    return (
      <div className="App">
      <div className="">
      <Grid container>
      <Grid item xs={11} sm={6} className="appContent">
        <Form users={users} fetchUsers={fetchUsers}/>
      </Grid>
      <Grid item xs={11} sm={6} className="appContent">
      {isLoading ? (<p>Data loading, please wait.. 
        <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
       </p>) : (
        <div className="article-list">
          <h3><strong>BIRTHDAY WISHES</strong></h3>
          <p>Type your name to search for your posted message(s).</p>
          <div className="article-search" id="list-search">

            <input
                type="text"
                id="article-searcher"
                className="searchbox"
                placeholder="Search list with keywords"
                onKeyUp={searchList}
            />
          </div>
            <div >
              <FixedSizeList
                className="List"
                height={500}
                width={listWidth}
                itemSize={60}
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
    </div>
    );
}

export default App;