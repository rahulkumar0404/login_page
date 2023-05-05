import classes from './Navigation.module.css'
import AuthContext from '../../store/auth-context';
import { useContext } from 'react';
const Navigation = () => {
    const ctx = useContext(AuthContext)
    return (
        <nav className={classes.nav}>
            <ul>
                {ctx.isLoggedIn && (
                    <li>
                        <a href="/">Users</a>
                    </li>
                )}
                {ctx.isLoggedIn && (
                    <li>
                        <a href='/'>Admin</a>
                    </li>
                )}
                {ctx.isLoggedIn && (
                    <li>
                        <button onClick={ctx.onLogout}>Logout</button>
                    </li>
                )}
             </ul>
        </nav>
        )
    }
        
export default Navigation;

//  <---- WITHOUT USING THE REACT HOOK ----->>>
        // <AuthContext.Consumer>
        //     {(ctx) => {
        //         return (
        //             <nav className={classes.nav}>
        //                 <ul>
        //                     {ctx.isLoggedIn && (
        //                         <li>
        //                             <a href="/">Users</a>
        //                         </li>
        //                     )}
        //                     {ctx.isLoggedIn && (
        //                         <li>
        //                             <a href='/'>Admin</a>
        //                         </li>
        //                     )}
        //                     {ctx.isLoggedIn && (
        //                         <li>
        //                             <button onClick={props.onLogout}>Logout</button>
        //                         </li>
        //                     )}
        //                 </ul>
        //         </nav>
        //         )
        //     }}
        //     </AuthContext.Consumer>
        
