import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { onLogin, onRegister } = useAuth();

  const login = async () => {
    const result = await onLogin!(email, password);
    if (result && result.error) {
      alert(result.message);
    }
  };

  const register = async () => {
    const result = await onRegister!(email, password);
    if (result && result.error) {
      alert(result.message);
    } else {
      login();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <Button title="Login" onPress={login} />
        <Button title="Register" onPress={register} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '20%',
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  form: {
    gap: 10,
    width: '80%',
  },
  input: {
    height: 44,
    // borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
  },
});

export default Login;
