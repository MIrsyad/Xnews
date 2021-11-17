import React, {useState} from 'react';
import {View, StyleSheet, Alert, TouchableOpacity, Text} from 'react-native';
import {
  CustomInput,
  CustomButton,
  HeaderwithBack,
} from '@components/Reusable';
import {Colors} from '@components/Colors';
import {useForm} from '@lib';
import {UPDATE_USERS} from '../graphql/mutation/updateUsers';
import {useMutation} from '@apollo/client';
import {useSelector} from 'react-redux';

export default function editprofile({navigation}) {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [UpdateUsers, {dataUsers, loadingUsers, errorUsers}] = useMutation(
    UPDATE_USERS,
  );
  const {userId} = useSelector(state => {
    console.log({state});
    return {
      userId: state.auth.user.id,
    };
  });

  function nameHandler(text) {
    console.log(`Edit Profile Screen Name: ${text}`);
    setName(text);
  }

  let {Name, verifName} = useForm();
  function validateName(name) {
    let verifiedName = verifName(name);
    return verifiedName;
  }

  function emailHandler(text) {
    console.log(`Edit Profile Screen E-mail: ${text}`);
    setEmail(text);
  }

  let {Email, verifEmail} = useForm();
  function validateEmail(email) {
    let verifiedEmail = verifEmail(email);
    return verifiedEmail;
  }

  function passwordHandler(text) {
    console.log(`Edit Profile Screen Password: ${text}`);
    setPassword(text);
  }

  let {Password, verifPassword} = useForm();
  function validatePassword(password) {
    let verifiedPassword = verifPassword(password);
    return verifiedPassword;
  }

  function saveProfile(name) {
    if (validateName(name)) {
      console.log(`Name: ${name}`);
      /*
      console.log(`E-mail: ${email}`);
      console.log(`Password: ${password}`);
      */
      try {
        UpdateUsers({
          variables: {
            id: userId,
            fullname: name,
          },
        });
        Alert.alert(
          'Info',
          `Profile sudah terupdate menjadi\n
        Name: ${name}\n
        Harap login kembali untuk melihat perubahan di Profile Screen!
        `,
        );
      } catch (error) {
        Alert.alert('Error', error);
      } finally {
        setName('');
        /*
        setEmail('');
        setPassword('');
        */
        navigation.navigate('ProfileScreen');
      }
    } else {
      Alert.alert('Warning', '1. Pastikan Nama hanya alphanumeric');
    }
  }

  function discardChanges() {
    console.log('Perubahan profile tidak disimpan (Pindah ke Profile Screen)');
    navigation.navigate('ProfileScreen');
  }

  return (
    <>
      <HeaderwithBack onPress={() => navigation.goBack()} name="Edit Profile" />
      <View style={styles.content}>
        <View style={styles.component}>
          <CustomInput
            placeholder="Name"
            onChangeText={text => {
              nameHandler(text);
            }}
          />
        </View>
        {/*
        <CustomInput
          placeholder="E-mail"
          onChangeText={text => {
            emailHandler(text);
          }}
        />
        <CustomInput
          placeholder="Password"
          onChangeText={text => {
            passwordHandler(text);
          }}
        />
        */}
        <View style={styles.component}>
          <CustomButton onPress={() => saveProfile(name)} name="Save Profile" />
          <TouchableOpacity
            style={styles.link}
            onPress={() => discardChanges()}>
            <Text style={styles.label}>Discard Changes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 8,
    marginRight: 8,
  },

  component: {
    marginTop: 8,
  },

  link: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 15,
  },

  label: {
    textAlign: 'center',
    color: Colors.cred,
    fontSize: 16,
  },
});
