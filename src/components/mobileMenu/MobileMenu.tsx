'use client'

import Link from 'next/link'
import styles from './MobileMenu.module.scss'
import { TwitterSearchSvg, TwitterChatSvg, TwitterHomeSvg, TwitterProfileSvg, TwitterShopSvg } 
from '@/assets/svg/TwitterSvg'
import { usePathname } from 'next/navigation'

export function MobileMenu(): JSX.Element {
	const path = usePathname()

	return (
		<>
		<div className={ styles.TWmobileMenu }>
			<ul className={ styles.TWmobileList }>
				<li className={ styles.TWmobileListItem } data-active={path === '/' ? 'true' : 'false'}>
					<Link href={'/'}>
						<TwitterHomeSvg />
					</Link>
				</li>
				<li className={ styles.TWmobileListItem } data-active={ path.includes('search') ? 'true' : 'false'}>
					<Link href={`/search/txt=`}>
						<TwitterSearchSvg />
					</Link>
				</li>
				<li className={ styles.TWmobileListItem } data-active={ path.includes('/profile') ? 'true' : 'false'}>
					<Link href={'/profile'}>
						<TwitterProfileSvg />
					</Link>
				</li>
				<li className={ styles.TWmobileListItem } data-active={ path.includes('/chat') ? 'true' : 'false'}>
					<Link href={'/chat'}>
						<TwitterChatSvg />
					</Link>
				</li>
				<li className={ styles.TWmobileListItem } data-active={ path.includes('/shop') ? 'true' : 'false'}>
					<Link href={'/shop'}>
						<TwitterShopSvg />
					</Link>
				</li>
			</ul>
		</div>
		</>
	)
}