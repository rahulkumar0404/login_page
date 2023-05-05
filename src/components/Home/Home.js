import Card from '../UI/Card/Card'
import Button from '../UI/Button/Button.js'
import classes from './Home.module.css'
import { useContext } from 'react'
import AuthContext from '../../store/auth-context'
const Home = (props) => {
    const authCtx = useContext(AuthContext)
    return <Card className={classes.home}>
        <h1>Welcome Back!</h1>
        <Button onClick={authCtx.onLogout}>Logout</Button>
    </Card>
}

export default Home