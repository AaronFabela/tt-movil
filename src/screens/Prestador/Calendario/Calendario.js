import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  RefreshControl,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../../../constants'
import { Agenda } from 'react-native-calendars'
import { Avatar, Card } from 'react-native-paper'
import { set } from 'react-native-reanimated'
import ordenServicioService from '../../../services/ordenServicio.service'
import { useContext } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { ActivityIndicator } from 'react-native-paper'

const Calendario = () => {
  const { userInfo } = useContext(AuthContext)
  const [items, setItems] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getOrders()
  }, [])

  const getOrders = async () => {
    try {
      const response = await ordenServicioService.getOrdenesServicioByDate(
        userInfo.id
      )
      setItems(response.data)
      setIsLoading(false)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const renderItem = (item) => {
    return (
      <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
        <Card>
          <Card.Content>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text>{item.empleador.usuario}</Text>
              <Text>{item.servicio.nombre}</Text>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    )
  }

  const emptyDate = (item) => {
    return (
      <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
        <Card>
          <Card.Content>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text>Día libre :D</Text>
              {/* <Avatar.Text label='J' /> */}
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    )
  }

  const emptyData = (item) => {
    return (
      <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
        <Card>
          <Card.Content>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text>Día libre</Text>
              {/* <Avatar.Text label='J' /> */}
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    )
  }
  return (
    <View
      style={{
        flex: 1,
        // justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
        backgroundColor: COLORS.white,
      }}
    >
      {isLoading ? (
        <ActivityIndicator size={50} animating={true} color={COLORS.primary} />
      ) : (
        <Agenda
          style={{ width: '100%' }}
          items={items}
          selected={new Date().toISOString().slice(0, 10)}
          maxDate={'2040-05-30'}
          renderItem={renderItem}
          renderEmptyDate={emptyDate}
          renderEmptyData={emptyData}
        />
      )}
    </View>
    // </ScrollView>
  )
}

export default Calendario

const styles = StyleSheet.create({})
