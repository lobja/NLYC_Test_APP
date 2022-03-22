import { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../../app.css';
import { useSelector, useDispatch } from 'react-redux';
import { MappingCart } from './MappingCarts/MappingCart';
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Cart() {

    const mycart = useSelector(state => state.mycart)
    //const cartTotal = useDispatch();
    const { cartItems } = mycart;
    const [totalItems, setTotalItems] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        let TotItems = 0;
        let TotPrice = 0;

        cartItems.forEach(element => {
            TotItems += element.quantity;
            TotPrice += element.quantity * element.ProductPrice;
        });
        setTotalItems(TotItems);
        setTotalPrice(TotPrice);

    }, [cartItems, totalItems, totalPrice, setTotalItems, setTotalPrice])

    const RemoveStorage = async () =>{
          AsyncStorage.removeItem('@DATA')
    }

    return (
        <ScrollView>
            <View style={styles.cartItemBody}>
                {cartItems.map((item, index) => (
                    <MappingCart key={index} item={item} />
                ))}
                <View style={styles.totalBody}>
                    <Text style={styles.totalSummary}></Text>
                    <Text style={styles.totalItems}>პროდუქტების ჯამური რაოდენობა : ( {totalItems} ერთეული)</Text>
                    <Text style={styles.totalPrice}>ჯამური ფასი : {totalPrice} ლარი</Text>
                    <TouchableOpacity style={styles.ActiveprodBTN} onPress={()=> RemoveStorage()}>
                        <Text style={styles.prodBtnTxt}>ბარათით შეძენა</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}