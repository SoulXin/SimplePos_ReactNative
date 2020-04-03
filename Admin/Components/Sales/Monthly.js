// import React,{useState,useCallback} from 'react'
// import { View,FlatList, ActivityIndicator,Modal,ScrollView,TouchableOpacity,TextInput, Alert} from 'react-native'
// import { Container, Header,  List, Item, Input, Icon, Button, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
// import axios from 'axios'
// import { useFocusEffect } from 'react-navigation-hooks'

// const Index = () => {
//     const [data,setData] = useState([]);

//     useFocusEffect(useCallback(() => {
//         const source = axios.CancelToken.source();
//         const loadData = async () => {
//             try{
//                 const response = await axios.get("http://192.168.43.171:5000/sales/show_sales/monthly",{cancelToken : source.token});
//                 setData(response.data)
//                 console.log(response.data)
//             }catch (error) {
//                 if(axios.isCancel(error)){
//                     console.log("Response has been cancel TableList")
//                 }else{
//                     throw error
//                 }
//             }
//         };
//         loadData();
//         return () => {
//             source.cancel();
//         }
//     },[]));

//     return (
//         <Container>
//             <List>
//                 {/* <FlatList
//                     keyExtractor={(item, index) => item._id}
//                     data = {data}
//                     renderItem = {_renderItem}
//                     keyExtractor = {(item,index) => index.toString()}
//                     ListFooterComponent = {renderFooter}
//                 /> */}
//             </List>
//         </Container>
//     )
// }

// export default Index
