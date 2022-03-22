import { View, Text, Image, TouchableOpacity } from 'react-native';
import * as actionTypes from '../../Redux/constants/Constants';
import styles from '../../../app.css';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

export const MappingCart = ({ item }) => {

    const MyDispatch = useDispatch();

    const Minus = () => {
        if (item.quantity > 1) {
            return (
                MyDispatch({
                    type: actionTypes.ADJUST_QTY,
                    payload: {
                        ProductPrice: item.ProductPrice,
                        ProductName: item.ProductName,
                        quantity: item.quantity - 1,
                    }
                })
            )
        }
    }
    const Plus = () => {

        MyDispatch({
            type: actionTypes.ADJUST_QTY,
            payload: {
                ProductPrice: item.ProductPrice,
                ProductName: item.ProductName,
                quantity: item.quantity + 1,
            }
        })
    }

    const RemoveItem = () => {
        MyDispatch({
            type: actionTypes.REMOVE_FROM_CART,
            payload: {
                ProductName: item.ProductName,
            }
        })
    }

    return (
        <View style={styles.cartItemFrame}>
            <Image source={{ uri: item.imageURL }} style={styles.cartItemIMG} />
            <View>
                <Text style={styles.cartItemName}>{item.ProductName}</Text>
                <Text style={styles.cartPrice}> ფასი : {item.ProductPrice} ლ</Text>
                <Text style={styles.qtyToBuy}>საერთო რაოდენობა : <Text style={styles.qtyNum}>{item.quantity}</Text> </Text>
                <View style={styles.cartQtyBody}>
                    <TouchableOpacity style={[styles.cartQtyButtons, styles.cartButtonMinus]} onPress={Minus}>
                        <Text style={styles.cartQtyTXT}>-</Text>
                    </TouchableOpacity>
                    <View style={styles.cartQtysum}><Text style={styles.cartQtyTXTNumb}>{item.quantity}</Text></View>
                    <TouchableOpacity style={[styles.cartQtyButtons, styles.cartButtonPlus]} onPress={Plus}>
                        <Text style={styles.cartQtyTXT}>+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.removeButton} onPress={RemoveItem}>
                        <Icon name="trash" size={30} color={"#ffd16e"} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}