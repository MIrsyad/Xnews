import React from 'react';
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import {useSelector} from 'react-redux';

const GraphProvider = ({children}) => {
  const {isLogin, token} = useSelector(state => {
    return {
      isLogin: state.auth.isLogin,
      token: state.auth.data.token || '',
    };
  });
  const client = new ApolloClient({
    link: new HttpLink({
      uri: 'https://xnews-graphql-playground.herokuapp.com/graphqlGuest',
    }),
    cache: new InMemoryCache(),
  });

  const clientToken = new ApolloClient({
    link: new HttpLink({
      uri: 'https://xnews-graphql-playground.herokuapp.com/graphql',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    cache: new InMemoryCache(),
  });

  if (isLogin) {
    return <ApolloProvider client={clientToken}>{children}</ApolloProvider>;
  } else {
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
  }
};

export {GraphProvider};
export default GraphProvider;
