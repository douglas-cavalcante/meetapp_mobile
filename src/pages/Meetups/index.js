import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { format } from 'date-fns';

import Header from '~/components/Header';

import { List } from './styles';
import Background from '~/components/Background';
import Card from '~/components/Card';
import api from '~/services/api';
import SelectorDate from '~/components/SelectorDate';

export default function Meetups() {
  const [meetups, setMeetups] = useState([]);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    async function loadMeetups() {
      const dateFormatted = format(date, 'yyyy-MM-dd');
      const response = await api.get(`meetups?date=${dateFormatted}`);
      setMeetups(response.data);
    }
    loadMeetups();
  }, [date]);

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
      <SelectorDate date={date} onChange={setDate} />
      <List
        data={meetups}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <Card
            data={item}
            handleClickButton={() => handleSubscribe(item.id)}
            textButton="Realizar Inscrição"
          />
        )}
      />
    </Background>
  );
}

Meetups.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="list" size={20} color={tintColor} />
  ),
};
