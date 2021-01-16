import React from 'react';

export default function Loading(props) {
    if (props.isLoading)
        return (
            <div className="bg-fade" style={bgFade}>
            </div>
        )
    return null;
}
const bgFade = {
    backgroundColor: "#00000125",
    position: "fixed",
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    backgroundImage: 'url("img/logo/isLoading.gif")',
    backgroundPosition: 'center',
    zIndex: 10000,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100px'
}
