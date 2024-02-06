import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import styles from './SignIn.module.css'

function SignIn({ setIsAuthenticated, setIsInterivewAdmin, isInterivewAdmin }) {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isOtpGenerated, setIsOtpGenerated] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;


    const navigate = useNavigate();

    async function handleGenerateOtp(e) {
        e.preventDefault();

        try {
            setIsLoading(true);

            const response = await axios.post(`${BASE_URL}/accounts/generate-otp/`, { email });

            // Check if the email was successfully sent before setting isOtpGenerated to true
            if (response.status === 200) {
                setIsOtpGenerated(true);
                setErrorMessage('')
            } else {
                // Handle the case where the email sending failed
                console.error("Failed to send email");
                setErrorMessage("Failed to send email");
            }
        } catch (error) {
            console.error("Error sending email", error);
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                setErrorMessage(error.response.data.detail);
            } else if (error.request) {
                // The request was made but no response was received
                setErrorMessage("No response received");
            } else {
                // Something happened in setting up the request that triggered an Error
                setErrorMessage("An unexpected error occurred");
            }
        } finally {
            setIsLoading(false);
        }
    }




    async function handleSubmit(e) {
        e.preventDefault();
        let response
        try {
            setIsLoading(true)
            response = await axios.post(`${BASE_URL}/accounts/login/`, {
                email,
                otp,
            });
            const jwtToken = response.data.access_token;
            localStorage.setItem('jwtToken', jwtToken);

            // setEmail('');
            // setOtp('');
            await setIsAuthenticated(true)

            await (setIsInterivewAdmin(response.data.is_interview_admin))
            if (isInterivewAdmin) {
                navigate('/admin');
            } else {
                navigate('/');
            }



        } catch (error) {
            console.error('Error:', error.message);

        } finally {
            setIsLoading(false)
        }
    }

    return isLoading ? <Loading /> : (
        <div className={styles.login}>
            <p>Login</p>
            <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    placeholder="Email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />

                {errorMessage && <p className={styles.error}>{errorMessage}</p>}

                {!isOtpGenerated && (
                    <button type="button" onClick={(e) => handleGenerateOtp(e)}>
                        Generate OTP
                    </button>
                )}

                {isOtpGenerated && (
                    <>
                        <label htmlFor="otp">OTP:</label>
                        <input
                            type="number"
                            id="otp"
                            placeholder="OTP"
                            value={otp}
                            required
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        <button type="submit">Sign In</button>


                    </>
                )}

            </form>

            {isOtpGenerated && (
                <button onClick={() => setIsOtpGenerated((val) => !val)}>resend otp</button>

            )}
        </div>
    );



}

export default SignIn;
