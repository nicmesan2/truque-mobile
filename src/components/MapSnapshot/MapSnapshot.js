import React from 'react'
import { Image } from 'react-native'
import { Layout } from '@ui-kitten/components'
import ENV from '../../../env.js'

const MapSnapshot = ({ lat, lng }) => {
  const mapURI = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap
&markers=color:red%7Clabel:C%7C${lat},${lng}&key=${ENV().googleApiKey}`
  
  return (
    <Layout style={{ borderRadius: 10, alignItems: 'center', overflow: 'hidden'}}>
    <Image style={{ width: '100 %', height: 150}} source={{ uri: mapURI }} />
    </Layout>
  )
}

export default MapSnapshot
