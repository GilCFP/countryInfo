"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Line } from "react-chartjs-2";
import 'chart.js/auto';
import Vibrant from 'node-vibrant';

interface CountryInfo {
    country: {
        borders: { countryCode: string; commonName: string; officialName: string; region: string }[];
        commonName: string;
        officialName: string;
        countryCode: string;
        region: string;
    };
    populationData: { year: number; value: number }[];
    flagURL: string;
}

export default function CountryDetails() {
    const params = useParams();
    const { countryCode } = params;
    const [countryInfo, setCountryInfo] = useState<CountryInfo | null>(null);
    const [error, setError] = useState(null);
    const [lineColor, setLineColor] = useState('rgba(75,192,192,1)');

    useEffect(() => {
        if (!countryCode) return;

        const token = process.env.NEXT_PUBLIC_API_TOKEN;

        fetch(`http://localhost:5500/countries/info/${countryCode}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch country details");
                }
                return res.json();
            })
            .then((data) => setCountryInfo(data))
            .catch((err) => setError(err.message));
    }, [countryCode]);

    useEffect(() => {
        if (!countryInfo?.flagURL) return;

        Vibrant.from(countryInfo.flagURL)
            .getPalette()
            .then((palette) => {
                const dominantColor = palette.Vibrant?.hex || '#000000';
                setLineColor(dominantColor);
            })
            .catch(() => {
                setLineColor('rgb(0, 0, 0)');
            });
    }, [countryInfo?.flagURL]);

    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
    if (!countryInfo) return <h2 className="flex items-center justify-center h-full">Loading...</h2>

    const populationChartData = {
        labels: countryInfo.populationData.map(data => data.year),
        datasets: [
            {
                label: 'Population',
                data: countryInfo.populationData.map(data => data.value),
                fill: false,
                borderColor: lineColor,
                tension: 0.1
            }
        ]
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-6 rounded-md shadow-md w-full max-w-4xl">
                <h1 className="text-3xl font-bold mb-4 text-center">{countryInfo.country.commonName || "No country name available"}</h1>
                
                {countryInfo.flagURL && (
                    <img
                        src={countryInfo.flagURL}
                        alt={`${countryInfo.country.commonName} flag`}
                        className="w-1/2 h-auto mb-4"
                    />
                )}
                
                <div className="w-full mb-4">
                    <p><strong>Official Name:</strong> {countryInfo.country.officialName || "No data available"}</p>
                    <p><strong>Region:</strong> {countryInfo.country.region || "No data available"}</p>
                    <p><strong>Country Code:</strong> {countryInfo.country.countryCode || "No data available"}</p>
                </div>
                
                <h3 className="mt-4 w-full text-xl">Population Chart</h3>
                <div className="mb-4 p-4 rounded-md w-full">
                    {countryInfo.populationData.length > 0 ? (
                        <Line data={populationChartData} />
                    ) : (
                        <p>No population data available</p>
                    )}
                </div>
                
                <h3 className="w-full text-xl">Border Countries</h3>
                <ul className="w-full">
                    {countryInfo.country.borders.length > 0 ? (
                        countryInfo.country.borders.map((border, index) => (
                            <li key={index}>
                                <Link href={`/countries/${border.countryCode}`} className="text-blue-500 underline">
                                    {border.commonName || "No name available"}
                                </Link>
                            </li>
                        ))
                    ) : (
                        <p>No border countries available</p>
                    )}
                </ul>
            </div>
        </div>
    );
}