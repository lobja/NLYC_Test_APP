import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Cart from './Cart/Cart';
import Home from './Home/Home';
import Profile from './Profile/Profile';
import SearchHeader from './Search/Header/SearchHeader';
import FaIcons from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet } from 'react-native';
import { useState } from 'react';
import IndexPg from './Search/StackScreens/IndexPg';


export default function IndexScreen() {

    const Tabs = createBottomTabNavigator();
    const [val, setVal] = useState(90)
    const [button, setButton] = useState(false)
    const [searchBbutton, setSearchBbutton] = useState(false)

return (

    <Tabs.Navigator
        initialRouteName="მთავარი"
        screenOptions={{
            tabBarStyle: {
                ...styles.tabBarStyle,
            },
            tabBarActiveTintColor: '#f7d348',
            tabBarInactiveTintColor: '#f3f8fe',
            headerTintColor: "#feffff",
            headerStyle: {
                backgroundColor: '#253988',
            },
            tabBarLabelStyle: {
                ...styles.labels
            },
        }}
    >
        <Tabs.Screen
            name="Home"
            component={Home}
            options={{
                tabBarLabel: "მთავარი",
                tabBarIcon: ({ color, size }) => (
                    <FaIcons name="home" color={color} size={size} />
                )
            }}
        />
        <Tabs.Screen
            name="Search"
            options={{
                tabBarLabel: "ძიება",
                headerTitle: () =>

                    <SearchHeader
                        setVal={setVal}
                        setButton={setButton}
                        button={button}
                        setSearchBbutton={setSearchBbutton}
                    />,

                tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="shopping-search" color={color} size={size} />
                ),
                headerStyle: {
                    height: val,
                    backgroundColor: '#253988',
                },
            }}
        >
            {() => <IndexPg button={button} searchBbutton={searchBbutton} setSearchBbutton={setSearchBbutton} />}

        </Tabs.Screen>
        <Tabs.Screen
            name="Cart"
            component={Cart}
            options={{
                tabBarLabel: "კალათა",
                tabBarIcon: ({ color, size }) => (
                    <FaIcons name="shopping-cart" color={color} size={size} />
                )
            }}
        />
        <Tabs.Screen
            name="Profile"
            component={Profile}
            options={{
                tabBarLabel: "პროფილი",
                tabBarIcon: ({ color, size }) => (
                    <FaIcons name="user-circle" color={color} size={size} />
                )
            }}
        />
    </Tabs.Navigator>

)
}

const styles = StyleSheet.create({
    tabBarStyle: {
        height: 100,
        backgroundColor: "#253988",

    },
    labels: {
        fontSize: 12,
        paddingBottom: 10,
        margin: 0,
    },
})