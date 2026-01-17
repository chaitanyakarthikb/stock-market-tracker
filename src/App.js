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
  const [selectedTimeInterval, setSelectedTimeInterval] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_ALPHA_VANTAGE_API_URL;
  const API_KEY = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY;

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (searchQuery.length >= 2) {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(
            API_URL +
              `?function=SYMBOL_SEARCH&keywords=${searchQuery}&apikey=${API_KEY}`
          );
          console.log("=====response====", response);
          const data = await response.json();
          console.log("=====data====", data);
          if (data?.Information) {
            throw new Error("Limit Reached");
          }

          setSearchResults(data?.bestMatches);
          setLoading(false);
        } catch (error) {
          setError(error.message || "An error occurred while fetching data");
          setLoading(false);
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
    setSelectedTimeInterval("3d")
  }

  let buttonValues = ["3d","1w","3m","6m","1y","3y","5y"]

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
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
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
      <Chart selectedItem={selectedItem} selectedTimeInterval={selectedTimeInterval}/>
      <div className="buttons">
        {buttonValues.map((btnValue)=>{
          return (
            <button className={selectedTimeInterval === btnValue ? "active" : ""} onClick={()=>{
              setSelectedTimeInterval(btnValue)
            }}>Last {btnValue}</button>
          ) 
        })}
      </div>
    </div>
  );
};

export default App;
