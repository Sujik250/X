'use client'

import { TwitterIcoSvg } from '@/assets/svg/TwitterSvg'
import { MobileMenu } from '@/components/mobileMenu/MobileMenu'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export function ThemeCurrent({ children }: {
  children: React.ReactNode
}) {
  const [currentTheme, setCurrentTheme] = useState('dark-theme')

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const settingsData = JSON.parse(localStorage.getItem('settingsData') || '[]')
        if (settingsData.isCurrentTheme === 'white-theme') {
          setCurrentTheme('white-theme')
        }
      }
    } catch (error) {
      console.error('Error retrieving current theme from localStorage:', error)
    }
  }, [])

  return (
    <body className={currentTheme}>
      <header className='TWheader'>
        <Link href={'/'}>
          <TwitterIcoSvg />
        </Link>
      </header>
      <main>
        {children}
        <MobileMenu />
      </main>
    </body>
  )
}