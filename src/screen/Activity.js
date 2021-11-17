import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {LikeCard} from '../component/Reusable';
import {emptyBox} from '../image/svg';
import {SvgXml} from 'react-native-svg';

const data = [
  {
    id: 1,
    cardStatus: 'like',
    title: 'lorem ipsum dor sit amet',
    date: '2021-04-05T12:59:33.89066+07:00',
  },
  {
    id: 3,
    cardStatus: 'dislike',
    title: 'lorem ipsum dor sit amet',
    date: '2021-04-05T12:59:33.89066+07:00',
  },
  {
    id: 5,
    cardStatus: 'dislike',
    title: 'lorem ipsum dor sit amet',
    date: '2021-04-05T12:59:33.89066+07:00',
  },
  {
    id: 6,
    cardStatus: 'like',
    title: 'lorem ipsum dor sit amet',
    date: '2021-04-05T12:59:33.89066+07:00',
  },
  {
    id: 7,
    cardStatus: 'like',
    title: 'lorem ipsum dor sit amet',
    date: '2021-04-05T12:59:33.89066+07:00',
  },
  {
    id: 8,
    cardStatus: 'like',
    title: 'lorem ipsum dor sit amet',
    date: '2021-04-05T15:19:33.89066+07:00',
  },
];

export default function Activity() {
  const renderItem = ({item}) => {
    return (
      <LikeCard
        cardStatus={item.cardStatus}
        title={item.title}
        date={item.date}
      />
    );
  };
  return (
    <View>
      <FlatList data={data} renderItem={renderItem} key={data.id} />
      {data.length == 0 && (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <SvgXml xml={emptyBox} width="50%" height="50%" />
          <Text style={{marginTop: 8}}>like activity tidak ditemukan</Text>
        </View>
      )}
    </View>
  );
}
