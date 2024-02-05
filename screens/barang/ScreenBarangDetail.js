import { StyleSheet, View, } from 'react-native';
import { Appbar, TextInput, Button } from 'react-native-paper';
import WidgetCommonValidator from '../../widgets/commons/WidgetCommonValidator';
import useMessage from '../../hooks/useMessage';
import useHTTP from '../../hooks/useHTTP';
import useJWT from '../../hooks/useJWT';
import { useEffect, useState } from 'react';
import useValidator from '../../hooks/useValidator';
import { BASE_URL } from '../../settings';
import WidgetCommonHeader from '../../widgets/commons/WidgetCommonHeader';
import WidgetCommonAuth from '../../widgets/commons/WidgetCommonAuth';

const ScreenBarangDetail = ({navigation, route}) => {
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

  const onBarangUpdate = async () => {
    try {
      barangValidator.reset()
      const config = {
        headers: {
          Authorization: await jwt.get(),
        },
      }
      const url = `${BASE_URL}/barang/${route.params.id}`
      http.privateHTTP.put(url, barang, config).then((response) => {
        message.success(response)
        navigation.goBack()
      }).catch((error) => {
        message.error(error)
        barangValidator.except(error);
        console.log(error);
      })
    } catch (error) {
      console.log(error)
    }
  }

  const onBarangDetail = async () => {
    try {
      const config = {
        headers: {
          Authorization: await jwt.get(),
        },
      }
      const url = `${BASE_URL}/barang/${route.params.id}`
      http.privateHTTP.get(url, config).then((response) => {
        setBarang(response.data);
      }).catch((error) => {
        message.error(error)
        console.log(error);
      })
    } catch (error) {
      console.log(error)
    }
  }

  const onBarangDelete = () => {
    try {
      message.confirmRemove(async () => {
        const config = {
          headers: {
            Authorization: await jwt.get(),
          },
        }
        const url = `${BASE_URL}/barang/${route.params.id}`
        http.privateHTTP.delete(url, config).then((response) => {
          message.success(response)
          navigation.goBack()
        }).catch((error) => {
          message.error(error)
          console.log(error);
        })
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (route.params.id) {
      onBarangDetail()
    }
  }, [route.params])

  return (
    <>
    <View>
      <WidgetCommonHeader 
        back={(
          <Appbar.BackAction onPress={navigation.goBack} />
        )}
        title="Detail Barang"
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

          <View style={[styles.wrapperControl, styles.buttonActions]}>
            <Button onPress={onBarangDelete} mode="outlined">Hapus</Button>
            <Button onPress={onBarangUpdate} mode="contained">Simpan</Button>
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
  },
  buttonActions: {
    gap: 16
  }
})

export default ScreenBarangDetail;