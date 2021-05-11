/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
    View, StyleSheet, ImageBackground, Dimensions, KeyboardAvoidingView, TouchableWithoutFeedback,
    Keyboard, ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
// import { Navigation } from 'react-native-navigation';
// import SettingScreen from './maintabs/Setting';
// import startMainTabs from './maintabs/startMainTabs';
import DefaultInputRef from '../components/UI/defaultInputRef/DefaultInputRef';
import HeadingText from '../components/UI/headingText/HeadingText';
import MainText from '../components/UI/mainText/MainText';
import background from '../../assets/background.jpg';
import ButtonWithBg from '../components/UI/buttonWithBg/ButtonWithBg';
import validate from '../lib/validation';
import { tryAuth, authAutoSignIn } from '../store/actions/auth';

// import DefaultButton from '../components/UI/defaultButton/DefaultButton';

class AuthScreen extends Component {
    state = {
        // respStyles: {
        //     pwdContainer: styles.portraitPwdContainer,
        //     pwdWrapper: styles.portraitPwdWrapper,
        // },
        authMode: 'login',
        keyboardState: false,
        viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape',
        controls: {
            email: { value: '', touched: false, valid: false, validationRules: { isEmail: true } },
            password: { value: '', touched: false, valid: false, validationRules: { minLength: 6 } },
            confirmPassword: { value: '', touched: false, valid: false, validationRules: { equalTo: 'password' } },
        },

    };
    constructor(props) {

        super(props);
        Dimensions.addEventListener('change', (dims) => this.updateStyles());

        this.textInput = {};
    }
    checkLoginState = async () => { await this.props.onAutoSignIn(); }

    componentDidMount() {
        // for splash screen
        // RNBootSplash.show({ duration: 250 }); // fade
        // this.checkLoginState();
    }




    focusNextTextInput = (id) => {
        this.textInput[id].focus();
    }

    // initiateAuth = () => {
    //     auth().signInAnonymously();
    // };

    loginHandler = () => {
        const authData = {
            email: this.state.controls.email.value,
            password: this.state.controls.password.value,
        };

        // when button is clicked login
        // Navigation.setRoot(startMainTabs);
        // this.props.onTryAuth(authData, this.state.authMode);
        // setTimeout(() => {
        //     this.initiateAuth();
        //     if (this.props.isLogin) { Navigation.setRoot(startMainTabs); };
        // }, 1000);
        Keyboard.dismiss();
        // if (this.state.keyboardState) {

        // }
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                authMode: prevState.authMode === 'login' ? 'signup' : 'login',
            };
        });
    }

    updateStyles = (dims) => {
        this.setState({
            viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape',
        });
    }
    updateInputState = (key, value) => {
        let connectedValue = {};
        if (this.state.controls[key].validationRules.equalTo) {
            const equalControl = this.state.controls[key].validationRules.equalTo;
            const equalValue = this.state.controls[equalControl].value;
            connectedValue = {
                ...connectedValue,
                equalTo: equalValue,
            };
        }
        if (key === 'password') {
            connectedValue = {
                ...connectedValue,
                equalTo: value,
            };
        }
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    confirmPassword: {
                        ...prevState.controls.confirmPassword,
                        valid: key === 'password' ? validate(prevState.controls.confirmPassword.value, prevState.controls.confirmPassword.validationRules, connectedValue) :
                            prevState.controls.confirmPassword.valid,
                    },
                    [key]: {
                        ...prevState.controls[key],
                        value: value,
                        valid: validate(value, prevState.controls[key].validationRules, connectedValue),
                        touched: true,
                    },

                },
            };
        });
    };

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.updateStyles());

    }
    render() {
        let headingText = null;
        let confirmPasswordControl = null;
        let submitBtn = (
            <ButtonWithBg style={styles.button} color={'#29aaf4'}
                disabled={!this.state.controls.email.valid || !this.state.controls.confirmPassword.valid
                    && this.state.authMode === 'signup' || !this.state.controls.password.valid}
                onPress={() => this.loginHandler()}
                // ref={ref => { this.textInput.submitBtn = ref }}
                underlayColor="#fff" text={'Submit'} styleText={styles.loginText} />
        );
        if (Dimensions.get('window').height > 500) {
            headingText = (<MainText>
                <HeadingText style={styles.HeadingText}>Please Login</HeadingText>
            </MainText>);
        }
        if (this.state.authMode === 'signup') {
            confirmPasswordControl = (<View style={this.state.viewMode === 'portrait' ? styles.portraitPwdWrapper : styles.landscapePwdWrapper}>
                <DefaultInputRef placeholder="Confirm Password"
                    onChangeText={(val) => this.updateInputState('confirmPassword', val)}
                    value={this.state.controls.confirmPassword.value}
                    ref={ref => { this.textInput.confirmPass = ref; }}
                    touched={this.state.controls.confirmPassword.touched}
                    valid={this.state.controls.confirmPassword.valid}
                    secureTextEntry
                    handleFocus={this.state.controls.email.valid && this.state.controls.password.valid
                        && this.state.controls.confirmPassword.valid ?
                        () => this.loginHandler() : Keyboard.dismiss}

                    handleBlur={true}
                    handleReturnType={'done'}
                    style={styles.input} />
            </View>);
        }
        if (this.props.isLoading) {
            submitBtn = <ActivityIndicator color="#2196F3" />;
        }
        return (
            <View style={styles.root}>
                <ImageBackground source={background} style={styles.background}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} >
                        <KeyboardAvoidingView style={styles.container} behavior="padding">

                            {/* to make a style override the other it has to be the parent of that view or textciew */}
                            {headingText}
                            {/* <Button style={styles.buttonM} title="Switch to Login" /> */}
                            <ButtonWithBg color={'#29aaf4'} onPress={() => this.switchAuthModeHandler()} text={`Switch to ${this.state.authMode === 'login' ? 'Signup' : 'Login'}`} />
                            {/* <DefaultTouchable style={styles.loginScreenButton}
                            underlayColor="#fff" InnerText={'Switch to Login'} styleText={styles.loginText} /> */}

                            <View style={styles.inputContainer}>
                                <DefaultInputRef
                                    onChangeText={(val) => this.updateInputState('email', val)}
                                    value={this.state.controls.email.value}
                                    valid={this.state.controls.email.valid}
                                    touched={this.state.controls.email.touched}
                                    ref={ref => { this.textInput.emailId = ref; }}
                                    autoCapitalize="none"
                                    handleBlur={false}
                                    handleReturnType={'next'}
                                    handleFocus={() => this.focusNextTextInput('userPass')}
                                    autoCorrect={false}
                                    keyboardType={'email-address'}

                                    placeholder="Email address" style={styles.input} />
                                <View style={this.state.viewMode === 'portrait' || this.state.authMode === 'login' ? styles.portraitPwdContainer : styles.landscapePwdContainer}>
                                    <View style={this.state.viewMode === 'portrait' || this.state.authMode === 'login' ? styles.portraitPwdWrapper : styles.landscapePwdWrapper}>
                                        {this.state.authMode === 'signup' ? <DefaultInputRef
                                            value={this.state.controls.password.value}
                                            onChangeText={(val) => this.updateInputState('password', val)}
                                            valid={this.state.controls.password.valid}
                                            touched={this.state.controls.password.touched}
                                            ref={ref => { this.textInput.userPass = ref; }}
                                            handleBlur={false}
                                            handleFocus={() => this.focusNextTextInput('confirmPass')}
                                            handleReturnType={'next'}
                                            placeholder="Password" style={styles.input}
                                            secureTextEntry /> : <DefaultInputRef
                                            value={this.state.controls.password.value}
                                            onChangeText={(val) => this.updateInputState('password', val)}
                                            valid={this.state.controls.password.valid}
                                            touched={this.state.controls.password.touched}
                                            ref={ref => { this.textInput.userPass = ref; }}
                                            handleFocus={this.state.controls.email.valid && this.state.controls.password.valid ?
                                                () => this.loginHandler() : Keyboard.dismiss}
                                            handleReturnType={'done'}

                                            placeholder="Password" style={styles.input}
                                            handleBlur={true}
                                            secureTextEntry />}
                                    </View>
                                    {confirmPasswordControl}
                                </View>
                            </View>


                            {/* <Button title="Submit"
                            onPress={() => {
                                Navigation.setRoot(startMainTabs);
                            }} /> */}
                            {submitBtn}
                        </KeyboardAvoidingView>
                    </TouchableWithoutFeedback>

                </ImageBackground>
            </View>
        );
    }
}

AuthScreen.options = {
    topBar: {
        title: {
            text: 'AuthScreen',
            color: 'white',
        },
        background: {
            color: '#4d089a',
        },
    },
    bottomTab: {
        text: 'AuthScreen',
    },
};

const styles = StyleSheet.create({
    root: {

        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'whitesmoke',
    },
    container: {

        justifyContent: 'center',
        flex: 1,
        // width: '80%',
        alignItems: 'center',
        // paddingLeft: 10,
        // paddingRight: 10,
    },
    textHeading: {
        fontWeight: 'bold',
        fontSize: 28,
    },
    input: {
        backgroundColor: '#eee',
        borderColor: '#bbb',
    },
    inputContainer: {
        width: '80%',
    },
    background: {
        width: '100%',
        flex: 1,
    },
    buttonM: {
        // padding: 15,
        // backgroundColor: 'white',
        // borderColor: 'red',
        // color: 'white',
    },
    loginScreenButton: {
        marginRight: 40,
        marginLeft: 40,
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#2196F3',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
    },
    button: {
        marginRight: 40,
        marginLeft: 40,
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#2196F3',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
    },
    loginText: {
        color: 'black',
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },
    landscapePwdContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    portraitPwdContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    landscapePwdWrapper: {
        width: '45%',
    },
    portraitPwdWrapper: {
        width: '100%',
    },

});

const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAuth: (authData, authMode) => dispatch(tryAuth(authData, authMode)),
        onAutoSignIn: () => dispatch(authAutoSignIn()),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);

