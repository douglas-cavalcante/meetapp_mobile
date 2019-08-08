import React, { useEffect, useState } from 'react';

import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '~/components/Header';

import { List } from './styles';
import Background from '~/components/Background';
import Card from '~/components/Card';
import api from '~/services/api';

export default function Subscriptions() {
  const [meetups, setMeetups] = useState([]);

  async function loadMeetups() {
    const response = await api.get('subscriptions');
    const subscriptions = response.data.map(subscription => ({
      id: subscription.id,
      File: {
        ...subscription.Meetup.File,
      },
      User: {
        ...subscription.Meetup.User,
      },
      date: subscription.Meetup.date,
      location: subscription.Meetup.location,
      title: subscription.Meetup.title,
    }));
    setMeetups(subscriptions);
  }

  useEffect(() => loadMeetups(), []);

  async function handleCancel(id) {
    try {
      await api.delete(`/subscriptions/${id}`);
      loadMeetups();
      Alert.alert('Aviso', 'Incrição cancelada');
    } catch (error) {
      Alert.alert('Aviso', 'Houve um erro ao tentar cancelar.');
    }
  }

  return (
    <Background>
      <Header />

      <List
        data={meetups}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <Card
            data={item}
            handleClickButton={() => handleCancel(item.id)}
            textButton="Cancelar Inscrição"
          />
        )}
      />
    </Background>
  );
}

Subscriptions.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};
