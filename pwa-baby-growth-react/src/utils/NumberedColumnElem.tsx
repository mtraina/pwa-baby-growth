
export interface NumberedColumnElem {
    text: string
    value: number
} 

export const generateNumberedColumnElem = (beginning: number, end: number, step: number, fixed: number = 0) => {
    let elems = []
    for(let i: number = beginning; i <= end; i+=step){
        elems.push({"text": i.toString(), "value": i})
    }
    return elems
}