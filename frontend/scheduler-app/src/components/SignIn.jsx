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

    const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;


    const navigate = useNavigate();



    async function handleGenerateOtp() {




        try {
            // Make an API call to send the email
            setIsLoading(true)
            const response = await axios.post(`${BASE_URL}/accounts/generate-otp/`, { email });


            // Check if the email was successfully sent before setting isOtpGenerated to true
            if (response.request.statusText === 'OK') {
                setIsOtpGenerated(true);

            } else {
                // Handle the case where the email sending failed
                console.error("Failed to send email");
            }
        } catch (error) {
            console.error("Error sending email", error);
        } finally {
            setIsLoading(false)
        }

    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setIsLoading(true)
            const response = await axios.post(`${BASE_URL}/accounts/login/`, {
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

                {!isOtpGenerated && (
                    <button type="button" onClick={handleGenerateOtp}>
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
