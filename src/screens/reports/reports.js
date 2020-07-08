import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listReviews } from '../../actions/reviewActions';
import Navbar from '../layouts/Navbar';
import Sidebar from '../layouts/Sidebar';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

export default function UserScreen(props) {
    const scrollStyle = {
        overflow: 'scroll'
    }

    return (<div className="main-wrapper">
    <Sidebar history={props.history}/>
    <div className="container-fluid main-content main-panel">
        <Navbar history={props.history}/>
        <section className="main-content__list" style={ scrollStyle }>
        <div className="container-fluid">
            <div className="header text-center">
                <h3 className="title">Báo cáo thông kê</h3>
            </div>
            <div className="row">
              <div className="col-md-6">
              <h4>Tổng doanh thu theo tháng</h4>
                <Bar
                    data={{
                    labels: [
                        "Tháng 5",
                        "Tháng 6",
                        "Tháng 7",
                    ],
                    datasets: [
                        {
                        label: "VND",
                        backgroundColor: [
                            "#3e95cd",
                            "#8e5ea2",
                            "#3cba9f",
                            
                        ],
                        data: [30000000, 15000000, 20000000]
                        }
                    ]
                    }}
                    options={{
                    legend: { 
                        display: true,
                        position: "bottom"
                    },
                    title: {
                        display: true,
                        text: ""
                    }
                    }}
                />
              </div>
              <div className="col-md-6">
              <h4>Tổng số tuor theo loại</h4>
                <Doughnut
                    data={{
                    labels: [
                        "Trong nước",
                        "Ngoài nước"
                    ],
                    datasets: [
                        {
                        label: "",
                        backgroundColor: [
                            "#3e95cd",
                            "#8e5ea2"
                        ],
                        data: [28, 72]
                        }
                    ]
                    }}
                    option={{
                    title: {
                        display: true,
                        text: "Tổng số tour theo tùng loại"
                    }
                    }}
                />

              </div>
            </div>
            <div className="row"><br/></div>
            <div className="row">
              <div className="col-md-6">
              <h4>Tổng doanh thu theo ngày</h4>
                <Line
                    data={{
                    labels: [
                        "5-7-2020",
                        "6-7-2020",
                        "7-7-2020",
                    ],
                    datasets: [
                        {
                        data: [3000000, 10000000, 7000000],
                        label: "Doanh thu",
                        borderColor: "#3e95cd",
                        fill: false
                        }
                    ]
                    }}
                    options={{
                    title: {
                        display: true,
                        text: ""
                    },
                    legend: {
                        display: true,
                        position: "bottom"
                    }
                    }}
                />
              </div>
              <div className="col-md-6">
                  <h4>Tổng số tuor đặt theo ngày</h4>
              <Doughnut
                    data={{
                    labels: [
                        "5-7-2020",
                        "6-7-2020",
                        "7-7-2020",
                        
                    ],
                    datasets: [
                        {
                        label: "Population (millions)",
                        backgroundColor: [
                            "#3e95cd",
                            "#8e5ea2",
                            "#3cba9f"
                        ],
                        data: [16, 30, 54]
                        }
                    ]
                    }}
                    option={{
                    title: {
                        display: true,
                        text: "Tổng số tuor đặt theo ngày"
                    }
                    }}
                />
              </div>
            </div>
        </div>
        </section>
    </div>
</div>
    )
}
