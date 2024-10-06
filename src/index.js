import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Chart from "react-apexcharts";

const timeStamp = [
  "Today",
  "1 Hour",
  "6 Hours",
  "24 Hours",
  "1 Day",
  "7 Days",
  "30 Days",
  "All Time",
];

const tokens = ["BNB", "POLYGON", "BLAST", "SCROLL", "ZORA"];

function App() {
  return (
    <div className="container">
      <Header />
      <MintSection />
      <HolderSection />
    </div>
  );
}

function Header() {
  return (
    <div className="header">
      <img src="8047101.jpg" alt="logo" />
      <h1>ZNS Connect</h1>
    </div>
  );
}

function MintSection() {
  const genArray = Array.from({ length: 30 }, (_, i) => {
    const time = new Date().setHours(i, 0, 0, 0); // Each hour within a day
    const value = Math.floor(Math.random() * 300) + 100; // Random value between 30M and 40M
    return [time, value];
  });

  const dates = genArray;

  const state = {
    series: [
      {
        name: "Mints",
        data: dates, // Array of 100 data points
      },
    ],
    options: {
      chart: {
        type: "area",
        stacked: false,
        height: 300,
        zoom: {
          type: "x",
          enabled: true,
          autoScaleYaxis: true,
        },
        toolbar: {
          show: false,
        },
        background: "#161616", // Dark background color
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.7,
          opacityTo: 0.1,
          stops: [0, 90, 100],
          colorStops: [
            { offset: 0, color: "#C6EC32", opacity: 0.8 }, // Neon green at the top
            { offset: 100, color: "#fff", opacity: 0.8 }, // Dark background fade
          ],
        },
      },
      stroke: {
        curve: "smooth",
        width: 3,
        colors: ["#C6EC32"], // Neon green line color
      },
      grid: {
        show: false, // Hide grid lines
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            return val.toFixed(0); // Y-axis labels as integer
          },
          style: {
            colors: "#fff", // White y-axis labels
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      xaxis: {
        type: "datetime", // X-axis as time
        labels: {
          style: {
            colors: "#fff", // White x-axis labels for dark mode
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      tooltip: {
        theme: "dark", // Dark tooltip theme
        x: {
          format: "HH:mm", // Time format (hours and minutes)
        },
      },
    },
  };

  return (
    <div className="mint-details">
      <div>
        <div className="primary-details">
          <MintCardContainer title={"Minting"} value={1300} percent={15} />
          <MintCardContainer title={"Holders"} value={1000} percent={7} />
        </div>
        <Reg />
      </div>
      <div className="sec-details">
        <p>Minting in the last 24 Hours</p>
        <Chart
          options={state.options}
          series={state.series}
          type="area"
          height={460}
        />
      </div>
    </div>
  );
}

function Reg() {
  const genNumber = (num, rand, startNum) => {
    const numberGen = Array.from({ length: num }, (_, i) => i).map((index) =>
      rand ? Math.trunc(Math.random() * 100) + 1 : startNum++
    );

    return numberGen;
  };

  const todayValue = genNumber(4, true, 0);
  const oneHValue = genNumber(4, true, 0);
  const sixHValue = genNumber(6, true, 0);
  const tfHValue = genNumber(24, true, 0);
  const oneDValue = genNumber(4, true, 0);
  const sevenDValue = genNumber(7, true, 0);
  const tDValue = genNumber(30, true, 0);
  const allTimeValue = genNumber(7, true, 0);

  // const todayValue=

  const regGraph = {
    Today: [["00 Hr", "06 Hr", "12 Hr", "18 Hr"], todayValue],

    "1 Hour": [["00 Min", "15 Min", "30 Min", "45 Min"], oneHValue],

    "6 Hours": [["1 Hr", "2 Hr", "3 Hr", "4 Hr", "5 Hr", "6 Hr"], sixHValue],

    "24 Hours": [genNumber(24, "", 0), tfHValue],

    "1 Day": [["00", "06", "12", "16"], oneDValue],

    "7 Days": [["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], sevenDValue],

    "30 Days": [genNumber(30, "", 1), tDValue],

    "All Time": [genNumber(7, "", 2018), allTimeValue],
  };

  const [selectGraph, setSelectGraph] = useState(regGraph[timeStamp[0]]);

  const state = {
    options: {
      chart: {
        id: "apexchart-example",
        width: "10%",
        background: "#161616", // Dark background for the chart
        foreColor: "#f0f0f0", // Light text color for the chart
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "30%",
          distributed: true,
          borderRadius: 4, // Add border radius to bars
        },
      },
      colors: ["#C6EC32"], // Set the bar color
      xaxis: {
        axisBorder: {
          show: false, // Remove x-axis line
        },
        axisTicks: {
          show: false, // Remove ticks on x-axis
        },
        categories: selectGraph[0],
        labels: {
          style: {
            colors: "#f0f0f0", // Light color for x-axis labels
          },
        },
      },
      yaxis: {
        show: false,
        axisBorder: {
          show: false, // Remove y-axis line
        },
        labels: {
          style: {
            colors: "#000", // Optionally, set the color of y-axis labels
          },
        },
      },
      grid: {
        show: false, // Remove grid lines
      },

      tooltip: {
        enabled: true, // Tooltips are enabled
        theme: "dark", // Dark theme for tooltips
      },
      dataLabels: {
        enabled: false, // Show or hide data labels
        style: {
          colors: ["#000"], // Data label colors
        },
      },

      legend: {
        show: false,
      },
    },
    series: [
      {
        name: "Registrations",
        data: selectGraph[1],
      },
    ],
  };

  return (
    <>
      <div className="reg-container">
        <p>Registrations</p>
        <Select content={timeStamp} setData={setSelectGraph} datas={regGraph} />
      </div>
      <div className="reg-graph">
        <Chart
          options={state.options}
          series={state.series}
          type="bar"
          // width={500}
          height={320}
        />
      </div>
    </>
  );
}

function Select({ setData, datas, content }) {
  const [option, setOption] = useState(content[0]);
  const [showOptions, setShowOptions] = useState(false);

  function handleOption(e) {
    setData(datas[e.target.textContent]);
    // console.log(datas[e.target.textContent]);
    setOption(e.target.textContent);
  }

  return (
    <div>
      <div
        className="select-box"
        onClick={() => setShowOptions((show) => !show)}
      >
        <p>{option}</p>
        <img src="down-arrow.png" alt="DOWN ARROW" />
      </div>
      <div
        className="opts"
        style={{ display: showOptions === true ? "flex" : "none" }}
      >
        {content.map((time, i) => (
          <div
            className={`opt ${time === option ? "active" : ""}`}
            key={i + 1}
            onClick={(e) => {
              handleOption(e);
              setShowOptions((show) => !show);
            }}
          >
            {time}
          </div>
        ))}
      </div>
    </div>
  );
}

function MintCardContainer({ title, value, percent }) {
  return (
    <div className="mint-card-box">
      <div className="mint-card-details">
        <h2>Total {title}</h2>
        <span>{value}</span>
        <p>
          <img src="arrow-up.png" alt="arrow up" />
          {percent}% last month
        </p>
      </div>
      <div className="mint-card-graph">
        <img src="chart.png" alt="chart" />
      </div>
    </div>
  );
}

function HolderSection() {
  const getAddNumber = (chain) => {
    const addArray = Array.from({ length: 100 }, (_, i) => i).map(
      (num, index) => {
        return {
          tokenAdd: "0x" + chain + "Holder" + String(num).padStart(30, 0),
          amount: 1000 - index * 10,
          rank: index + 1,
        };
      }
    );

    return addArray;
  };

  const holderData = {
    BNB: getAddNumber("bnb"),
    ZORA: getAddNumber("zora"),
    SCROLL: getAddNumber("scroll"),
    BLAST: getAddNumber("blast"),
    POLYGON: getAddNumber("polygon"),
  };

  const [selectionArray, setSelectionArray] = useState(holderData[tokens[0]]);

  return (
    <div>
      <div className="holder-container">
        <div className="holder-box">
          <div className="holder-title">
            <p>Top Holders</p>
            <Select
              setData={setSelectionArray}
              datas={holderData}
              content={tokens}
            />
          </div>

          <div className="holder-details">
            <span>Holder</span>
            <span>Amount</span>
            <span>Rank</span>
          </div>

          <div className="holder-token-box">
            {selectionArray.map((addObj, index) => (
              <div className="holder-details" key={index + 1}>
                <span>{addObj.tokenAdd}</span>
                <span>{addObj.amount}</span>
                <span>{addObj.rank}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
