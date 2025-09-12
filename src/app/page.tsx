// app/page.js
import HomeClient from '../components/home/HomeClient'

export const metadata = {
  title: 'Kalifa Os',
  description: 'Discover Kalifa OS, the next-generation operating system. Unlock your device with FRP bypass tools and system app management. Try our free diagnostic service today',
}

export default function Home() {
  return (
    <div className="container mx-auto min-h-full">
      <HomeClient />
    </div>
  )
}