import React, { useState } from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import images from '../../assets/images';
import styles from './styles';
import {COLOR_WHITE, COLOR_BLACK} from '../../constants/colors';
import {VectorIcon} from '../../containers/VectorIcon';

import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { payment_ABI, payment_address, token_ABI, token_address } from '../../constants/app';
import { ethers } from 'ethers';

const ProductItem = ({data,etheruem}) => {

  const [address, setAddress] = useState()
  console.log("333333333333333333",data.image)


  const handleClick = async () => {
  
      try {
        if (!etheruem.isConnected()) {
          console.log("dfdf", etheruem)
          const result = await etheruem.request({ method: 'eth_requestAccounts' });
          console.log('RESULT', result?.[0], etheruem.selectedAddress);
          setAddress(result?.[0])
          AsyncStorage.setItem("currentAddress", result?.[0])
          const provider = new ethers.providers.Web3Provider(etheruem);
          const address = '0x735951C5519704203a1e76ef5251A3D9fe3ED61f';
  
          // Get the balance for the address
          provider.getBalance(address)
            .then(balance => {
              console.log(`Balance for ${address}: ${ethers.utils.formatEther(balance)} ETH`);
            })
            .catch(error => {
              console.error(error);
            });
   
            const weiAmount = ethers.utils.parseUnits(data.price.toString(), 'ether');


            const contractToken = new ethers.Contract(token_address, token_ABI, provider.getSigner());
          
            await contractToken.approve(payment_address,weiAmount)
          
            const contract = new ethers.Contract(payment_address, payment_ABI, provider.getSigner());
  
  
            await contract.purchase(data.category,data.subcategory,data.price,data.price,1)
      }else{
        
        
        const provider = new ethers.providers.Web3Provider(etheruem);
  
          // Get the balance for the address

          const weiAmount = ethers.utils.parseUnits(data.price.toString(), 'ether');


          const contractToken = new ethers.Contract(token_address, token_ABI, provider.getSigner());
        
          await contractToken.approve(payment_address,weiAmount)
        
          const contract = new ethers.Contract(payment_address, payment_ABI, provider.getSigner());


          await contract.purchase(data.category,data.subcategory,data.price,data.price,1)
          console.log("sdfjsdfjsdfj")

      }
  
      } catch (e) {
        console.log('ERROR', e);
      }
  
    
  }
  return (
    <View style={styles.productContainer}>
      <View style={{backgroundColor: COLOR_WHITE, borderRadius: 29}}>
        <View>
          <TouchableOpacity
            style={[styles.priceBtn, {backgroundColor: '#715aee'}]}>
            <VectorIcon
              type="FontAwesome"
              name="diamond"
              size={18}
              color={COLOR_WHITE}
            />
            <Text style={[styles.priceBtnText, {color: COLOR_WHITE}]}>
              {data.price}$
            </Text>
          </TouchableOpacity>
          <View style={{height: 190, borderRadius: 29}}>
            <View style={styles.productItemBox}>
              {
                data.image !== 'null'?
                <Image source={{uri:"https://31.220.82.149/media/catalog/product//m/s/msg5369252484-18164.jpg"}} style={styles.productItem} resizeMode="cover" />
                :<Image source={images.test_product} style={styles.productItem} />
              }
            </View>
          </View>
        </View>
        <View style={styles.productInfoContainer}>
          <Text style={[styles.titleText, {color: '#1d1838'}]}>
            Title - {data.title}
          </Text>
          <Text style={[styles.descriptionText, {color: COLOR_BLACK}]}>
            {data.description}
          </Text>
          <TouchableOpacity style={{alignSelf: 'center'}} onPress = {handleClick}> 
            <LinearGradient
              colors={['#614bbe', '#0bc1c7']}
              start={{x: 0, y: 0.5}}
              end={{x: 1, y: 0.5}}
              style={styles.productItemBtn}>
              <Text style={[styles.productItemBtnText, {color: COLOR_WHITE}]}>
                COMPRAR
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductItem;
