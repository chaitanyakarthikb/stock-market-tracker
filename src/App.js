import logo from "./logo.svg";
import "./App.css";
// import {BSE, NSE, searchSymbol} from 'nse-bse-api';
import { useEffect, useState } from "react";
import AutoCompleteItem from "./components/AutoCompleteItem";
import Chart from "./components/Chart";
const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const API_URL = process.env.REACT_APP_ALPHA_VANTAGE_API_URL;
  const API_KEY = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY;

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (searchQuery.length > 2) {
        try {
          const response = await fetch(
            API_URL +
              `?function=SYMBOL_SEARCH&keywords=${searchQuery}&apikey=${API_KEY}`
          );
          const data = await response.json();
          setSearchResults(data?.bestMatches);
        } catch (error) {
          console.error("============error============", error);
        }
      }
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  useEffect(() => {
    console.log("item selected is ", selectedItem);
    if (selectedItem) {
      setSearchQuery(selectedItem.name);
    }
  }, [selectedItem]);

  const handleSearchButton = ()=>{
    console.log("hello world, item selected is ",selectedItem)
  }

  console.log("===============searchResults", searchResults);

  return (
    <div className="container">
      <input
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          if (selectedItem) {
            setSelectedItem(null);
          }
        }}
        className="search-input"
        type="text"
        placeholder="Search for a stock"
      />
      <button onClick={() => handleSearchButton()} className="search-button">
        Search
      </button>

      <div className="autoCompleteSuggestions">
        {!selectedItem &&
          searchQuery.length > 2 &&
          searchResults &&
          searchResults.length > 0 &&
          searchResults.map((el, index) => {
            return (
              <AutoCompleteItem
                key={`${el["1. symbol"]}-${index}`}
                setSelectedItem={setSelectedItem}
                item={el}
              />
            );
          })}
      </div>

      <Chart/>
      <div className="buttons">
        <button>Last 3d</button>
        <button>Last 1w</button>
        <button>Last 3m</button>
        <button>Last 6m</button>
        <button>Last 1y</button>
        <button>Last 3y</button>
        <button>Last 5y</button>
      </div>

      
    </div>
  );
};

export default App;
