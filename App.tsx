/* eslint-disable prettier/prettier */
import {  SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View ,useColorScheme  } from 'react-native'
import React, { useState  } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
const passwordSchema=Yup.object().shape({
  passwordLength: Yup.number()
  .min(4,'num should be min of 4 characters')
  .max(16,'num shold be max of 16 charater')
  .required('Length is required')
})
const Seperator = () => <View style={styles.seprate}></View>

const App = () => {
  const isDarkTheme = useColorScheme() === 'dark';


  const [passwrod,setPassword] = useState('')
  const [isPassGenerated,setIsPassGenerated] = useState(false)
  const [lowerCase,setlowerCase] = useState(false)
  const [upperCase,setUpperCase] = useState(false)
  const [numbers,setNumbers] = useState(false)
  const [symbols,setSymbols] = useState(false)
  

  const genratePasswordString = (passwordLength: number) =>{
    let passwordString='';

      const uppercaseValues='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const lowercaseValues='abcdefghijklmnopqrstuvwxyz';
      const symbolsValues='!@#$%^&*()_+';
      const numbersValues='0123456789';

      if(lowerCase)
      passwordString +=lowercaseValues;
      if(upperCase)
      passwordString +=uppercaseValues;
      if(numbers)
      passwordString +=numbersValues;
      if(symbols)
      passwordString +=symbolsValues;

      const resultPass=createPassword(passwordString,passwordLength);
    setPassword(resultPass);
    setIsPassGenerated(true);

  }
  const createPassword = (charaters: string,passwordLength:number)=>{
      let result='';
      for (let i = 0; i < passwordLength; i++) {
            const characterIndex=Math.round(Math.random()*charaters.length);
            result +=charaters.charAt(characterIndex);        
      }
      return result;
  }
  const resetPasswordState = () =>{
    setPassword('');
    setIsPassGenerated(false);
    setNumbers(false);
    setSymbols(false);
    setlowerCase(false);
    setUpperCase(false);
  }

  return (
    <ScrollView style={styles.mainContainerBody} >
    <SafeAreaView >
    <View style={styles.mainContainer}>
      <View style={styles.headingContainer}>
      <Text style={isDarkTheme ? [styles.heading,styles.headingDarkMode] : styles.heading}>Password Generator</Text>
      </View>
      <Seperator />
      {/* -------------------------------  form code ---------------------------- */}
      <Formik
       initialValues={{passwordLength:''}}
       validationSchema={passwordSchema}
        onSubmit={ values => {
          console.log(values)
          genratePasswordString(+values.passwordLength)
        }}
     >
       {({
         values,
         errors,
         touched,
         isValid,
         handleChange,
         handleSubmit,
         handleReset,
         /* and other goodies */
       }) => (
         <>
         <View style={styles.inputWrapper}>
              <View style={styles.inputColoumn}>
                <View style={styles.innerContainer}>
                <Text style={isDarkTheme ? styles.darkMode : styles.inputLabel}>Enter length of Password:</Text>
                {touched.passwordLength && errors.passwordLength && (
                  <Text style={styles.errorTxt}>
                    {errors.passwordLength}
                  </Text>
                )}
                </View>
                <TextInput 
                style={isDarkTheme ? styles.inputStyleDarkMode : styles.inputStyle}
                value={values.passwordLength}
                onChangeText={handleChange('passwordLength')}
                placeholder='Example 8'
                keyboardType='numeric'
                />
              </View>
         </View>

         <View style={styles.inputWrapper}>
          <Text style={isDarkTheme ? styles.headingCheckBoxDarkMode : styles.headingCheckBox}>Include lowercase :</Text>
          <BouncyCheckbox
          disableBuiltInState
            isChecked={lowerCase}
            onPress={()=>{setlowerCase(!lowerCase);}}
            fillColor='#6AC47E'
            style={styles.chkBox}
          />
         </View>
         <View style={styles.inputWrapper}>
         <Text style={isDarkTheme ? styles.headingCheckBoxDarkMode : styles.headingCheckBox}>Include uppercase :</Text>
          <BouncyCheckbox
          disableBuiltInState
            isChecked={upperCase}
            onPress={()=>{setUpperCase(!upperCase);}}
            fillColor='#1B98F5'
            style={styles.chkBox}
          />
         </View>
         <View style={styles.inputWrapper}>
         <Text style={isDarkTheme ? styles.headingCheckBoxDarkMode : styles.headingCheckBox}>Include numbers :</Text>
          <BouncyCheckbox
          disableBuiltInState
            isChecked={numbers}
            onPress={()=>{setNumbers(!numbers);}}
            fillColor='#FF6263'
            style={styles.chkBox}
          />
         </View>
         <View style={styles.inputWrapper}>
         <Text style={isDarkTheme ? styles.headingCheckBoxDarkMode : styles.headingCheckBox}>Include symbols :</Text>
          <BouncyCheckbox
          disableBuiltInState
            isChecked={symbols}
            onPress={()=>{setSymbols(!symbols);}}
            fillColor='#F7CD2E'
            style={styles.chkBox}
          />
         </View>
                {/* <Seperator /> */}
         <View style={styles.formAction}>
          <TouchableOpacity
            disabled={!isValid}
            style={[styles.btn,styles.generateBtn]}
            onPress={()=>{{ (lowerCase || upperCase || numbers || symbols) ? (handleSubmit()) : null }}}
          >
            <Text style={styles.generateBtnTxt} > Generate Password</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={[styles.btn,styles.resetBtn]}
          onPress={()=>{
            resetPasswordState();
            handleReset();
          }}
          >
          <Text style={styles.resetBtnTxt} > Reset Password</Text>
          </TouchableOpacity>
         </View>
         </>
       )}
     </Formik>

     {/* ------------------------------------------------------------- */}
    </View>
    {isPassGenerated ? (
      <View style={[styles.resultCard,styles.elevatedCard]}>
        <Text selectable style={isDarkTheme ? styles.resultTxtDarkMode : styles.resultTxt}>{passwrod}</Text>
        <Text style={isDarkTheme ? styles.smallTxtDarkMode : styles.smallTxt}>long press to Copy</Text>
      </View>
    ) : null}
    </SafeAreaView>
    </ScrollView>
  )
}

export default App;

const styles = StyleSheet.create({
    mainContainer:{
      // backgroundColor:'red',
      // height:700
    },
    heading:{
      fontSize:43,
      fontWeight:'500',
      margin:35,
      color:'white',
    },
    headingDarkMode:{
      color:'black'
    },
    headingContainer:{
      backgroundColor:'#51E1ED',
      // borderColor:'black'
    },
    inputColoumn:{
      display:'flex',
      flexDirection:'row',
      padding:'auto'
    },
    inputWrapper:{
        // backgroundColor:'#CAD5E2',
        display:'flex',
        padding:21,
        flexDirection:'row',
    },
    inputLabel:{
        fontSize:18,
        color:'black',
        marginLeft:19,
        marginRight:81,
        fontWeight:'400',
        paddingVertical:12
    },
    darkMode:{
      fontSize:18,
      color:'white',
      marginLeft:19,
      marginRight:81,
      fontWeight:'400',
      paddingVertical:12
    },
    inputStyle:{
      borderWidth:1,
      borderRadius:4,
    },
    inputStyleDarkMode:{
      borderColor:'white',
      borderWidth:1,
      borderRadius:4,
    },
    generateBtn:{
      color:'black'
    },
    resetBtn:{
      color:'black'
    },
    errorTxt:{
      color:'red',
      paddingHorizontal:20
    },
    headingCheckBox:{
      fontSize:20,
      fontWeight:'300',
      color:'black',
      marginLeft:17,
      width:160
    },
    headingCheckBoxDarkMode:{
      fontSize:20,
      fontWeight:'300',
      color:'white',
      marginLeft:17,
      width:160
    },
    chkBox:{
        display:'flex',
        width:140,
        textAlign:'right',
        justifyContent:'flex-end'
    },
    formAction:{
      display:'flex',
      flexDirection:'row',
      padding:26
    },
    btn:{
      color:'black',
      elevation:8,
      display:'flex',
      justifyContent:'center',
      alignContent:'center'
    },
    generateBtn:{
      backgroundColor:'#03C6C7',
      borderRadius:9,
      padding:17,
      width:150,
      marginHorizontal:12,
      paddingHorizontal:27,
    },
    resetBtn:{
      backgroundColor:'#758283',
      padding:15,
      borderRadius:9,
      width:150,
      marginHorizontal:12,
      paddingHorizontal:27,
      
    },
    generateBtnTxt:{
      fontSize:26,
      color:'white'
      ,   textAlign:'center'
    },
    resetBtnTxt:{
      fontSize:26,
      color:'#CAD5E2',
      textAlign:'center'
    },
    resultTxt:{
      color:'#0D0D0D',
      fontSize:51
    },
    resultTxtDarkMode:{
      color:'white',
      fontSize:51
    },
    resultCard:{
        backgroundColor:'#51E1ED',
        width:300,
        height:130,
        marginHorizontal:41,
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:12,
    },
    elevatedCard:{
        elevation:9
    },
    smallTxt:{
      fontSize:18,
    },
    smallTxtDarkMode:{
      fontSize:18,
      color:'black'
    },
    seprate: {
      marginVertical: 3,
      borderWidth: 3,
      borderBottomColor: 'white',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor:'#51E1ED'
    }
})