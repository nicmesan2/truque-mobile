import React, { useState } from 'react'
import { Image, StyleSheet, TouchableWithoutFeedback, AsyncStorage, Alert } from 'react-native'
import {
  Layout,
  Text,
  TopNavigation,
  Button,
  Divider,
  Icon,
  Input,
  TopNavigationAction,
  Select,
  SelectItem,
  Modal,
  Card,
  Spinner
} from '@ui-kitten/components'
import { Formik } from 'formik'
import categories from '../../utils/categories'
import qualities from '../../utils/qualities'
import * as Yup from 'yup'
import { S3 } from 'aws-sdk'
import * as FileSystem from 'expo-file-system'
import { decode } from 'base64-arraybuffer'
import * as ExpoImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import { useIsFocused } from '@react-navigation/native'
import ENV from '../../../env.js'
import axios from 'axios'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  SquareShape: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e5e5e5',
    borderRadius: 20
  },
  fields: { marginVertical: 8 }
})

const Square = ({ onPress, imageUri }) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <Layout style={styles.container}>
      <Layout style={styles.SquareShape}>
        {imageUri ? (
          <Image style={{ width: 100, height: 100, borderRadius: 20 }} source={{ uri: imageUri }} />
        ) : (
          <Icon style={{ width: 32, height: 32 }} fill="#8F9BB3" name="plus-outline" />
        )}
      </Layout>
    </Layout>
  </TouchableWithoutFeedback>
)

const CreateProduct = (props) => {
  const [isLoading, setIsLoading] = useState(false)

  const navigateBack = () => {
    props.navigation.goBack()
  }

  const BackIcon = (props) => <Icon {...props} name="arrow-back-outline" />

  const BackAction = () => <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  console.log('--', props.route.params?.initialValues?.images)

  const [pickedImages, setPickedImages] = React.useState(props.route.params?.initialValues?.images.map(img => ({ uri: img})) || [])
  const [height, setHeight] = React.useState(20)

  const validationSchema = Yup.object({
    title: Yup.string().required(),
    category: Yup.string().required(),
    quality: Yup.string().required(),
    description: Yup.string().required(),
  })

  const renderSaveAction = (handleSubmit, disableButton) => () => (
    <Button disabled={disableButton} onPress={handleSubmit} appearance="ghost">
      Guardar
    </Button>
  )

  const renderLabel = (text) => <Text>{text}</Text>

  const renderCategoriesOptions = () => {
    return categories.map((category) => <SelectItem key={category} title={category} />)
  }

  const renderQualitiesOptions = () => {
    return qualities.map((quality) => <SelectItem key={quality} title={quality} />)
  }

  const uploadImageOnS3 = async (file) => {
    const s3bucket = new S3({
      accessKeyId: ENV().aws_key,
      secretAccessKey: ENV().aws_secret_key,
      Bucket: ENV().aws_bucket_name,
      signatureVersion: 'v4'
    })

    let contentType = 'image/jpeg'
    let contentDeposition = 'inline;filename="' + file.name + '"'
    const base64 = await FileSystem.readAsStringAsync(`${file.uri}`, { encoding: FileSystem.EncodingType.Base64 })
    const arrayBuffer = decode(base64)
    return new Promise((resolve, reject) => {
      s3bucket.createBucket(() => {
        const params = {
          Bucket: ENV().aws_bucket_name,
          Key: file.name,
          Body: arrayBuffer,
          ContentDisposition: contentDeposition,
          ContentType: contentType
        }

        s3bucket.upload(params, (err, data) => {
          if (err) {
            console.log('error in callback', err)
          }
          console.log('success s3', data)
          resolve(data.Location)
        })
      })
    })
  }

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL)

    if (result.status !== 'granted') {
      Alert.alert('No tenes permisos de camara!', 'Necesitas darle permisos a esta app!', [{ text: 'Ok' }])
      return false
    }
    return true
  }

  const takeImage = async () => {
    const hasPermissions = await verifyPermissions()

    if (hasPermissions) {
      const image = await ExpoImagePicker.launchCameraAsync({
        allowsEditing: true,
        base64: true,
        quality: 0.5
      })

      setPickedImages((images) => [...images, { uri: image.uri, name: new Date().toString() }])
    }
  }

  const updateSize = (height) => {
    setHeight(height)
  }

  const onSubmit = async (values) => {
    setIsLoading(true)
    try {
      const imagesUrls = await Promise.all(pickedImages.map((pickedImage) => uploadImageOnS3(pickedImage)))
      const token = await AsyncStorage.getItem('token')

      console.log('image urls ', imagesUrls)

      const result = await axios.post(
        'http://6e814c51da06.ngrok.io/item',
        {
          title: values.title,
          description: values.description,
          category: values.category.value,
          quality: values.quality.value,
          images: imagesUrls
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      console.log('success upload item: ', result.data)
      props.navigation.goBack()
    } catch (err) {
      setIsLoading(false)
      Alert.alert('Occurio un problema :(', err, [{ text: 'OK' }], { cancelable: false })
      console.log('error: ', err)
    }
  }

  const initialValues = props.route.params?.initialValues || {}

  return (
    <Layout style={{ flex: 1, padding: 10 }}>
      {isLoading ? (
        <Modal visible={isLoading} backdropStyle={styles.backdrop}>
          <Card disabled={true}>
            <Spinner />
          </Card>
        </Modal>
      ) : null}
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({ handleChange, errors, handleSubmit, values, setFieldValue, isValid, touched, setFieldTouched }) => {
          return (
            <>
              <TopNavigation
                title="Cancelar"
                accessoryLeft={BackAction}
                accessoryRight={renderSaveAction(handleSubmit, !isValid)}
              />
              <Divider />
              <Layout style={{ padding: 10 }}>
                <Layout style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
                  <Layout style={{ marginRight: 5 }}>
                    <Square data-imageId="image1" onPress={takeImage} imageUri={pickedImages[0]?.uri} />
                  </Layout>
                  <Layout style={{ marginRight: 5 }}>
                    <Square onPress={takeImage} imageUri={pickedImages[1]?.uri} />
                  </Layout>
                  <Layout>
                    <Square onPress={takeImage} imageUri={pickedImages[2]?.uri} />
                  </Layout>
                </Layout>
                <Input
                  status={errors.title && touched.title && 'danger'}
                  onBlur={() => setFieldTouched('title')}
                  onChangeText={handleChange('title')}
                  label={renderLabel('Titulo')}
                  value={values?.title}
                  labelColor="red"
                  style={styles.fields}
                />

                <Input
                  status={errors.description && touched.description && 'danger'}
                  onBlur={() => setFieldTouched('description')}
                  onChangeText={handleChange('description')}
                  label={renderLabel('Descripcion')}
                  value={values?.description}
                  multiline={true}
                  textStyle={{ height }}
                  onContentSizeChange={(e) => updateSize(e.nativeEvent.contentSize.height)}
                  labelColor="red"
                  style={styles.fields}
                />

                <Select
                  status={errors.category && touched.category && 'danger'}
                  onBlur={() => setFieldTouched('category')}
                  placeholder="Elige una categoria"
                  value={values?.category}
                  disabled={!categories.length}
                  onSelect={({ row }) => {
                    setFieldValue('category', categories[row])
                  }}
                  label={renderLabel('Categorias')}
                  style={styles.fields}
                >
                  {renderCategoriesOptions()}
                </Select>

                <Select
                  status={errors.quality && touched.quality && 'danger'}
                  onBlur={() => setFieldTouched('quality')}
                  placeholder="¿En que condiciones esta?"
                  value={values?.quality}
                  disabled={!qualities.length}
                  onSelect={({ row }) => {
                    setFieldValue('quality', qualities[row])
                  }}
                  style={styles.fields}
                  label={renderLabel('Calidad')}
                >
                  {renderQualitiesOptions()}
                </Select>
              </Layout>
            </>
          )
        }}
      </Formik>
    </Layout>
  )
}

export default CreateProduct
