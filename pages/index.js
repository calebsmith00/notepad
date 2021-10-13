import Head from 'next/head'
import Homepage from '../components/Homepage/Homepage'
import Navbar from '../components/Navbar/Navbar'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Notepad App</title>
      </Head>

      <Navbar />
      
      <Homepage />
    </div>
  )
}