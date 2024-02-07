import useHTTP from "../../hooks/useHTTP";
import useJWT from "../../hooks/useJWT";
import { useIsFocused } from '@react-navigation/native';
import useMessage from "../../hooks/useMessage";
import { useState, useEffect, useRef } from "react";
import useValidator from "../../hooks/useValidator";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import WidgetCommonHeader from "../../widgets/commons/WidgetCommonHeader";
import { Appbar, Button} from 'react-native-paper';
import WidgetCommonAuth from "../../widgets/commons/WidgetCommonAuth";
import useChangeListener from "../../hooks/useChangeListener";
import { BASE_URL } from "../../settings";
import WidgetTerimaForm from "../../widgets/terima/WidgetTerimaForm";
import WidgetPelangganForm from "../../widgets/terima/WidgetPelangganForm";
import WidgetItemListChoice from "../../widgets/terima/WidgetItemListChoice";
import WidgetBarangChoice from "../../widgets/barang/WidgetBarangChoice";
import useArray from "../../hooks/useArray";

const ScreenTerimaCreate = ({navigation}) => {
  const isFocused = useIsFocused();
  const http = useHTTP();
  const jwt = useJWT();
  const message = useMessage();
  const changeListener = useChangeListener();
  const array = useArray()

  const [terima, setTerima] = useState({
    nomor: "",
    berat: 0,
    uangMuka: 0
  })
  
  const [pelanggan, setPelanggan] = useState({
    nama:"",
    alamat: "",
    telepon: ""
  })

  const terimaValidator = useValidator({
    nomor: [],
    berat: [],
    uangMuka: [],
    'pelanggan.nama': [],
    'pelanggan.telepon': [],
    'pelanggan.alamat': []
  })

  const [daftarBarang, setDaftarBarang] = useState([]);
  const barangSearch = useRef({value: ""})

  const [daftarItem, setDaftarItem] = useState([]);

  const onTerimaCreate = async () => {
    try {
      terimaValidator.reset();
      const config = {
        headers: {
          Authorization: await jwt.get(),
        },
      }
      const url = `${BASE_URL}/terima/`
      const payload = {
        ...terima,
        pelanggan,
        items: [...daftarItem]
      }
      http.privateHTTP.post(url, payload, config).then((response) => {
        message.success(config)
        navigation.goBack();
      }).catch((error) => {
        console.log(error)
        message.error(error)
        terimaValidator.except(error);
      })
    } catch (error) {
      console.log(error)
    }
  }

  const onBarangList = async (params) => {
    try {
      params = {...params, limit: 4}
      const url = `${BASE_URL}/barang/`;
      const config = {
        headers: {
          Authorization: await jwt.get(),
        },
        params
      }
      http.privateHTTP.get(url, config).then((response) => {
        const { results, ...pagination } = response.data;
        setDaftarBarang(results)
      }).catch((error) => {
        console.log(error)
        message.error(error);
      })
    } catch (error) {
      console.log(error)
    }
  }

  const callbackWidgetBarangChoice = (item) => {
    if (!array.isDuplicated(daftarItem, item, '_id')) {
      setDaftarItem([...daftarItem, item])
    }
  }

  const callbackWidgetItemListChoice = (item) => {
    array.removeItem(daftarItem, item, '_id', setDaftarItem)
  }

  useEffect(() => {

    if (isFocused) {
      onBarangList()
    }
    
  }, [isFocused]);

  return (
    <>
   
      <WidgetCommonHeader 
        back={(
          <Appbar.BackAction onPress={navigation.goBack} />
        )}
        title={'Penerimaan'}
      />
      <ScrollView style={styles.container}>
        
        
        <WidgetCommonAuth child={(
          <>
            <WidgetTerimaForm 
              terima={terima} 
              setTerima={setTerima}
              changeListener={changeListener}
              validator={terimaValidator} />

            <WidgetPelangganForm 
              pelanggan={pelanggan}
              setPelanggan={setPelanggan}
              changeListener={changeListener}
              validator={terimaValidator}
            />
            <WidgetBarangChoice 
              daftarItem={daftarItem}
              daftarBarang={daftarBarang} 
              callback={callbackWidgetBarangChoice} 
            />
            <WidgetItemListChoice callback={callbackWidgetItemListChoice} daftarItem={daftarItem} />
          </>
        )} />
        <View style={styles.wrapperControl}>
          <Button onPress={onTerimaCreate} mode="contained">Simpan</Button>
        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    height: "90%",
    width: "100%",
    gap: 32,
    marginTop: 20,
    flexGrow: 1
  },
  wrapperControl: {
    width: "100%"
  }
})


export default ScreenTerimaCreate;