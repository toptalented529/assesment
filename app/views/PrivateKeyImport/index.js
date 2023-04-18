import React, { useRef, useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import { withTheme } from '../../theme';
import sharedStyles from '../Styles';
import styles from './styles';
import images from '../../assets/images';
import { COLOR_WHITE, COLOR_YELLOW } from '../../constants/colors';

import { loginSuccess as loginSuccessAction } from '../../actions/login';
import scrollPersistTaps from '../../utils/scrollPersistTaps';
import { CURRENT_USER } from '../../constants/keys';
import { appStart as appStartAction } from '../../actions/app';

import StatusBar from '../../containers/StatusBar';
import CustomTextInput from '../../containers/CustomTextInput';
import KeyboardView from '../../containers/KeyboardView';
import { CheckBox } from 'react-native-elements';
import OldTransactionImport from '../OldTransactionImport';
import PushNotification from 'react-native-push-notification';
import i18n from '../../i18n';
const theme = 'light';

const privateKeyImport = props => {
  const navigation = useNavigation();
  const { loginSuccess } = props;
  const [copied, setCopied] = useState(false);
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [errNickname, seterrNickname] = useState('');
  const [errPassword, setErrPassword] = useState('');
  const nicknameInput = useRef(null);
  const passwordInput = useRef(null);
  const [isSelected, setSelection] = useState(false);
  const [privateKey, setPrivateKey] = useState()
  useEffect(() => {
    const getPrivate = async () => {
      const key = await AsyncStorage.getItem('privateKey')
      setPrivateKey(key)
   }
    getPrivate()
  }, [])


  useEffect(() => {
    if(copied) {
      setTimeout(() => {
        setCopied(false)
      }, 1000);
    }
  },[copied])

  const handleClipboard = async () => {
    const privateKey = await AsyncStorage.getItem("privateKey")
    Clipboard.setString(privateKey)
    setCopied(true)

  }

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

  const onSubmit = () => {
   

      // loginSuccess({});
      navigation.navigate("ConnectMetamask")
 
  };
  const onCheckChange = () => {
    setSelection(!isSelected);
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: 'column',
      }}>
      <ImageBackground style={styles.container} source={images.background}>
        <StatusBar />
        <KeyboardView
          style={sharedStyles.container}
          keyboardVerticalOffset={128}>
          <ScrollView
            style={{ flex: 1, height: '100%' }}
            {...scrollPersistTaps}
            keyboardShouldPersistTaps="handled">
            <View style={sharedStyles.headerContainer}>
              <Image style={styles.logo} source={images.logo} />
              <Text style={styles.logoText}>OFFICE</Text>
              <Text style={[styles.appText, { marginTop: -10 }]}>universo</Text>
            </View>
            <View style={styles.formContainer}>
              <View style={styles.description}>
                <Text style={styles.loginText}>
                {i18n.t("This_is_your_Private_Key_copy_it_and_import_it_in_Metamask")}
                </Text>
                <Text style={styles.loginText}>
                {i18n.t('Need_to_comeback_to_the_office')}
                </Text>
              </View>

              <CustomTextInput
                inputRef={passwordInput}
                label={'Password'}
                iconRight={'passwordShow'}
                placeholder={'Contraseña'}
                returnKeyType="send"
                textContentType="oneTimeCode"
                theme={theme}
                value={privateKey}
                secureTextEntry={true}
                error={errPassword}
                onChangeText={val => setPassword(val)}
              />

              <TouchableOpacity style={styles.forgotContainer} onPress={handleClipboard}>
                <LinearGradient
                  colors={['#D1A6FF', '#a857ff', '#a857ff']}
                  start={{ x: 1, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  locations={[0, 0.67, 1]}
                  style={{ borderRadius: 12 }}
                >
                  <Text
                    style={[styles.forgotText, { color: COLOR_WHITE }]}
                  >
                    {!copied?<>{i18n.t('copy_private_key')}</> :<>{i18n.t('private_key_copied')}</>}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardView>

        <View style={{ flexDirection: 'column', marginBottom: 60 }}>
          <LinearGradient
            colors={['#6c40bd', '#1b97c0', '#01dfcc']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            locations={[0, 0.67, 1]}
            style={{
              marginHorizontal: 20,
              borderRadius: 43,
            }}>
            <TouchableOpacity style={[styles.registerButton]} onPress={onSubmit}>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={styles.registerText}>{i18n.t('CONTINUE_LOG_IN')}</Text>
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

export default connect(null, mapDispatchToProps)(withTheme(privateKeyImport));
