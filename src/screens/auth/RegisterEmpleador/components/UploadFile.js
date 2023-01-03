import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const UploadFile = ({ styles, handleUpload, uriType, titulo }) => {
  return (
    <View style={styles.botonesImagen}>
      <View style={styles.botonesImagen}>
        <TouchableOpacity onPress={handleUpload}>
          <Image
            source={
              uriType.uri
                ? { uri: uriType.uri }
                : require('../../../../assets/upload.png')
            }
            style={{ width: 300, height: 300 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default UploadFile
