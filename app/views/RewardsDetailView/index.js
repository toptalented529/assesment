import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import {
  FlatList,
  Image,
  RefreshControl,
  View,
  Text,
  Dimensions,
  useWindowDimensions,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import StatusBar from '../../containers/StatusBar';
import ActivityIndicator from '../../containers/ActivityIndicator';
import MainHeader from '../../containers/MainHeader';
import * as HeaderButton from '../../containers/HeaderButton';
import MainScreen from '../../containers/MainScreen';

import I18n from '../../i18n';
import styles from './styles';
import { withActionSheet } from '../../containers/ActionSheet';
import scrollPersistTaps from '../../utils/scrollPersistTaps';
import { withTheme } from '../../theme';
import { COLOR_WHITE } from '../../constants/colors';

import BalanceDetail from './BalanceDetail';
import BuyButton from './BuyButton';
import RecentActivity from './RecentActivity';
import CardDataItem from './CardDataItem';

import images from '../../assets/images';
import RewardHeader from './RewardHeader';
const { width } = Dimensions.get('screen');

const RewardsDetailView = props => {
  const navigation = useNavigation();
  const [state, setState] = useState({
    refreshing: false,
    loading: false,
    isUpdating: false,
  });
  const { loading, isUpdating, refreshing } = state;
  const tabBarHeight = useBottomTabBarHeight();

  return (

    <MainScreen
      navigation={navigation}
      style={{backgroundColor: 'transparent', paddingBottom: tabBarHeight-30 }}
    >
      <ImageBackground
        source={images.home_background}
        style={styles.backgroundImage}
      >
        <StatusBar />
        <MainHeader />
        {isUpdating && (
          <ActivityIndicator absolute theme={theme} size={'large'} />
        )}
        <ScrollView style={{ flexGrow: 1 }}>
          <RewardHeader name = {"Direct"} />

          <Text style = {styles.transactionText}>My Transaction</Text>
          <View style={styles.btnContainer}>
            <BuyButton name={'Buy Investment'} />
            <BuyButton name={'Buy Blockchain'} />
            <BuyButton name={'Buy Products'} />
          </View>
          <View style = {styles.cardItems}>
          <CardDataItem name = {'Blockchain'} />
          </View>
          <CardDataItem name = {'Associated'}/>
          <CardDataItem name = {'Products'}/>
        </ScrollView>
      </ImageBackground>
    </MainScreen>

  );
};

const mapStateToProps = state => ({
  user: state.login.user,
});

const mapDispatchToProps = dispatch => ({
  setUser: params => dispatch(setUserAction(params)),
  fetchUnread: params => dispatch(fetchUnreadAction(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withActionSheet(withTheme(RewardsDetailView)));
