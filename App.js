import React from 'react'
import { View, Text, Image, Button, StyleSheet, TouchableOpacity, Modal } from 'react-native'
const axios = require('react-native-axios')
import ImagePicker from 'react-native-image-picker'


export default class App extends React.Component {
  state = {
    photo: null,
    deficiency: 'phospohors',
    supplement: 'null',
    modalVisible: false,
    modalVisible2: false
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible })
  }

  setModalVisible2(visible) {
    this.setState({ modalVisible2: visible })
  }

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    }
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({ photo: response })
      }
    })
  }

  takePhotos = () => {
    const options = { noData: true }
    ImagePicker.launchCamera(options, response => {
      if (response.uri) {
        this.setState({ photo: response })
      }
    })
  }

  createFormData = (photo, body) => {
    const data = new FormData();

    data.append("photo", {
      name: photo.fileName,
      type: photo.type,
      uri:
        Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
    });

    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });

    return data;
  }

  handleUpload = () => {

    fetch("http://192.168.137.187:3000/api/upload", {
      method: "POST",
      headers: {
        "Content-type": "multipart/form-data"
      },
      body: this.createFormData(this.state.photo, { userId: "123" })
    })
      .then(response => response.json())
      .then(response => {
        console.log("upload succes", response);
        alert("Upload success!");
        this.setState({ photo: null });
      })
      .catch(error => {
        console.log("upload error", error);
        alert("Upload failed!");
      });
  }

  f1 = () => {
    this.setModalVisible(!this.state.modalVisible)
  }

  f2 = () => {
    this.setModalVisible2(!this.state.modalVisible2)
  }

  render() {
    const { photo } = this.state
    return (

      <View>

        <Modal
         animationType="slide"
         transparent={false}
         visible={this.state.modalVisible2}
        >
          <View style={styles.pHead}>
            <Text style={styles.pDef} >Deficiency:</Text>
            <Text style={styles.pSoln}>{this.state.deficiency}</Text>
          </View>

          <View style={styles.pHead}>
            <Text style={styles.pDef}>Supplement:</Text>
            <Text style={styles.pSoln}>{this.state.supplement}</Text>
          </View>

          <View>
            <TouchableOpacity
              onPress={this.f2}
              style={styles.touchableButton}>
              <Text style={styles.touchableButtonText}>Go back</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <View style={styles.buttonView}>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
          >
            {photo && (
              <React.Fragment>
                <Image
                  source={{ uri: photo.uri }}
                  style={{ marginTop: 100, marginLeft: 50, width: 200, height: 200, marginBottom: 30 }}
                />
                <Button title="Send" onPress={this.handleUpload} />
                <Button title="Back" style={{ marginTop: 100 }} onPress={this.f1} />
              </React.Fragment>
            )}
          </Modal>


          <View style={{ marginBottom: 130 }}>
            <TouchableOpacity
              onPress={() => { this.handleChoosePhoto(); this.f1();this.f2(); }}
              style={styles.touchableButton}>
              <Text
                style={styles.touchableButtonText}

              >Upload Photo</Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              onPress={() => { this.takePhotos(); this.f1();this.f2(); }}
              style={styles.touchableButton}>
              <Text style={styles.touchableButtonText}>Take Photo</Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              onPress={() => { this.f2(); }}
              style={styles.touchableButton}>
              <Text style={styles.touchableButtonText}>Show result</Text>
            </TouchableOpacity>
          </View>
        </View>


      </View>

    )
  }

}


const styles = StyleSheet.create({
  buttonView: {
    width: 200,
    marginTop: 100,
    paddingBottom: 50,
    marginLeft: 75
  },
  touchableButton: {
    backgroundColor: 'white',
    borderRadius: 18,
    borderColor: 'black',
    borderWidth: 2,
    height: 45,
    alignItems: 'center',
    padding: 5,
    marginBottom: 5,
    marginTop: 20,
  },
  touchableButtonText: {
    fontSize: 20
  },
  pHead:{
    margin:15,
    padding:15

  },
  pDef:{
    fontSize:30,
    padding:10

    
  },
  pSoln: {
    borderRadius:8,
    borderWidth:2,
    borderColor:'black',
    padding:5,
    margin:5,
    fontSize:20
  }
})
