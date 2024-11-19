import React, { useCallback, useEffect } from "react";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, Col, Row } from "reactstrap";
import { handleSalesDashboardChartRequest } from "../../../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import moment from "moment";
const DashChart = () => {
  const dispatch = useDispatch();
  const { sales_dashboard_chart_data } = useSelector(
    (e) => e.ComponentPropsManagement
  );

  // const options = {
  //     chart: {
  //         id: "basic-bar",
  //         toolbar: {
  //             show: false,
  //         }
  //     },
  //     colors: ['var(--primary1)'],

  //     xaxis: {
  //         categories: ["Jan-23", "Feb-23", "Mar-23", "Apr-23", "May-23", "Jun-23"]
  //     }
  // }

  // const series = [
  //     {
  //         name: "Trends",
  //         data: [30, 40, 45, 50, 49, 60]
  //     }
  // ]

  // console.log("sales_dashboard_chart_data", sales_dashboard_chart_data)
  // console.log(sales_dashboard_chart_data?.map(io => io.sales))

  const series = [
    {
      name: "Sales",
      type: "column",
      data: sales_dashboard_chart_data?.map((io) => io.sales),
      // data: [440, 505, 414, 671, 227, 413]
    },
    //  {
    //     name: '% Total',
    //     type: 'line',
    //     data: [23, 28, 22, 37, 10, 20]
    // }
  ];

  function customDateParser(dateString) {
    const parts = dateString.split("-");
    if (parts.length === 3) {
      return new Date(parts[0], parts[1] - 1, parts[2]);
    }
    return null;
  }
  
  const formattedLabels = sales_dashboard_chart_data
    ?.filter((io) => customDateParser(io.month) !== null)
    .map((io) => moment(customDateParser(io.month)).format("MMM YYYY"))
  const options = {
    chart: {
      background: "#fff",
      height: 350,
      type: "line",
      toolbar: {
        show: false,
      },
    },
    stroke: {
      width: [0, 4],
    },
    colors: ["var(--primary1)", "var(--primary3)"],
    title: {
      text: "Traffic Sources",
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1],
    },
    labels: formattedLabels,
    // labels: sales_dashboard_chart_data?.map((io) => io.month),
    xaxis: {
      type: "datetime",
    },
    yaxis: [
      {
        title: {
          text: "Sales",
        },
      },
      {
        opposite: true,
        title: {
          text: "% Total",
        },
      },
    ],
  };

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 1000);
    };
  };

  const handleFunCall = () => {
    dispatch(handleSalesDashboardChartRequest());
  };

  const optimizedFn = useCallback(debounce(handleFunCall), []);
  const id = localStorage.getItem('activeTab')
  useEffect(() => {
    if(id==3){
      optimizedFn();
    }
  }, [id]);

  return (
    <>
      <Row>
        <Col md={12}>
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ flexDirection: "column" }}
          >
            <div className="my-4">
              <div className="h5" style={{ fontWeight: "bold" }}>
                Last 6 Month Trends
              </div>
            </div>

            <Card
              style={{
                border: "none",
                borderRadius: "12px",
                width: "100%",
                maxWidth: "540px",
              }}
            >
              <CardBody style={{ width: "100%" }}>
                <div
                  style={{ overflowX: "auto", width: "100%", height: "340px" }}
                >
                  {sales_dashboard_chart_data && (
                    <>
                      <Chart
                        options={options}
                        series={series}
                        type="line"
                        width="500"
                      />
                    </>
                  )}
                </div>
              </CardBody>
            </Card>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default DashChart;