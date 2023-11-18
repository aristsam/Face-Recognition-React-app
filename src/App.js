import React, {Component} from "react";
import './App.css';
import Logo from"./components/Logo/Logo";
import ImageLinkForm from"./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from"./components/FaceRecognition/FaceRecognition";
import ParticlesBg from 'particles-bg'


const returnClariRequestOptions = (imageURL) =>{
    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = '3711c949259444c29c4fa029064d6400';
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = '3wj1v2j61r9d';       
    const APP_ID = 'test';
    // Change these to whatever model and image URL you want to use
    
      
    const IMAGE_URL = imageURL;
        const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
   {
    "data": {
    "image": {
    "url": IMAGE_URL
                    }
       }
      }
     ]
    });


     const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };
    return requestOptions

}

class App extends Component {
constructor() {
super();
this.state = {
  input:"",
  imageURL:"",
  box:{},
}
}

calculateFace = (data) => {
const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
const image = document.getElementById("inputimage");
const width = Number(image.width);
const height = Number(image.height);
return {
  leftcol: clarifaiFace.left_col * width,
  toprow: clarifaiFace.top_row * height,
  rightcol: width - (clarifaiFace.right_col * width),
  bottomrow: height - (clarifaiFace.bottom_row * height)
}

}

displayFaceBox= (box) => {
this.setState({box: box});

}


onInputChange = (event) => {
this.setState({input: event.target.value});

}

onButton = () => {
this.setState({imageURL: this.state.input});
fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/outputs", returnClariRequestOptions(this.state.input))
 .then(response => response.json())
        .then(response => this.displayFaceBox(this.calculateFace(response)))
          .catch(error=> console.log(error));
          }


  render() {
  return (
    <div className="App">
   <ParticlesBg type="circle" bg={true}/>      
   <Logo/>  
  <ImageLinkForm onButton={this.onButton} onInputChange={this.onInputChange}/>
  <FaceRecognition box={this.state.box} imageURL={this.state.imageURL}/>
 </div>
 );
}
}
export default App;
