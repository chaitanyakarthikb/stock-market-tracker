import logo from "./logo.svg";
import "./App.css";
// import {BSE, NSE, searchSymbol} from 'nse-bse-api';
import { useEffect, useState } from "react";
import AutoCompleteItem from "./components/AutoCompleteItem";
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
  }, [selectedItem]);

  console.log("===============searchResults", searchResults);

  return (
    <div className="container">
      <input
        value={selectedItem?.name}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
        type="text"
        placeholder="Search for a stock"
      />
      <div className="autoCompleteSuggestions">
        {!selectedItem &&
          searchResults.map((el) => {
            return (
              <AutoCompleteItem setSelectedItem={setSelectedItem} item={el} />
            );
          })}
      </div>

      <button className="search-button">Search</button>
    </div>
  );
};

export default App;
