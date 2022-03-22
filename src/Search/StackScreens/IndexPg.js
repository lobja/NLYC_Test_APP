import { createStackNavigator } from "@react-navigation/stack";
import CategoryPage from "../Category/CategoryPage";
import SearchFromMenu from "./Screens/SearchFromMenu";
import MenuBar from "./StackMenu/MenuBar"
import ProductDetails from "./Screens/ProductDetails";

export default function indexPg({ button, searchBbutton, setSearchBbutton }) {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="MainSearch">
                {() => <CategoryPage button={button} searchBbutton={searchBbutton} setSearchBbutton={setSearchBbutton} />}
            </Stack.Screen>
            <Stack.Screen name="SearchFromMenu" component={SearchFromMenu} />
            <Stack.Screen name="MenuBar" component={MenuBar}/>
            <Stack.Screen name="ProductDetails" component={ProductDetails} />
        </Stack.Navigator>
    )
}