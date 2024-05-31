'use client'

import { useLocalStorage } from '@/hooks/useLocalStorage';
import styles from './Profile.module.css'
import { TwitterCalendarSvg } from '@/assets/svg/TwitterSvg'

export function Profile(): JSX.Element {
	const [settings, setSettings] = useLocalStorage({
        key: 'settingsData',
        defaultValue: {
			isCurrentTheme: 'dark-theme',
		},
    });

	const date = new Date()

	return (
		<>
		<div className={ styles.TWuserHeader }></div>
		<div className={ styles.TWuserProfile }>
			<div className={ styles.TWuserInfo }>
				<img src='https://merriam-webster.com/assets/mw/images/article/art-wap-article-main/egg-3442-e1f6463624338504cd021bf23aef8441@1x.jpg' alt="user" />
				<div className={ styles.TWuserName }>
					<span className={ styles.TWuserProfileNickName }>Anonymous</span>
					<span className={ styles.TWuserProfileName }>@anonymous</span>
				</div>
				<div className={ styles.TWuserDateReg }>
					<TwitterCalendarSvg />
					<span>{`Registartion Date: ${date.getMonth() + 1}.${date.getDate()}.${date.getFullYear()}`}</span>
				</div>
				<div className={ styles.TWuserSettings }>
					<div className={ styles.TWthemeChange }>
						<span>Current Theme:</span>
						<button 
							className={ styles.TWcurrentTheme } 
							onClick={() => {
								setSettings({
									isCurrentTheme: settings.isCurrentTheme === 'dark-theme' ? 
									settings.isCurrentTheme = 'white-theme' : 
									settings.isCurrentTheme = 'dark-theme'
								})
								location.reload()
							}}
						>
						{settings.isCurrentTheme === 'white-theme' ? 'Light' : 'Dark'}
						</button>
					</div>
				</div>
			</div>
			<button>Edit</button>
		</div>
		</>
	)
}