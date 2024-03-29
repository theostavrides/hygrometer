import Head from 'next/head'
import Charts from '../components/Charts';
import { IMeasurement } from '../interfaces/IMeasurement'

interface IProps {  
  measurements: IMeasurement[];
}

const Home: React.FC<IProps> = ({ measurements }) => {
  return (
    <div>
      <Head>
        <title>Data</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Charts measurements={measurements}/>
      </main>
    </div>
  )
}

export async function getServerSideProps(context: any) {
  const res = await fetch(`http://localhost:8004/measurements`);
  const measurements = await res.json()

  const props: IProps = { measurements }

  return { props }
}

export default Home