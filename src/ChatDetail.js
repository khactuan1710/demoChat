/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect, useRef } from 'react';
import {
  View, TextInput, TouchableOpacity, Text, FlatList, Keyboard,
} from 'react-native';

import { AutoScrollFlatList } from 'react-native-autoscroll-flatlist';

function ChatDetail({ route, navigation }) {
  const listRef = useRef();
  const { account, friend } = route.params;
  const [listMessage, setListMessage] = useState();
  const [message, setMessage] = useState();
  const [keyboardStatus, setKeyboardStatus] = useState();
  const getMessage = async () => {
    await fetch('https://60f4d20e2208920017f39df5.mockapi.io/message')
      .then((response) => response.json())
      .then((json) => {
        setListMessage(json);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const sendMessage = async () => {
    await fetch('https://60f4d20e2208920017f39df5.mockapi.io/message', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idUser: account.id,
        message,
      }),
    });
    await getMessage();
  };

  useEffect(() => {
    getMessage();
    console.log(account, 'account chat detail');
    console.log(friend, 'friend chat detail');
  }, []);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const renderMessage = (item) => (
    <View>
      <Text style={{ fontSize: 20, marginLeft: 10, height: 40 }}>{item.message}</Text>
    </View>
  );
  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 90, borderWidth: 1, justifyContent: 'center' }}>
        <Text style={{ fontSize: 20, marginLeft: 10 }}>{friend.name}</Text>
      </View>
      <View style={{ flex: keyboardStatus ? 1.5 : 10, borderWidth: 1 }}>
        <AutoScrollFlatList
          data={listMessage}
          renderItem={({ item }) => renderMessage(item)}
        />

      </View>
      <View style={{
        flex: 1.5, borderWidth: 1, flexDirection: 'row', alignItems: 'center', paddingLeft: 10,
      }}
      >
        <TextInput
          onChangeText={(text) => {
            setMessage(text);
          }}
          placeholder="input message"
          style={{
            width: '70%', borderWidth: 1, paddingLeft: 10, backgroundColor: '#d4d2cb', borderRadius: 30, height: 50,
          }}
        />
        <TouchableOpacity
          onPress={() => {
            sendMessage();
          }}
          style={{
            alignItems: 'center', justifyContent: 'center', height: 40, marginLeft: 15, backgroundColor: 'blue', width: 70, borderRadius: 20,
          }}
        >
          <Text>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default ChatDetail;
