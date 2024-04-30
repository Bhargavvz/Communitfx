import * as React from "react";
import { StyleSheet, View, Image, Text, Pressable } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Border, FontSize, Color } from "../GlobalStyles";

const SignUp = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.signUp}>
      <LinearGradient
        style={[styles.signUpChild, styles.signUpChildPosition]}
        locations={[0, 1]}
        colors={["#89c6a7", "#25596e"]}
        useAngle={true}
        angle={179.85}
      />
      <View style={styles.groupParent}>
        <Pressable
          style={[styles.vectorParent, styles.groupChildPosition]}
          onPress={() => navigation.navigate("LogIn")}
        >
          <Image
            style={[styles.groupChild, styles.groupChildPosition]}
            resizeMode="cover"
            source={require("../assets/rectangle-11.png")}
          />
          <Text style={[styles.signUp1, styles.logInTypo]}>SIGN UP</Text>
        </Pressable>
        <Text
          style={[styles.alreadyHaveAnContainer, styles.signUpChildPosition]}
        >
          <Text style={styles.alreadyHaveAn}>{`Already have an account?
`}</Text>
          <Text style={[styles.logIn, styles.logInTypo]}>
            <Text style={styles.logIn1}>Log in</Text>
          </Text>
          <Text style={[styles.logIn, styles.logInTypo]}>{` `}</Text>
          <Text style={styles.alreadyHaveAn}>instead!</Text>
        </Text>
      </View>
      <Image
        style={[styles.icon, styles.iconPosition]}
        resizeMode="cover"
        source={require("../assets/2831310-1.png")}
      />
      <Text style={[styles.cofix, styles.iconPosition]}>CoFix</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  signUpChildPosition: {
    left: 0,
    position: "absolute",
  },
  groupChildPosition: {
    height: 49,
    top: 0,
    width: 234,
    left: 0,
    position: "absolute",
  },
  logInTypo: {
    fontWeight: "700",
    fontFamily: FontFamily.helvetica,
  },
  iconPosition: {
    left: 75,
    position: "absolute",
  },
  signUpChild: {
    top: 608,
    borderTopLeftRadius: Border.br_31xl,
    borderTopRightRadius: Border.br_31xl,
    width: 375,
    height: 268,
    backgroundColor: "transparent",
  },
  groupChild: {
    borderRadius: Border.br_17xl,
  },
  signUp1: {
    top: 16,
    left: 74,
    fontSize: FontSize.size_sm,
    color: "#474747",
    width: 86,
    height: 18,
    textAlign: "center",
    fontFamily: FontFamily.helvetica,
    position: "absolute",
    fontWeight: "700",
  },
  vectorParent: {
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
  },
  alreadyHaveAn: {
    fontFamily: FontFamily.helvetica,
  },
  logIn1: {
    textDecoration: "underline",
  },
  logIn: {
    fontFamily: FontFamily.helvetica,
  },
  alreadyHaveAnContainer: {
    top: 57,
    fontSize: FontSize.size_xs,
    color: Color.lightPrimary,
    width: 233,
    height: 37,
    textAlign: "center",
  },
  groupParent: {
    top: 666,
    left: 71,
    height: 94,
    width: 234,
    position: "absolute",
  },
  icon: {
    top: 290,
    width: 226,
    height: 199,
  },
  cofix: {
    top: 120,
    fontSize: FontSize.size_49xl,
    fontWeight: "900",
    fontFamily: FontFamily.sourceSerifPro,
    color: Color.colorDarkseagreen_200,
    width: 229,
    height: 73,
    textAlign: "center",
  },
  signUp: {
    backgroundColor: Color.lightPrimary,
    flex: 1,
    width: "100%",
    height: 812,
    overflow: "hidden",
  },
});

export default SignUp;
