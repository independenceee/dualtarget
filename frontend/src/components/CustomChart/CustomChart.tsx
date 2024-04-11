import classNames from "classnames/bind";

import React, { useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

import styles from "./CustomChart.module.scss";

const cx = classNames.bind(styles);

type DataType = {
    date: number;
    leftYAxis: number;
    rightYAxis: number;
};

const CustomChart = function () {
    useLayoutEffect(() => {
        const root = am5.Root.new("chartdiv");

        const myTheme = am5.Theme.new(root);

        myTheme.rule("Label").setAll({
            fill: am5.color(0xffffff),
            fontSize: "1.2em",
        });

        root.setThemes([am5themes_Animated.new(root), myTheme]);
        let chart = root.container.children.push(
            am5xy.XYChart.new(root, {
                panX: true,
                panY: true,
                wheelX: "panX",
                wheelY: "zoomX",
                pinchZoomX: true,
                paddingLeft: 0,
            }),
        );

        // Define data
        let data: DataType[] = [
            {
                date: new Date(2021, 0, 1).getTime(),
                leftYAxis: 1000,
                rightYAxis: 200,
            },
            {
                date: new Date(2021, 0, 2).getTime(),
                leftYAxis: 800,
                rightYAxis: 400,
            },
            {
                date: new Date(2021, 0, 3).getTime(),
                leftYAxis: 700,
                rightYAxis: 950,
            },
            {
                date: new Date(2021, 0, 4).getTime(),
                leftYAxis: 1200,
                rightYAxis: 700,
            },
            {
                date: new Date(2021, 0, 5).getTime(),
                leftYAxis: 740,
                rightYAxis: 720,
            },
            {
                date: new Date(2021, 0, 6).getTime(),
                leftYAxis: 1000,
                rightYAxis: 200,
            },
            {
                date: new Date(2021, 0, 7).getTime(),
                leftYAxis: 800,
                rightYAxis: 400,
            },
            {
                date: new Date(2021, 0, 8).getTime(),
                leftYAxis: 700,
                rightYAxis: 950,
            },
            {
                date: new Date(2021, 0, 9).getTime(),
                leftYAxis: 1200,
                rightYAxis: 700,
            },
            {
                date: new Date(2021, 0, 10).getTime(),
                leftYAxis: 740,
                rightYAxis: 720,
            },
        ];

        // Create Y-axis
        let yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                renderer: am5xy.AxisRendererY.new(root, {}),
            }),
        );
        // chart.set(
        //     "scrollbarX",
        //     am5.Scrollbar.new(root, {
        //         orientation: "horizontal",
        //     }),
        // );
        let yAxisRight = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                maxDeviation: 0.3,
                renderer: am5xy.AxisRendererY.new(root, {
                    opposite: true,
                }),
            }),
        );
        var cursor = chart.set(
            "cursor",
            am5xy.XYCursor.new(root, {
                behavior: "none",
            }),
        );
        cursor.lineY.set("visible", false);
        // Create X-Axis
        let xAxis = chart.xAxes.push(
            am5xy.DateAxis.new(root, {
                renderer: am5xy.AxisRendererX.new(root, {
                    minGridDistance: 60,
                    pan: "zoom",
                    minorGridEnabled: true,
                }),
                baseInterval: { timeUnit: "day", count: 1 },
            }),
        );
        xAxis.data.setAll(data);

        // Add legend
        let legend = chart.children.push(am5.Legend.new(root, {}));
        legend.data.setAll(chart.series.values);

        // Add cursor
        chart.set("cursor", am5xy.XYCursor.new(root, {}));

        let series1 = chart.series.push(
            am5xy.LineSeries.new(root, {
                name: "Series",
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "leftYAxis",
                valueXField: "date",
                openValueYField: "rightYAxis",
                tooltip: am5.Tooltip.new(root, {
                    pointerOrientation: "horizontal",
                    labelText: "[bold]{name}[/]\n{valueX.formatDate()}: {valueY}",
                }),
            }),
        );
        const drawingSeries = chart.series.push(
            am5xy.LineSeries.new(root, {
                name: "Series",
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "value",
                valueXField: "date",
            }),
        );

        // Invisible bullet which will be dragged (to avoid some conflicting between
        // drag position and bullet position which results flicker)
        drawingSeries.bullets.push(function () {
            var bulletCircle = am5.Circle.new(root, {
                radius: 6,
                fillOpacity: 0,
                fill: drawingSeries.get("fill"),
                draggable: true,
                cursorOverStyle: "pointer",
            });
            bulletCircle.events.on("dragged", function (e) {
                handleDrag(e);
            });
            return am5.Bullet.new(root, {
                sprite: bulletCircle,
            });
        });
        // Actual bullet
        drawingSeries.bullets.push(function () {
            var bulletCircle = am5.Circle.new(root, {
                radius: 5,
                fill: drawingSeries.get("fill"),
            });
            return am5.Bullet.new(root, {
                sprite: bulletCircle,
            });
        });

        // Drag handler
        function handleDrag(e: any) {
            var point = chart.plotContainer.toLocal(e.point);
            var date = xAxis.positionToValue(xAxis.coordinateToPosition(point.x));
            var value = yAxis.positionToValue(yAxis.coordinateToPosition(point.y));

            var dataItem = e.target.dataItem;
            dataItem.set("valueX", date);
            dataItem.set("valueXWorking", date);
            dataItem.set("valueY", value);
            dataItem.set("valueYWorking", value);
        }

        // Interactivity
        (chart.plotContainer as any).get("background").events.on("click", function (e) {
            var point = chart.plotContainer.toLocal(e.point);
            var date = xAxis.positionToValue(xAxis.coordinateToPosition(point.x));
            var value = yAxis.positionToValue(yAxis.coordinateToPosition(point.y));
            drawingSeries.data.push({
                date: date,
                value: value,
            });

            drawingSeries.setPrivate("endIndex", drawingSeries.data.length);
            sortData();
        });
        // Sort data so that if clicked between existing data items, the item would
        // be added between
        function sortData() {
            drawingSeries.dataItems.sort(function (a, b) {
                const atime = a.get("valueX");
                const btime = b.get("valueX");

                if (atime && btime && atime < btime) {
                    return -1;
                } else if (atime == btime) {
                    return 0;
                } else {
                    return 1;
                }
            });
        }
        xAxis.set("tooltip", am5.Tooltip.new(root, {}));

        yAxis.set("tooltip", am5.Tooltip.new(root, {}));
        series1.strokes.template.setAll({
            strokeWidth: 3,
        });
        series1.fills.template.setAll({
            fillOpacity: 0.5,
            visible: true,
        });
        series1.data.setAll(data);
        let series2 = chart.series.push(
            am5xy.LineSeries.new(root, {
                name: "Series",
                xAxis: xAxis,
                yAxis: yAxisRight,
                valueYField: "leftYAxis",
                valueXField: "date",
                openValueYField: "rightYAxis",
            }),
        );
        series2.strokes.template.setAll({
            strokeWidth: 3,
        });
        series2.fills.template.setAll({
            fillOpacity: 0.5,
            visible: true,
        });

        // Explanatory labels
        chart.plotContainer.children.push(
            am5.Label.new(root, {
                x: 10,
                y: -30,
                text: "Click on plot area to draw a series",
            }),
        );
        series2.data.setAll(data);

        return () => {
            root.dispose();
        };
    }, []);

    return (
        <div className={cx("wrapper")}>
            <div id="chartdiv" style={{ width: "100%", height: "500px" }} />
        </div>
    );
};

export default CustomChart;
