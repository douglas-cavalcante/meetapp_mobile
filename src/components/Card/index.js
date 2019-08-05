import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import cap from '~/assets/cap.png';
import {
  Container,
  Image,
  Content,
  Title,
  Details,
  Info,
  InfoText,
  SubscribeButton,
} from './styles';

export default function Card({ data }) {
  return (
    <Container>
      <Image source={cap} resizeMode="cover" />
      <Content>
        <Title>{data.title}</Title>
        <Details>
          <Info>
            <Icon name="person" size={14} color="#999" />
            <InfoText>20 de julho, ás 20h</InfoText>
          </Info>
          <Info>
            <Icon name="person" size={14} color="#999" />
            <InfoText>{data.location}</InfoText>
          </Info>
          <Info>
            <Icon name="person" size={14} color="#999" />
            <InfoText>Organizador: {data.User.name}</InfoText>
          </Info>
          <SubscribeButton>Realizar Inscrição</SubscribeButton>
        </Details>
      </Content>
    </Container>
  );
}
