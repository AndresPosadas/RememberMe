const React = require('react-native');
const {StyleSheet} = React;
import { theme } from "../../index";
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

var styles = StyleSheet.create({
	
  container: {
    backgroundColor:"white",
	borderBottomWidth: 1,
	borderColor: "gray",
	flexDirection: "row"
  },
  
  containerView:{
    marginVertical: padding,
    width: 110,
	marginRight: 10,
	height: normalize(40)
  },
  
  textContainer: {
    width: windowWidth - 110
  },
  
  reminderText: {
	color: "gray",
	fontSize: fontSize.small
  },

  button:{
    backgroundColor: "#2b8c91",
	height: normalize(40)
  },

  buttonContainer:{
    justifyContent:"center",
    alignItems:"center",
	width: 100,
	backgroundColor: "white"
  },
  
  buttonText:{
    fontSize: fontSize.regular + 2,
    fontFamily: fontFamily.medium
  }
  
})

module.exports = styles