import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router'

/**
 * Error Windows
 * @route `/error/${error}`
 * - Used to display errors
 */

function Error() {

  const router = useRouter()
  const { error } = router.query

  switch (error) {
    case 'dockererror': {
      return (
        <React.Fragment>
          <Head>
            <title>Docker Error</title>
          </Head>
          <div className='flex text-2xl w-screen h-screen justify-center text-center items-center'>
            <div>
              <h1>Docker Error:</h1>
              <p>We're having trouble connecting to the docker socket, are you sure it's installed or running?</p>
            </div>
          </div>
        </React.Fragment>
      )
    }
    default: {
      return (
        <React.Fragment>
          <Head>
            <title>Error</title>
          </Head>
          <div className='grid grid-col-1 text-2xl w-screen text-center align-middle'>
            <span>Error: {error}</span>
          </div>
        </React.Fragment>
      );
    }
  }



}

export default Error;
