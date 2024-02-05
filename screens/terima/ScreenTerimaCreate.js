import useHTTP from "../../hooks/useHTTP";
import useJWT from "../../hooks/useJWT";
import { useIsFocused } from '@react-navigation/native';
import useMessage from "../../hooks/useMessage";
import { useState } from "react";
import useValidator from "../../hooks/useValidator";
import { Text, View } from "react-native";
import WidgetCommonHeader from "../../widgets/commons/WidgetCommonHeader";
import { Appbar, TextInput, Button, IconButton, List } from 'react-native-paper';
import WidgetCommonAuth from "../../widgets/commons/WidgetCommonAuth";

const ScreenTerimaCreate = ({navigation}) => {
  const isFocused = useIsFocused();
  const http = useHTTP();
  const jwt = useJWT();
  const message = useMessage();

  const [terima, setTerima] = useState({
    nomor: "",
    berat: 0,
    uangMuka: 0
  })
  const terimValidator = useValidator({
    nomor: [],
    berat: [],
    uangMuka: []
  })

  return (
    <>
      <View>
      <WidgetCommonHeader 
        back={(
          <Appbar.BackAction onPress={navigation.goBack} />
        )}
        title={'Penerimaan'}
      />
      <WidgetCommonAuth child={(
        <>
          <List.Subheader>Detail Transaksi</List.Subheader>
          <View style={{gap: 16}}>
            <TextInput
              style={{marginHorizontal: 4}}
              label="Nomor"
              // value={text}
              // onChangeText={text => setText(text)}
            />
            <TextInput
              style={{marginHorizontal: 4}}
              label="Berat"
              // value={text}
              // onChangeText={text => setText(text)}
            />
            <TextInput
              style={{marginHorizontal: 4}}
              label="Uang Muka"
              // value={text}
              // onChangeText={text => setText(text)}
            />
          </View>

          <List.Subheader>Pelanggan</List.Subheader>
          <View style={{gap: 16}}>
            <TextInput
              style={{marginHorizontal: 4}}
              label="Nama"
              // value={text}
              // onChangeText={text => setText(text)}
            />
            <TextInput
              style={{marginHorizontal: 4}}
              label="Alamat"
              // value={text}
              // onChangeText={text => setText(text)}
            />
            <TextInput
              style={{marginHorizontal: 4}}
              label="Telepon"
              // value={text}
              // onChangeText={text => setText(text)}
            />
          </View>
          <List.Section>
            <List.Subheader style={{flexDirection: "column", justifyContent: "center", width: "100%"}}>
              <Text>Items/Services</Text>
              <IconButton
                icon="shape-circle-plus"
                style={{backgroundColor: "red"}}
                size={16}
                onPress={() => console.log('Pressed')}
              />
            </List.Subheader>
            <List.Item title="First Item" left={() => <List.Icon icon="folder" />} />
            <List.Item
              title="Second Item"
              left={() => <List.Icon icon="folder" />}
            />
          </List.Section>
        </>
      )} />
      </View>
    </>
  )
}

export default ScreenTerimaCreate;