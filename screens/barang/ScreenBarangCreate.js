import { StyleSheet, View } from 'react-native';
import { Appbar, TextInput, Button } from 'react-native-paper';
import WidgetCommonValidator from '../../widgets/commons/WidgetCommonValidator';
import useMessage from '../../hooks/useMessage';
import useHTTP from '../../hooks/useHTTP';
import useJWT from '../../hooks/useJWT';
import { useState } from 'react';
import useValidator from '../../hooks/useValidator';
import { BASE_URL } from '../../settings';
import WidgetCommonHeader from '../../widgets/commons/WidgetCommonHeader';
import WidgetCommonAuth from '../../widgets/commons/WidgetCommonAuth';



const ScreenBarangCreate = ({ navigation }) => {
  const jwt = useJWT()
  const http = useHTTP()
  const message = useMessage();

  const [barang, setBarang] = useState({
    nama: ""
  })
  const barangValidator = useValidator({
    nama: [],
  })

  const handleChangeBarang = (text, field) => {
    setBarang({...barang, [field]: text})
  }

  const onBarangCreate = async () => {
    try {
      barangValidator.reset()
      const config = {
        headers: {
          Authorization: await jwt.get(),
        },
      }
      const url = `${BASE_URL}/barang/`
      http.privateHTTP.post(url, barang, config).then((response) => {
        console.log("hello")
        
        message.success(config)
        navigation.goBack();
      }).catch((error) => {
        message.error(error)
        barangValidator.except(error);
        console.log(error);
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
    <View>
      <WidgetCommonHeader 
        back={(
          <Appbar.BackAction onPress={navigation.goBack} />
        )}
        title={'Tambah Barang'}
      />
      <WidgetCommonAuth child={(
        <View style={styles.container}>
          <View style={styles.wrapperControl}>
            <TextInput
              label="Nama"
              autoCapitalize="none"
              value={barang.nama}
              onChangeText={text => handleChangeBarang(text, "nama")}
            />
            <WidgetCommonValidator messages={barangValidator.get('nama')} />
          </View>

          <View style={styles.wrapperControl}>
            <Button onPress={onBarangCreate} mode="contained">Simpan</Button>
          </View>
        </View>
      )} />
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    height: "90%",
    width: "100%",
    gap: 32,
    paddingHorizontal: 24,
    marginTop: 20
  },
  wrapperControl: {
    width: "100%"
  }
})

export default ScreenBarangCreate;