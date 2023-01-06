import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const UploadFileGeneral = ({ styles, handleUpload, uriType, titulo }) => {
  return (
    <View
      style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center' }}
    >
      <View style={{}}>
        <TouchableOpacity onPress={handleUpload}>
          <Image
            source={
              uriType.uri
                ? { uri: uriType.uri }
                : require('../assets/upload.png')
            }
            style={{ width: 200, height: 200 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default UploadFileGeneral
