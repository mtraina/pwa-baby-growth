export interface GrowthData {
    datetime: string
    breast: number
    pumped: number
    powder: number,
    weight: number
}

export interface GrowthDataTableElem {
    index: number
    gd: GrowthData
}

export interface DataProvider {
    data: Array<GrowthData>
    onDelete: any
    onSend: any
}

export interface AsyncGrowthData {
    response: any,
    gd: GrowthData
}