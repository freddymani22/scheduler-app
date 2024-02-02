
import SignIn from './SignIn'
import SignUp from './SignUp'




function Authenticate({ setIsAuthenticated }) {
    return (
        <div>
            {/* <SignUp /> */}
            <SignIn setIsAuthenticated={setIsAuthenticated} />

        </div>
    )
}

export default Authenticate
