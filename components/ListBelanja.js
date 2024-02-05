import { useState } from "react"
import { TouchableOpacity, View, Text, StyleSheet, Alert, ScrollView, RefreshControl } from "react-native";

const FAKE_BELANJAAN = [
  {
    id: 1,
    nama: "Sayur 01"
  },
  {
    id: 2,
    nama: "Sayur 02"
  },
  {
    id: 3,
    nama: "Sayur 03"
  },
  {
    id: 4,
    nama: "Sayur 04"
  },
]

const ListBelanja = () => {
  const [daftarBelanja,] = useState(FAKE_BELANJAAN);
  const [carts, setCarts] = useState([])

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    console.log("refresh")
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const showInfo = (nama) => {
    Alert.alert(nama)
  }

  const addToCart = (item) => {
    let newCarts = [...carts, item]
    setCarts(newCarts);
  }

  return (
    <>
      <View style={styles.container}>
        <ScrollView style={styles.sv}>
          {daftarBelanja.map((value) => (
            <TouchableOpacity key={value.id} style={styles.item} onPress={() => addToCart(value)}>
              <Text>{value.nama}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <ScrollView 
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onScrollEndDrag={() => console.log("onScrollEndDrag")}>
          {carts.map((value, index) => (
            <TouchableOpacity key={value.id} style={styles.carts} onPress={() => showInfo(value.nama)}>
              <Text>{value.nama}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    gap: 16,
  },
  sv: {
    flexGrow: 2
  },
  item: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'cyan'
  },
  carts: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'green'
  }
})

export default ListBelanja