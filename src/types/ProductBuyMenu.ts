type typeProductBuyMenuProps = {
	index: number;
	toggleIsModalActive: (index: number) => void;
	buyProduct: (index: number) => void
	userWalletData: typeUserWalletData
}