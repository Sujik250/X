type TStickerInclude = {
	sticker: string
	miniature: string
}

type TReactinData = {
	preview: string;
	name: string;
	category: string;
	include: string[] | TStickerInclude[],
	priceInfo: {
		price: number,
		discount: number,
	},
	id: number;
}