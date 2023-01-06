import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import MiniCardServicio from '../screens/home/components/MiniCardServicio'

const ServiciosModal = ({ route }) => {
  const { servicios, handleFilter } = route.params
  return (
    <View style={styles.container}>
      <View style={styles.listaServicios}>
        {servicios.map((servicio) => (
          <View style={{ marginBottom: 15 }}>
            <MiniCardServicio
              titulo={servicio.nombre}
              icono={
                <Image
                  source={require(`../assets/iconosServicios/cerrajeria.png`)}
                  style={{ width: 50, height: 50 }}
                />
              }
              handleFilter={handleFilter}
            />
          </View>
        ))}
      </View>
    </View>
  )
}

export default ServiciosModal

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: 'white',
  },
  listaServicios: {
    justifyContent: 'space-evenly',
    marginTop: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})
