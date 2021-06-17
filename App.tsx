import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import BannerList from './src/components/BannerList';

const httpLink = createHttpLink({
  uri: 'https://graphql.contentful.com/content/v1/spaces/{SPACE_ID}/environments/{ENVIRONMENT}',
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: 'Bearer your-token',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <SafeAreaView style={styles.container}>
        <BannerList></BannerList>
      </SafeAreaView>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
