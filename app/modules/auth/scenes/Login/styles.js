import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const {padding, color, fontSize, fontFamily } = theme;

const styles = StyleSheet.create({
    forgotText:{
        textAlign:"center",
        color:color.black,
        marginBottom: padding,
        fontSize: fontSize.regular,
        fontFamily: fontFamily.medium,
		color: "#3ad0d8"
    }
});

export default styles;