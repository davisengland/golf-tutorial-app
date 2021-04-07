import { Switch, Route } from 'react-router-dom'
import Landing from './components/Landing'
// import Signup from './components/Signup'
import Login from './components/Login'
import Gallery from './components/Gallery'
// import View from './components/View'
// import Profile from './components/Profile'

export default (
    <Switch>
        <Route exact path='/' component={Landing}/>
        {/* <Route path='/signup' component={Signup}/> */}
        <Route path='/login' component={Login}/>
        <Route path='/gallery' component={Gallery}/>
        {/* <Route path='/view' component={View}/> */}
        {/* <Route path='/profile' component={Profile}/> */}
    </Switch>
)