import React, { useEffect, useState } from 'react';
import { Text, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '~/components/Header';

import { Actions, Date, List } from './styles';
import Background from '~/components/Background';
import Card from '~/components/Card';
import api from '~/services/api';

export default function Meetups() {
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('meetups');
      setMeetups(response.data);
    }
    loadMeetups();
  }, []);

  async function handleSubscribe(id) {
    try {
      await api.post(`/meetups/${id}/subscriptions`);
      Alert.alert('Sucesso', 'Seu lugar está guardado :)');
    } catch (error) {
      const { error: errorMessage } = error.response.data;
      if (errorMessage) {
        Alert.alert('Aviso', errorMessage);
      }
    }
  }

  return (
    <Background>
      <Header />

      <Actions>
        <Icon name="chevron-left" size={36} color="#FFF" />
        <Date>30 de maio</Date>
        <Icon name="chevron-right" size={36} color="#FFF" />
      </Actions>

      <List
        data={meetups}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <Card data={item} handleSubscribe={() => handleSubscribe(item.id)} />
        )}
      />
    </Background>
  );
}

Meetups.navigationOptions = {
  headerTitle: <Text>Ola</Text>,
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="list" size={20} color={tintColor} />
  ),
};
