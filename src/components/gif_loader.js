import React from  "react";

 
class ReactGifLoader extends React.Component {
    render() {
        return (
            <div style = {{opacity:0.7, backgroundColor:"rgba(0,0,0,0.5)", height: "100vh",}} className = "d-flex justify-content-center align-items-center">
            <div className = "col-md-1">
            <img

                src="https://images.gr-assets.com/hostedimages/1414861120ra/11699799.gif"
                style = {{height: "20vh", width: "20vh"}}
                alt = ""
            />
            </div>
            </div>
        );
    }
}

export default ReactGifLoader;