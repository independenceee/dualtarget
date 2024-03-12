"use client";

import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import ReactApexChart, { Props as ChartProps } from "react-apexcharts";
import styles from "./PriceChart.module.scss";
import Image from "next/image";
import icons from "~/assets/icons";

import Tippy from "../Tippy";
import { ChartDataType } from "~/constants/price-chart";
import Loading from "../Loading";



const cx = classNames.bind(styles);

type Props = {
    data: ChartDataType | null;
    isLoading: boolean;
};

const PriceChart = function ({ data, isLoading }: Props) {
    console.log(data);
    const [show, setShow] = useState<boolean>(true);
    const [crytocurrency, setCrytocurrency] = useState<string>("DJED");
    const [chartConfigs, setChartConfigs] = useState<ChartProps>({
        series: [
            {
                data: [],
            },
        ],
        options: {
            colors: ["#7054d1", "#ab56c9", "#b275dc"],
            chart: {
                foreColor: "#fff",
                toolbar: {
                    show: false,
                },
                id: "area-datetime",
                type: "area",
                height: 350,
                zoom: {
                    enabled: false,
                },
                animations: {
                    speed: 2000,
                    easing: "linear",
                },
            },
            dataLabels: {
                enabled: false,
            },
            markers: {
                size: 0,
            },
            xaxis: {
                type: "datetime",
                min: new Date("01 Mar 2012").getTime(),
                tickAmount: 6,
                tooltip: {
                    enabled: false,
                },
                labels: {
                    format: "MMM dd yyyy HH:mm",
                },
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
            },
            yaxis: {
                show: false,
            },
            tooltip: {
                enabled: true,
                style: {
                    fontSize: "16px",
                },

                x: {
                    show: true,
                    format: "MMM dd yyyy HH:mm",
                },
                y: {
                    title: {
                        formatter(seriesName) {
                            return "" + crytocurrency;
                        },
                    },
                },
                fixed: {
                    enabled: true,
                    position: "topLeft",
                    offsetX: 16,
                    offsetY: -70,
                },
                marker: {
                    show: true,
                },
            },

            grid: {
                borderColor: "#ffffff10",
            },
            fill: {
                colors: ["#7054d1", "#ab56c9", "#b275dc"],
                type: "gradient",
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.7,
                    opacityTo: 0.5,
                    stops: [0, 100],
                    inverseColors: false,
                },
            },
            stroke: {
                width: 1,
                lineCap: "round",
            },
        },

        selection: "ONE_DAY" as "ONE_DAY" | "ONE_WEEK" | "SIX_MONTHS" | "ONE_YEAR",
    });

    useEffect(() => {
        handleUpdateChartData("ONE_DAY");
    }, []);

    useEffect(() => {
        if (data != null) {
            setChartConfigs({
                ...chartConfigs,
                series: [
                    {
                        data,
                    },
                ],
            });
        }
    }, [data]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const handleResize = () => {
                if (window.innerWidth > 768 && !show) {
                    setShow(true);
                }
            };

            window.addEventListener("resize", handleResize);

            return () => {
                window.removeEventListener("resize", handleResize);
            };
        }
    }, [show]);

    const handleToggleChart = function () {
        setShow((prev) => !prev);
    };

    const handleUpdateChartData = function (timeline: "ONE_DAY" | "ONE_WEEK" | "ONE_MONTH" | "SIX_MONTHS" | "ONE_YEAR") {
        setChartConfigs((prev) => ({
            ...prev,
            selection: timeline,
        }));

        switch (timeline) {
            case "ONE_DAY":
                ApexCharts.exec("area-datetime", "zoomX", new Date("28 Jan 2013").getTime(), new Date("27 Feb 2013").getTime());
                break;
            case "SIX_MONTHS":
                ApexCharts.exec("area-datetime", "zoomX", new Date("27 Sep 2012").getTime(), new Date("27 Feb 2013").getTime());
                break;
            case "ONE_YEAR":
                ApexCharts.exec("area-datetime", "zoomX", new Date("27 Feb 2012").getTime(), new Date("27 Feb 2013").getTime());
                break;
            case "ONE_WEEK":
                ApexCharts.exec("area-datetime", "zoomX", new Date("01 Jan 2013").getTime(), new Date("27 Feb 2013").getTime());
                break;

            default:
                ApexCharts.exec("area-datetime", "zoomX", new Date("23 Jan 2012").getTime(), new Date("27 Feb 2013").getTime());
                break;
        }
    };

    return (
        <div className={cx("wrapper")}>
            <button className={cx("button-toggle-chart-visibility")} onClick={handleToggleChart}>
                <svg fill="none" height={12} viewBox="0 0 13 12" width={13} xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0.0996094 6.80002C0.0996094 6.3582 0.457782 6.00002 0.899609 6.00002H2.49961C2.94144 6.00002 3.29961 6.3582 3.29961 6.80002V10.8C3.29961 11.2419 2.94144 11.6 2.49961 11.6H0.899609C0.457782 11.6 0.0996094 11.2419 0.0996094 10.8V6.80002Z"
                        fill="currentColor"
                    />
                    <path
                        d="M4.89961 3.60002C4.89961 3.1582 5.25778 2.80002 5.69961 2.80002H7.29961C7.74144 2.80002 8.09961 3.1582 8.09961 3.60002V10.8C8.09961 11.2419 7.74144 11.6 7.29961 11.6H5.69961C5.25778 11.6 4.89961 11.2419 4.89961 10.8V3.60002Z"
                        fill="currentColor"
                    />
                    <path
                        d="M9.69961 1.20002C9.69961 0.758197 10.0578 0.400024 10.4996 0.400024H12.0996C12.5414 0.400024 12.8996 0.758197 12.8996 1.20002V10.8C12.8996 11.2419 12.5414 11.6 12.0996 11.6H10.4996C10.0578 11.6 9.69961 11.2419 9.69961 10.8V1.20002Z"
                        fill="currentColor"
                    />
                </svg>
                <span className={cx("button-toggle-chart-text")}>{show ? "Hide" : "Show"} chart</span>
            </button>
            <div
                className={cx("chart-block", {
                    show,
                })}
            >
                <div className={cx("chart-header-wrapper")}>
                    <div className={cx("header-inner")}>
                        <div className={cx("header-left")}>
                            <div className={cx("exchange-rate-images")}>
                                <div className={cx("cardano-coin")}>
                                    <div>
                                        <Image
                                            alt="Cardano"
                                            loading="lazy"
                                            width={40}
                                            height={40}
                                            decoding="async"
                                            data-nimg={1}
                                            src={icons.cardanoChartCoin}
                                            style={{ color: "transparent" }}
                                        />
                                    </div>
                                </div>
                                <div className={cx("djed-coin")}>
                                    <div>
                                        <Image
                                            alt="Djed USD"
                                            loading="lazy"
                                            width={40}
                                            height={40}
                                            decoding="async"
                                            data-nimg={1}
                                            src={icons.djedChartCoin}
                                            style={{ color: "transparent" }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className={cx("exchange-rate-name")}>
                                    <span>ADA-DJED</span>
                                    <Tippy render={<div>This pair is verified</div>}>
                                        <div className={cx("exchange-check-icon")}>
                                            <div>
                                                <svg fill="none" height={16} viewBox="0 0 16 16" width={16} xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        clipRule="evenodd"
                                                        d="M5.01517 2.76412C5.52963 2.72307 6.01802 2.52077 6.41082 2.18603C7.32747 1.40487 8.67566 1.40487 9.5923 2.18603C9.9851 2.52077 10.4735 2.72307 10.988 2.76412C12.1885 2.85993 13.1418 3.81324 13.2376 5.01377C13.2787 5.52822 13.4809 6.01662 13.8157 6.40942C14.5969 7.32606 14.5969 8.67425 13.8157 9.5909C13.4809 9.9837 13.2787 10.4721 13.2376 10.9865C13.1418 12.1871 12.1885 13.1404 10.988 13.2362C10.4735 13.2772 9.9851 13.4795 9.5923 13.8143C8.67566 14.5954 7.32747 14.5954 6.41082 13.8143C6.01802 13.4795 5.52963 13.2772 5.01517 13.2362C3.81465 13.1404 2.86133 12.1871 2.76553 10.9865C2.72447 10.4721 2.52218 9.9837 2.18743 9.5909C1.40627 8.67425 1.40627 7.32606 2.18743 6.40942C2.52218 6.01662 2.72447 5.52822 2.76553 5.01377C2.86133 3.81324 3.81465 2.85993 5.01517 2.76412ZM10.9672 6.96584C11.2797 6.65342 11.2797 6.14689 10.9672 5.83447C10.6548 5.52205 10.1483 5.52205 9.83588 5.83447L7.20156 8.46879L6.16725 7.43447C5.85483 7.12205 5.3483 7.12205 5.03588 7.43447C4.72346 7.74689 4.72346 8.25342 5.03588 8.56584L6.63588 10.1658C6.9483 10.4783 7.45483 10.4783 7.76725 10.1658L10.9672 6.96584Z"
                                                        fill="currentColor"
                                                        fillRule="evenodd"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </Tippy>
                                </div>
                            </div>
                        </div>
                        <button className={cx("exchange-icon-wrapper")}>
                            <svg fill="none" height={20} viewBox="0 0 20 20" width={20} xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M6.66406 5.83333L16.6641 5.83333M16.6641 5.83333L13.3307 2.5M16.6641 5.83333L13.3307 9.16667M13.3307 14.1667L3.33073 14.1667M3.33073 14.1667L6.66406 17.5M3.33073 14.1667L6.66406 10.8333"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.6"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className={cx("price-by-time-analytics")}>
                        <button
                            className={cx("time", {
                                active: chartConfigs.selection === "ONE_DAY",
                            })}
                            onClick={() => handleUpdateChartData("ONE_DAY")}
                        >
                            1D
                        </button>
                        <button
                            className={cx("time", {
                                active: chartConfigs.selection === "ONE_WEEK",
                            })}
                            onClick={() => handleUpdateChartData("ONE_WEEK")}
                        >
                            1W
                        </button>
                        <button
                            className={cx("time", {
                                active: chartConfigs.selection === "ONE_MONTH",
                            })}
                            onClick={() => handleUpdateChartData("ONE_MONTH")}
                        >
                            1M
                        </button>
                        <button
                            className={cx("time", {
                                active: chartConfigs.selection === "SIX_MONTHS",
                            })}
                            onClick={() => handleUpdateChartData("SIX_MONTHS")}
                        >
                            6M
                        </button>
                        <button
                            className={cx("time", {
                                active: chartConfigs.selection === "ONE_YEAR",
                            })}
                            onClick={() => handleUpdateChartData("ONE_YEAR")}
                        >
                            1Y
                        </button>
                    </div>
                </div>

                <div>
                    {isLoading ? (
                        <div className={cx("loading-overlay")}>
                            <Loading className={cx("loading-icon")} />
                        </div>
                    ) : (
                        <div>
                            <div id="chart" className={cx("chart-offset")}>
                                <div id="chart-timeline">
                                    <ReactApexChart options={chartConfigs.options} series={chartConfigs.series} type="area" height={350} />
                                </div>
                            </div>
                            <div id="html-dist"></div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PriceChart;
