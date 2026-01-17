import './Chart.css';
import {Line} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend
  } from "chart.js";
import { useEffect, useState } from 'react';
import generateChartData from '../helpers/generateChartData';
  
  ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
  )

const Chart = (props)=>{
    let {selectedItem,selectedTimeInterval} = props;
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(false);

    console.log("Selected time interval is ",selectedTimeInterval);
    console.log("Selected item is ",selectedItem);

    useEffect(() => {
      const fetchChartData = async () => {
        if (selectedItem && selectedTimeInterval) {
          setLoading(true);
          try {
            const result = await generateChartData(selectedItem, selectedTimeInterval);
            setChartData(result);
          } catch (error) {
            console.error("Error generating chart data:", error);
          } finally {
            setLoading(false);
          }
        }
      };

      fetchChartData();
    }, [selectedItem, selectedTimeInterval]);

    return (
      <div className="chart">
        {loading && <p>Loading chart data...</p>}
        {selectedItem && selectedTimeInterval && chartData && !loading && (
          <Line className="my-line-chart" data={chartData.data} options={chartData.options} />
        )}
      </div>
    );
}

export default Chart;