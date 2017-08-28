/*
# Binary Search Alhorithm - in Typescript
- Alistair MacDonald
- Concept: https://en.wikipedia.org/wiki/Binary_search_algorithm
- Github: https://github.com/F1LT3R/binary-search-in-typescript
- Blog: https://f1lt3r.io/binary-search-with-typescript
*/

const blue: string = '#0af'
const orange: string = '#fa0'
const red: string = '#f00'
const green: string = '#af0'

const graph: HTMLElement = document.getElementById('graph')!
const input: HTMLElement = document.getElementById('input')!
const ologn: HTMLElement = document.getElementById('ologn')!
const nochop: HTMLElement = document.getElementById('nochop')!
const logElem: HTMLElement = document.getElementById('log')!

const log = (text): void => {
    const logText = document.createElement('div')
    logText.innerHTML = text
    logElem.appendChild(logText)
}

const styleCell = (elem: HTMLElement): void => {
    elem.style.width = '20px'
    elem.style.height = '20px'
    elem.style.fontSize = '12px'
    elem.style.borderRadius = '3px'
    elem.style.margin = '0px 1px'
    elem.style.textAlign = 'center'
    elem.style.display = 'inline-block'
    elem.style.backgroundColor = '#ccc'
}

const styleColor = (elem: HTMLElement, color: string): void => {
    elem.style.backgroundColor = color
}

const styleLegend = (elem: HTMLElement): void => {
    elem.style.width = '20px'
    elem.style.height = '20px'
    elem.style.fontSize = '12px'
    elem.style.textAlign = 'center'
    elem.style.borderRadius = '3px'
    elem.style.margin = '0px 1px'
    elem.style.display = 'inline-block'
    elem.style.backgroundColor = orange
}

const displayLegend = (ary: number[]): void => {
    const row: HTMLElement = document.createElement('div')

    for (let i:number = 0; i < ary.length; i += 1) {
        const cell: HTMLElement = document.createElement('div')
        cell.innerHTML = String(ary[i])
        styleLegend(cell)
        row.appendChild(cell)
    }

    graph.appendChild(row)
}

const displayArray = (ary: number[], start: number, end: number, color: string): void => {
    const row: HTMLElement = document.createElement('div')

    for (let i:number = 0; i < ary.length; i += 1) {
        const cell: HTMLElement = document.createElement('div')
        cell.innerHTML = String(ary[i])

        styleCell(cell)

        if (i >= start && i <= end) {
            styleColor(cell, color)
        }

        row.appendChild(cell)
    }

    graph.appendChild(row)
}

enum FailExits {
    ologn,
    nochop
}

let exit = FailExits.ologn
let iterCount:number
let maxIterations: number

const compare = (target: number, ary: number[], start: number, end: number): number[] | number | boolean => {
    // Change the index rather than chop the array
    const range = end - start
    const midPoint = start + (range / 2)
    const midIndex = Math.floor(midPoint)
    const midValue = ary[midIndex]

    // Fail Exit Strategy 1: Max iterations is set to O(log(n))
    if (iterCount > maxIterations && exit === FailExits.ologn) {
        log(`Exited after ${maxIterations} itterations at O(log(n)`)
        displayArray(ary, midIndex, end, red)
        return false
    }
    iterCount += 1

    // Found index when mid = target
    if (midValue === target) {
        displayArray(ary, midIndex, midIndex, green)
        return midIndex
    }

    // Fail Exit Strategy 2: startIndex = midIndex
    if (start === midIndex && exit === FailExits.nochop) {
        log(`Exited after ${maxIterations} itterations at No-Chop`)
        displayArray(ary, midIndex, end, red)
        return false
    }

    // Chop Left
    if (target < midValue) {
        start = start
        end = midIndex
    }

    // Chop Right
    if (target > midValue) {
        start = midIndex
    }

    displayArray(ary, start, end, blue)

    return compare(target, ary, start, end)
}

const search = (target: number, ary: number[]): number | boolean => {
    maxIterations = Math.ceil(Math['log2'](ary.length)) + 1
    log(`Max-itterations: ${maxIterations} (worst cast scenario)`)
    iterCount = 0

    const start = 0
    const end = ary.length

    displayArray(ary, start, end, blue)

    const foundIndex = compare(target, ary, start, end)

    if (typeof foundIndex === 'number') {
        return foundIndex
    }

    return false
}

let myAry: number[] = [
    1, 2, 3, 4, 6, 7, 8, 10, 13, 14, 18, 19, 21, 24, 37, 40, 45, 71
]

let legendAry: number[] = [
    0, 1, 2, 3, 4, 5,  6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17
]

let target: number = 11

const setTarget = (newTarget: number): void => {
    target = newTarget
}

const start = (): void => {
    graph.innerHTML = ''
    logElem.innerHTML = ''
    displayLegend(legendAry)

    const foundIndex = search(target, myAry)

    if (foundIndex) {
        log(`The target: ${target} was found at index: ${foundIndex}`)
    } else {
        log(`The target: ${target} was not found in this array`)
    }
}

const updateTargetValue = (event: Event): void => {
    const newTargetValue: number = Number(event.target['value'])
    setTarget(newTargetValue)
    start()
}

input.addEventListener('click', updateTargetValue)
input.addEventListener('change', updateTargetValue)

ologn.addEventListener('click', (event: Event): void => {
    const checked: boolean = event.target['checked']
    exit = FailExits.ologn
    start()

})

nochop.addEventListener('click', (event: Event): void => {
    const checked: boolean = event.target['checked']
    exit = FailExits.nochop
    start()
})

start()
