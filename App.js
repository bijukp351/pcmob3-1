import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import BlockRGB from "./BlockRGB";

function HomeScreen({ navigation }) {
  const [colorArray, setColorArray] = useState([]);

  function renderItem({ item }) {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("DetailsScreen", { ...item })}
      >
        <BlockRGB red={item.red} green={item.green} blue={item.blue} />
      </TouchableOpacity>
    );
  }


  function resetColor() {
    setColorArray([]);
  }

  function addColor() {
    setColorArray([

      {
        red: Math.floor(Math.random() * 256),
        green: Math.floor(Math.random() * 256),
        blue: Math.floor(Math.random() * 256),
        id: `${colorArray.length}`,
      },
      ...colorArray,

    ]);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.appButtonContainer}
        onPress={addColor}
      >
        <Text style={styles.appButtonText}>Add colour</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.resetButtonContainer}
        onPress={resetColor}
      >
        <Text style={styles.resetButtonText}>Reset colour</Text>
      </TouchableOpacity>

      <FlatList style={styles.list} data={colorArray} renderItem={renderItem} numColumns={6} />
    </View>
  );
}

function DetailsScreen({ route }) {

  const { red, green, blue } = route.params;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: `rgb(${red}, ${green}, ${blue})` },
      ]}
    >
      <View style={{ padding: 30 }}>
        <Text style={styles.detailText}>Red: {red}</Text>
        <Text style={styles.detailText}>Green: {green}</Text>
        <Text style={styles.detailText}>Blue: {blue}</Text>
      </View>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Colour List" component={HomeScreen} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",

  },
  list: {
    // width: "100%",
  },
  detailText: {
    fontSize: 24,
    marginBottom: 20,
  },
  appButtonContainer: {
    marginTop: 10,
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  appButtonText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  resetButtonContainer: {
    marginTop: 10,
    marginBottom: 10,
    elevation: 8,
    backgroundColor: "grey",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  resetButtonText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
});


