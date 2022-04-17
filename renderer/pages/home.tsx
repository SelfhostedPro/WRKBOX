import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import dynamic from "next/dynamic";
import electron from "electron"

const getContainers = async () => {
  const ipcRenderer = electron.ipcRenderer || false;
  if (ipcRenderer) {
    let _containers: string = await ipcRenderer.invoke('startup', 'get-containers')
    let containers = JSON.parse(_containers)
    return containers
  }
}


function Home() {
  const [containers, setContainers] = React.useState({});
  React.useEffect(() => {
    if (Object.keys(containers).length === 0){
    getContainers()
      .then( (_containers) => {
        setContainers(_containers)
      })
    }
  })

  const DynamicTerminal = dynamic(() => import("../lib/Terminal"), {
    ssr: false
  });

  return (
    <React.Fragment>
      <Head>
        <title>WRKBOX</title>
      </Head>
      <div className='grid grid-col-1 text-2xl w-full text-center'>
        <img className='ml-auto mr-auto' src='/images/logo.png' />
        <span>⚡ Electron ⚡</span>
        <span> ContainerList: { containers[0] ? JSON.stringify(containers[0]) : null }</span>
      </div>
      <div className='mt-1 w-full flex-wrap flex justify-center'>
        { containers[0] ? <DynamicTerminal containers={containers} />: null }
      </div>
    </React.Fragment>
  );
}

export default Home;
