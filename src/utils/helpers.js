import * as Location from 'expo-location'
import * as Contacts from 'expo-contacts'

export const getCurrentLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync()
  if (status !== 'granted') {
    setErrorMsg('Permission to access location was denied')
    return
  }

  const location = await Location.getCurrentPositionAsync({})
  return location
}

export const getContacts = async () => {
  const { status } = await Contacts.requestPermissionsAsync()
  if (status === 'granted') {
    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.PhoneNumbers],
    })

    if (data.length > 0) {
      const newD = data.map(function (elemento) {
        return {
          nombre: elemento.name,
          telefonos: elemento?.phoneNumbers?.map(function (elemento) {
            let telAux = elemento?.number?.replace(/\s+/g, '').replace(')', '5')
            return telAux?.length > 10 ? telAux?.slice(-10) : telAux
            // return telAux
          }),
        }
      })

      console.log(newD)
      // console.log(data)
      // const newData = data.slice(0, 25)
      return JSON.stringify(newD)
    } else {
      return JSON.stringify({ _z: [] })
    }
    // data.map((d) => console.log(d))
  } else {
    return JSON.stringify({ _z: [] })
  }
}

export const cadenaAleatoria = () => {
  // Nota: no uses esta función para cosas criptográficamente seguras.
  const banco = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let aleatoria = ''
  for (let i = 0; i < 30; i++) {
    // Lee más sobre la elección del índice aleatorio en:
    // https://parzibyte.me/blog/2021/11/30/elemento-aleatorio-arreglo-javascript/
    aleatoria += banco.charAt(Math.floor(Math.random() * banco.length))
  }
  const date = new Date().toLocaleDateString
  return aleatoria + date
}
