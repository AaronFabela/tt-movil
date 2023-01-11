import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import MiniCardServicioModal from './components/MiniCardServicioModal'

const ServiciosModal = ({ route, navigation }) => {
  const { servicios, handleFilter } = route.params
  return (
    <View style={styles.container}>
      <View style={styles.listaServicios}>
        {servicios.map((servicio) => (
          <View style={{ marginBottom: 15 }}>
            <MiniCardServicioModal
              titulo={servicio.nombre}
              icono={
                <Image
                  source={{ uri: servicio.icono }}
                  style={{ width: 50, height: 50 }}
                />
              }
              handleFilter={handleFilter}
              key={servicio._id}
              route={route}
              navigation={navigation}
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
    width: '100%',
    paddingHorizontal: 15,
    backgroundColor: 'white',
  },
  listaServicios: {
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})
