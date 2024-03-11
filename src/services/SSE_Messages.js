import React, {useEffect, useState} from 'react';
import RNEventSource from 'react-native-event-source';

const useSSEClient = () => {
  const [listening, setListening] = useState(false);

  useEffect(() => {
    console.log('called use efecnt', listening);
    if (listening) return;
    const eventSource = new RNEventSource('http://10.0.0.17:5005/events');

    eventSource.addEventListener('open', () => {
      console.log('Connected to server');
    });

    eventSource.addEventListener('message', event => {
      console.log('Received message:', event.data);
    });

    eventSource.addEventListener('error', error => {
      console.error('Error connecting to server:', error);
    });

    eventSource.onmessage = event => {
      console.log('recived events', event);
    };
    setListening(true);

    // Clean up event source on unmount
    return () => {
      console.log('on mountt closed');
      eventSource.close();
    };
  }, []);

  return;
};

export default useSSEClient;
