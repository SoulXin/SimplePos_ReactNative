import React,{useState,useCallback} from 'react'
import { FlatList,SafeAreaView } from 'react-native'
import { Container, Header,  List, Item, Input, Button, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import axios from 'axios'
import { useFocusEffect } from 'react-navigation-hooks'
import {handleSearch} from './Components/Functions/MotorcycleList'
import styles from './Components/Styles/MotorcycleList'
import { checkUserSignedIn,clear_AsyncStorage } from '../../Global_Functions/Functions';
import Loading from '../Modal_Loading/Loading'

const MotorcycleList = ({navigation}) => {
    const [data,setData] = useState([]);
    const [fullData,setFullData] = useState([]);
    const [loading,setLoading] = useState(false);

    useFocusEffect(useCallback(() => {
        setLoading(true);
        const source = axios.CancelToken.source();
        checkUserSignedIn(navigation)
        .then(res => {            
            const loadData = async () => {
                try{
                    const response = await axios.get(`http://192.168.43.171:5000/motorcycle/show_motorcycle/${res.user._id}`,{cancelToken : source.token});
                    setData(response.data);
                    setFullData(response.data);
                    setLoading(false);
                }catch (error) {
                    setLoading(false);
                    if(axios.isCancel(error)){
                        console.log("Response has been cancel TableList")
                    }else{
                        Alert.alert('Pemberitahuan','Terjadi Masalah Pada Server,Silakan Hubungi Admin',[{text : 'OK'}]);
                    }
                }
            };
            loadData();
        })
        .catch(err => {
            setLoading(false);
            clear_AsyncStorage(navigation);
        })
        return () => {
            source.cancel();
            setData([]);
            setFullData([]);
        }
    },[]));

    const _renderItem = ({item,index }) => {
        return (
            <List>
                <ListItem thumbnail>
                    <Left>
                        <Thumbnail source={item.category === "Yamaha" ? require('../../Assets/Image/Yamaha.png') : require('../../Assets/Image/Honda.png')}/>
                    </Left>
                    <Body>
                        <Text>{item.name}</Text>
                        <Text note>{item.year}</Text>
                    </Body>
                    <Right>
                        <Button style = {styles.button_detail}  onPress = {() => navigation.navigate('MotorcycleDetail',item)}>
                        <Text>Detail</Text>
                        </Button>
                    </Right>
                </ListItem>
            </List>
        )
    }

    return (
        <Container>
            <Loading loading = {loading}/>
            <Header searchBar style = {styles.header_searchbar}>
                <Item style = {styles.column_searchbox}>
                    <Input placeholder="Cari Tipe Kereta" onChangeText = {(text) => handleSearch(text,fullData,setData)}/>
                </Item>
            </Header>
            <SafeAreaView style = {{flex : 1}}>
                <FlatList
                    data = {data}
                    renderItem = {_renderItem}
                    keyExtractor = {(item,index) => index.toString()}
                />
            </SafeAreaView>

            <Button rounded style = {styles.button_add_motorcycle} onPress = {() => navigation.navigate('MotorcycleForm')}>
                <Text>Tambah Kereta</Text>
            </Button>
        </Container>
    )
}

export default MotorcycleList