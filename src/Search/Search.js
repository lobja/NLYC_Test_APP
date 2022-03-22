import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import styles from '../../app.css'
import Fontisto from 'react-native-vector-icons/Fontisto';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
} from "@apollo/client";
import CategoryPage from './Category/CategoryPage';

export default function Search({button , searchValue, searchBbutton, setSearchBbutton}) {

    const [products, setProducts] = useState([])

    useEffect(() => {

        const client = new ApolloClient({
            uri: "http://stag.psp.ge/graphql",
            cache: new InMemoryCache()
        })

        client
            .query({
                query: gql`
              query categoryList {
                categories {
                  items {
                    children {
                      include_in_menu
                      is_anchor
                      level
                      name
                      position
                      product_count
                      uid
                      url_path
                      url_suffix
                      meta_title
                      meta_description
                      breadcrumbs {
                        category_name,
                        category_url_path
                      }
                      children {
                        include_in_menu
                        is_anchor
                        level
                        name
                        position
                        product_count
                        uid
                        url_path
                        url_suffix
                        meta_title
                        meta_description
                        breadcrumbs {
                          category_name,
                          category_url_path
                        }
                        children {
                          include_in_menu
                          is_anchor
                          level
                          name
                          position
                          product_count
                          uid
                          url_path
                          url_suffix
                          meta_title
                          meta_description
                          breadcrumbs {
                            category_name,
                            category_url_path
                          }
                        }
                      }
                    }
                    meta_title
                    meta_description
                    product_count
                    name
                    uid
                    breadcrumbs {
                      category_name,
                      category_url_path
                    }
                  }
                }
              }
            `
            })
            .then(result => setProducts(result.data?.categories?.items[0].children));
    }, [])
    
    const navigation = useNavigation();
    const [arrayChild, setArrayChild] = useState([]);
    const [submenu, setSubmenu] = useState(true);
    const [Arrname, setArrName] = useState('');

    const [ sidebar, setSidebar ] = useState(false);

    const showSidebar = () => setSidebar(!sidebar)

    const openCat = (arrChildren, arrNames) => {
        if (arrChildren.length == 0) {
            navigation.navigate('Products')
        } else {
            setArrayChild(arrChildren)
            setArrName(arrNames)
            setSubmenu(false) 
        }
    }

    const openSubCat = () => {
        navigation.navigate('SearchFromMenu')
    }
 

    return (
        <>
        <ScrollView style={ button? styles.scrollVActive : styles.scrollV}>
            <View style={styles.MainBody}>
                {submenu ?
                    <View style={styles.SubBody}>
                        {products.map((cat, index) =>
                            <View key={index}>
                                <TouchableOpacity style={styles.childCategoryFrames} onPress={() => openCat(cat.children, cat.name)}>
                                    <View style={styles.MainView}>

                                        <View style={styles.ParentCategoryFrames}>
                                            <Text style={styles.catNames}>
                                                {cat.name}
                                            </Text>
                                        </View>

                                        <Text style={styles.FaIcons}><Fontisto name="angle-right" size={18} /></Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.lines} />
                            </View>
                        )}
                    </View>
                    :
                    <View style={styles.SubBody}>
                        <TouchableOpacity style={styles.ToMainMenu} onPress={() => setSubmenu(true)}>
                            <Text style={styles.FaIconsSub}><Fontisto name="angle-left" size={20} /></Text>
                            <View style={styles.SubBodyHeader}>
                                <Text style={styles.ToMainMenuTXT}>
                                    {Arrname}
                                </Text>
                            </View>
                        </TouchableOpacity>


                        {arrayChild.map((x, index) =>


                            <TouchableOpacity style={styles.ParentSubChild} key={index} onPress={()=> openSubCat()}>
                                <View style={styles.subchild}>
                                    <Text>
                                        {x.name}
                                    </Text>
                                </View>
                                <View style={styles.subline} />
                            </TouchableOpacity>

                        )}
                    </View>
                }
            </View>
        </ScrollView>
        <ScrollView style={styles.ParentCategoryBody}>
           
            <CategoryPage searchValue={searchValue} searchBbutton={searchBbutton} setSearchBbutton={setSearchBbutton}/>
     
        </ScrollView>
        </>
    )
}
