const seededShuffle = <T>(array: T[], seed: string): T[] => {
	// Simple xmur3 hash function to convert seed string to integer
	const xmur3 = (str: string) => {
		let h = 1779033703 ^ str.length;
		for (let i = 0; i < str.length; i++) {
			h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
			h = (h << 13) | (h >>> 19);
		}
		return () => {
			h = Math.imul(h ^ (h >>> 16), 2246822507);
			h = Math.imul(h ^ (h >>> 13), 3266489909);
			return (h ^= h >>> 16) >>> 0;
		};
	};

	// Seeded random number generator using mulberry32
	const mulberry32 = (a: number) => {
		return function () {
			let t = (a += 0x6d2b79f5);
			t = Math.imul(t ^ (t >>> 15), t | 1);
			t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
			return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
		};
	};

	const seedFn = xmur3(seed);
	const rand = mulberry32(seedFn());

	// Make a copy to avoid mutating the original
	const shuffled = array.slice();

	// Fisher-Yates shuffle with seeded random
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(rand() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}

	return shuffled;
};

const getNthShuffledElement = (arr: string[], seed: string, n: number) => seededShuffle(arr, seed)[n % arr.length];

export default getNthShuffledElement;
