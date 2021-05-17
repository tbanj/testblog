/* eslint-disable prettier/prettier */
import { Alert } from 'react-native';
import { sortedData } from '../../lib/extra';
/* eslint-disable prettier/prettier */
import { NEWS_S_ADDED, SET_NEW, SET_NEWS } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './ui';
import { getObjData } from '../../lib/asyncStorage';
import { Navigation } from 'react-native-navigation';



export const getNews = () => {
    return async (dispatch, getState) => {
        try {
            // to get data store in state use getState
            fetch(`http://api.mediastack.com/v1/news?access_key=${'489d8762257b42e2d449392701a1fe40'}&categories=${'health'}&languages=${'en'}`)
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    } else { throw new Error('network error'); }
                })
                .then(parsedRes => {
                    const news = [];
                    if (parsedRes === null) { dispatch(setNews(news)); return; }
                    if ('error' in parsedRes) {
                        dispatch(setNews(news));
                        return;
                    } else {

                        for (let key in parsedRes.data) {
                            news.push({
                                ...parsedRes.data[key],
                                image: {
                                    uri: parsedRes.data[key].image,
                                    flex: 1,
                                },
                                active: false,
                            });
                        }

                        dispatch(setNews(news));
                    }

                })
                .catch(err => {
                    // Alert.alert('Something went wrong, try again');
                    console.log(err);
                });
        } catch (error) {
            console.log('no token found');
        }
    };
};

export const setNews = news => {
    return {
        type: SET_NEWS,
        news: news,
    };
};


export const newssAdded = () => {
    return {
        type: NEWS_S_ADDED,
    };
};




