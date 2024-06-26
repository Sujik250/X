type TReactinData = {
	preview: string;
	name: string;
	category: string;
	include: string[],
	priceInfo: {
		price: number,
		discount: number,
	},
	id: number;
}