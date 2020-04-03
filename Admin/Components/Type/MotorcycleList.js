import React,{useState,useEffect,useCallback} from 'react'
import { View,FlatList, ActivityIndicator } from 'react-native'
import { Container, Header,  List, Item, Input, Icon, Button, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import axios from 'axios'
import _ from 'lodash'
import { useFocusEffect } from 'react-navigation-hooks'

const MotorcycleList = ({navigation}) => {
    const [data,setData] = useState([]);
    const [fullData,setFullData] = useState([]);

    useFocusEffect(useCallback(() => {
        const source = axios.CancelToken.source();
        const loadData = async () => {
            try{
                const response = await axios.get("http://192.168.43.171:5000/motorcycle/show_motorcycle",{cancelToken : source.token});
                setData(response.data)
                setFullData(response.data)
            }catch (error) {
                if(axios.isCancel(error)){
                    console.log("Response has been cancel TableList")
                }else{
                    throw error
                }
            }
        };
        loadData();
        return () => {
            source.cancel();
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
                        <Button style = {{backgroundColor : '#61c0bf',borderRadius : 5}}  onPress = {() => navigation.navigate('MotorcycleDetail',item)}>
                        <Text>Detail</Text>
                        </Button>
                    </Right>
                </ListItem>
            </List>
        )
    }
    
    const handleSearch = (text) => {
        const formattedQuery = text.toLowerCase();
        const data = _.filter(fullData,list => {
            if(list.name.toLowerCase().includes(formattedQuery)){
                return true
            }
            return false
        })
        setData(data)
    }

    return (
        <Container>
            <Header searchBar style = {{backgroundColor : '#61c0bf'}}>
                <Item style = {{borderRadius : 5}}>
                    <Input placeholder="Cari Tipe Kereta" onChangeText = {handleSearch}/>
                </Item>
            </Header>
            <List>
                <FlatList
                    keyExtractor={(item, index) => item._id}
                    data = {data}
                    renderItem = {_renderItem}
                    keyExtractor = {(item,index) => index.toString()}
                />
            </List>

            <Button rounded style = {{position : 'absolute',bottom : 20,left : 20,backgroundColor : '#71c9ce'}} onPress = {() => navigation.navigate('MotorcycleForm')}>
                <Text>Tambah Kereta</Text>
            </Button>
        </Container>
    )
}

export default MotorcycleList
