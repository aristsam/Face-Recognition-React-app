import React from "react";
import "./ImageLinkForm.css";


const ImageLinkForm = ({onInputChange , onButton}) =>{
return(
<div>
<p className="f3">
	{`This amazing app will detect faces in your pictures.`}
</p>	
<div className="center">
<div className="form center pa4 br3 shadow-5">
<input className="f4 pa2 w-70 center" type="text" onChange={onInputChange} />
<button className="w-30 white b pv2 ph3 bg-gold hover-bg-blue bn br-pill" onClick={onButton}>Detect</button>
</div>
</div>
</div>
);
}

export default ImageLinkForm;