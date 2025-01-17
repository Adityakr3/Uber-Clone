import ReCAPTCHA from 'react-google-recaptcha';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Recaptcha = ({onVerify}) => {
    const navigate = useNavigate();
    const RECAPTCHA_SITE_KEY = "6LfvR7cqAAAAAAORCJDZeL5-WY2PdX3wx2fC8L_p";
    const onCaptchaChange = (token) => {
        fetch('http://localhost:4444/api/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token:token}),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                toast('Captcha verified successfully');
                onVerify(token);
                navigate('/login');
            } else {
                toast('Captcha verification failed. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };
    return (
        <div>
                <ReCAPTCHA
                    theme="dark"
                    sitekey={RECAPTCHA_SITE_KEY}
                    onChange={onCaptchaChange}
                />
                <ToastContainer/>
        </div>
    )
}
export default Recaptcha
