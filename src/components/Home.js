import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import RNEventSource from 'react-native-event-source';

const HomeComponent = ({navigation}) => {
  const handleLogout = () => {
    console.log('handleLogout called');
  };

  const [listening, setListening] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
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

    eventSource.addEventListener('add', event => {
      console.log('Received message:', event);
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

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 25,
      }}>
      <Text>Welcome to Home!</Text>
      <Text>Message: {message}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default HomeComponent;
