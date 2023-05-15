import React, { useEffect, useState } from "react";
import { AMOUNT_PER_TEAM_URL } from "../config";
import Plot from "react-plotly.js";

export default function AllCountries() {
    const [data, setData] = useState([]);
    const [selectedChartType, setSelectedChartType] = useState("bar");

    useEffect(() => {
        fetch(AMOUNT_PER_TEAM_URL).then(response => response.json()).then(data => {
            setData([...data])
        })
    })

    return (
        <>
            <select value={selectedChartType} onChange={(e) => setSelectedChartType(e.target.value)}>
                <option value="bar">Bar</option>
                <option value="pie">Pie</option>
            </select>
            <Plot
                data={[{
                    y: data.map(datum => datum.amount),
                    x: data.map(datum => datum.Team || "No Team"),
                    values: data.map(datum => datum.amount),
                    labels: data.map(datum => datum.Team || "No Team"),
                    type: selectedChartType,
                    mode: "lines+markers"
                }]}
                layout={{
                    title: 'Amount Per Team'
                }}
            />
        </>
    )
}