import React, {useEffect, useState} from "react";
import Plot from "react-plotly.js";
import {DEVICES_PER_OS_URL} from "../config";

export default function AmountDevicesPerOs() {
    const [data, setData] = useState([]);
    const [selectedChartType, setSelectedChartType] = useState("bar")

    useEffect(() => {
        fetch(DEVICES_PER_OS_URL).then(response => response.json().then(data => {
            setData([...data])
        }))
    }, [])

    return (
        <>
            <div style={{width: "100%"}}>
                <select value={selectedChartType} onChange={(e) => setSelectedChartType(e.target.value)}>
                    <option value="bar">Bar</option>
                    <option value="pie">Pie</option>
                </select>
            </div>
            <Plot
                data={[{
                    y: data.map(datum => datum.amount_devices),
                    x: data.map(datum => datum.os || 'No OS'),
                    values: data.map(datum => datum.amount_devices),
                    labels: data.map(datum => datum.os || 'No OS'),
                    type: selectedChartType,
                    mode: 'lines+markers',
                }]}
                layout={{
                    title: 'Devices per OS'
                }}
            />
        </>
    )
}
