/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';

import {
  View, Text, FlatList, TouchableOpacity, Image,
} from 'react-native';

function ListUser({ navigation }) {
  const [listUser, setListUser] = useState();
  const [account, setAccount] = useState();
  useEffect(async () => {
    await fetch('https://60f4d20e2208920017f39df5.mockapi.io/customer')
      .then((response) => response.json())
      .then((json) => {
        setListUser(json);
        setAccount(json[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const goToChatDetail = (item) => {
    navigation.navigate('ChatDetail', { account, friend: item });
  };

  const renderUser = (item) => (
    <View>
      <TouchableOpacity
        onPress={() => {
          goToChatDetail(item);
        }}
        style={{
          padding: 10,
          flexDirection: 'row',
          width: '100%',
          height: 70,
        }}
      >
        <Image source={{ uri: item.avatar }} style={{ width: 50, height: 50, borderRadius: 100 }} />
        <View>
          <Text style={{ fontSize: 20, marginLeft: 10 }}>{item.name}</Text>
        </View>
      </TouchableOpacity>
      <View style={{ height: 5, backgroundColor: '#91908c' }} />
    </View>
  );
  return (
    <View>
      <FlatList
        data={listUser}
        renderItem={({ item }) => renderUser(item)}
      />
      <Text>kkk</Text>
    </View>
  );
}
export default ListUser;
