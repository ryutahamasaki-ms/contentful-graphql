import React from 'react';
import {
  useQuery,
  gql
} from "@apollo/client";
import { Image, Text, View } from 'react-native';

interface Banner {
  sys: {
    id: string;
  };
  title: string;
  productSlug: string;
  position: number;
  image: {
    url: string;
  };
}

interface BannerCollection {
  bannerCollection: {
    items: Banner[];
  }
}

const FETCH_BANNERS = gql`
  query bannerCollectionQuery {
    bannerCollection(order: position_ASC) {
      items {
        sys {
          id
        }
        title,
        productSlug,
        position,
        image {
          url
        }
      }
    }
  }
`;

export default function BannerList() {
  const { loading, error, data } = useQuery<BannerCollection>(FETCH_BANNERS);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :(</Text>;

  return (
    <View style={{flex: 1, paddingHorizontal: 10}}>
      {
        data?.bannerCollection.items.map((item) => (
          <View key={item.sys.id} style={{ marginBottom: 20}}>
            <Text style={{ fontWeight: '600' }}>{item.title}</Text>
            <Image source={{ uri: item.image.url }} style={{height: 100}} />
          </View>
        ))
      }
    </View>
  )
}
