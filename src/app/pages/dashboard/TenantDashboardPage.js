import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/dashboard/dashboardActions";
import { Line, Bar, Doughnut, Pie, Scatter } from "react-chartjs-2";
import Chart from "react-apexcharts";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../_ui/layout/elements";
import SVG from "react-inlinesvg";
import { loadAnimation } from "lottie-web";
import { defineLordIconElement } from "lord-icon-element";
import { number } from "yup";

// register lottie and define custom element
defineLordIconElement(loadAnimation);

function TenantDashboardPage() {
  // Getting curret state of dashboard statistics from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.dashboard }),
    shallowEqual
  );
  const { statistics, listLoading } = currentState;
  const labelColor = "red";
  const borderColor = "grey";
  const baseColor = "blue";
  const secondaryColor = "purple";
  const height = 200;

  const strokeColor = "grey";
  const lightColor = "black";
  const [groupCharData, setGroupChartData] = useState([]);
  const [groupChartDates, setGroupChartDates] = useState([]);

  const DemoData = [
    {
      name: "Net Profit",
      data: [44, 55, 57, 56, 61, 58],
    },
    {
      name: "Revenue",
      data: [76, 85, 101, 98, 87, 105],
    },
  ];

  const ResultGroupXhER = [];

  const a = () => {
    return [];
  };

  useEffect(() => {
    console.log(statistics);
    if (statistics != null) {
      const totalAppointments = [];
      const completedAppointments = [];
      const dateLabel = [];

      statistics.barChartData.map((item, index) => {
        if (item.totalAppointments != null) {
          totalAppointments.push(item.totalAppointments);
        }

        if (item.completedAppointments != null) {
          completedAppointments.push(item.completedAppointments);
        }

        if (item.dateLabel != null) {
          dateLabel.push(item.dateLabel);
        }
      });

      const DuplicateArray = [
        {
          name: "Total Appointments",
          data: totalAppointments,
        },
        {
          name: "Completed Appointments",
          data: completedAppointments,
        },
      ];

      console.log(dateLabel);
      setGroupChartDates(dateLabel);

      setGroupChartData(DuplicateArray);
      console.log(groupChartDates);
    }
  }, [statistics]);

  let ChartData = {
    options: {
      xaxis: {
        categories: groupChartDates,
      },
      yaxis: {
        categories: [2001, 2002, 2003, 2004, 2005, 2006, 2007],
        labels: {
          formatter: function (val) {
            return val + " August";
          },
        },
      },
      colors: ["#009ef7", "#e4e6ef", "#9C27B0"],
      chart: {
        fontFamily: "inherit",
        type: "bar",
        height: height,
        toolbar: {
          show: true,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "30%",
          borderRadius: 5,
        },
        legend: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
        offsetX: -6,
        style: {
          fontSize: "12px",
          colors: ["#fff"],
        },
      },
      grid: {
        borderColor: borderColor,
        strokeDashArray: 4,
        yaxis: {
          categories: [2001, 2002, 2003, 2004, 2005, 2006, 2007],
        },
      },
    },
  };

  let ChartLineData = {
    series: [
      {
        name: "High - 2013",
        data: [28, 29, 33, 36, 32, 32, 33],
      },
      {
        name: "Low - 2013",
        data: [12, 11, 14, 18, 17, 13, 13],
      },
    ],

    options: {
      fontFamily: "inherit",
      type: "area",
      height: "800",
      toolbar: {
        show: false,
      },
    },

    plotOptions: {},
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "solid",
      opacity: 1,
    },
    stroke: {
      curve: "smooth",
      show: true,
      width: 3,
      colors: [baseColor],
    },
    xaxis: {
      categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        style: {
          colors: labelColor,
          fontSize: "12px",
        },
      },
      crosshairs: {
        show: false,
        position: "front",
        stroke: {
          color: strokeColor,
          width: 1,
          dashArray: 3,
        },
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      min: 0,
      max: 60,
      labels: {
        show: false,
        style: {
          colors: labelColor,
          fontSize: "12px",
        },
      },
    },
    states: {
      normal: {
        filter: {
          type: "none",
          value: 0,
        },
      },
      hover: {
        filter: {
          type: "none",
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: "none",
          value: 0,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: "12px",
      },
      y: {
        formatter: function (val) {
          return "$" + val + " thousands";
        },
      },
    },
    colors: [lightColor],
    markers: {
      colors: [lightColor],
      strokeColors: [baseColor],
      strokeWidth: 3,
    },
  };

  const [chartData, setChartData] = useState(ChartData);
  const [chartLineData, setLineData] = useState(ChartLineData);

  console.log(statistics, listLoading);

  // Dashboard Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // server call by queryParams
    dispatch(actions.fetchTenantDashboardStatistics());
  }, [dispatch]);

  useEffect(() => {
    var todayElem = document.getElementById("today");
    var monthElem = document.getElementById("month");
    var yearElem = document.getElementById("year");

    monthElem.addEventListener("click", function () {
      monthElem.classList.add("active");
      yearElem.classList.remove("active");
      todayElem.classList.remove("active");
    });

    yearElem.addEventListener("click", function () {
      monthElem.classList.remove("active");
      yearElem.classList.add("active");
      todayElem.classList.remove("active");
    });

    todayElem.addEventListener("click", function () {
      monthElem.classList.remove("active");
      yearElem.classList.remove("active");
      todayElem.classList.add("active");
    });
  }, []);

  const data = {
    labels: ["2013", "2014", "2014", "2015", "2016", "2017"],
    datasets: [
      {
        label: "# of Votes",
        data: [10, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255,99,132,1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
        fill: false,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
          gridLines: {
            color: "rgba(204, 204, 204,0.1)",
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            color: "rgba(204, 204, 204,0.1)",
          },
        },
      ],
    },
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
  };

  const doughnutPieData = {
    datasets: [
      {
        data: [30, 40, 30],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderColor: [
          "rgba(255,99,132,1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
      },
    ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: ["Pink", "Blue", "Yellow"],
  };

  const doughnutPieOptions = {
    responsive: true,
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-7">
          <ul className="buttonwrapper">
            <li id="today" className="active">
              <label id="l1">TODAY</label>
            </li>
            <li id="month" className="">
              <label id="l2">MONTH</label>
            </li>
            <li id="year" className="">
              <label id="l3">YEAR</label>
            </li>
          </ul>
        </div>

        <div className="col-md-5 text-right date-indicator" id="date">
          July, 27th 2021
        </div>
      </div>

      {/* begin::Row */}
      <div className="row mb-5">
        <div className="col-12 col-md-3  mb-2">
          <Card>
            <CardBody>
              <span
                className={`svg-icon-primary`}
                style={{ width: "250", height: "250" }}
              >
                <lord-icon
                  trigger="hover"
                  src="https://cdn.lordicon.com/gqdnbnwt.json"
                ></lord-icon>
                <div className={`text-dark fw-bolder fs-2 mb-2 mt-1 display-5`}>
                  <strong>
                    {statistics != null ? statistics.totalSites : "0"}
                  </strong>
                </div>

                <div className={`fw-bold text-grey fs-7`}>Total Sites</div>
              </span>
            </CardBody>
          </Card>
        </div>

        <div className="col-12 col-md-3 mb-2">
          <Card>
            <CardBody>
              <span
                className={`svg-icon-primary`}
                style={{ width: "250", height: "250" }}
              >
                <lord-icon
                  trigger="hover"
                  src="https://cdn.lordicon.com/jvucoldz.json"
                ></lord-icon>
                <div className={`text-dark fw-bolder fs-2 mb-2 mt-1 display-5`}>
                  <strong>
                    {statistics != null ? statistics.totalAppointments : "0"}
                  </strong>
                </div>

                <div className={`fw-bold text-grey fs-7`}>
                  Total Appointments
                </div>
              </span>
            </CardBody>
          </Card>
        </div>

        <div className="col-12 col-md-3  mb-2">
          <Card>
            <CardBody>
              <span
                className={`svg-icon-primary`}
                style={{ width: "250", height: "250" }}
              >
                <lord-icon
                  trigger="hover"
                  src="https://cdn.lordicon.com/dxjqoygy.json"
                ></lord-icon>
                <div className={`text-dark fw-bolder fs-2 mb-2 mt-1 display-5`}>
                  <strong>
                    {statistics != null ? statistics.totalVisitors : "0"}
                  </strong>
                </div>

                <div className={`fw-bold text-grey fs-7`}>Total Visitors</div>
              </span>
            </CardBody>
          </Card>
        </div>

        <div className="col-12 col-md-3 mb-2 ">
          <Card>
            <CardBody>
              <span
                className={`svg-icon-primary`}
                style={{ width: "250", height: "250" }}
              >
                <lord-icon
                  trigger="hover"
                  src="https://cdn.lordicon.com/lthhecik.json"
                ></lord-icon>
                <div className={`text-dark fw-bolder fs-2 mb-2 mt-1 display-5`}>
                  <strong>
                    {statistics != null
                      ? statistics.todayTotalAppointments
                      : "0"}
                  </strong>
                </div>

                <div className={`fw-bold text-grey fs-7`}>
                  Today Appointments
                </div>
              </span>
            </CardBody>
          </Card>
        </div>
      </div>
      {/* end::Row */}

      <div className="row">
        <div className="col-12 col-xl-6">
          <Card>
            <CardHeader title="Roles list">
              <CardHeaderToolbar></CardHeaderToolbar>
            </CardHeader>
            <CardBody>
              <Chart
                options={chartData.options}
                series={groupCharData}
                type="bar"
                width="600"
              />
            </CardBody>
          </Card>
        </div>

        <div className="col-12 col-xl-6">
          <Card>
            <CardHeader title="Roles list">
              <CardHeaderToolbar></CardHeaderToolbar>
            </CardHeader>
            <CardBody>
              <Chart
                options={chartLineData.options}
                series={chartLineData.series}
                type="line"
                width="600"
              />
            </CardBody>
          </Card>
        </div>
      </div>

      <div className="row g-5 g-xl-5 mt-5">
        <div className="col-xl-4">
          <Card>
            <CardBody>
              {/* begin::Header */}
              <div
                className={`px-5 pt-5 card-rounded h-275px w-100 bg-primary`}
              >
                {/* begin::Heading */}
                <div className="d-flex flex-stack">
                  <h3 className="m-0 text-white fw-bolder fs-3">
                    Sales Summary
                  </h3>
                </div>
                {/* end::Heading */}
                {/* begin::Balance */}
                <div className="d-flex text-center flex-column text-white pt-5 pb-5 ">
                  <span className="fw-bold fs-5">Your Balance</span>
                  <span
                    className="fw-bolder fs-2x pt-1 display-5"
                    style={{ fontWeight: "500" }}
                  >
                    $37,562.00
                  </span>
                </div>
                {/* end::Balance */}
              </div>
              {/* end::Header */}
              {/* begin::Items */}
              <div className="shadow-xs card-rounded mx-5 mb-5 px-5 py-5 position-relative z-index-1 bg-white">
                {/* begin::Item */}
                <div className="d-flex align-items-center mb-5">
                  {/* begin::Description */}
                  <div className="d-flex align-items-center flex-wrap w-100">
                    {/* begin::Title */}
                    <div className="mb-1 pe-5 flex-grow-1 pl-5">
                      <a
                        href="#"
                        className="fs-5 text-gray-800 text-hover-primary fw-bolder display-5"
                      >
                        Sales
                      </a>
                      <div className="text-gray-400 fw-bold fs-5 ">
                        100 Regions
                      </div>
                    </div>
                    {/* end::Title */}
                    {/* begin::Label */}
                    <div className="d-flex align-items-center">
                      <div className="fw-bolder fs-5 text-gray-800 pe-1 display-5">
                        $2,5b
                      </div>
                    </div>
                    {/* end::Label */}
                  </div>
                  {/* end::Description */}
                </div>
                {/* end::Item */}
              </div>
              {/* end::Items */}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default TenantDashboardPage;
