const React = require('react-native')
const {StyleSheet} = React
import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

var styles = StyleSheet.create({
  container: {
    backgroundColor:"white",
    flex: 1,
  },
  textContainer: {
    justifyContent:"center",
    alignItems:"center"
  },
  otherText: {
    fontSize: fontSize.regular,
    fontFamily: fontFamily.regular
  },
  titleText: {
    fontSize: fontSize.regular,
    fontFamily: fontFamily.bold,
    color: 'black',
    marginBottom: 10,
    marginTop: 10
  },
  imageContainer: {
    justifyContent:"center",
    alignItems:"center"
  },
  image: {
    width: 160,
    height: 160,
    borderWidth: 1,
    borderRadius: 80,
    marginBottom: 20,
    marginTop: 30
  },
  navbar: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    justifyContent: 'center',
    height: 54,
    flexDirection: 'row'
  },
  navbarTitle: {
    color: '#444',
    fontSize: 16,
    fontWeight: "500"
  },
  button:{
    backgroundColor: "#FF553A",
		height: normalize(55)
  },
  containerView:{
    width: windowWidth - 40
  },
  buttonContainer:{
    justifyContent:"center",
    alignItems:"center"
  },
  buttonText:{
    fontSize: fontSize.regular + 2,
    fontFamily: fontFamily.medium
  },
  bottomContainer:{
    backgroundColor:"white",
    paddingVertical: padding * 3,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
        height: 1,
        width: 0
    },
	  position: 'absolute',
	  bottom: 15,
	  alignSelf: 'center'
  },
})

module.exports = styles