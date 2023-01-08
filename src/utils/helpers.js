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
      const newData = data.slice(0, 25)
      console.log(JSON.stringify(newData))
      // data.map((d) => console.log(d))
    }
  }
}
