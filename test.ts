// const binary: number[] = [
// 	Math.log2(32),
// 	Math.log2(16),
// 	Math.log2(8),
// 	Math.log2(4),
// 	Math.log2(2)
// 	Math.log2(1)
// ]

// console.log(binary)

const binary: number[] = [32, 16, 8, 4, 2, 1]

const ahha: number[] = binary.map(n => Math.log2(n))

console.log(ahha)