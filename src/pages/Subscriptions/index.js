import React, { useEffect, useState } from 'react';
import { withNavigationFocus } from 'react-navigation';

import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '~/components/Header';

import { List } from './styles';
import Background from '~/components/Background';
import Card from '~/components/Card';
import api from '~/services/api';

function Subscriptions({ isFocused }) {
  const [meetups, setMeetups] = useState([]);

  async function loadSubscriptions() {
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

  useEffect(() => {
    loadSubscriptions();
  }, [isFocused]);

  async function handleCancel(id) {
    try {
      await api.delete(`/subscriptions/${id}`);

      Alert.alert('Aviso', 'Incrição cancelada');
      loadSubscriptions();
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

export default withNavigationFocus(Subscriptions);
