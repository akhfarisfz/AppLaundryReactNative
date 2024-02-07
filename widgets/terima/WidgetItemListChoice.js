
import { IconButton, List, Text, DataTable, Button } from 'react-native-paper';
import WidgetBarangChoice from "../barang/WidgetBarangChoice";


const WidgetItemListChoice = ({callback, daftarItem=[]}) => {
  return (
    <>
      <List.Subheader>Item Terpilih</List.Subheader>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Nama Barang</DataTable.Title>
          <DataTable.Title>#</DataTable.Title>
        </DataTable.Header>

        {daftarItem.map((item) => (
          <DataTable.Row key={item._id}>
            <DataTable.Cell>{item.nama}</DataTable.Cell>
            <DataTable.Cell>
              <Button onPress={() => { callback(item) }}>Hapus</Button>
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </>
  )
}

export default WidgetItemListChoice;
