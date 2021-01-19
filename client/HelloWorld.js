import React from "react";
import axios from "axios"

const HelloWorld = () => {
  
  axios.get('http://localhost:8000/api')
  .then(res=>{console.log(res.data); console.log(res.status)});

  return (
    <div>
      <h1>hello world</h1>
    </div>
  );
};

export default HelloWorld;
