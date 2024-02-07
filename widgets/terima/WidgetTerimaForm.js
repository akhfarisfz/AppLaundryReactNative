import { Text, View } from "react-native";
import { TextInput, List } from 'react-native-paper';
import WidgetCommonValidator from "../commons/WidgetCommonValidator";

const WidgetTerimaForm = ({terima, setTerima, changeListener, validator}) => {

  return (
    <>
      <List.Subheader>Detail Transaksi</List.Subheader>
      <View style={{gap: 16}}>
        <TextInput
          style={{marginHorizontal: 4}}
          label="Nomor"
          value={terima.nomor}
          onChangeText={text => changeListener.onChangeText('nomor', text, terima, setTerima)}
        />
        <WidgetCommonValidator messages={validator.get('nomor')} />
        <TextInput
          style={{marginHorizontal: 4}}
          label="Berat"
          value={terima.berat}
          onChangeText={text => changeListener.onChangeNumber('berat', text, terima, setTerima)}
        />
        <WidgetCommonValidator messages={validator.get('berat')} />
        <TextInput
          style={{marginHorizontal: 4}}
          label="Uang Muka"
          value={terima.uangMuka}
          onChangeText={text => changeListener.onChangeNumber('uangMuka', text, terima, setTerima)}
        />
        <WidgetCommonValidator messages={validator.get('uangMuka')} />
      </View>
    </>
  )
}

export default WidgetTerimaForm;