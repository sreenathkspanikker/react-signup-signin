import React, { useState } from "react";
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'

function App() {
  const [isLogin, setLogin] = useState(false)
  
  return !isLogin ? <SignUp signUp={e => setLogin(e)}/> : <SignIn signUp={e => setLogin(e)}/>
}

export default App;
