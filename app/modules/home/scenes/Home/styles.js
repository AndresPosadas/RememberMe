import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const resizeMode = 'contain';

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: 'white'
    },
	
	title:{
		fontSize: fontSize.large + 2
    },
    
    button:{
        backgroundColor: "#FF553A",
        height: normalize(55)
    },

    buttonText:{
        fontSize: fontSize.regular + 2,
        fontFamily: fontFamily.medium
    },

    containerView:{
        width: windowWidth - 40,
        marginTop: 10
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

    buttonContainer:{
        justifyContent:"center",
        alignItems:"center",
    }
});

export default styles;