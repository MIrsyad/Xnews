import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {CommentCard} from '../component/Reusable';
import {emptyBox} from '../image/svg';
import {SvgXml} from 'react-native-svg';

const data = [
  {
    id: 2,
    title: 'lorem ipsum dor sit amet',
    username: 'irsyad',
    commentString:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget egestas magna. Pellentesque eget facilisis nibh. Sed accumsan libero nec mauris vestibulum euismod. Pellentesque placerat elit nisi, sed rhoncus ante porttitor vitae. Sed consequat luctus rhoncus. Quisque in ligula mi. Nulla dolor metus, finibus blandit ipsum vitae, scelerisque accumsan nibh. Maecenas volutpat diam nec tellus laoreet, sed porttitor elit fringilla. Integer sapien sem, varius ut facilisis id, sodales ac eros.',
    date: '2021-04-05T12:59:33.89066+07:00',
  },
  {
    id: 3,
    title: 'lorem ipsum dor sit amet',
    username: 'ihsan',
    commentString:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget egestas magna. Pellentesque eget facilisis nibh. Sed accumsan libero nec mauris vestibulum euismod. Pellentesque placerat elit nisi, sed rhoncus ante porttitor vitae. Sed consequat luctus rhoncus. Quisque in ligula mi. Nulla dolor metus, finibus blandit ipsum vitae, scelerisque accumsan nibh. Maecenas volutpat diam nec tellus laoreet, sed porttitor elit fringilla. Integer sapien sem, varius ut facilisis id, sodales ac eros.',
    date: '2021-04-05T12:59:33.89066+07:00',
  },
  {
    id: 4,
    title: 'lorem ipsum dor sit amet',
    username: 'Alit',
    commentString:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget egestas magna. Pellentesque eget facilisis nibh. Sed accumsan libero nec mauris vestibulum euismod. Pellentesque placerat elit nisi, sed rhoncus ante porttitor vitae. Sed consequat luctus rhoncus. Quisque in ligula mi. Nulla dolor metus, finibus blandit ipsum vitae, scelerisque accumsan nibh. Maecenas volutpat diam nec tellus laoreet, sed porttitor elit fringilla. Integer sapien sem, varius ut facilisis id, sodales ac eros.',
    date: '2021-04-05T12:59:33.89066+07:00',
  },
  {
    id: 5,
    title: 'lorem ipsum dor sit amet',
    username: 'Ade',
    commentString:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget egestas magna. Pellentesque eget facilisis nibh. Sed accumsan libero nec mauris vestibulum euismod. Pellentesque placerat elit nisi, sed rhoncus ante porttitor vitae. Sed consequat luctus rhoncus. Quisque in ligula mi. Nulla dolor metus, finibus blandit ipsum vitae, scelerisque accumsan nibh. Maecenas volutpat diam nec tellus laoreet, sed porttitor elit fringilla. Integer sapien sem, varius ut facilisis id, sodales ac eros.',
    date: '2021-04-05T12:59:33.89066+07:00',
  },
  {
    id: 6,
    title: 'lorem ipsum dor sit amet',
    username: 'Dimas',
    commentString:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget egestas magna. Pellentesque eget facilisis nibh. Sed accumsan libero nec mauris vestibulum euismod. Pellentesque placerat elit nisi, sed rhoncus ante porttitor vitae. Sed consequat luctus rhoncus. Quisque in ligula mi. Nulla dolor metus, finibus blandit ipsum vitae, scelerisque accumsan nibh. Maecenas volutpat diam nec tellus laoreet, sed porttitor elit fringilla. Integer sapien sem, varius ut facilisis id, sodales ac eros.',
    date: '2021-04-05T18:59:33.89066+07:00',
  },
  {
    id: 7,
    title: 'lorem ipsum dor sit amet',
    username: 'Sahlan',
    commentString:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget egestas magna. Pellentesque eget facilisis nibh. Sed accumsan libero nec mauris vestibulum euismod. Pellentesque placerat elit nisi, sed rhoncus ante porttitor vitae. Sed consequat luctus rhoncus. Quisque in ligula mi. Nulla dolor metus, finibus blandit ipsum vitae, scelerisque accumsan nibh. Maecenas volutpat diam nec tellus laoreet, sed porttitor elit fringilla. Integer sapien sem, varius ut facilisis id, sodales ac eros.',
    date: '2021-04-05T21:59:33.89066+07:00',
  },
];

export default function liked() {
  const renderItem = ({item}) => {
    return (
      <CommentCard
        username={item.username}
        title={item.title}
        commentString={item.commentString}
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
          <Text style={{marginTop: 8}}>comment activity tidak ditemukan</Text>
        </View>
      )}
      {/* <SvgXml xml={emptyBox} width="50%" height="50%" /> */}
    </View>
  );
}
