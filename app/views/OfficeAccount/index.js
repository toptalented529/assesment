import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import { withTheme } from '../../theme';
import sharedStyles from '../Styles';
import styles from "./styles"
import images from '../../assets/images';

import { loginSuccess as loginSuccessAction } from '../../actions/login';
import scrollPersistTaps from '../../utils/scrollPersistTaps';
import { CURRENT_USER } from '../../constants/keys';
import { appStart as appStartAction } from '../../actions/app';

import StatusBar from '../../containers/StatusBar';
import CustomTextInput from '../../containers/CustomTextInput';
import KeyboardView from '../../containers/KeyboardView';
import i18n from '../../i18n';
const { width, height } = Dimensions.get('screen');

const theme = 'light';

const OfficeAccount = props => {
  const navigation = useNavigation();
  const { loginSuccess } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [errNickname, seterrNickname] = useState('');
  const [errPassword, setErrPassword] = useState('');
  const nicknameInput = useRef(null);
  const passwordInput = useRef(null);



  const isValid = () => {
    seterrNickname('');
    setErrPassword('');
    if (!nickname.length) {
      seterrNickname('Please enter Nickname');
      nicknameInput.current.focus();
      return false;
    }
    if (!password.length) {
      setErrPassword('Please enter password');
      passwordInput.current.focus();
      return false;
    }
    return true;
  };
  const handleContinue = () => {
    navigation.navigate("CreatePin")
  }
  const handleSignContinue = () => {
    navigation.navigate("MnmonicHandle")
  }

  const onSubmit = () => {
    if (isValid()) {
      setIsLoading(true);

      loginSuccess({});
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: 'column',
      }}>
      <ImageBackground style={styles.container} source={images.background}>
        <StatusBar />
        {/* <KeyboardView
          style={sharedStyles.container}
          keyboardVerticalOffset={128}>
          <ScrollView
            style={{ flex: 1, height: '100%' }}
            {...scrollPersistTaps}
            keyboardShouldPersistTaps="handled"> */}
            <View style={sharedStyles.headerContainer}>
              <Image style={styles.logo} source={images.logo} />
              <Text style={styles.logoText}>{i18n.t('OFFICE')}</Text>
              <Text style={styles.appText}>{i18n.t('universo')}</Text>
            </View>

          {/* </ScrollView>
        </KeyboardView> */}

        <View style={styles.metamaskBox}>
          <Image style={styles.metamask} source={images.logo_white}></Image>
          
          <View style={{ flex: 0, justifyContent: 'center', flexDirection: "row" }}>
            <Text style={styles.metamaskText}>{i18n.t('Do_you')} </Text>
            <Text style={styles.metamaskTextB}>{i18n.t('have_an_account')}</Text>
            <Text style={styles.metamaskText}> {i18n.t('at')}</Text>
          </View>
          <View style={{ flex: 0, flexDirection: "row", justifyContent: 'center', marginBottom: 15 }}>
            <Text style={styles.metamaskText}> {i18n.t('the')}</Text>
            <Text style={styles.metamaskTextB}> {i18n.t('Office_Mobile_account')}</Text>
          </View>
        </View>




        <View style={{ flexDirection: 'column', marginBottom: height * 0.03 }}>
          <LinearGradient
            colors={['#6c40bd', '#1b97c0', '#01dfcc']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            locations={[0, 0.67, 1]}
            style={{
              marginHorizontal: 20,
              borderRadius: 43,

            }}>
            <TouchableOpacity style={styles.registerButton} onPress={handleContinue}>
              <View style={{ flex: 1, height: 64, justifyContent: 'center' }}>
                <Text style={styles.registerText}>{i18n.t('YES')}</Text>
              </View>
            </TouchableOpacity>
          </LinearGradient>
          <View
            style={{
              height: 20,
              backgroundColor: "transparent"
            }}
          >

          </View>
          <LinearGradient
            colors={['#6c40bd', '#1b97c0', '#01dfcc']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            locations={[0, 0.67, 1]}
            style={{
              marginHorizontal: 20,
              borderRadius: 43,
              borderWidth: 3,
              // borderColor:"#fff"
            }}>
            <TouchableOpacity style={styles.registerButton} onPress={handleSignContinue}>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={styles.registerText}>{i18n.t('NO')}</Text>
              </View>
            </TouchableOpacity>
          </LinearGradient>

        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const mapDispatchToProps = dispatch => ({
  loginSuccess: params => dispatch(loginSuccessAction(params)),
  appStart: params => dispatch(appStartAction(params)),
});

export default connect(null, mapDispatchToProps)(withTheme(OfficeAccount));
