import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Text,
} from 'react-native';
import {
  Header,
  CustomInput,
  CustomButton,
} from '@components/Reusable';
import {Colors} from '@components/Colors';
import {useForm} from '@lib';
import {useDispatch, useSelector} from 'react-redux';
import {Login} from '@redux/auth/action';

export default function login(props, {navigation}) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const dispatch = useDispatch();
  const {isLogin, isSuccess} = useSelector(state => {
    console.log('Login Screen state');
    console.log({state});
    return {
      isLogin: state.auth.isLogin,
      isSuccess: state.auth.isSuccess,
    };
  });

  useEffect(() => {
    if (isLogin) {
      Alert.alert('Info', 'Login berhasil');
      navigation.navigate('ProfileScreen');
    } else {
      if (isSuccess === 'Login Failed') {
        Alert.alert('Info', 'Login gagal! E-mail atau Password salah');
      }
    }
  }, [isLogin, isSuccess]);

  function emailHandler(text) {
    console.log(`Login Screen E-mail: ${text}`);
    setEmail(text);
  }

  let {Email, verifEmail} = useForm();
  function validateEmail(email) {
    let verifiedEmail = verifEmail(email);
    return verifiedEmail;
  }

  function passwordHandler(text) {
    console.log(`Login Screen Password: ${text}`);
    setPassword(text);
  }

  let {Password, verifPassword} = useForm();
  function validatePassword(password) {
    let verifiedPassword = verifPassword(password);
    return verifiedPassword;
  }

  function auth(email, password) {
    if (validateEmail(email) && validatePassword(password)) {
      console.log(`E-mail: ${email}`);
      console.log(`Password: ${password}`);
      dispatch(Login(email, password));
    } else {
      Alert.alert(
        'Warning',
        '1. Pastikan Format E-mail Benar \n' + '2. Password minimal 6 karakter',
      );
    }
  }

  function gotoSignUp() {
    navigation.navigate('RegisterScreen');
  }

  return (
    <>
      <Header name="Log In" />
      <View style={styles.content}>
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
          <TouchableOpacity style={styles.link}>
            <Text style={styles.label}>Forgot your password?</Text>
          </TouchableOpacity>
          <CustomButton onPress={() => auth(email, password)} name="Login" />
          <TouchableOpacity style={styles.link} onPress={props.SignUp}>
            <Text style={styles.label}>Sign Up</Text>
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
