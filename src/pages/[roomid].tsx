import { HuddleIframe, iframeApi, useEventListner } from '@huddle01/iframe';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const App = () => {
  const { roomid } = useRouter().query;

  useEffect(() => { 
    const handleBeforeUnload = (event: any) => {
      event.preventDefault();
      event.returnValue = 'Are you sure you want to leave?';
    }

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [])

  useEventListner('lobby:initialized', () => {
    iframeApi.initialize({
      // redirect to this url when user leaves the room
      redirectUrlOnLeave: 'https://lenster.xyz',
      // wallet logins to show in the lobby
      wallets: ['metamask', 'walletconnect', 'lens'],
      // show the gradient and mesh background
      gradientAndMesh: false,
      // show the background image
      background: ''
    });
  });

  return (
    <div>
      <HuddleIframe
        roomUrl={`https://lenster.huddle01.com/${roomid}`}
        className="h-screen w-full"
      />
    </div>
  );
};

export default App;
