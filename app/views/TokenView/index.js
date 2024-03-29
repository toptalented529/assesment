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
  Dimensions,
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

import MainScreen from '../../containers/MainScreen';
import StatusBar from '../../containers/StatusBar';
import MainHeader from '../../containers/MainHeader';
import SearchTransaction from './SearchTransaction';
import TransactionItem from './TransactionItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get("screen")


const TokenView = props => {


  const [allTransaction, setAllTransaction] = useState()
  useEffect(() => {
    const handleFetch = async () => {

      const jwt = await AsyncStorage.getItem("jwt")
      const res = await axios.get("http://95.217.197.177:80/transaction/getMyTransaction", {
        headers: {
          authorization: `bearer ${jwt}`
        }
      }
      )

      res.data.transaction.map((transaction, key) => {

        setAllTransaction(allTransaction.push({
          id: key,
          amount: transaction.imp,
          name: transaction.hayeks_pos > 0 ? "Hayek" : transaction.tkns > 0 ? "Genu" : "producto",
          date: transaction.fch_hra,
          description: transaction.name,
          tracking_number: transaction.tracking_number,



        }))
      })




    }
    handleFetch()
  }, [])


  const navigation = useNavigation()

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
    if (data.length > 0) {
      return (
        <View>
          {data.map(idx => (
            <TransactionItem data={idx} key={'ti' + idx.id} />
          ))}
        </View>
      );
    } else {
      return <></>;
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
    first: () => <RenderFlatListItem type={'all'} data={tData} />,
    second: () => <RenderFlatListItem type={'shopping'} data={tData} />,
    third: () => <RenderFlatListItem type={'commisions'} data={tData} />,
    forth: () => <RenderFlatListItem type={'Withdrawals'} data={tData} />,
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
      {/* <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        initialLayout={{width: layout.width}}
        onIndexChange={setIndex}
        style={{
          backgroundColor: COLOR_ULTRAMARINE,
          paddingBottom: tabBarHeight,
        }}
      /> */}
      <ScrollView>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <TouchableOpacity onPress={() =>{navigation.navigate("Hayek")}}>
          <View style={styles.logoBox}>
            <View style={{ backgroundColor: "#fff", borderRadius: 50, width: width * 0.2, height: width * 0.2 }}>
              <Image source={images.haykes_image} style={styles.logoimage}></Image>
            </View>
            <Text style={styles.logoText}>HAYEK</Text>
            <Text style={styles.logoSmallText}>family</Text>
          </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() =>{navigation.navigate("GenuView")}}>

          <View style={styles.logoBox}>
            <View style={{ backgroundColor: "#fff", borderRadius: 50, width: width * 0.2, height: width * 0.2 }}>
              <Image source={images.haykes_image} style={styles.logoimage}></Image>
            </View>
            <Text style={styles.logoText}>Genu</Text>
            <Text style={styles.logoSmallText}>family</Text>
          </View>
          </TouchableOpacity>

        </View>
        <RenderFlatListItem type={'all'} data={tData} />

      </ScrollView>

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
)(withTheme(TokenView));
