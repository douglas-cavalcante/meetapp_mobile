import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
  border-radius: 4px;
  height: 345px;
`;

export const Image = styled.Image`
  flex: 1;
  width: auto;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  margin-bottom: 20px;
`;

export const Content = styled.View`
  flex: 1;
  padding: 0 20px;
`;

export const Title = styled.Text`
  font-size: 18px;
  color: #333333;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const Details = styled.View`
  justify-content: center;
`;

export const Info = styled.View`
  flex-direction: row;
`;

export const InfoText = styled.Text`
  font-size: 13px;
  color: #999999;
  margin-left: 2px;
`;

export const SubscribeButton = styled(Button)`
  margin-top: 10px;
`;
