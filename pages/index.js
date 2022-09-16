import Head from 'next/head'
import Image from 'next/image'
import dynamic from 'next/dynamic';
import styles from '../styles/Home.module.css'


// QR reader can't be rendered server-side, so dynamically import client-side
const QrReader = dynamic(() => import('react-qr-reader'), {
  ssr: false,
  // TODO Double check how next rule can be fixed, if possible
  // eslint-disable-next-line react/display-name
  loading: () => {
    return <span>loading...</span>;
  },
});

export default function Home() {

  const pageAwake = () => {
    forceUpdate();
  }

  // rerender component at iOS devices when App is awaken
  useEffect(() => {
    window.addEventListener("pageshow", pageAwake);

    return () => {
      window.removeEventListener("keydown", pageAwake);
    }
  }, []);
  
  return (
    <div className={styles.container}>
      <Head>
        <title>test qr App</title>
      </Head>

      <main className={styles.main}>
       <div>
       <QrReader
          delay={300}
          className="qr-reader-content w-100 h-100"
          onScan={(...args) => console.log('skan>', args)}
          onError={(...args) => console.log('error>', args)}
          onChange={(...args) => console.log('aaa>', args)}
        />
       </div>
      </main>

    </div>
  )
}
