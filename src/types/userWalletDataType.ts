type typeUserWalletData = {
	wallet: number,
	productsPurchased: typeProductsPurchased[],
}

type typeProductsPurchased = {
	productID: number,
	productItemSelectedID: boolean[],
}