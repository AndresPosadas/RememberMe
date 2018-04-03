import { StyleSheet } from 'react-native';

import { theme } from "../../index"
const { windowWidth, fontSize, normalize, fontFamily } = theme;

const styles = StyleSheet.create({
    container:{
        marginBottom: 1
    },

    inputContainer:{
        width: windowWidth - 40,
		height: normalize(20),
        fontSize: fontSize.small,
        fontWeight: "600",
        borderWidth: 1,
		borderColor: "gray"
    },
	
	labelStyle: {
		fontSize: fontSize.regular,
		fontWeight: "600",
		color: "gray"
	}
});

export default styles;