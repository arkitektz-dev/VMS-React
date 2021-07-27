import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/dashboard/dashboardActions";
import { Line, Bar, Doughnut, Pie, Scatter } from "react-chartjs-2";

function TenantDashboardPage() {
  // Getting curret state of dashboard statistics from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.dashboard }),
    shallowEqual
  );
  const { statistics, listLoading } = currentState;

  console.log(statistics, listLoading);

  // Dashboard Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // server call by queryParams
    dispatch(actions.fetchTenantDashboardStatistics());
  }, [dispatch]);

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
        <div className="col-md-5 text-right date-indicator" id="date">July, 27th 2021</div>
      </div>
      <div className="row">
        <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-9">
                  <div className="d-flex align-items-center align-self-start">
                    <h3 className="mb-0">
                      {statistics && statistics.totalSites}
                    </h3>
                    {/* <p className="text-success ml-2 mb-0 font-weight-medium">
                      +3.5%
                    </p> */}
                  </div>
                </div>
                <div className="col-3">
                  <div className="icon icon-box-success ">
                    <span className="mdi mdi-arrow-top-right icon-item"></span>
                  </div>
                </div>
              </div>
              <h6 className="text-muted font-weight-normal">Sites</h6>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-9">
                  <div className="d-flex align-items-center align-self-start">
                    <h3 className="mb-0">
                      {statistics && statistics.totalVisitors}
                    </h3>
                    {/* <p className="text-success ml-2 mb-0 font-weight-medium">
                      +3.5%
                    </p> */}
                  </div>
                </div>
                <div className="col-3">
                  <div className="icon icon-box-success ">
                    <span className="mdi mdi-arrow-top-right icon-item"></span>
                  </div>
                </div>
              </div>
              <h6 className="text-muted font-weight-normal">Visitors</h6>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-9">
                  <div className="d-flex align-items-center align-self-start">
                    <h3 className="mb-0">
                      {statistics && statistics.totalAppointments}
                    </h3>
                    {/* <p className="text-success ml-2 mb-0 font-weight-medium">
                      +3.5%
                    </p> */}
                  </div>
                </div>
                <div className="col-3">
                  <div className="icon icon-box-success ">
                    <span className="mdi mdi-arrow-top-right icon-item"></span>
                  </div>
                </div>
              </div>
              <h6 className="text-muted font-weight-normal">Appointments</h6>
            </div>
          </div>
        </div>

        <div className="col-xl-6 col-sm-6 grid-margin stretch-card">
          <Bar data={data} options={options} />
        </div>
        <div className="col-xl-6 col-sm-6 grid-margin stretch-card">
          <Doughnut data={doughnutPieData} options={doughnutPieOptions} />
        </div>
      </div>
    </div>
  );
}

export default TenantDashboardPage;
