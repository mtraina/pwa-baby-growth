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
}

export interface AsyncGrowthData {
    response: any,
    gd: GrowthData
}

const IndexablePrefixGrowthData = { "index": {} }

export const indexGrowData = (data: Array<GrowthData>) => data.flatMap(gd => [IndexablePrefixGrowthData, gd]) 

export const indexGrowDataStr = (data: Array<GrowthData>) => data.map(gd => JSON.stringify(IndexablePrefixGrowthData) + '\n' + JSON.stringify(gd)) 