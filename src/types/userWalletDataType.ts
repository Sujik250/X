type TUserWalletData = {
	wallet: number,
	productsPurchased: TProductsPurchased[],
}

type TProductsPurchased = {
	productID: number,
	productItemSelectedID: boolean[],
}