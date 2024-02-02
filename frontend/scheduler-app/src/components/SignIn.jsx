import { useState } from "react";
import axios from "axios";

function SignIn() {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [isOtpGenerated, setIsOtpGenerated] = useState(false);

    async function handleGenerateOtp() {


        const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

        try {
            // Make an API call to send the email
            const response = await axios.post(`${BASE_URL}/generate-otp/`, { email });
            console.log(response, email)

            // Check if the email was successfully sent before setting isOtpGenerated to true
            if (response.request.statusText === 'OK') {
                setIsOtpGenerated(true);
            } else {
                // Handle the case where the email sending failed
                console.error("Failed to send email");
            }
        } catch (error) {
            console.error("Error sending email", error);
        }

    }

    function handleSubmit(e) {
        e.preventDefault();
        // Add logic to handle form submission (validate OTP, sign in, etc.)
    }

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
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
                    </>
                )}

                {isOtpGenerated && (
                    <>
                        <button type="submit">Sign In</button>
                        <button onClick={handleGenerateOtp}>resend otp</button>
                    </>
                )}
            </form>
        </div>
    );
}

export default SignIn;
