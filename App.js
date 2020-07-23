import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import { Camera } from "expo-camera";
// const hbjs = require("handbrake-js");
import MovToMp4 from "react-native-mov-to-mp4";
// import { LogLevel, RNFFmpeg } from "react-native-ffmpeg";

export default function App() {
  const [cameraOpen, setCameraOpen] = useState(false);
  const cameraRef = useRef(null);
  // let cameraRef = null;

  const getPermission = async () => {
    const { status } = await Camera.requestPermissionsAsync();
  };
  useEffect(() => {
    getPermission();
  }, []);

  const onClickVideo = async () => {
    console.log(`cameraRef`, cameraRef);
    const camera = cameraRef.current;
    if (camera) {
      const filename = Date.now().toString();
      const video = await camera.recordAsync({ maxDuration: 5 });
      console.log(`video`, video.uri);

      MovToMp4.convertMovToMp4(video.uri, filename + ".mp4").then(function (
        results
      ) {
        console.log(results);
      });

      /*       hbjs
        .spawn({ input: `${video.uri}`, output: "something.m4v" })
        .on("error", (err) => {
          // invalid user input, no video found etc
        })
        .on("progress", (progress) => {
          console.log(
            "Percent complete: %s, ETA: %s",
            progress.percentComplete,
            progress.eta
          );
        }); */

      // RNFFmpeg.execute('-i file1.mp4 -c:v mpeg4 file2.mp4').then(result => console.log("FFmpeg process exited with rc " + result.rc));
      // RNFFmpeg.execute(`-i ${video.uri} file2.mp4`).then((result) =>
      //   console.log("FFmpeg process exited with rc " + result.rc)
      // );

      // const convertedVideo = await converter.convertMovToMp4(
      //   video.uri,
      //   `test.mp4`,
      //   function (result) {
      //     console.log("finished recording", result);
      //   }
      // );
      // console.log("converted", convertedVideo);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {cameraOpen ? (
        <View style={{ flex: 1 }}>
          <Camera
            ref={cameraRef}
            style={{ flex: 1 }}
            type={Camera.Constants.Type.back}
          >
            <View
              style={{
                flex: 1,
                position: "relative",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => setCameraOpen(false)}
                style={{
                  padding: 10,
                  backgroundColor: "grey",
                  borderRadius: 5,
                  position: "absolute",
                  top: 40,
                }}
              >
                <Text style={{ color: "white" }}>back</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={onClickVideo}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: "red",
                  marginBottom: 100,
                  borderWidth: 4,
                  borderColor: "white",
                  // justifySelf: "flex-end",
                  // alignSelf: "flex-end",
                }}
              ></TouchableOpacity>
            </View>
          </Camera>
        </View>
      ) : (
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => setCameraOpen(true)}
            style={{ padding: 10, backgroundColor: "grey", borderRadius: 5 }}
          >
            <Text style={{ color: "white" }}>camera</Text>
          </TouchableOpacity>
          <Text>Open up App.js to start working on your app!</Text>
          <StatusBar style="auto" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
