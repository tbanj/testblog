/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
// /* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text, Image,
    View, Dimensions, ScrollView, FlatList, TouchableOpacity
} from 'react-native';

import { useDispatch, useSelector, } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import { getNews, setNews } from '../../store/actions/index';
import HeadingText from '../../components/UI/headingText/HeadingText';
import MainText from '../../components/UI/mainText/MainText';
import { TextInput } from 'react-native';
import { getLocalFormat, cleanStr } from '../../lib/extra';
// import Feather from 'react-native-vector-icons/Feather';


const ChatDetail = (props) => {
    const dispatch = useDispatch();
    const activeStyle = { contentText: '#000000', bg: '#4d089a' };
    const inactiveStyle = { contentText: '#D3D3D3', bg: 'transparent' };
    const [searchContent, setSearchContent] = useState(null);
    const [activeIndex, setActiveIndex] = useState(null);


    useEffect(() => {
        return () => {
        };
    }, [props.news]);


    const handleSearch = (event) => {
        let storeInput = event.target.value;
        this.setState({ searchQuery: storeInput });
        // setSearchContent();
    };

    const getSearch = () => {
        let filtered = props.news;
        if (isNaN(searchContent)) {
            let searchQuer = searchContent.toLowerCase();
            filtered = props.news.filter((data) => data.title.toLowerCase().startsWith(searchQuer));
            if (filtered.length < 1) {
                filtered = props.news.filter((data) => data.description.toLowerCase().includes(searchQuer));
                if (filtered.length < 1) { filtered = props.news; }
            }
        }
        return { data: filtered };
    };
    const { data: newsList } = getSearch();

    return (
        <View style={styles.root}>
            <MainText>
                <HeadingText style={styles.fz}>Search</HeadingText>
            </MainText>
            <TextInput
                style={styles.inputContainer}
                onChangeText={(val) => {
                    setSearchContent(val);
                }}
                value={searchContent}
                placeholder="Search by user or placeholder"
                keyboardType="default"
                placeholderTextColor="#808080"
            />

            <MainText>
                <HeadingText style={styles.fz}>Blogs</HeadingText>
            </MainText>



            <FlatList
                data={newsList}
                keyExtractor={(item, index) => item.published_at.toString() + index}
                renderItem={(info) => {
                    return (
                        <TouchableOpacity onPress={() => {
                            let listBlogs = [...props.news];
                            if (activeIndex !== null) {
                                listBlogs[activeIndex] = { ...listBlogs[activeIndex] };
                                listBlogs[activeIndex].active = false;
                                dispatch(setNews(listBlogs));
                                setActiveIndex(null);
                            }

                            const indexBlog = listBlogs.indexOf(info.item);
                            listBlogs[indexBlog] = { ...listBlogs[indexBlog] };
                            listBlogs[indexBlog].active = !listBlogs[indexBlog].active;
                            dispatch(setNews(listBlogs));
                            setActiveIndex(indexBlog);
                        }} >
                            <View>
                                {/* blog new list */}
                                <View style={[styles.blogParent, styles.parentSt]} >
                                    <View style={[styles.smContainer]}>
                                        <Image
                                            style={styles.blogImg}
                                            source={info.item.image.uri ? info.item.image : {
                                                uri: 'https://reactnative.dev/img/tiny_logo.png',
                                            }}
                                            resizeMode="contain"
                                        />
                                    </View>
                                    <View style={[styles.mdContainer, styles.blogText]}>
                                        <View style={styles.blogTxt}><Text style={[styles.titlefz]}>{info.item.title}</Text></View>
                                        <View><Text style={[styles.txtDesc, { color: info.item.active ? activeStyle.contentText : inactiveStyle.contentText }]}>{cleanStr(info.item.description, 300)}</Text></View>
                                    </View>
                                    <View style={[styles.smContainer, styles.blogText]}>
                                        <View style={[styles.blogTxt, styles.activeBlogBox]}><Text >{getLocalFormat(info.item.published_at)}</Text></View>
                                        <View style={[styles.activeBlogBox]}><View style={[styles.activeBlog, { backgroundColor: info.item.active ? activeStyle.bg : inactiveStyle.bg }]} /></View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )

                }}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        display: 'flex',
        flex: 1,
        marginTop: 15,
        marginBottom: 5,
        marginStart: 15,
        marginEnd: 15,
    },

    inputContainer: {
        marginVertical: 10,
        borderWidth: 1,
        borderRadius: 6,
        borderColor: '#ddd',
        borderBottomWidth: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 6,
        fontSize: 25,
        paddingHorizontal: 25,
        height: 60,


    },
    blogParent: {
        display: 'flex',
        flex: 1,
    },
    parentSt: {
        alignItems: 'stretch',
        flexDirection: 'row',
        marginVertical: 10,
    },
    smContainer: {
        // flexGrow: 1,
        flex: 1,
        // paddingHorizontal: 5,
    },
    mdContainer: {
        // flexGrow: 6,
        flex: 4,
    },
    blogImg: {
        width: 50,
        height: 50,
        borderRadius: 25,
        // paddingHorizontal: 5,

    },
    fz: { fontSize: 28 },
    titlefz: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    activeBlog: {
        width: 15,
        height: 15,
        borderRadius: 50,
        // backgroundColor: '#4d089a',

    },
    activeBlogBox: {
        display: 'flex',
        flexDirection: 'row-reverse',

    },
    blogText: {
        marginVertical: 5,

    },
    txtDesc: { color: '#D3D3D3' },
    blogTxt: {
        marginBottom: 8,
    },
});

export default ChatDetail;
