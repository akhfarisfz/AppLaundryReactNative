import { useEffect, useState } from "react";
import useHTTP from "../../hooks/useHTTP";
import useJWT from "../../hooks/useJWT";
import useMessage from "../../hooks/useMessage";
import { ScrollView, Text } from "react-native";
import { useIsFocused } from '@react-navigation/native';
import { BASE_URL } from "../../settings";
import { List, Appbar, Button } from 'react-native-paper';
import WidgetCommonHeader from "../../widgets/commons/WidgetCommonHeader";

const terimaInit = {
  "pelanggan": {
    "nama": "",
    "alamat": "",
    "telepon": ""
  },
  "_id": null,
  "nomor": "",
  "berat": 0,
  "total": 0,
  "uangMuka": 0,
  "sisa": 0,
  "status": "",
  "items": [],
  "tanggal": "",
  "created": ""
}

const ScreenDetailTerima = ({ navigation, route }) => {
  const jwt = useJWT()
  const http = useHTTP()
  const message = useMessage()
  const isFocused = useIsFocused();

  const [terima, setTerima] = useState(terimaInit)

  const onTerimaDetail = async () => {
    const url = `${BASE_URL}/terima/${route.params.id}/`;
    const config = {
      headers: {
        Authorization: await jwt.get()
      }
    }

    http.privateHTTP.get(url, config)
      .then((response) => {
        setTerima(response.data)
      })
      .catch((error) => {
        message.error(error);
      })
  }

  useEffect(() => {
    if (isFocused) {
      onTerimaDetail()
    }
  }, [isFocused])

  const kembali = () => {
    let hasil = terima.uangMuka - terima.total
    if (hasil >= 0) {
      return hasil;
    }

    return 0;
  }

  const onTerimaSelesai = async () => {
    const url = `${BASE_URL}/terima/${route.params.id}/selesai/`;
    const config = {
      headers: {
        Authorization: await jwt.get()
      }
    }

    http.privateHTTP.put(url, null, config)
      .then((response) => {
        navigation.goBack();
        message.success(response);
      })
      .catch((error) => {
        message.error(error);
      })
  }

  const onTerimaDiambil = async () => {
    const url = `${BASE_URL}/terima/${route.params.id}/diambil/`;
    const config = {
      headers: {
        Authorization: await jwt.get()
      }
    }

    http.privateHTTP.put(url, null, config)
      .then((response) => {
        navigation.goBack();
        message.success(response);
      })
      .catch((error) => {
        message.error(error);
      })
  }

  return (
    <>
      <WidgetCommonHeader 
          back={(
            <Appbar.BackAction onPress={navigation.goBack} />
          )}
          title={terima.nomor} 
        />
      <ScrollView>
        <List.Section>
          <List.Subheader>Detail Transaksi</List.Subheader>
          <List.Item title={"Nomor"} right={() => <Text>{terima.nomor}</Text>} />
          <List.Item title={"Status"} right={() => <Text>{terima.status}</Text>} />
        </List.Section>
        <List.Section>
          <List.Subheader>Pelanggan</List.Subheader>
          <List.Item title={"Nama"} right={() => <Text>{terima.pelanggan.nama}</Text>} />
          <List.Item title={"Telp"} right={() => <Text>{terima.pelanggan.telepon}</Text>} />
          <List.Item title={"Alamat"} right={() => <Text>{terima.pelanggan.alamat}</Text>} />
        </List.Section>
        <List.Section>
          <List.Subheader>Items</List.Subheader>
          {terima.items.map((item) => (
            <List.Item key={item._id} title={item.nama} />
          ))}
        </List.Section>
        <List.Section>
          <List.Subheader>Pembayaran</List.Subheader>
          <List.Item title={"Berat"} right={() => <Text>{terima.berat} Kg</Text>} />
          <List.Item title={"Total"} right={() => <Text>{terima.berat * 10000}</Text>} />
          <List.Item title={"Uang Muka"} right={() => <Text>{terima.uangMuka}</Text>} />
          <List.Item title={"Kembalian"} right={() => <Text>{kembali()}</Text>} />
          <List.Item title={"Sisa"} right={() => <Text>{terima.sisa}</Text>} />
        </List.Section>
        {terima.status === 'selesai' && (
          <Button onPress={onTerimaDiambil}>Diambil</Button>
        )}
        {terima.status === 'diproses' && (
          <Button onPress={onTerimaSelesai}>Selesai</Button>
        )}
      </ScrollView>
    </>
  )
}

export default ScreenDetailTerima;