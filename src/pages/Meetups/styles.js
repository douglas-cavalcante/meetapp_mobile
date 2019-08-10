import styled from 'styled-components/native';

export const Actions = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const CurrentDate = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;

  justify-content: center;
  align-items: center;
`;

export const List = styled.FlatList.attrs({
  showVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 20 },
})``;
