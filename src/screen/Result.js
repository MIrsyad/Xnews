import React, {useState, useEffect} from 'react';
import {useQuery} from '@apollo/client';
import {FlatList, View, StyleSheet, Text} from 'react-native';
import {Card, CustomLoading, HeaderwithBack} from '@components/Reusable';
import {GET_ARTICLES_BY_CATEGORIES} from '../graphql/query/articlesbycategories';
import {SvgXml} from 'react-native-svg';
import {emptyBox} from '../image/svg';

export default function Result({route, navigation}) {
  const {categoryId} = route.params;
  console.log(categoryId);
  const {
    loading: loadingArticles,
    data: dataArticles,
    error: errorArticles,
  } = useQuery(GET_ARTICLES_BY_CATEGORIES, {
    variables: {
      id: categoryId,
    },
    pollInterval: 500,
  });

  const [selectedId, setSelectedId] = useState(null);
  useEffect(() => {
    console.log({dataArticles, loadingArticles, errorArticles});
  }, [loadingArticles, dataArticles, errorArticles]);

  const tanggalan = date => {
    let tanggal = new Date(date);
    let weton = String(tanggal);
    let hari = weton.slice(8, 10);
    let bulan = weton.slice(4, 7);
    let tahunJam = weton.slice(11, 15);
    let complete = `${hari} ${bulan} ${tahunJam}`;
    return complete;
  };

  const renderItem = ({item}) => {
    let isLiked;
    if (item.likes_dislikes.articles_id == 0) {
      console.log('neutral');
      isLiked = 'neutral';
    } else if (item.likes_dislikes.likes_dislikes == true) {
      isLiked = 'liked';
      console.log('liked');
    } else {
      isLiked = 'disliked';
      console.log('disliked');
    }
    return (
      <Card
        imageurl={item.images}
        articleId={item.id}
        isLiked={isLiked}
        likecount={item.likes}
        dislikecount={item.dislikes}
        authorname={item.author.fullname}
        title={item.title}
        tags={item.categories}
        articleDate={tanggalan(item.created_at)}
        onPress={() => navigation.navigate('DetailArticleScreen', item.id)}
      />
    );
  };

  return (
    <View style={{flex: 1}}>
      {loadingArticles ? (
        <CustomLoading />
      ) : (
        <>
          <HeaderwithBack
            name={`Categories ${dataArticles.GetAllArticlesByCategories.name}`}
            onPress={() => navigation.goBack()}
          />
          {dataArticles.GetAllArticlesByCategories.articles.length == 0 ? (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <SvgXml xml={emptyBox} width="50%" height="50%" />
              <Text style={{marginTop: 8}}>article tidak ditemukan </Text>
            </View>
          ) : (
            <FlatList
              style={{flex: 1}}
              data={dataArticles.GetAllArticlesByCategories.articles}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              extraData={selectedId}
            />
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 15,
    backgroundColor: 'white',
    elevation: 5,
  },
});
