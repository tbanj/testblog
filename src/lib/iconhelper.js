/* eslint-disable prettier/prettier */
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFA from 'react-native-vector-icons/FontAwesome5';
let iconList;
async function getIcons() {
    await Promise.all([
        IconMCI.getImageSource('home', 30),
        Icon.getImageSource(Platform.OS === 'android' ? 'md-menu' : 'ios-menu', 30),
        Icon.getImageSource(Platform.OS === 'android' ? 'md-chatbubble' : 'md-chatbubble', 30),
        IconMCI.getImageSource('map-marker', 30),
        IconFA.getImageSource('user', 30),
        //  IconMCI ..user


    ]).then(sources => {
        iconList = [...sources];
    });
}

function getIcon(id) {
    return iconList;
}
export { getIcons, getIcon };

