import {useQuery} from '@apollo/client';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {TextInput} from 'react-native';
import {View, Text, StyleSheet, RefreshControl} from 'react-native';
import {Icon} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {Colors} from '../component/Colors';
import {Card, CustomLoading, TagContainer} from '../component/Reusable';
import {GET_ALL_CATEGORY} from '../graphql/query/categories';
import {GET_ALL_ARTICLES} from '../graphql/query/articles';
import {ScrollView} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {emptyBox} from '../image/svg';
import {useTheme} from '@react-navigation/native';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export default function Home({navigation}) {
  const [filteredData, setFilteredDta] = useState([]);
  const [filter, setFilter] = useState('');
  const colors = useTheme();
  const {
    loading: loadingArticles,
    data: dataArticles,
    error: errorArticles,
  } = useQuery(GET_ALL_ARTICLES, {pollInterval: 500});

  // const [
  //   getAllArticles,
  //   {loading: loadingArticles, data: dataArticles, error: errorArticles},
  // ] = useLazyQuery(GET_ALL_ARTICLES);

  const {loading: loadingCategory, data, error} = useQuery(GET_ALL_CATEGORY);
  const [selectedId, setSelectedId] = useState(null);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(async () => {
    if (dataArticles !== undefined) {
      console.log('data berubah');
      await setFilteredDta(dataArticles.GetAllArticles);
    }
    console.log('filtered', filteredData);
  }, [dataArticles]);

  useEffect(() => {
    console.log({loadingArticles, dataArticles, errorArticles});
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

  const {isLogin} = useSelector(state => {
    return {
      isLogin: state.auth.isLogin,
    };
  });

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      console.log('refreshing');
      setRefreshing(false);
      getAllArticles();
      console.log({dataArticles});
    });
  }, []);

  const renderItem = ({item}) => {
    let isLiked;
    if (item.likes_dislikes.articles_id == 0) {
      isLiked = 'neutral';
    } else if (item.likes_dislikes.likes_dislikes == true) {
      isLiked = 'liked';
    } else {
      isLiked = 'disliked';
    }
    console.log(colors.colors.text);
    return (
      <Card
        imageurl={item.images}
        articleId={item.id}
        isLiked={isLiked}
        likecount={item.likes}
        dislikecount={item.dislikes}
        authorname={item.author.fullname}
        articles_id={item.id}
        title={item.title}
        tags={item.categories}
        articleDate={tanggalan(item.created_at)}
        onPress={() => navigation.navigate('DetailArticleScreen', item.id)}
      />
    );
  };

  return (
    <View style={{flex: 1}}>
      {loadingArticles || loadingCategory ? (
        <CustomLoading />
      ) : (
        <>
          <View style={{flexDirection: 'row'}}>
            <View
              style={[
                styles.container,
                {
                  flex: 1,
                  marginRight: 8,
                  backgroundColor: colors.colors.cardContainer,
                },
              ]}>
              <TextInput
                style={{paddingHorizontal: 8}}
                placeholder="what do you want to read today?"
                onChangeText={text => {
                  setFilter(text);
                  console.log(filter);
                }}
              />
            </View>
            <Icon
              color={Colors.greenhaze}
              reverse={true}
              containerStyle={{
                padding: 10,
                marginVertical: 8,
                marginRight: 16,
                borderRadius: 15,
                backgroundColor: Colors.greenhaze,
                elevation: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              name="search1"
              type="antdesign"
              onPress={() => {
                let source = dataArticles.GetAllArticles;
                let filtered = source.filter(item => {
                  return item.title.toLowerCase().match(filter);
                });
                console.log('hasil filter', filtered);
                setFilteredDta(filtered);
              }}
            />
          </View>
          <View
            style={[
              styles.container,
              {
                padding: 10,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: colors.colors.cardContainer,
              },
            ]}>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}>
              <Text style={{color: colors.colors.text}}>Category: </Text>
              {data.GetAllCategories.map(item => {
                return (
                  <TagContainer
                    key={item.id}
                    style={{marginHorizontal: 2}}
                    name={item.name}
                    onPress={() =>
                      navigation.navigate('ResultScreen', {
                        categoryId: item.id,
                      })
                    }
                  />
                );
              })}
            </ScrollView>
          </View>
          {filteredData.length == 0 ? (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <SvgXml xml={emptyBox} width="50%" height="50%" />
              <Text style={{marginTop: 8}}>article tidak ditemukan </Text>
            </View>
          ) : (
            <>
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                style={{flex: 1}}
                data={filteredData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                extraData={selectedId}
              />
            </>
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
