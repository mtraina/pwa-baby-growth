import React from 'react';

export interface GrowthData {
    datetime: string
    breast: number
    pumped: number
    powder: number,
    weight: number
}

export interface DataProvider {
    data: Array<GrowthData>
}