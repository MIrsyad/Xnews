import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Text,
} from 'react-native';
import {
  CustomInput,
  CustomButton,
  HeaderwithBack,
} from '@components/Reusable';
import {Colors} from '@components/Colors';
import {useForm} from '@lib';
import {useDispatch, useSelector} from 'react-redux';
import {Register} from '@redux/auth/action';

export default function register({navigation}) {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const dispatch = useDispatch();
  const {isSuccess, loading} = useSelector(state => {
    console.log('Register Screen state');
    console.log({state});
    return {
      isSuccess: state.auth.isSuccess,
      loading: state.auth.loading,
    };
  });

  useEffect(() => {
    if (isSuccess === 'success') {
      Alert.alert('Info', 'Registrasi berhasil');
      navigation.navigate('ProfileScreen');
    }
  }, [isSuccess]);

  function nameHandler(text) {
    console.log(`Register Screen Name: ${text}`);
    setName(text);
  }

  let {Name, verifName} = useForm();
  function validateName(name) {
    let verifiedName = verifName(name);
    return verifiedName;
  }

  function emailHandler(text) {
    console.log(`Register Screen E-mail: ${text}`);
    setEmail(text);
  }

  let {Email, verifEmail} = useForm();
  function validateEmail(email) {
    let verifiedEmail = verifEmail(email);
    return verifiedEmail;
  }

  function passwordHandler(text) {
    console.log(`Register Screen Password: ${text}`);
    setPassword(text);
  }

  let {Password, verifPassword} = useForm();
  function validatePassword(password) {
    let verifiedPassword = verifPassword(password);
    return verifiedPassword;
  }

  function gotoLogin() {
    navigation.navigate('ProfileScreen');
  }

  function auth(name, email, password) {
    if (
      validateName(name) &&
      validateEmail(email) &&
      validatePassword(password)
    ) {
      console.log(`Name: ${name}`);
      console.log(`E-mail: ${email}`);
      console.log(`Password: ${password}`);
      dispatch(Register(name, email, password));
    } else {
      Alert.alert(
        'Warning',
        '1. Pastikan Nama hanya alphanumeric \n' +
          '2. Pastikan Format E-mail Benar \n' +
          '3. Password minimal 6 karakter',
      );
    }
  }

  return (
    <>
      <HeaderwithBack onPress={() => navigation.goBack()} name="Sign Up" />
      <View style={styles.content}>
        <View style={styles.component}>
          <CustomInput
            placeholder="Name"
            onChangeText={text => {
              nameHandler(text);
            }}
          />
        </View>
        <View style={styles.component}>
          <CustomInput
            placeholder="E-mail"
            onChangeText={text => {
              emailHandler(text);
            }}
          />
        </View>
        <View style={styles.component}>
          <CustomInput
            placeholder="Password"
            onChangeText={text => {
              passwordHandler(text);
            }}
            secure={true}
          />
        </View>
        <View style={styles.buttonbottom}>
          <CustomButton
            onPress={() => auth(name, email, password)}
            name="Sign Up"
          />
          <TouchableOpacity style={styles.link} onPress={() => gotoLogin()}>
            <Text style={styles.label}>Login</Text>
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

  buttonbottom: {
    marginTop: 24,
  },

  link: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 15,
  },

  label: {
    textAlign: 'center',
    color: Colors.greenPrimary,
    fontSize: 16,
  },

  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
