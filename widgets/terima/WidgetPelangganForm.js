import { Text, View } from "react-native";
import { TextInput, List } from 'react-native-paper';
import WidgetCommonValidator from "../commons/WidgetCommonValidator";

const WidgetPelangganForm = ({pelanggan, setPelanggan, changeListener, validator}) => {
  return (
    <>
      <List.Subheader>Pelanggan</List.Subheader>
      {/* <Text>
        {JSON.stringify(validator.result())}
      </Text> */}
      <View style={{gap: 16}}>
        <TextInput
          style={{marginHorizontal: 4}}
          label="Nama"
          value={pelanggan.nama}
          onChangeText={text => changeListener.onChangeText('nama', text, pelanggan, setPelanggan)}
        />
        <WidgetCommonValidator messages={validator.get('pelanggan.nama')} />
        <TextInput
          style={{marginHorizontal: 4}}
          label="Alamat"
          value={pelanggan.alamat}
          onChangeText={text => changeListener.onChangeText('alamat', text, pelanggan, setPelanggan)}
        />
        <WidgetCommonValidator messages={validator.get('pelanggan.alamat')} />
        <TextInput
          style={{marginHorizontal: 4}}
          label="Telepon"
          value={pelanggan.telepon}
          onChangeText={text => changeListener.onChangeText('telepon', text, pelanggan, setPelanggan)}
        />
        <WidgetCommonValidator messages={validator.get('pelanggan.telepon')} />
      </View>
    </>
  )
}

export default WidgetPelangganForm;