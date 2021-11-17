import {useQuery, useMutation} from '@apollo/client';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView} from 'react-native';
import {TextInput} from 'react-native';
import {StatusBar} from 'react-native';
import {StyleSheet} from 'react-native';
import {View, Text, Alert} from 'react-native';
import {Icon} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {Colors} from '../component/Colors';
import {LIKES} from '../graphql/mutation/likes';
import {DISLIKES} from '../graphql/mutation/dislikes';
import addComment, {ADD_COMMENT} from '../graphql/mutation/addComment';
import {GET_DETAIL_ARTICLE} from '../graphql/query/detailArticle';
import {
  ImageDetailPostCard,
  TitleDetailPostCard,
  ContentDetailPostCard,
  HeaderwithBack,
  RoundedImage,
  CustomButton,
} from '../component/Reusable';
import Spinner from 'react-native-loading-spinner-overlay';
import {BallIndicator} from 'react-native-indicators';
import {useTheme} from '@react-navigation/native';

export default function DetailArticle({navigation, route}) {
  const {islogin, usersId} = useSelector(state => {
    return {
      islogin: state.auth.isLogin,
      usersId: state.auth.user.id,
    };
  });
  const articleId = route.params;
  const {
    loading: loadingArticles,
    data: dataarticles,
    error: errorArticles,
  } = useQuery(GET_DETAIL_ARTICLE, {
    variables: {id: articleId},
    pollInterval: 500,
  });

  useEffect(() => {
    if (dataarticles !== undefined) {
      setArticles(dataarticles.GetDetailArticles);
    }
    console.log({dataarticles, loadingArticles, errorArticles});
  }, [dataarticles, loadingArticles, errorArticles]);

  const [articles, setArticles] = useState({});

  const [isLiked, setIsliked] = useState('');
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState(null);
  const [likeCount, setLikeCount] = useState(articles.likes);
  const [dislikeCount, setDislikeCount] = useState(articles.dislikes);
  const {colors} = useTheme();
  useEffect(() => {
    if (articles.likes_dislikes !== undefined) {
      if (articles.likes_dislikes.articles_id == 0) {
        setIsliked('neutral');
      } else if (articles.likes_dislikes.likes_dislikes == true) {
        setIsliked('liked');
      } else {
        setIsliked('disliked');
      }

      setLikeCount(articles.likes);
      setDislikeCount(articles.dislikes);
    }
  }, [articles]);
  const [Likes, {dataLikes, loading: loadingLikes, errorLikes}] = useMutation(
    LIKES,
  );
  const [
    Dislikes,
    {dataDislikes, loading: loadingDislikes, errorDislikes},
  ] = useMutation(DISLIKES);
  const [
    AddComment,
    {data: dataComment, loading: loadingComment, error: errorComment},
  ] = useMutation(ADD_COMMENT);

  const articlesId = route.params.id;

  useEffect(() => {
    console.log({loadingComment});
  }, [loadingComment]);

  function likes(articles_id, users_id, likes_dislikes) {
    try {
      Likes({
        variables: {
          articles_id: articles_id,
          users_id: users_id,
          likes_dislikes: likes_dislikes,
        },
      });
    } catch (error) {
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
    } catch (error) {
      //console.log(error);
      Alert.alert('Error', error);
    }
  }

  function commentHandler(c) {
    // console.log(`Comment Handler: ${c}`);
    setComment(c);
  }

  const IconComment = props => {
    const {comment, articlesId} = props;
    // const {action} = props;
    const {usersId} = useSelector(state => {
      return {
        usersId: state.auth.user.id,
      };
    });

    // function actionSubmit() {
    //   action();
    // }

    function addComment(c, articlesId) {
      console.log('Add Comment Clicked!');
      console.log(`User's Comment: ${c}`);
      console.log(`User's id: ${usersId}`);
      console.log(`Article's id: ${articlesId}`);

      try {
        AddComment({
          variables: {
            comment: c,
            users_id: usersId,
            articles_id: articlesId,
          },
        });
        // Alert.alert('Comment berhasil ditambahkan', c);
        console.log('Berhasil Comment');
        console.log(c, usersId, articlesId);
        setComment('');
      } catch (error) {
        Alert.alert('Error', error);
      }
    }

    return (
      <Icon
        disabled={props.disabled}
        color={Colors.greenhaze}
        reverse={true}
        disabledStyle={{backgroundColor: Colors.greenhaze}}
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
        onPress={() => {
          addComment(comment, articlesId);
          // actionSubmit();
        }}
      />
    );
  };

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
    <View>
      {articles.likes_dislikes == undefined ? (
        <ActivityIndicator />
      ) : (
        <>
          <Spinner
            visible={loadingComment || loadingLikes || loadingDislikes}
            textContent={'Loading...'}
            textStyle={{color: 'white'}}
            customIndicator={<BallIndicator color="white" />}
          />
          <StatusBar hidden={true} />
          <ScrollView>
            <HeaderwithBack
              onPress={() => navigation.goBack()}
              name="Article Detail"
            />
            <ImageDetailPostCard imageUri={articles.images} />
            <TitleDetailPostCard
              title={articles.title}
              author={articles.author.fullname}
            />
            <View
              style={{
                marginHorizontal: 16,
                marginVertical: 8,
                borderRadius: 15,
                backgroundColor: colors.cardContainer,
                elevation: 5,
              }}>
              <ContentDetailPostCard content={articles.content} />
              <View style={{paddingHorizontal: 8}}>
                <View style={{flexDirection: 'row'}}>
                  <View>
                    <Icon
                      containerStyle={{marginHorizontal: 8}}
                      name="like1"
                      type="antdesign"
                      color={
                        isLiked == 'liked' ? Colors.greenPrimary : Colors.grey
                      }
                      onPress={() => {
                        if (islogin) {
                          if (isLiked == 'disliked') {
                            setIsliked('liked');
                            setDislikeCount(dislikeCount - 1);
                            setLikeCount(likeCount + 1);
                          } else if (isLiked == 'neutral') {
                            setIsliked('liked');
                            setLikeCount(likeCount + 1);
                          } else {
                            setIsliked('neutral');
                            setLikeCount(likeCount - 1);
                          }
                          // setData(...data, (likecount = likeCount + 1));
                          // console.log('like clicked', likeCount);
                          likes(articles.id, usersId, true);
                        } else {
                          Alert.alert('Info', 'Harap Login terlebih dahulu');
                        }
                      }}
                    />
                    <Text
                      style={[
                        styles.centerHorizontalStyle,
                        {color: colors.text},
                      ]}>
                      {likeCount}
                    </Text>
                  </View>
                  <View>
                    <Icon
                      containerStyle={{marginHorizontal: 8}}
                      name="dislike1"
                      type="antdesign"
                      color={isLiked == 'disliked' ? '#f50' : Colors.grey}
                      onPress={() => {
                        if (islogin) {
                          if (isLiked == 'liked') {
                            setIsliked('disliked');
                            setLikeCount(likeCount - 1);
                            setDislikeCount(dislikeCount + 1);
                          } else if (isLiked == 'neutral') {
                            setIsliked('disliked');
                            setDislikeCount(dislikeCount + 1);
                          } else {
                            setIsliked('neutral');
                            setDislikeCount(dislikeCount - 1);
                          }
                          // setDislikeCount(dislikeCount + 1);
                          // console.log('hello');
                          dislikes(articles.id, usersId, false);
                        } else {
                          Alert.alert('Info', 'Harap Login terlebih dahulu');
                        }
                      }}
                    />
                    <Text
                      style={[
                        styles.centerHorizontalStyle,
                        {color: colors.text},
                      ]}>
                      {dislikeCount}
                    </Text>
                  </View>
                  <Icon
                    color={showComment ? Colors.greenhaze : Colors.grey}
                    name="comment-alt"
                    type="font-awesome-5"
                    onPress={() =>
                      showComment ? setShowComment(false) : setShowComment(true)
                    }
                  />
                </View>
              </View>
              <View style={{backgroundColor: colors.commentColor}}>
                {showComment &&
                  articles.comments.map(item => {
                    return (
                      <View key={item.id}>
                        <View
                          style={{
                            margin: 8,
                            marginBottom: 0,
                            flexDirection: 'row',
                          }}>
                          <RoundedImage />
                          <Text
                            style={{
                              alignSelf: 'center',
                              flex: 1,
                              marginLeft: 4,
                              color: colors.text,
                            }}>
                            {item.users.fullname}
                          </Text>
                          <Text style={{padding: 4, color: colors.text}}>
                            {tanggalan(item.created_at)}
                          </Text>
                        </View>
                        <Text
                          style={{
                            marginBottom: 4,
                            marginHorizontal: 8,
                            marginLeft: 58,
                            color: colors.text,
                          }}>
                          {item.comment}
                        </Text>
                        <View
                          style={{
                            borderBottomColor: Colors.grey,
                            borderBottomWidth: 1,
                          }}
                        />
                      </View>
                    );
                  })}
              </View>
              <View style={{margin: 4, flexDirection: 'row'}}>
                {islogin ? (
                  <>
                    <RoundedImage />
                    <TextInput
                      style={{
                        flex: 1,
                        borderRadius: 15,
                        marginLeft: 4,
                        borderWidth: 1,
                        borderColor: Colors.grey,
                        height: 50,
                      }}
                      placeholder="write your comment"
                      value={comment}
                      onChangeText={c => {
                        commentHandler(c);
                      }}
                    />
                    <IconComment
                      disabled={comment == ''}
                      comment={comment}
                      articlesId={articles.id}
                      onPress={() => {
                        addComment(comment, articlesId);
                      }}
                    />
                  </>
                ) : (
                  <View style={{flex: 1, flexDirection: 'column'}}>
                    <Text
                      style={{
                        textAlign: 'center',
                        marginBottom: 4,
                        color: colors.text,
                      }}>
                      Wanna Share your ideas?
                    </Text>
                    <CustomButton
                      onPress={() => navigation.navigate('ProfileScreen')}
                      name="Log In"
                    />
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  centerHorizontalStyle: {alignSelf: 'center'},
});
