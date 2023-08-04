import Head from 'next/head'
import SearchBox from '@/components/SearchBox'

export default function Home() {
  return (
    <>
      <Head>
        <title>WeatherApp</title>
      </Head>
      <main className='mt-5 mx-5'>
        <h1 className='text-xl font-medium mb-4'>Weather Wise</h1>
        <form>
          <h2 className='text-lg mb-4'>Search for local weather</h2>
          <div className='mb-4'>
            <SearchBox/>
          </div>
        </form>
      </main>
    </>
  )
}
