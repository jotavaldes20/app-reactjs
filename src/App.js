import React from 'react';
import {Switch, Route} from 'react-router-dom'
import './App.css';
import {auth, createUserProfileDocument} from './firebase/firebase.utils'

import Header from './components/header/header.component'
import HomePage from './pages/homepage/homepage.component'
//componenete funcional (de funcion)
/*function App() {
  return (
  
}*/
//Definicion de Componente de clase
class App extends React.Component{
  constructor(){
    //inicializar objeto de estado
    super();//toma las propiedades del React.Componenet, para ocupar las propiedades heredadas
    this.state ={
      currentUser:null
    };
  }
    unsubscribeFromAuth = null;


    // ciclos de vida: montado, actualizado y desmontado
    //manejar montado
    componentDidMount() {
      this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
        if (userAuth){
          const userRef = await createUserProfileDocument(userAuth)
          //recibe la referencia de usuario
          userRef.onSnapshot(snapShot=> {
            //cambiamos las propiedades del usuario
            this.setState({
              currentUser:{
                id: snapShot.id,
                ...snapShot.data()
              }
            });
            console.log(this.state);
          });
        }
        this.setState({ currentUser: userAuth });
      });
    }
    //maneja ciclo de vida del componente
    componentWillUnmount(){
      //libera el observable
      this.unsubscribeFromAuth();
    }

    //renderizado del componente, lo que mostrara en la pantalla
    render(){
      return(
        <div>
          <Header currentUser={this.state.currentUser} />
          <Switch>
            <Route exact path='/' component={HomePage} />   
          </Switch>
        </div>
      )
    }
  }

export default App;
