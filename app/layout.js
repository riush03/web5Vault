import { Inter ,Outfit} from 'next/font/google'
import './globals.css'
import { Web5Provider } from './lib/Web5Provider'

const inter = Outfit({ subsets: ['latin'] })

export const metadata = {
  title: 'Web5Vault',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
             {children}
    
        </body>
    </html>
  )
}