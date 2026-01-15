import logo from './logo.svg';
import './App.css';
// import {BSE, NSE, searchSymbol} from 'nse-bse-api';
import { useEffect, useState } from 'react';
const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const API_URL = process.env.ALPHA_VANTAGE_API_URL;
  const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;


  useEffect(()=>{
    const timeout = setTimeout( async()=>{
      if(searchQuery.length > 2){
        try {
          const response = await fetch(API_URL + `?function=SYMBOL_SEARCH&keywords=${searchQuery}&apikey=${API_KEY}`);
          const data = await response.json();
          console.log("============data============",data?.bestMatches);
          setSearchResults(data?.bestMatches);
        } catch (error) {
          console.error("============error============",error);
        }
      }
    }, 300);
    return ()=>clearTimeout(timeout);
  },[searchQuery]);


  console.log("===============searchResults",searchResults);

  return (
    <div className="container">
     <input onChange={(e)=>setSearchQuery(e.target.value)} className="search-input" type="text" placeholder="Search for a stock" />
     <button className="search-button">Search</button>
    </div>
  );
};

export default App;
