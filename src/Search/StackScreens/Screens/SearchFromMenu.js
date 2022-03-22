import {useState, useEffect} from 'react';
import styles from '../../../../app.css';

import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    ScrollView,
  } from 'react-native';

import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
} from "@apollo/client";

import SkeletonComp from '../../../Skeleton/SkeletonComp';
import { useNavigation } from '@react-navigation/native';


export default function SearchFromMenu ({route}){

    const navigation = useNavigation();

    const ProductUID = route.params.id;
    const [productList, setProductList] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const client = new ApolloClient({
            uri: "http://stag.psp.ge/graphql",
            cache: new InMemoryCache()
        })

        client
          .query({
            query: gql`
              query Products {
                products(
                  filter: {category_uid: {eq: "${ProductUID}"}}
                  pageSize: 10
                  currentPage: 1
                ) {
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
                      name
                      id
                      sku
                      image{
                        url
                      }
                      price_range {
                        minimum_price {
                          regular_price {
                            value
                            currency
                          }
                        }
                      }
                    }
                  page_info {
                      page_size
                    }
                }
              }
            `,
          })
          .then((result) => setProductList(result.data.products?.items) || setIsLoading(false))
            .catch((error) => console.log(error));
      }, []);


      const openDetails = (ID) => {
             navigation.navigate('ProductDetails',{id : ID})
      }
  
    return(
        <View>
        {isLoading ?
         
          <SkeletonComp/>
         
          :
          <ScrollView>
          <View style={styles.CategoryBody}>
            {productList.map((prodItems, index) => {
              return (
                <TouchableOpacity style={styles.prodFrame} key={index} onPress={()=>openDetails(prodItems.id)}>
                 <ImageBackground source={{ uri: prodItems.image.url }} style={styles.prodIMG} />
                  <Text style={styles.prodNameTXT}>{prodItems.name}</Text>
                  <Text style={styles.gpriceTXT}>{Math.round(prodItems.price_range.minimum_price.regular_price.value)} GEL</Text>
                </TouchableOpacity>
              )
            })}
          </View>
          </ScrollView>
        }
      </View>
    )
}