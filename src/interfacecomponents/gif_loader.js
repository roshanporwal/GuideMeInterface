import React from  "react";

 
class ReactGifLoader extends React.Component {
    render() {
        return (
            <div style = {{opacity:0.7, backgroundColor:"#ffff", height: "100vh",}} className = "d-flex justify-content-center align-items-center">
            <div className = "col-md-1">
            <img
                src="/assets/images/loader.gif"
                style = {{height: "20vh", width: "20vh"}}
                alt = ""
            />
            </div>
            </div>
        );
    }
}

export default ReactGifLoader;