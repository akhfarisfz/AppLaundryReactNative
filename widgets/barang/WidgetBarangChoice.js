import { useState, useEffect } from "react"
import { ScrollView, StyleSheet, View } from "react-native";
import { Modal, Portal, List, Text, Button, PaperProvider } from 'react-native-paper';
import { DataTable } from 'react-native-paper';

const WidgetBarangChoice = ({daftarItem, callback, daftarBarang=[]}) => {

  return (
    <>
      <List.Subheader>Pilih Barang</List.Subheader>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Nama Barang</DataTable.Title>
          <DataTable.Title>#</DataTable.Title>
        </DataTable.Header>

        {daftarBarang.map((item) => (
          <DataTable.Row key={item._id}>
            <DataTable.Cell>{item.nama}</DataTable.Cell>
            <DataTable.Cell>
              <Button onPress={() => {
                callback(item)
              }}>Pilih</Button>
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </>
  );
};


const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: 'white', 
    padding: 20,
    flexGrow: 1,
    marginHorizontal: 0,
    gap: 8,
    paddingVertical: 0,
  }
})
export default WidgetBarangChoice;