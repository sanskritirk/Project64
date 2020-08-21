import React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity} from 'react-native';
import {Header} from 'react-native-elements';

export default class App extends React.Component{
 constructor(){
   super()
   this.state={
     text:' ',
     displayText:' ',
     isSearchPressed:false,
     word:" ",
     lexicalCategory:' ',
     examples:[],
     defination:" "
   }
 }
 getWord=(word)=>{
     var url="https://whitehat-dictionary.glitch.me/?word="+word
     return fetch(url)
     .then((data)=>{
         return data.json()
     })
     .then((response)=>{
         var responseObject=JSON.parse(response);
         var word=responseObject.word
         var lexicalCategory=responseObject.results[0].lexicalEntries[0].lexicalCategory.text
         var defination=responseObject.results[0].lexicalEntries[0].entries[0].senses[0].defination[0]
         this.setState({
             "word":word.trim(),
             "lexicalCategory":lexicalCategory===undefines?"":lexicalCategory.trim(),
             "defination":defination===undefines?"":defination.trim(),
                     })
     })
 }
 
 render(){
   return(
     <View>
     <Header
     backgroundColor={'purple'}
     centerComponent={{text:'Pocket Dictonary',style:{color:'white',fontSize:20,fontWeight:'bold'}}}/>
     <TextInput
     onChangeText={(text)=>{
       this.setState({
         text:text,
         isSearchPressed:false,
         word:" ",
         lexicalCategory:' ',
         examples:[],
         defination:" "
       })
     }}
     value={this.state.text}
     style={styles.inputBox}/>
     <TouchableOpacity style={styles.button} onPress={()=>{
       this.setState({
         isSearchPressed:true
       })
       this.getWord(this.state.text)
     }}>
     <Text style={styles.btntxt}>Go</Text>
     </TouchableOpacity>
     <Text style={styles.displaytxt}>{this.state.displayText}</Text>
     <View>
    <Text style={styles.detailsTitle}>Word:{" "}</Text>
    <Text style={{fontSize:18}}>{this.state.word}</Text>
     </View>
     <View>
    <Text style={styles.detailsTitle}>Type:{" "}</Text>
    <Text style={{fontSize:18}}>{this.state.lexicalCategory}</Text>
     </View>
     <View style={{flexDirection:'row',flexWrap:'wrap'}}>
         <Text style={styles.detailsTitle}>Defination:{" "}</Text>
    <Text style={{fontSize:18}}>{this.state.defination}</Text>
     </View>
     </View>
   );
 } 
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox:{
    marginTop:200,
    width:'80%',
    alignSelf:'center',
    borderWidth:4,
    height:40,
    textAlign:'center'
  },
  button:{
    backgroundColor:'red',
    width:'50%',
    height:45,
    alignSelf:'center',
    marginTop:20,
    borderRadius:10
  },
  btntxt:{
    textAlign:'center',
    color:'white',
    fontSize:25,
    fontWeight:'bold',
    justifyContent:'center',
    marginTop:4
  },
  displaytxt:{
    margin:15,
    fontSize:25,
    textAlign:'center',
    justifyContent:'center',
    fontWeight:'bold',
    marginTop:20,
    padding:20
  },
  detailsTitle:{
      fontSize:25,
      fontWeight:'bold',
      color:'#db0a5b'
  }
});
