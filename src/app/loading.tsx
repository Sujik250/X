import { TwitterIcoSvg } from "@/assets/svg/TwitterSvg";
import { Loading } from "@/components/ui/Loading/Loading";

export default function loading(): JSX.Element {
	return (
		<div className='TWloadingScreen'>
			<TwitterIcoSvg />
			<div className='LoadingIndicator'>
				<Loading/>
			</div>
		</div>
	)
}