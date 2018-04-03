import { StyleSheet } from 'react-native';

import { theme } from "../../index"
const  { color, padding, windowWidth, normalize, fontSize, fontFamily } = theme;

const styles = StyleSheet.create({
    wrapper:{
        justifyContent:"center",
        alignItems:"center"
    },

    errorText:{
        color: color.red,
        width: (windowWidth - 45),
        marginTop: 20,
    },

    containerView:{
        marginVertical: padding * 3,
        width: windowWidth - 40
    },

    socialButton:{
        height: normalize(55),
        borderRadius:4,
        marginTop:0,
        marginBottom:0
    },

    button:{
        backgroundColor: "#2b8c91",
        height: normalize(55)
    },

    buttonText:{
        fontSize: fontSize.regular + 2,
        fontFamily: fontFamily.medium
    },
	
	pickerStyle: {
		width: windowWidth - 40
	},
	
	recurringText: {
		fontSize: fontSize.regular,
		fontWeight: "600",
		color: "gray"
	},
	
	pickerContainer:{
        marginTop: 10,
		marginBottom: 8
    },
	
	pickerWrapper: {
		borderWidth: 1,
		borderColor: "gray",
		height: normalize(43)
	},
	
	timeContainer:{
        marginTop: 15,
		marginBottom: 8,
		width: windowWidth - 40
    },
	
	timeStyle: {
		width: Math.floor((windowWidth - 40) / 3)
	},
	
	pickerRows: {
		flexDirection: 'row'
	}
});


export default styles;