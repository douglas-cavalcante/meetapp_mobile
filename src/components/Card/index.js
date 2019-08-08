import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

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

export default function Card({ data, handleClickButton, textButton }) {
  return (
    <Container>
      <Image source={{ uri: data.File.url }} resizeMode="cover" />
      <Content>
        <Title>{data.title}</Title>
        <Details>
          <Info>
            <Icon name="person" size={14} color="#999" />
            <InfoText>
              {' '}
              {format(parseISO(data.date), " dd 'de' MMMM', às' H:mm'h'", {
                locale: pt,
              })}
            </InfoText>
          </Info>
          <Info>
            <Icon name="person" size={14} color="#999" />
            <InfoText>{data.location}</InfoText>
          </Info>
          <Info>
            <Icon name="person" size={14} color="#999" />
            <InfoText>{data.User.name}</InfoText>
          </Info>
          <SubscribeButton onPress={handleClickButton}>
            {textButton}
          </SubscribeButton>
        </Details>
      </Content>
    </Container>
  );
}
