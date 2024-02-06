
import SignIn from './SignIn'
import styles from './Authenticate.module.css'




function Authenticate({ setIsAuthenticated, setIsInterivewAdmin, isInterivewAdmin }) {
    return (
        <div className={styles.authenticate}>
            {/* <SignUp /> */}
            <SignIn setIsAuthenticated={setIsAuthenticated} setIsInterivewAdmin={setIsInterivewAdmin} isInterivewAdmin={isInterivewAdmin} />

        </div>
    )
}

export default Authenticate
