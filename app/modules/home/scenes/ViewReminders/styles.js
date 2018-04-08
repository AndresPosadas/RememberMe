import { StyleSheet } from 'react-native';

import { theme } from "../../index"
const  { color, padding, windowWidth, normalize, fontSize, fontFamily } = theme;

const styles = StyleSheet.create({
	
	topContainer: {
		height: '82%',
		backgroundColor: "white"
	},
	
	bottomContainer: {
		height: '18%',
		backgroundColor: "white"
	},

    containerView:{
        marginVertical: padding * 3,
        width: windowWidth - 40
    },

    button:{
        backgroundColor: "#2b8c91",
        height: normalize(55)
    },
	
    buttonText:{
        fontSize: fontSize.regular + 2,
        fontFamily: fontFamily.medium
    }
});


export default styles;