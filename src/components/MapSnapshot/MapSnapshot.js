import React from 'react'
import { Image } from 'react-native'
import { Layout } from '@ui-kitten/components'

const MapSnapshot = ({ lat, lng }) => {
  const mapURI = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap
&markers=color:red%7Clabel:C%7C${lat},${lng}&key=AIzaSyB8wH1j8tJvQ45CWHP0M6o0CQKL1cXy8Rs`
  
  return (
    <Layout style={{ borderRadius: 10, alignItems: 'center', overflow: 'hidden'}}>
    <Image style={{ width: '100 %', height: 150}} source={{ uri: mapURI }} />
    </Layout>
  )
}

export default MapSnapshot
