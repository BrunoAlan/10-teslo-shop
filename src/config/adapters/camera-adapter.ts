import * as ImagePicker from 'expo-image-picker';

export class CameraAdapter {
  static async takePicture(): Promise<string[]> {
    const response = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      cameraType: ImagePicker.CameraType.back,
      quality: 1,
    });

    if (response.assets && response.assets[0]) {
      return [response.assets[0].uri];
    }

    return [];
  }

  static async getPictureFromLibrary(): Promise<string[]> {
    const response = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      selectionLimit: 10,
    });
    if (response.assets && response.assets.length > 0) {
      return response.assets.map((asset) => asset.uri);
    }
    return [];
  }
}
