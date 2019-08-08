import React, { useState, useRef, useEffect } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';
import Header from '~/components/Header';

import {
  Container,
  Form,
  FormInput,
  Separator,
  SubmitButton,
  LogoutButton,
} from './styles';

import { signOut } from '~/store/modules/auth/actions';

import { updateProfileRequest } from '~/store/modules/user/actions';

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  const emailRef = useRef();
  const passwordRef = useRef();
  const oldPasswordRef = useRef();
  const confirmPasswordRef = useRef();

  const [name, setName] = useState(profile.name || '');
  const [email, setEmail] = useState(profile.email || '');

  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function handleLogout() {
    dispatch(signOut());
  }

  useEffect(() => {
    setOldPassword('');
    setPassword('');
    setConfirmPassword('');
  }, [profile]);

  function handleSubmit() {
    if (password === confirmPassword) {
      dispatch(
        updateProfileRequest({
          name,
          email,
          oldPassword,
          password,
          confirmPassword,
        })
      );
    } else {
      Alert.alert('Aviso', 'Confirme sua senha corretamente');
    }
  }

  return (
    <Background>
      <Header />
      <Container>
        <Form>
          <FormInput
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Nome Completo"
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
            value={name}
            onChangeText={setName}
          />
          <FormInput
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu e-mail"
            ref={emailRef}
            returnKeyType="next"
            onSubmitEditing={() => oldPasswordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
          />

          <Separator />

          <FormInput
            secureTextEntry
            placeholder="Senha atual"
            returnKeyType="next"
            ref={oldPasswordRef}
            onSubmitEditing={() => confirmPasswordRef.current.focus()}
            value={oldPassword}
            onChangeText={setOldPassword}
          />

          <FormInput
            secureTextEntry
            placeholder="Sua nova senha"
            returnKeyType="next"
            ref={passwordRef}
            onSubmitEditing={() => confirmPassword.current.focus()}
            value={password}
            onChangeText={setPassword}
          />

          <FormInput
            secureTextEntry
            placeholder="Confirmação de  senha"
            returnKeyType="send"
            ref={confirmPasswordRef}
            onSubmitEditing={handleSubmit}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <SubmitButton onPress={handleSubmit}>Salvar perfil</SubmitButton>
          <LogoutButton onPress={handleLogout}>Sair do meetapp</LogoutButton>
        </Form>
      </Container>
    </Background>
  );
}

Profile.navigationOptions = {
  tabBarLabel: 'Meu perfil',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="person" size={20} color={tintColor} />
  ),
};
