import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import RNEventSource from 'react-native-event-source';

const HomeComponent = ({navigation}) => {
  const handleLogout = () => {
    console.log('handleLogout called');
    // navigation.navigate('Login');
  };

  const [listening, setListening] = useState(false);
  const [message, setMessage] = useState('');

  // useEffect(() => {
  //   console.log('called use effect', listening);
  //   const socket = new WebSocket('ws://10.0.0.17:5005');

  //   socket.onmessage = function (event) {
  //     console.log('Message from server ', event.data);
  //     setMessage(event.data);
  //   };
  //   socket.onerror = function (event) {
  //     console.log('Error from server ', event);
  //   };
  //   socket.onclose = function (event) {
  //     console.log('Close from server ', event);
  //   };
  //   socket.onopen = function () {
  //     console.log('Open from server ');
  //     socket.send('Hello Server!');
  //   };
  // }, []);

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
