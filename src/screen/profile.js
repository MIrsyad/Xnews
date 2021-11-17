import React, {useEffect} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {Header} from '@components/Reusable';
import {Colors} from '@components/Colors';
import {Icon} from 'react-native-elements';
import jwt_decode from 'jwt-decode';
import {LoginScreen} from '.';
import {useSelector, useDispatch} from 'react-redux';
import {setUser, removeData, removeUser, setIsLogin} from '@redux/auth/action';
import Spinner from 'react-native-loading-spinner-overlay';
import {BallIndicator} from 'react-native-indicators';
import {useTheme} from '@react-navigation/native';

export default function profile({navigation}) {
  const {isLogin, loading, token} = useSelector(state => {
    console.log('Profile Screen state');
    console.log({state});
    return {
      isLogin: state.auth.isLogin,
      token: state.auth.data.token || '',
      loading: state.auth.loading,
    };
  });
  const {colors} = useTheme();

  const dispatch = useDispatch();

  useEffect(() => {
    if (token !== '') {
      dispatch(setUser(jwt_decode(token)));
    }
  }, [token]);

  const {fullname, email, roles} = useSelector(state => {
    console.log({state});
    return {
      fullname: state.auth.user.fullname,
      email: state.auth.user.email,
      roles: state.auth.user.roles,
    };
  });

  function logout() {
    Alert.alert('Info', 'Anda telah logout');
    dispatch(removeData());
    dispatch(removeUser());
    dispatch(setIsLogin(false));
  }

  return (
    <>
      <Spinner
        visible={loading}
        textContent={'Loading...'}
        textStyle={{color: 'white'}}
        customIndicator={<BallIndicator color="white" />}
      />
      {isLogin ? (
        <>
          <View style={[styles.header, {backgroundColor: colors.green}]}>
            <Icon
              containerStyle={styles.iconsettings}
              name="settings"
              type="MaterialIcons"
              color={Colors.mineshaft}
              onPress={() => navigation.navigate('EditProfileScreen')}
            />
            <Header name="Profile" />
            <Image
              style={styles.profilepic}
              source={{
                uri:
                  'https://cybercampus.um-surabaya.ac.id/themes/bak/assets/admin/pages/media/profile/profile_user.jpg',
              }}
            />
          </View>
          <View style={styles.body}>
            <Text style={[styles.name, {color: colors.text}]}>{fullname}</Text>
            <View style={{alignItems: 'flex-start'}}>
              <View style={{flexDirection: 'row'}}>
                <Icon
                  containerStyle={{marginHorizontal: 8}}
                  name="email"
                  type="MaterialCommunityIcons"
                  color={colors.primary}
                />
                <Text style={[styles.profiledetail, {color: colors.text}]}>
                  {email}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Icon
                  containerStyle={{marginHorizontal: 8}}
                  name="idcard"
                  type="antdesign"
                  color={colors.primary}
                />
                <Text style={[styles.profiledetail, {color: colors.text}]}>
                  {roles}
                </Text>
              </View>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity style={styles.btn} onPress={() => logout()}>
                <Text style={styles.label}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : (
        <LoginScreen SignUp={() => navigation.navigate('RegisterScreen')} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    alignItems: 'center',
  },

  body: {
    flex: 1,
    margin: 8,
  },

  iconsettings: {
    marginHorizontal: 8,
    marginVertical: 8,
    alignSelf: 'flex-end',
  },

  profilepic: {
    marginTop: 8,
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    overflow: 'hidden',
  },

  name: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 30,
  },

  profiledetail: {
    width: '90%',
    justifyContent: 'center',
    textAlign: 'left',
    fontSize: 16,
  },

  btn: {
    marginTop: 48, // 3 x 16 = 48
    borderRadius: 15,
    padding: 15,
    width: '50%',
    backgroundColor: Colors.cred,
    alignItems: 'center',
    justifyContent: 'center',
  },

  label: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  },
});

const masterProfile = () => {};
