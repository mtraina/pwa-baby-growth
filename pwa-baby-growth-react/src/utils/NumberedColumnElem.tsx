
export interface NumberedColumnElem {
    text: string
    value: number
} 

export const generateNumberedColumnElem = (beginning: number, end: number, step: number) => {
    let elems = []
    for(let i: number = beginning; i <= end; i+=step){
        elems.push({"text": i.toString(), "value": i})
    }
    return elems
}