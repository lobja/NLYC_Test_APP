import { useState, useEffect } from 'react';
import styles from '../../../../app.css';
import Flag from 'react-native-flags';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import * as actionTypes from '../../../Redux/constants/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";


export default function ProductDetails({ route }) {

  const navigation = useNavigation();
  const cartDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const ProdID = route.params.id;
  const [productList, setProductList] = useState([]);
  const mycart = useSelector(state => state.mycart);
  const { cartItems } = mycart;
  


  useEffect(() => {
    const client = new ApolloClient({
      uri: "http://stag.psp.ge/graphql",
      cache: new InMemoryCache()
    })

    client
      .query({
        query: gql`
              query productDetails {
                productsByID(id: ${ProdID}) {
                  uid
                    sku
                    name
                    units
                    form
                    stock_status
                    only_x_left_in_stock
                    country_of_manufacture
                    product_brand
                    related_products {
                      uid
                      sku
                      name
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
                    categories {
                      uid
                      name
                      url_suffix
                      url_path
                      breadcrumbs {
                        category_name,
                        category_url_path
                      }
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
                    small_image {
                      url
                      position
                      disabled
                      label
                    }
                    image {
                      url
                      position
                      disabled
                      label
                    }
                    media_gallery {
                      url
                      position
                      disabled
                      label
                    }
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
                    meta_description
                    meta_keyword
                    meta_title
                    description {
                      html
                    }
                    short_description {
                      html
                    }
                    options_container
                    special_to_date
                }
              }`,
      })
      .then((result) => setProductList(() => result.data.productsByID) || setIsLoading(false))
      .catch((error) => console.log(error));



  }, [])

  const back = () => {
    navigation.goBack()
  }

  const addToCart = async (names, img, price) => {

    cartDispatch({
      type: actionTypes.ADD_TO_CART,
      payload: {
        imageURL: img,
        ProductPrice: price,
        ProductName: names,
        quantity: 1,
      }
    })
    
    navigation.navigate('Cart')
  }



  return (
    <>
      {isLoading ?
        <ActivityIndicator />
        :
        <ScrollView>
          <View >

            <View style={styles.DetailHeaderBody}>
              <TouchableOpacity style={styles.backBTN} onPress={() => back()}>
                <Ionicons name="arrow-back-circle" size={36} color="#253988" />
              </TouchableOpacity>
              <Text style={styles.Detailheader}>
                {productList.name}
              </Text>
            </View>

            <View>
              <Image
                style={styles.infoPhoto}
                source={{
                  uri: productList.small_image.url
                }}
              />
            </View>
            <View style={styles.DetailDescription}>
              <Text>
                {productList.description.html}
              </Text>
            </View>
            <View style={styles.ProductCountry}>
              {productList.country_of_manufacture == null ? null :

                <Text>
                  <Text style={styles.ProductCountryTXT}> მწარმოებელი ქვეყანა : </Text>
                  <Flag code={productList.country_of_manufacture} size={32} />
                </Text>
              }

            </View>
            <View style={styles.Price}>
              <Text style={styles.PriceTXT}>
                <Text>ფასი : </Text> {Math.floor(productList.price_range.maximum_price.final_price.value)} ლ
              </Text>
            </View>

            <TouchableOpacity
              style={styles.AddCartBtnBody}
              onPress={() =>
                addToCart(
                  productList.name,
                  productList.small_image.url,
                  Math.floor(productList.price_range.maximum_price.final_price.value),
                )
              }>
              <View style={styles.AddCartBtn}>

                <MatIcon name="cart-arrow-down" size={24} color="#f7d348" />
                <Text style={styles.AddCartBtnTXT}>კალათაში დამატება</Text>
              </View>
            </TouchableOpacity>


          </View>


        </ScrollView>
      }
    </>
  )
}