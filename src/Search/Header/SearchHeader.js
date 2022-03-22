import { View, Text, TextInput } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import styles from '../../../app.css'
import { useState, useEffect} from 'react'
import Feather from 'react-native-vector-icons/Feather';
import FA5icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';


export default function SearchHeader({ setVal }) {
    const navigation = useNavigation();
    const [myStyle, setMyStyle] = useState(styles.searchBox)
    const [icon, setIcon] = useState(<EvilIcons name="search" size={20} style={styles.searchIcon} />)
    const [searchValue, setSearchvalue] = useState('')
    const setSearchKey = useDispatch();

    const [totalItems, setTotalItems] = useState(0);
    const mycart = useSelector(state => state.mycart)
    const { cartItems } = mycart;

    useEffect(() => {
        let TotItems = 0;

        cartItems.forEach(element => {
            TotItems += element.quantity;
        });
        setTotalItems(TotItems);

    }, [cartItems, totalItems, setTotalItems])

    const funcFocus = () => {
        setIcon()
        setMyStyle(styles.searchBoxAfter)
        setVal(120)
    }
    const funcBlur = () => {
        setIcon(<EvilIcons name="search" size={20} style={styles.searchIcon} />)
        setMyStyle(styles.searchBox)
        setVal(90)
    }


    const showSidebar = () => {
        navigation.navigate('MenuBar')
    }

    const SearchSubmit = () => {
        setSearchKey({
            type: "setSearchKey",
            Skey: searchValue,
        })
        navigation.navigate('MainSearch')
    }

    const goToCart = () =>{
        navigation.navigate('Cart')
    }


    return (
        <View style={styles.searchTab}>
            <View style={styles.NavBarIcons}>
                <View>
                    <View>
                        <Feather name="menu" size={26} color={"#feffff"} onPress={showSidebar} />
                    </View>
                </View>
            </View>
            <View style={myStyle}>
                <TextInput
                    placeholder={"ძიება"}
                    style={styles.searchInput}
                    onChangeText={txt => setSearchvalue(txt)}
                    onFocus={() => funcFocus()}
                    onBlur={() => funcBlur()}
                    onSubmitEditing={() => {
                        SearchSubmit()
                    }
                    }
                    value={searchValue}
                />
                {icon}
            </View>
            <TouchableOpacity style={styles.searchCartIcon} onPress={()=> goToCart()}>
                <View>
                    <View style={styles.cartNum}>
                        <Text style={styles.cartNumTXT}>{totalItems}</Text>
                    </View>
                    <View style={styles.CartIcon}>
                        <FA5icon name='shopping-cart' size={30} color={"#feffff"} />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

