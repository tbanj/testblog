/* eslint-disable prettier/prettier */
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
let iconList;
async function getIcons() {
    await Promise.all([
        Icon.getImageSource(Platform.OS === 'android' ? 'md-map' : 'ios-map', 30),
        Icon.getImageSource(Platform.OS === 'android' ? 'md-menu' : 'ios-menu', 30),
    ]).then(sources => {
        console.log('sources mmm', sources);
        iconList = [...sources];
    });
}

function getIcon(id) {
    console.log('data uuu', iconList, id);
    return iconList;
}
export { getIcons, getIcon };

