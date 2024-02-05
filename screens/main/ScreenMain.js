import { StyleSheet, View } from 'react-native';
import { List, MD3Colors } from 'react-native-paper';
import WidgetCommonHeader from '../../widgets/commons/WidgetCommonHeader';
import WidgetCommonAuth from '../../widgets/commons/WidgetCommonAuth';

const ScreenMain = ({navigation}) => {
  return (
    <>
      <WidgetCommonHeader title={"Main"} />
      <WidgetCommonAuth 
        child={(
          <View style={styles.container}>
          <List.Section>
            <List.Subheader>Master</List.Subheader>
            <List.Item 
              title="Barang" 
              left={() => <List.Icon icon="washing-machine" />} 
              onPress={() => navigation.navigate("ScreenBarangList")}
            />
            <List.Item
              title="Kas"
              onPress={() => navigation.navigate("ScreenKasList")}
              left={() => <List.Icon color={MD3Colors.tertiary70} icon="cash" />}
            />
          </List.Section>
          <List.Section>
            <List.Subheader>Transaksi</List.Subheader>
            <List.Item 
              title="Terima Cucian" 
              onPress={() => navigation.navigate("ScreenTerimaList")}
              left={() => <List.Icon icon="washing-machine" />} />
          </List.Section>
          
        </View>
        )}
      />
    </>
  )
}


const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
  }
})

export default ScreenMain;