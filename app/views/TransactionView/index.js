import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';

import {
  COLOR_WHITE,
  COLOR_ULTRAMARINE,
  COLOR_DARKBLACK,
} from '../../constants/colors';
import { withTheme } from '../../theme';
import images from '../../assets/images';
import styles from './styles';
import ActivityIndicator from '../../containers/ActivityIndicator';

import MainScreen from '../../containers/MainScreen';
import StatusBar from '../../containers/StatusBar';
import MainHeader from '../../containers/MainHeader';
import SearchTransaction from './SearchTransaction';
import TransactionItem from './TransactionItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const TransactionView = props => {

  const [allTransaction, setAllTransaction] = useState([])
  const [shoppingTransaction, setShoppingTransaction] = useState()
  const [commissionTransaction, setCommissionTransaction] = useState()
  const [withdrawTransaction, setWithdrawTransaction] = useState()
  const [started,setStart] = useState(false)
  useEffect(() => {
    const handleFetch = async () => {

      const jwt = await AsyncStorage.getItem("jwt")
      const res = await axios.get("http://95.217.197.177:80/transaction/getMyTransaction", {
        headers: {
          authorization: `bearer ${jwt}`
        }
      }
      )  
      let temp = []
      res.data.forEach((transaction, key) => {

        temp.push({
          id: key,
          title: transaction.productname?transaction.productname:'Token',
          price: transaction.imp,
          name: transaction.hayeks_pos > 0 ? "Hayek" : transaction.tkns > 0 ? "Genu" : "producto",
          date: transaction.fch_hra,
          description: transaction.name,
          tracking_number: transaction.tracking_number,
          mov_tip:transaction.mov_tip



        })
      })
      setAllTransaction(temp)
      const shopping = temp.filter(transaction => transaction.mov_tip ==="A")
      setShoppingTransaction(shopping)
      const commit = temp.filter(transaction => transaction.mov_tip ==="I")
      setCommissionTransaction(commit)
      const withdraw = temp.filter(transaction => transaction.mov_tip ==="C")
      setWithdrawTransaction(withdraw)

      setStart(true)
      console.log("slow",res.data)

      
    }
    handleFetch()
  }, [])

  const handleScroll = () => {
    
  }


  const tData = [
    {
      id: 1,
      title: 'Token',
      price: '120',
      date: '15 March 2022 8:20 PM',
    },
    {
      id: 2,
      title: 'Inversion',
      price: '120',
      date: '15 March 2022 8:20 PM',
    },
    {
      id: 3,
      title: 'Producto',
      price: '120',
      date: '15 March 2022 8:20 PM',
    },
    {
      id: 4,
      title: 'Token',
      price: '120',
      date: '15 March 2022 8:20 PM',
    },
    {
      id: 5,
      title: 'Inersion',
      price: '120',
      date: '15 March 2022 8:20 PM',
    },
  ];

  const tabBarHeight = useBottomTabBarHeight();

  const RenderFlatListItem = ({ data, type }) => {
        // const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

    if (data.length > 0) {
      return (
        <ScrollView onScroll={handleScroll}>
          {started && <View>
            {data.map(idx => (
          <TransactionItem data={idx} key={'ti' + idx.id} /> 
          ))}
          </View>}
         
        
        </ScrollView>
      );
    } else {
      return    <ActivityIndicator absolute theme={"light"} size={'large'} />
      ;
    }
  };

  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'All' },
    { key: 'second', title: 'Shopping' },
    { key: 'third', title: 'Commissions' },
    { key: 'forth', title: 'Withdrawals' },
  ]);

  const renderScene = SceneMap({
    first: () => <RenderFlatListItem type={'all'} data={allTransaction.length !==0?allTransaction:tData} />,
    second: () => <RenderFlatListItem type={'shopping'} data={shoppingTransaction? shoppingTransaction:tData} />,
    third: () => <RenderFlatListItem type={'commisions'} data={commissionTransaction?commissionTransaction:tData} />,
    forth: () => <RenderFlatListItem type={'Withdrawals'} data={withdrawTransaction? withdrawTransaction:tData} />,
  });
  const renderTabBar = props => {
    return (
      <View style={[styles.tabBarContainer]}>
        <View style={styles.tabBar}>
          {props.navigationState.routes.map((route, i) => {
            return (
              <TouchableOpacity key={i} onPress={() => setIndex(i)}>
                {i == index ? (
                  <LinearGradient
                    colors={['#6da0ee', '#a755ff']}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style={styles.tabItem}>
                    <Text style={[styles.tabText, { color: COLOR_WHITE }]}>
                      {route.title}
                    </Text>
                  </LinearGradient>
                ) : (
                  <View>
                    <Text style={[styles.tabText, { color: COLOR_WHITE }]}>
                      {route.title}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <MainScreen style={{ backgroundColor: "#141436" }}>
      <View style={{ backgroundColor: "#02010c", borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}>
        <StatusBar />
        <MainHeader />
        <SearchTransaction />
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        initialLayout={{ width: layout.width }}
        onIndexChange={setIndex}
        style={{
          backgroundColor: COLOR_ULTRAMARINE,
          paddingBottom: tabBarHeight,
        }}
      />
    </MainScreen>
  );
};
const mapStateToProps = state => ({
  user: state.login.user,
});

const mapDispatchToProps = dispatch => ({
  fetchUnread: params => dispatch(fetchUnreadAction(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(TransactionView));
