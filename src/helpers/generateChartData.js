const generateChartData = async (selectedItem, selectedTimeInterval) => {
  // If selectedTimeInterval is "3d" or "1w", fetch data from API
  if ((selectedTimeInterval === "3d" || selectedTimeInterval === "1w") && selectedItem ) {
    try {
      const symbol = selectedItem?.symbol;
      const API_KEY = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY;
      const API_URL = `${process.env.REACT_APP_ALPHA_VANTAGE_API_URL || 'https://www.alphavantage.co/query'}?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`;
      
      const response = await fetch(API_URL);
      const apiData = await response.json();

      console.log("=================apiData===========",apiData);
      
      if (apiData["Time Series (Daily)"]) {
        const timeSeries = apiData["Time Series (Daily)"];
        const dates = Object.keys(timeSeries).sort((a, b) => new Date(b) - new Date(a)); // Sort dates descending
        
        // Get number of days based on interval
        const daysToShow = selectedTimeInterval === "3d" ? 3 : 7;
        const selectedDates = dates.slice(0, daysToShow).reverse(); // Get latest N days and reverse for chronological order
        
        const labels = selectedDates.map(date => {
          const dateObj = new Date(date);
          return dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        });
        
        const closingPrices = selectedDates.map(date => parseFloat(timeSeries[date]["4. close"]));
        
        let data = {
          labels: labels,
          datasets: [
            {
              label: `${selectedItem?.name} - Last ${selectedTimeInterval}`,
              data: closingPrices,
              borderColor: "rgba(75,192,192,1)",
              backgroundColor: "rgba(75,192,192,0.2)",
              tension: 0.4, // smooth curve
            },
          ],
        };

        let options = {
          responsive: true,
          plugins: {
            legend: { position: "top" },
            title: { display: true, text: `${selectedItem.name || selectedItem.symbol} Stock Price Trend` },
          },
        };

        return {
          data,
          options,
        };
      } else {
        // Fallback if API response doesn't have expected structure
        throw new Error("Invalid API response structure");
      }
    } catch (error) {
      console.error("Error fetching stock data:", error);
      // Return default data on error
    }
  } else if ((selectedTimeInterval === "3m" || selectedTimeInterval === "6m" || selectedTimeInterval === "1y") && selectedItem) {
    try {
      const symbol = selectedItem?.symbol;
      const API_KEY = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY;
      const API_URL = `${process.env.REACT_APP_ALPHA_VANTAGE_API_URL || 'https://www.alphavantage.co/query'}?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${symbol}&apikey=${API_KEY}`;
      
      const response = await fetch(API_URL);
      const apiData = await response.json();

      console.log("=================apiData (Weekly)===========", apiData);
      
      if (apiData["Weekly Adjusted Time Series"]) {
        const timeSeries = apiData["Weekly Adjusted Time Series"];
        const dates = Object.keys(timeSeries).sort((a, b) => new Date(b) - new Date(a)); // Sort dates descending
        
        // Get number of weeks based on interval
        const weeksToShow = selectedTimeInterval === "3m" ? 12 : selectedTimeInterval === "6m" ? 24 : 52;
        const selectedDates = dates.slice(0, weeksToShow).reverse(); // Get latest N weeks and reverse for chronological order
        
        const labels = selectedDates.map(date => {
          const dateObj = new Date(date);
          return dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        });
        
        const closingPrices = selectedDates.map(date => parseFloat(timeSeries[date]["5. adjusted close"]));
        
        let data = {
          labels: labels,
          datasets: [
            {
              label: `${selectedItem?.name} - Last ${selectedTimeInterval}`,
              data: closingPrices,
              borderColor: "rgba(75,192,192,1)",
              backgroundColor: "rgba(75,192,192,0.2)",
              tension: 0.4, // smooth curve
            },
          ],
        };

        let options = {
          responsive: true,
          plugins: {
            legend: { position: "top" },
            title: { display: true, text: `${selectedItem.name || selectedItem.symbol} Stock Price Trend` },
          },
        };

        return {
          data,
          options,
        };
      } else {
        // Fallback if API response doesn't have expected structure
        throw new Error("Invalid API response structure");
      }
    } catch (error) {
      console.error("Error fetching weekly stock data:", error);
      // Return default data on error
    }
  } else if ((selectedTimeInterval === "3y" || selectedTimeInterval === "5y") && selectedItem) {
    try {
      const symbol = selectedItem?.symbol;
      const API_KEY = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY;
      const API_URL = `${process.env.REACT_APP_ALPHA_VANTAGE_API_URL || 'https://www.alphavantage.co/query'}?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=${API_KEY}`;
      
      const response = await fetch(API_URL);
      const apiData = await response.json();

      console.log("=================apiData (Monthly)===========", apiData);
      
      if (apiData["Monthly Time Series"]) {
        const timeSeries = apiData["Monthly Time Series"];
        const dates = Object.keys(timeSeries).sort((a, b) => new Date(b) - new Date(a)); // Sort dates descending
        
        // Get number of months based on interval
        const monthsToShow = selectedTimeInterval === "3y" ? 36 : 60;
        const selectedDates = dates.slice(0, monthsToShow).reverse(); // Get latest N months and reverse for chronological order
        
        const labels = selectedDates.map(date => {
          const dateObj = new Date(date);
          return dateObj.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        });
        
        const closingPrices = selectedDates.map(date => parseFloat(timeSeries[date]["4. close"]));
        
        let data = {
          labels: labels,
          datasets: [
            {
              label: `${selectedItem?.name} - Last ${selectedTimeInterval}`,
              data: closingPrices,
              borderColor: "rgba(75,192,192,1)",
              backgroundColor: "rgba(75,192,192,0.2)",
              tension: 0.4, // smooth curve
            },
          ],
        };

        let options = {
          responsive: true,
          plugins: {
            legend: { position: "top" },
            title: { display: true, text: `${selectedItem.name || selectedItem.symbol} Stock Price Trend` },
          },
        };

        return {
          data,
          options,
        };
      } else {
        // Fallback if API response doesn't have expected structure
        throw new Error("Invalid API response structure");
      }
    } catch (error) {
      console.error("Error fetching monthly stock data:", error);
      // Return default data on error
    }
  }
  
  // Default/fallback data
  let data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: selectedItem ? `${selectedItem?.name} Chart for Last ${selectedTimeInterval}` : "Stock Chart",
        data: [120, 150, 170, 160, 180],
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        tension: 0.4, // smooth curve
      },
    ],
  };

  let options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Stock Price Trend" },
    },
  };

  return {
    data,
    options,
  };
};
export default generateChartData;
