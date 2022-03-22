import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';

import { useState, useEffect } from 'react';
import styles from '../../../app.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";
import SkeletonComp from '../../Skeleton/SkeletonComp';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';


export default function CategoryPage() {

  const [isLoading, setIsLoading] = useState(true);
  const [ProductItems, setProductItems] = useState([]);
  const navigation = useNavigation();
  const Skey = useSelector(state => state.Skey)
  
  let zero = "";

  useEffect(() => {
    const client = new ApolloClient({
      uri: "http://stag.psp.ge/graphql",
      cache: new InMemoryCache()
    })

    client
      .query({
        query: gql`
                query productsList($search: String = "${Skey.Skey === undefined ? zero : Skey.Skey}", $filter: ProductAttributeFilterInput, $pageSize: Int = 20, $currentPage: Int = 1, $sort: ProductAttributeSortInput) {
                    products(search: $search, filter: $filter, pageSize: $pageSize, currentPage: $currentPage, sort: $sort) {
                      aggregations {
                        attribute_code
                        count
                        label
                        options {
                          label
                          value
                          count
                        }
                      }
                      items {
                        uid
                        sku
                        name
                        id
                        stock_status
                        only_x_left_in_stock
                        rating_summary
                        thumbnail {
                          url
                          position
                          disabled
                          label
                        }
                        url_key
                        url_rewrites {
                          url
                        }
                        price_range {
                          maximum_price {
                            final_price {
                              currency
                              value
                            }
                            regular_price {
                              currency
                              value
                            }
                          }
                          minimum_price {
                            final_price {
                              currency
                              value
                            }
                            regular_price {
                              currency
                              value
                            }
                          }
                        }
                      }
                      page_info {
                        current_page
                        page_size
                        total_pages
                      }
                      total_count
                    }
                  }
                `
      })
      .then(result => setProductItems(result.data?.products?.items) || setIsLoading(false));

  }, [Skey.Skey])

  const openDetails = (ID) =>{
        navigation.navigate("ProductDetails", {id : ID})
  }

  return (
    <View>
      {isLoading ?
       
        <SkeletonComp/>
       
        :
        <ScrollView>
        <View style={styles.CategoryBody}>
          {ProductItems.map((prodItems, index) => {
            return (
              <TouchableOpacity style={styles.prodFrame} key={index} onPress={()=> openDetails(prodItems.id)}>
                <ImageBackground source={{ uri: prodItems.thumbnail.url }} style={styles.prodIMG} />
                <Text style={styles.prodNameTXT}>{prodItems.name}</Text>
                <Text style={styles.gpriceTXT}>{Math.round(prodItems.price_range.maximum_price.regular_price.value)} GEL</Text>
              </TouchableOpacity>
            )
          })}
        </View>
        </ScrollView>
      }
    </View>
  )
}


