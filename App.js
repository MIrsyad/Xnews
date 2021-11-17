import React, {useState, useEffect} from 'react';
import {StatusBar, Alert, useColorScheme} from 'react-native';
import {Provider, useSelector, useDispatch} from 'react-redux';
import {
  HomeScreen,
  DetailArticleScreen,
  LoginScreen,
  RegisterScreen,
  ProfileScreen,
  EditProfileScreen,
  ActivityScreen,
  SplashScreen,
  ResultScreen,
  CommentScreen,
} from './src/screen/index';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from '@redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-elements';
import {Colors} from './src/component/Colors';
import {GraphProvider} from './src/graphql/apollo';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {removeData, removeUser, setIsLogin} from '@redux/auth/action';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

const MyTheme = {
  dark: false,
  colors: {
    primary: '#288dcc',
    background: 'white',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
    cardContainer: '#ffff',
    green: '#1e5f74',
    commentColor: '#f2f9ff',
  },
};

const darkTheme = {
  dark: true,
  colors: {
    primary: '#288dcc',
    secondary: '#1f4068',
    background: '#1a1a2e',
    card: '#1a1a2e',
    text: '#ffff',
    border: '#00028',
    notification: '#9933ff',
    cardContainer: '#0f3460',
    green: '#1e5f74',
    commentColor: '#325288',
  },
};

function MyTabs() {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="Like" component={ActivityScreen} />
      <TopTab.Screen name="Comment" component={CommentScreen} />
    </TopTab.Navigator>
  );
}

function Home() {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'HomeScreen') {
            iconName = 'home';
          } else if (route.name === 'ProfileScreen') {
            iconName = 'user';
          } else {
            iconName = 'profile';
          }

          // You can return any component that you like here!
          return (
            <Icon name={iconName} type="antdesign" size={size} color={color} />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: Colors.XapiensColor,
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Activity" component={MyTabs} />
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function App() {
  const scheme = useColorScheme();
  const {expire} = useSelector(state => {
    console.log({state});
    return {
      expire: state.auth.data.expire,
    };
  });

  let now = Date.parse(new Date());
  let exp = Date.parse(expire);
  const dispatch = useDispatch();

  useEffect(() => {
    if (now > exp) {
      Alert.alert('Info', 'Sesi anda telah habis! Silahkan login kembali.');
      dispatch(removeData());
      dispatch(removeUser());
      dispatch(setIsLogin(false));
    } else {
      console.log(`Session left: ${exp} - ${now} = ${exp - now} ms`);
    }
  }, [now, exp]);

  return (
    <NavigationContainer theme={scheme == 'light' ? MyTheme : darkTheme}>
      <StatusBar
        backgroundColor={scheme == 'dark' ? '#1a1a2e' : '#ffff'}
        barStyle={scheme == 'dark' ? 'light-content' : 'dark-content'}
      />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="TabScreen" component={Home} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen
          name="DetailArticleScreen"
          component={DetailArticleScreen}
        />
        <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
        <Stack.Screen name="ResultScreen" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const masterApp = () => {
  const [localLoading, setLocalLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLocalLoading(false), 2000);
  }, []);
  console.log({localLoading});

  return (
    <>
      {localLoading ? (
        <SplashScreen />
      ) : (
        <Provider store={store}>
          <GraphProvider>
            <PersistGate localLoading={false} persistor={persistor}>
              <App />
            </PersistGate>
          </GraphProvider>
        </Provider>
      )}
    </>
  );
};

export default masterApp;
