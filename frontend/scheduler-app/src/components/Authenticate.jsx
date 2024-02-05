
import SignIn from './SignIn'
import SignUp from './SignUp'




function Authenticate({ setIsAuthenticated, setIsInterivewAdmin, isInterivewAdmin }) {
    return (
        <div>
            {/* <SignUp /> */}
            <SignIn setIsAuthenticated={setIsAuthenticated} setIsInterivewAdmin={setIsInterivewAdmin} isInterivewAdmin={isInterivewAdmin} />

        </div>
    )
}

export default Authenticate
