import React from "react";
import { Card, CardBody } from "reactstrap";
import Chart from "react-apexcharts";

const SalesAndPurchaseStatistics = () => {
  const series = [
    {
      name: "Sales",
      data: [
        {
          x: "01",
          y: 322,
        },
        {
          x: "03",
          y: 324,
        },
        {
          x: "06",
          y: 424,
        },
        {
          x: "09",
          y: 224,
        },
        {
          x: "12",
          y: 374,
        },
        {
          x: "15",
          y: 250,
        },
        {
          x: "18",
          y: 369,
        },
        {
          x: "21",
          y: 469,
        },
        {
          x: "24",
          y: 524,
        },
        {
          x: "27",
          y: 274,
        },
        {
          x: "30",
          y: 404,
        },
      ],
    },
    {
      name: "Purchase",
      data: [
        {
          x: "01",
          y: 400,
        },
        {
          x: "03",
          y: 469,
        },
        {
          x: "06",
          y: 469,
        },
        {
          x: "09",
          y: 524,
        },
        {
          x: "12",
          y: 274,
        },
        {
          x: "15",
          y: 400,
        },
        {
          x: "18",
          y: 469,
        },
        {
          x: "21",
          y: 369,
        },
        {
          x: "24",
          y: 424,
        },
        {
          x: "27",
          y: 374,
        },
        {
          x: "30",
          y: 504,
        },
      ],
    },
  ];
  const options = {
    chart: {
      background: "#fff",
      type: "area",
      toolbar: {
        show: false,
      },
      // height: 350
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    // colors: ["orange", "yellow"],

    title: {
      text: "Sales and Purchase Statistics",
      align: "left",
      style: {
        fontSize: "20px",
      },
    },
    // xaxis: {
    //     type: 'datetime',
    //     axisBorder: {
    //         show: false
    //     },
    //     axisTicks: {
    //         show: false
    //     }
    // },
    // yaxis: {
    //     tickAmount: 4,
    //     floating: false,

    //     labels: {
    //         style: {
    //             colors: '#8e8da4',
    //         },
    //         offsetY: -7,
    //         offsetX: 0,
    //     },
    //     axisBorder: {
    //         show: false,
    //     },
    //     axisTicks: {
    //         show: false
    //     }
    // },
    // fill: {
    //     opacity: 0.5
    // },
    // tooltip: {
    //     x: {
    //         format: "yyyy",
    //     },
    //     fixed: {
    //         enabled: false,
    //         position: 'topRight'
    //     }
    // },
    // grid: {
    //     yaxis: {
    //         lines: {
    //             offsetX: -30
    //         }
    //     },
    //     padding: {
    //         left: 20
    //     }
    // }
  };

  return (
    <>
      {/* <Card style={{ border: "none", borderRadius: "12px" }} className='w-100'>
            <CardBody> */}
      {/* <div style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "20px" }}>
                    Sales and Purchase Statistics
                </div> */}

      <Card style={{ border: "none", borderRadius: "12px", width: "100%" }}>
        <CardBody style={{ width: "100%" }}>
          <div style={{ overflowX: "auto", width: "100%", height: "340px" }}>
            <div style={{ minWidth: "500px" }}>
              <Chart
                options={options}
                series={series}
                type="area"
                // width={500}
                // style={{m}}
                height={320}
              />
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default SalesAndPurchaseStatistics;
