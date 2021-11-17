import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import {Colors} from './Colors';
import {Icon} from 'react-native-elements';
import {FlatList} from 'react-native';
import {ActivityIndicator} from 'react-native';
import {ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {LIKES} from '../graphql/mutation/likes';
import {DISLIKES} from '../graphql/mutation/dislikes';
import {useMutation} from '@apollo/client';
import Spinner from 'react-native-loading-spinner-overlay';
import {BallIndicator} from 'react-native-indicators';
import {useTheme} from '@react-navigation/native';

const TagContainer = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      disabled={props.disabled}
      style={[styles.tagcontainer, props.style]}>
      <Text style={{color: 'white'}}>{props.name}</Text>
    </TouchableOpacity>
  );
};

const CustomInput = props => {
  return (
    <TextInput
      onChangeText={props.onChangeText}
      placeholder={props.placeholder}
      style={styles.customInputContainer}
      secureTextEntry={props.secure}
    />
    // </View>
  );
};

const CustomButton = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={styles.customButtonContainer}>
      <Text style={{color: 'white'}}>{props.name}</Text>
    </TouchableOpacity>
  );
};

const Header = props => {
  const colors = useTheme();
  return (
    <View style={styles.headerContainer}>
      <Text style={[styles.headerTextStyle, {color: colors.colors.text}]}>
        {props.name}
      </Text>
    </View>
  );
};

const CustomLoading = props => {
  return (
    <ActivityIndicator
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
      }}
      size="large"
      color={Colors.greenPrimary}
    />
  );
};

const RoundedImage = props => {
  return (
    <Image
      style={{
        height: 50,
        width: 50,
        borderRadius: 25,
      }}
      source={{
        uri:
          'https://cybercampus.um-surabaya.ac.id/themes/bak/assets/admin/pages/media/profile/profile_user.jpg',
      }}
    />
  );
};

const Card = props => {
  const [likeCount, setLikeCount] = useState(props.likecount);
  const [dislikeCount, setDislikeCount] = useState(props.dislikecount);
  const [articlesId, setArticlesId] = useState(props.articles_id);
  const tags = props.tags;
  const id = props.articleId;
  const [isLiked, setIsLiked] = useState(props.isLiked);
  const imageurl = props.imageurl;
  const {isLogin, userId} = useSelector(state => {
    return {
      isLogin: state.auth.isLogin,
      userId: state.auth.user.id,
    };
  });
  const [Likes, {dataLikes, loading: loadingLikes, errorLikes}] = useMutation(
    LIKES,
  );
  const {colors} = useTheme();

  useEffect(() => {
    setIsLiked(props.isLiked);
    setLikeCount(props.likecount);
    setDislikeCount(props.dislikecount);
  }, [props.isLiked, props.likecount, props.dislikecount]);
  const [
    Dislikes,
    {dataDislikes, loading: loadingDislikes, errorDislikes},
  ] = useMutation(DISLIKES);

  function likes(articles_id, users_id, likes_dislikes) {
    try {
      Likes({
        variables: {
          articles_id: articles_id,
          users_id: users_id,
          likes_dislikes: likes_dislikes,
        },
      });
      console.log('Berhasil Likes');
      console.log(articles_id, users_id, likes_dislikes);
    } catch (error) {
      console.log(error);
      Alert.alert('Error', error);
    }
  }

  function dislikes(articles_id, users_id, likes_dislikes) {
    try {
      Dislikes({
        variables: {
          articles_id: articles_id,
          users_id: users_id,
          likes_dislikes: likes_dislikes,
        },
      });
      console.log('Berhasil Dislikes');
      console.log(articles_id, users_id, likes_dislikes);
    } catch (error) {
      console.log(error);
      Alert.alert('Error', error);
    }
  }

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.cardContainer, {backgroundColor: colors.cardContainer}]}>
      <Spinner
        visible={loadingDislikes || loadingLikes}
        textContent={'Loading...'}
        textStyle={{color: 'white'}}
        customIndicator={<BallIndicator color="white" />}
      />
      <View>
        <Image
          source={{
            uri:
              imageurl == ''
                ? 'https://djuragan.sgp1.digitaloceanspaces.com/djurkam/production/images/lodgings/5c53b6ccd8ae3.png'
                : `${imageurl}`,
          }}
          style={styles.imageCardStyle}
        />
      </View>
      <View style={styles.textCard}>
        <View style={{justifyContent: 'center', flex: 1}}>
          <Image
            style={{
              height: 50,
              width: 50,
              borderRadius: 25,
              alignSelf: 'center',
            }}
            source={{
              uri:
                'https://cybercampus.um-surabaya.ac.id/themes/bak/assets/admin/pages/media/profile/profile_user.jpg',
            }}
          />
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[
              {alignSelf: 'center', flex: 1, color: colors.text},
              props.style,
            ]}>
            {props.authorname}
          </Text>
        </View>
        <View style={{paddingHorizontal: 8, flex: 3}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 20, flex: 11, color: colors.text}}>
              {props.title}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Icon
                  containerStyle={{marginHorizontal: 8}}
                  name="like1"
                  type="antdesign"
                  color={isLiked == 'liked' ? Colors.greenPrimary : Colors.grey}
                  onPress={() => {
                    if (isLogin) {
                      if (isLiked == 'disliked') {
                        setIsLiked('liked');
                        setDislikeCount(dislikeCount - 1);
                        setLikeCount(likeCount + 1);
                      } else if (isLiked == 'neutral') {
                        setIsLiked('liked');
                        setLikeCount(likeCount + 1);
                      } else {
                        setIsLiked('neutral');
                        setLikeCount(likeCount - 1);
                      }

                      likes(id, userId, true);
                    } else {
                      Alert.alert('Info', 'Harap Login terlebih dahulu');
                    }
                  }}
                />
                <Text
                  style={[styles.centerHorizontalStyle, {color: colors.text}]}>
                  {likeCount}
                </Text>
              </View>
              <View>
                <Icon
                  containerStyle={{marginLeft: 8}}
                  name="dislike1"
                  type="antdesign"
                  color={isLiked == 'disliked' ? '#f50' : Colors.grey}
                  onPress={() => {
                    if (isLogin) {
                      if (isLiked == 'liked') {
                        setIsLiked('disliked');
                        setLikeCount(likeCount - 1);
                        setDislikeCount(dislikeCount + 1);
                      } else if (isLiked == 'neutral') {
                        setIsLiked('disliked');
                        setDislikeCount(dislikeCount + 1);
                      } else {
                        setIsLiked('neutral');
                        setDislikeCount(dislikeCount - 1);
                      }
                      /* setDislikeCount(dislikeCount + 1); */
                      dislikes(id, userId, false);
                    } else {
                      Alert.alert('Info', 'Harap Login terlebih dahulu');
                    }
                  }}
                />
                <Text
                  style={[styles.centerHorizontalStyle, {color: colors.text}]}>
                  {dislikeCount}
                </Text>
              </View>
            </View>

            <View
              style={{
                paddingHorizontal: 8,
                flex: 1,
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                }}>
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}>
                  {tags.map(item => {
                    return (
                      <TagContainer
                        style={{marginLeft: 4}}
                        key={item.id}
                        name={item.name}
                      />
                    );
                  })}
                </ScrollView>
              </View>
              <View>
                <Text
                  style={{
                    textAlign: 'right',
                    color: colors.text,
                  }}>
                  {props.articleDate}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const LogOutButton = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        backgroundColor: Colors.cred,
        paddingVertical: 16,
        paddingHorizontal: 32,
        alignSelf: 'flex-start',
        borderRadius: 15,
      }}>
      <Text style={{color: 'white'}}>LogOut</Text>
    </TouchableOpacity>
  );
};

const HeaderHome = props => {
  return (
    <View style={{padding: 16}}>
      <Text>Hello,</Text>
      <Text style={{fontSize: 20, fontWeight: '500'}}>{props.username}</Text>
    </View>
  );
};

const ImageDetailPostCard = props => {
  const imageUri = props.imageUri;
  return (
    <View
      style={{
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 15,
        elevation: 5,
      }}>
      <Image
        source={{
          uri:
            imageUri == ''
              ? 'https://djuragan.sgp1.digitaloceanspaces.com/djurkam/production/images/lodgings/5c53b6ccd8ae3.png'
              : `${imageUri}`,
        }}
        style={{aspectRatio: 3 / 2, borderRadius: 15}}
      />
    </View>
  );
};

const TitleDetailPostCard = props => {
  const {colors} = useTheme();
  return (
    <View
      style={{
        padding: 4,
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 15,
        backgroundColor: colors.cardContainer,
        elevation: 5,
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 20,
          fontWeight: '700',
          paddingTop: 8,
          color: colors.text,
        }}>
        {props.title}
      </Text>
      <Text style={{textAlign: 'right', paddingRight: 4, color: colors.text}}>
        By: {props.author}
      </Text>
    </View>
  );
};

const ContentDetailPostCard = props => {
  const {colors} = useTheme()
  return (
    <View>
      <Text
        style={{
          paddingVertical: 4,
          paddingHorizontal: 16,
          fontSize: 16,
          textAlign: 'justify',
          color: colors.text
        }}>
        {props.content}
      </Text>
    </View>
  );
};

const CustomStatusBar = props => {
  return <StatusBar />;
};

const HeaderwithBack = props => {
  const {colors} = useTheme();
  return (
    <View
      style={{
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 15,
        elevation: 5,
        backgroundColor: colors.cardContainer,
        padding: 8,
      }}>
      <View>
        <View>
          <Icon
            containerStyle={{
              position: 'absolute',
            }}
            name="ios-chevron-back"
            type="ionicon"
            iconStyle={{color: colors.text}}
            onPress={props.onPress}
          />
        </View>

        <Text
          style={{
            alignSelf: 'center',
            textAlign: 'center',
            fontWeight: '700',
            fontSize: 20,
            color: colors.text,
          }}>
          {props.name}
        </Text>
      </View>
    </View>
  );
};

const ArticleCommentFlatlist = props => {
  const renderItem = ({item}) => {
    return (
      <View>
        <Text style={{marginVertical: 4, marginHorizontal: 8}}>
          {item.message}
        </Text>
      </View>
    );
  };
  return (
    <View
      style={{
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 10,
        backgroundColor: 'white',
        elevation: 5,
      }}>
      <FlatList
        scrollEnabled={false}
        data={props.data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const ArticleCommentMap = props => {
  const [data] = props.data;
  console.log({data});
  data.map(item => {
    return (
      <Text style={{marginVertical: 4, marginHorizontal: 8}}>
        {item.message}
      </Text>
    );
  });
};

const styles = StyleSheet.create({
  tagcontainer: {
    backgroundColor: Colors.blueContainer,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 15,
    alignSelf: 'flex-start',
  },
  customInputContainer: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.grey,
    paddingHorizontal: 16,
  },
  customButtonContainer: {
    backgroundColor: Colors.greenPrimary,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  headerContainer: {},
  headerTextStyle: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
  cardContainer: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 15,
    backgroundColor: 'white',
    elevation: 5,
  },
  cardImageContainer: {},
  imageCardStyle: {width: '100%', height: 150, borderRadius: 15},
  textCard: {padding: 16, flexDirection: 'row'},
  centerStyle: {justifyContent: 'center', alignItems: 'center'},
  centerHorizontalStyle: {alignSelf: 'center'},
  CenterVerticalStyle: {justifyContent: 'center'},
});

const LikeCard = props => {
  const cardStatus = props.cardStatus;
  const {colors} = useTheme();
  const tanggalan = date => {
    let tanggal = new Date(date);
    let seconds = Math.floor((new Date() - tanggal) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + ' years ago';
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + ' months ago';
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + ' days ago';
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + ' hours ago';
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + ' minutes ago';
    }
    return Math.floor(seconds) + ' seconds ago';
  };
  return (
    <View
      style={{
        marginHorizontal: 16,
        marginVertical: 8,
        borderTopEndRadius: 15,
        borderBottomEndRadius: 15,
        backgroundColor: colors.cardContainer,
        elevation: 5,
        flexDirection: 'row',
      }}>
      <View
        style={{
          backgroundColor: cardStatus == 'like' ? Colors.greenPrimary : '#f50',
          width: 8,
        }}
      />
      <View style={{flex: 1, padding: 8}}>
        <Text style={{color: colors.text}}>
          {cardStatus == 'Like' ? 'You just liked' : 'You just disliked'}
        </Text>
        <Text style={{fontSize: 16, fontWeight: '500', color: colors.text}}>
          {props.title}
        </Text>
      </View>
      <Text
        style={{
          alignSelf: 'center',
          paddingHorizontal: 16,
          color: colors.text,
        }}>
        {tanggalan(props.date)}
      </Text>
    </View>
  );
};

const CommentCard = props => {
  const {colors} = useTheme();
  const tanggalan = date => {
    let tanggal = new Date(date);
    let seconds = Math.floor((new Date() - tanggal) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + ' years ago';
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + ' months ago';
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + ' days ago';
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + ' hours ago';
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + ' minutes ago';
    }
    return Math.floor(seconds) + ' seconds ago';
  };

  return (
    <View
      style={{
        marginHorizontal: 16,
        marginVertical: 8,
        backgroundColor: colors.cardContainer,
        elevation: 5,
        borderBottomEndRadius: 15,
        borderBottomStartRadius: 15,
      }}>
      <View>
        <View style={{position: 'absolute', top: 3, left: -5}}>
          <View
            style={{
              backgroundColor: Colors.watle,
              width: 15,
              height: 15,
              transform: [{rotate: '45deg'}],
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: Colors.watle,
            paddingHorizontal: 4,
            height: 20,
          }}>
          <Text style={{flex: 1, color: colors.text}}>You just commented</Text>
          <Text style={{color: colors.text}}>{tanggalan(props.date)}</Text>
        </View>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{
            fontSize: 16,
            fontWeight: '600',
            paddingHorizontal: 4,
            paddingVertical: 4,
            color: colors.text,
          }}>
          {props.title}
        </Text>
      </View>
      <View
        style={{flexDirection: 'row', paddingHorizontal: 4, paddingBottom: 4}}>
        <View>
          <RoundedImage />
          <Text style={{alignSelf: 'center', color: colors.text}}>
            {props.username}
          </Text>
        </View>
        <Text
          numberOfLines={3}
          ellipsizeMode="tail"
          style={{
            flex: 1,
            borderRadius: 15,
            marginLeft: 4,
            borderWidth: 1,
            borderColor: Colors.grey,
            backgroundColor: colors.commentColor,
            padding: 4,
            color: colors.text,
          }}>
          {props.commentString}
        </Text>
      </View>
    </View>
  );
};

const IconComment = props => {
  return (
    <Icon
      color={Colors.greenhaze}
      reverse={true}
      containerStyle={[
        {
          borderRadius: 15,
          backgroundColor: Colors.greenhaze,
          marginVertical: 0,
          marginLeft: 4,
        },
        props.style,
      ]}
      name="comment-alt"
      type="font-awesome-5"
      onPress={() => console.log('search clicked')}
    />
  );
};

// Set default props
HeaderHome.defaultProps = {
  username: 'Fellow readers',
};
Card.defaultProps = {
  imageurl: 'https://wallpaperaccess.com/full/1986611.jpg',
};

export {
  TagContainer,
  CustomInput,
  CustomButton,
  Header,
  Card,
  LogOutButton,
  HeaderHome,
  ImageDetailPostCard,
  ContentDetailPostCard,
  TitleDetailPostCard,
  CustomStatusBar,
  HeaderwithBack,
  ArticleCommentFlatlist,
  ArticleCommentMap,
  RoundedImage,
  CustomLoading,
  LikeCard,
  CommentCard,
  IconComment,
};

// TagContainer
// props
//   name -> nama tag nya

// CustomInput
// no props available yet

// CustomButton
// props
//   name -> nama buttonnya
//   onPress -> action buttonnya

// Header
// props
//    name -> nama headernya

// Card
// props
//   likecount -> jumlah like
//   dislikecount -> jumlah dislike
//   authorname -> nama author article
//   title -> judul article
//   articleDate -> tanggal article dibuat
//   tagName -> nama tag article nya

// LogOutButton;
// props;
//   onPress -> action button

// HeaderHome
// props
//   username -> (opt) untuk greeting user di header

// ImageDetailPostCard
// no props available yet

// ContentDetailPostCard
// props
//   content -> isi dari content article nya

// TitleDetailPostCard
// props
//   title -> title dari article
//   author -> penulis article
