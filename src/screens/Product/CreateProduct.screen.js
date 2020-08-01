import React from 'react';
import {Image, StyleSheet, TouchableHighlight } from 'react-native'
import {Layout, Text, TopNavigation, Button, Divider, Icon, Input, TopNavigationAction, Select, SelectItem } from '@ui-kitten/components';
import { Formik } from 'formik'
import categories from '../../utils/categories';
import qualities from '../../utils/qualities';
import * as Yup from 'yup'
import * as ExpoImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import http, { apiUrls } from '../../utils/http';

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
    SquareShape: {
        width: 100,
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor:  "#e5e5e5",
        borderRadius: 20,
    },
});

const Square = ({ onPress, imageUri }) => (
    <TouchableHighlight onPress={onPress}>
        <Layout style={styles.container}>
            <Layout style={styles.SquareShape}>
                { imageUri ? <Image style={{ width: 100, height: 100 }} source={{ uri: imageUri }} />: <Icon style={{ width: 32, height: 32}} fill='#8F9BB3' name="plus-outline" /> }
            </Layout>
        </Layout>
    </TouchableHighlight>
)

const CreateProduct = () => {
    const [pickedImages, setPickedImages] = React.useState({});
    const [height, setHeight] = React.useState(20);

    const validationSchema = Yup.object({
        title: Yup.string().required(),
        category: Yup.object()
            .shape({
                value: Yup.string().required(),
                label: Yup.string().required()
            })
            .required(),
        quality: Yup.object()
            .shape({
                value: Yup.string().required(),
                label: Yup.string().required()
            })
            .required(),
    })

    const leftIcon = (props) => <Icon {...props} name="arrow-back-outline" />

    const renderSaveAction = (handleSubmit, disableButton) => () => (
        <Button disabled={disableButton} onPress={handleSubmit} appearance="ghost">
            Save
        </Button>
    )

    const renderLeftIcon = () => <TopNavigationAction icon={leftIcon} />

    const renderLabel = (text) => <Text>{text}</Text>

    const renderCategoriesOptions = () => {
        return categories.map((category) => <SelectItem key={category.value} title={category.label} />)
    }

    const renderQualitiesOptions = () => {
        return qualities.map((quality) => <SelectItem key={quality.value} title={quality.label} />)
    }

    const verifyPermissions = async() => {
        const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL)

        if (result.status !== 'granted') {
            Alert.alert('No tenes permisos de camara!', 'Necesitas darle permisos a esta app!', [{ text: 'Ok'}])
            return false
        }
        return true
    }

    const takeImage = async(imageId) => {
        const hasPermissions = await verifyPermissions();

        if (hasPermissions) {
            const image = await ExpoImagePicker.launchCameraAsync({
                allowsEditing: true,
                quality: 0.5
            });

            const newImage = {};
            newImage[imageId] = image.uri
            setPickedImages(images => ({...images, ...newImage }))
        }
    }

    const updateSize = (height) => {
        setHeight(height)
    }

    const onSubmit = async(values) => {

        // const { data } = http.post(apiUrls.item.create, values)

    }

    return (
        <Layout style={{ flex: 1 }}>
            <Formik initialValues={{}} onSubmit={onSubmit} validationSchema={validationSchema}>
                {({ handleChange, errors, handleSubmit, values, setFieldValue, isValid, touched, setFieldTouched }) => {
                    return (
                        <>
                            <TopNavigation
                                title="Agrega tu Producto"
                                alignment="center"
                                accessoryLeft={renderLeftIcon}
                                accessoryRight={renderSaveAction(handleSubmit, !isValid)}
                            />
                            <Divider />
                            <Layout style={{ padding: 10 }}>
                                <Layout style={{  flexDirection: 'row', justifyContent: 'center'}}>
                                    <Layout style={{ marginRight: 5 }}>
                                        <Square data-imageId="image1" onPress={(e) => takeImage('image1')} imageUri={pickedImages['image1']}/>
                                    </Layout>
                                    <Layout style={{ marginRight: 5 }}>
                                        <Square onPress={() => takeImage('image2')} imageUri={pickedImages['image2']}/>
                                    </Layout>
                                    <Layout>
                                        <Square onPress={() => takeImage('image3')} imageUri={pickedImages['image3']}/>
                                    </Layout>
                                </Layout>
                                <Input
                                    status={errors.title && touched.title && 'danger'}
                                    onBlur={() => setFieldTouched('title')}
                                    onChangeText={handleChange('title')}
                                    label={renderLabel('Titulo')}
                                    value={values?.title}
                                    labelColor="red"
                                />

                                <Input
                                    status={errors.title && touched.title && 'danger'}
                                    onBlur={() => setFieldTouched('description')}
                                    onChangeText={handleChange('description')}
                                    label={renderLabel('Descripcion')}
                                    value={values?.description}
                                    multiline={true}
                                    textStyle={{ height }}
                                    onContentSizeChange={e => updateSize(e.nativeEvent.contentSize.height)}
                                    labelColor="red"
                                />

                                <Select
                                    status={errors.category && touched.category && 'danger'}
                                    onBlur={() => setFieldTouched('category')}
                                    value={values?.category?.label}
                                    disabled={!categories.length}
                                    onSelect={({ row }) => {
                                        setFieldValue('category', categories[row])
                                    }}
                                    label={renderLabel('Categorias')}
                                >
                                    {renderCategoriesOptions()}
                                </Select>

                                <Select
                                    status={errors.quality && touched.quality && 'danger'}
                                    onBlur={() => setFieldTouched('quality')}
                                    value={values?.quality?.label}
                                    disabled={!qualities.length}
                                    onSelect={({ row }) => {
                                        setFieldValue('quality', qualities[row])
                                    }}
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