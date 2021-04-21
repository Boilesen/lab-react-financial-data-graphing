// import React, { useState, useEffect } from "react";
// import "semantic-ui-css/semantic.min.css";
// import { Card, Dimmer, Loader, Select } from "semantic-ui-react";
// import ApexCharts from "apexcharts";

// import Chart from "react-apexcharts";
// import "./App.css";

// const options = [
//   { value: "USD", text: "USD" },
//   { value: "EUR", text: "EUR" },
//   { value: "GBP", text: "GBP" },
//   { value: "BRL", text: "BRL" },
// ];

// function App() {
//   const [loading, setLoading] = useState(true);
//   const [priceData, setPriceData] = useState(null);
//   const [currency, setCurrency] = useState("USD");
//   const [chartData, setChartData] = useState(null);
//   const [series, setSeries] = useState(null);

//   useEffect(() => {
//     async function fetchData() {
//       const res = await fetch(
//         "https://api.coindesk.com/v1/bpi/currentprice.json"
//       );
//       const data = await res.json();
//       setPriceData(data.bpi);
//       getChartData();
//     }
//     fetchData();
//   }, []);

//   const handleSelect = (e, data) => {
//     setCurrency(data.value);
//   };

//   const getChartData = async () => {
//     const res = await fetch(
//       "https://api.coindesk.com/v1/bpi/currentprice.json"
//     );
//     const data = await res.json();
//     const categories = Object.keys(data.bpi);
//     const series = Object.values(data.bpi);
//     setChartData({
//       xaxis: {
//         categories: categories,
//       },
//     });

//     setSeries([
//       {
//         name: "Bitcoin Price",
//         data: series,
//       },
//     ]);

//     setLoading(false);
//   };

//   return (
//     <div className="App">
//       <div
//         className="nav"
//         style={{ padding: "15", color: "#111111", backgroundColor: "gold" }}
//       >
//         Coindesk Api Data
//       </div>
//       {loading ? (
//         <div>
//           <Dimmer active inverted>
//             <Loader>Loading</Loader>
//           </Dimmer>
//         </div>
//       ) : (
//         <div
//           className="price-container"
//           style={{
//             display: "flex",
//             justifyContent: "space-around",
//             alignItems: "center",
//             width: 600,
//             height: 300,
//             margin: "0 auto",
//           }}
//         >
//           <div className="form">
//             <Select
//               placeholder="selecione a moeda"
//               nChange={handleSelect}
//               options={options}
//             ></Select>
//           </div>
//           <div className="price">
//             <Card>
//               <Card.Content>
//                 <Card.Header>{currency} Moeda</Card.Header>
//                 <Card.Description>{priceData[currency].rate}</Card.Description>
//               </Card.Content>
//             </Card>
//           </div>
//           <Chart
//             options={chartData}
//             serues={series}
//             type="line"
//             width="1200"
//             height="300"
//           />
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;
import React, { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import { Card, Dimmer, Loader, Select } from "semantic-ui-react";
import ApexCharts from "apexcharts";

import Chart from "react-apexcharts";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [priceData, setPriceData] = useState(null);
  const [currency, setCurrency] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [series, setSeries] = useState(null);

  const options = [
    { value: "USD", text: "USD" },
    { value: "EUR", text: "EUR" },
    { value: "GBP", text: "GPB" },
  ];

  useEffect(() => {
    async function fetchPrices() {
      const res = await fetch(
        "https://api.coindesk.com/v1/bpi/currentprice.json"
      );
      const data = await res.json();
      setCurrency(data.bpi.USD.code);
      setPriceData(data.bpi);
      getChartData();
    }
    fetchPrices();
  }, []);

  const getChartData = async () => {
    const res = await fetch(
      `https://api.coindesk.com/v1/bpi/historical/close.json?`
    );
    const data = await res.json();
    const categories = Object.keys(data.bpi);
    const series = Object.values(data.bpi);
    setChartData({
      xaxis: {
        categories: categories,
      },
    });
    setSeries([
      {
        name: "Bitcoin Price",
        data: series,
      },
    ]);
    setLoading(false);
  };

  const handleSelect = (e, data) => {
    setCurrency(data.value);
  };

  return (
    <div className="container">
      <div className="nav" style={{ padding: "15px", backgroundColor: "gold" }}>
        Coindesk API Data
      </div>
      {loading ? (
        <div>
          <Dimmer active inverted>
            <Loader>Loading</Loader>
          </Dimmer>
        </div>
      ) : (
        <>
          <div
            className="price-container"
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              width: 600,
              height: 300,
              margin: "0 auto",
            }}
          >
            <div className="form">
              <Select
                placeholder="Select your currency"
                onChange={handleSelect}
                options={options}
              />
            </div>
            <div className="price">
              <Card>
                <Card.Content>
                  <Card.Header>{currency} Price</Card.Header>
                  <Card.Description>
                    {priceData[currency].rate}
                  </Card.Description>
                </Card.Content>
              </Card>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Chart
              options={chartData}
              series={series}
              type="line"
              width="1200"
              height="300"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
