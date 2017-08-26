/*
# Binary Search Alhorithm - in Typescript
- Alistair MacDonald
- About: https://en.wikipedia.org/wiki/Binary_search_algorithm
*/

const output: HTMLElement = document.getElementById('output')!
const input: HTMLElement = document.getElementById('input')!

const styleCell = (elem: HTMLElement): void => {
	elem.style.border = '1px solid black'
	elem.style.width = '20px'
	elem.style.height = '20px'
	elem.style.fontSize = '12px'
	elem.style.textAlign = 'center'
	elem.style.display = 'inline-block'
}

const styleBlue = (elem: HTMLElement): void => {
	elem.style.backgroundColor = '#0af'
}

const styleColor = (elem: HTMLElement, color: string): void => {
	elem.style.backgroundColor = color
}

const styleLegend = (elem: HTMLElement): void => {
	elem.style.border = '1px solid black'
	elem.style.width = '20px'
	elem.style.height = '20px'
	elem.style.fontSize = '12px'
	elem.style.textAlign = 'center'
	elem.style.display = 'inline-block'
	elem.style.backgroundColor = '#fa0'
}

const displayLegend = (ary: number[]): void => {
	const row: HTMLElement = document.createElement('div')

	for (let i:number = 0; i < ary.length; i += 1) {
		const cell: HTMLElement = document.createElement('div')
		cell.innerHTML = String(ary[i])
		styleLegend(cell)
		row.appendChild(cell)
	}

	output.appendChild(row)
}

const displayArray = (ary: number[], start: number, end: number, color: string): void => {
	const row: HTMLElement = document.createElement('div')

	for (let i:number = 0; i < ary.length; i += 1) {
		const cell: HTMLElement = document.createElement('div')
		cell.innerHTML = String(ary[i])

		styleCell(cell)

		if (i >= start && i <= end) {
			styleBlue(cell)

			if (color) {
				styleColor(cell, color)
			}
		}

		row.appendChild(cell)
	}

	output.appendChild(row)
}

let iterCount:number
let maxIterations: number

const compare = (target: number, ary: number[], start: number, end: number): number[] | number | boolean => {
	const range = end - start
	const midPoint = start + (range / 2)
	const midIndex = Math.floor(midPoint)
	const midValue = ary[midIndex]

	if (iterCount > maxIterations) {
		return false
	}
	iterCount += 1

	if (midValue === target) {
		console.log('Found Index for Target!')
		displayArray(ary, midIndex, midIndex, '#af0')
		return midIndex
	}

	if (start === midIndex) {
		displayArray(ary, midIndex, midIndex, '#F00')
		return false
	}

	if (target < midValue) {
		console.log(`Chop Left: ${start}, ${end}`)
		start = start
		end = midIndex
	}

	if (target > midValue) {
		console.log(`Chop Right: ${start}, ${end}`)
		start = midIndex
	}

	displayArray(ary, start, end)

	return compare(target, ary, start, end)
}

const search = (target: number, ary: number[]): number | boolean => {
	maxIterations = Math.ceil(Math['log2'](ary.length)) + 1
	console.log(`Max itterations: ${maxIterations} (worst cast scenario)`)
	iterCount = 0

	const start = 0
	const end = ary.length

	displayArray(ary, start, end)

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

const setTarget = (target: number): void => {
	displayLegend(legendAry)

	const foundIndex = search(target, myAry)

	if (foundIndex) {
		console.log(`The target: ${target} was found at index: ${foundIndex}`)
	} else {
		console.log(`The target: ${target} was not found in this array`)
	}
}

input.addEventListener('change', (event: Event): void => {
	const newTargetValue: number = Number(event.target['value'])
	console.log(`New target value: ${newTargetValue}`)
	setTarget(newTargetValue)
})

setTarget(7)
