import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';

const FishPriceTable = ({ items, allFishData, displayMode = 'all' }) => {
    const [selectedRegion, setSelectedRegion] = useState('전체');

    // 데이터 그룹화 함수
    const groupItemsByRegionAndWeight = (data) => {
        const weightRanges = [
            { label: '1kg 미만', min: 0, max: 1 },
            { label: '1~5kg', min: 1, max: 5 },
            { label: '5~10kg', min: 5, max: 10 },
            { label: '10kg 이상', min: 10, max: Infinity }
        ];

        const result = {};

        data.forEach(item => {
            const region = item.querySelector('orgplceSeNm')?.textContent.trim();
            const weight = parseFloat(item.querySelector('csmtWt')?.textContent || 0);
            const price = parseInt(item.querySelector('csmtUntpc')?.textContent || 0);

            if (!region || price === 0) return; // 가격이 0이면 제외

            if (!result[region]) {
                result[region] = {};
                weightRanges.forEach(range => {
                    result[region][range.label] = [];
                });
            }

            const weightRange = weightRanges.find(range => weight >= range.min && weight < range.max);
            if (weightRange) {
                result[region][weightRange.label].push(price);
            }
        });

        return result;
    };

    // 최소 가격 계산
    const getMinPrice = (prices) => {
        if (prices.length === 0) return 0;
        return Math.min(...prices);
    };

    // 최대 가격 계산
    const getMaxPrice = (prices) => {
        if (prices.length === 0) return 0;
        return Math.max(...prices);
    };

    const groupedData = groupItemsByRegionAndWeight(allFishData);
    const regionList = ['전체', ...Object.keys(groupedData)];

    // 선택된 지역 필터링
    const filteredRegions = selectedRegion === '전체' ? Object.entries(groupedData) : [[selectedRegion, groupedData[selectedRegion]]];

    return (
        <div>
            {(displayMode === 'all' || displayMode === 'table') && (
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="region-select" style={{ marginRight: '10px' }}>지역 선택:</label>
                    <select id="region-select" value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)}>
                        {regionList.map((region, idx) => (
                            <option key={idx} value={region}>{region}</option>
                        ))}
                    </select>
                </div>
            )}

            {/* 데이터 및 그래프 출력 */}
            {filteredRegions.map(([region, weightGroups]) => {
                const chartData = Object.entries(weightGroups)
                    .map(([range, prices]) => ({
                        weightRange: range,
                        minPrice: getMinPrice(prices),
                        maxPrice: getMaxPrice(prices)
                    }))
                    .filter(data => data.minPrice > 0 || data.maxPrice > 0);

                if (chartData.length === 0) return null;

                return (
                    <div key={region} style={{ marginBottom: '50px' }}>
                        {(displayMode === 'all' || displayMode === 'table') && (
                            <>
                                <h2>{region}</h2>
                                <table className="priceTable">
                                    <thead>
                                        <tr>
                                            <th>중량 구간</th>
                                            <th>최소 가격 (원)</th>
                                            <th>최대 가격 (원)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {chartData.map((data, idx) => (
                                            <tr key={idx}>
                                                <td>{data.weightRange}</td>
                                                <td>{data.minPrice.toLocaleString()}</td>
                                                <td>{data.maxPrice.toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </>
                        )}

                        {(displayMode === 'all' || displayMode === 'chart') && (
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="weightRange" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="minPrice" fill="#82ca9d" name="최소 가격" />
                                    <Bar dataKey="maxPrice" fill="#8884d8" name="최대 가격" />
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default FishPriceTable;