import '../styles/TermsOfServicePage.css';
import { Link } from 'react-router-dom';
import Footer from "../components/Footer.tsx";

function TermsOfServicePage() {
    return (
    <>
        <div className="terms-of-service-header text-white bg-gray-700 flex">
            <img src="/logo.png" alt="Logo" className="w-[300px] ml-8 mt-3" />
            <p>Terms Of Service</p>
        </div>

        <div className="flex">
            <div className="left-div-terms bg-gray-700 sticky top-0 h-screen p-4">
                <div className="small-div-inside">
                    <p><a href="#acceptance" className="text-white">1. Acceptance of Terms</a></p>
                    <p><a href="#user-accounts" className="text-white">2. User Accounts and Responsibilities</a></p>
                    <p><a href="#payment-subscription" className="text-white">3. Payment, Subscription, and Content</a></p>
                    <p><a href="#privacy-notifications" className="text-white">4. Privacy, Notifications, and Communication</a></p>
                    <p><a href="#termination-liability" className="text-white">5. Termination and Liability</a></p>
                    <p><a href="#indemnification-changes" className="text-white">6. Indemnification, Changes, and Governing Law</a></p>
                    <p><a href="#contact-info" className="text-white">7. Contact Information</a></p>
                </div>
            </div>

            <div className="right-div-terms bg-gray-700 p-8 text-white overflow-y-auto">
                <p className="mb-16">Last Updated: 25.10.2024.</p>

                <p className="mb-20">
                Welcome to <strong>SportConnect</strong>, an online platform designed to foster a community of health enthusiasts, fitness 
                professionals, and individuals seeking to improve their wellness. By accessing or using the <strong>SportConnect</strong> web application 
                and associated services ("Service"), you agree to be bound by these Terms of Service ("Terms"). Please read them carefully. 
                If you do not agree with these Terms, you must discontinue using the Service.
                </p>
                
                <section id="acceptance" className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
                    <p className="mb-20">
                        By creating an account, accessing, or using <strong>SportConnect</strong>, you accept and agree to these Terms. 
                        This agreement is between you ("User") and SportConnect ("us"). 
                        The Terms apply to all users, including Partners and Clients.
                    </p>
                </section>
                
                <section id="user-accounts" className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">2. User Accounts and Responsibilities</h2>
                    
                    <h3 className="text-xl font-medium mb-4">2.1. Account Registration and Security</h3>
                    <p className="mb-4">
                        Users can register as either "Partners" or "Clients." Partners are individuals or entities 
                        providing fitness-related content, while Clients are users who consume and may subscribe to premium content. 
                        You are responsible for providing accurate information during registration and maintaining the confidentiality 
                        of your account credentials. Notify us immediately if you suspect any unauthorized use of your account.
                    </p>
                    
                    <h3 className="text-xl font-medium mb-4">2.2. User Roles</h3>
                    <p className="mb-20">
                        Partners must comply with all application rules and policies. <strong>SportConnect</strong> reserves the right to assess and 
                        rank Partner content (Gold, Silver, Bronze) based on user feedback. Clients may subscribe to different levels 
                        of content access: Bronze (€12.99/month), Silver (€24.99/month), and Gold (€34.99/month). 
                        Clients can cancel their subscriptions at any time.
                    </p>
                </section>
                
                <section id="payment-subscription" className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">3. Payment, Subscription, and Content</h2>
                    
                    <h3 className="text-xl font-medium mb-4">3.1. Fees and Cancellation</h3>
                    <p className="mb-4">
                        All subscription fees are non-refundable. Fees are charged monthly through integrated 
                        payment providers (PayPal, Stripe). Clients will receive a reminder two days before automatic renewal. If not 
                        canceled, the subscription will renew for the following month.
                    </p>
                    
                    <h3 className="text-xl font-medium mb-4">3.2. User-Generated Content and Conduct</h3>
                    <p className="mb-20">
                        Partners can post and interact with content on the platform. <strong>SportConnect</strong> does not endorse 
                        user-generated content and is not responsible for its consequences. You agree not to post content that is illegal,
                        harmful, or infringes on any rights. <strong>SportConnect</strong> reserves the right to remove any violating content.
                    </p>
                </section>
                
                <section id="privacy-notifications" className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">4. Privacy, Notifications, and Communication</h2>
                    <p className="mb-20">
                        Your privacy is important to us. Please refer to our <Link to="/privacy-policy" className="text-blue-400">Privacy Policy</Link> for details on how we collect and protect your information. You agree to receive notifications via email
                        for important updates. Communication between Partners and Clients will be facilitated through the platform 
                        using integrated messaging services.
                    </p>
                </section>
                
                <section id="termination-liability" className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">5. Termination and Liability</h2>
                    <p className="mb-20">
                        You may terminate your account at any time, which will revoke your access to the Service. 
                        We may also suspend or terminate your account for breaches of these Terms or harmful activities. 
                        <strong> SportConnect</strong> will not be liable for any indirect, incidental, or consequential damages arising from the use 
                        or inability to use the Service.
                    </p>
                </section>
                
                <section id="indemnification-changes" className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">6. Indemnification, Changes, and Governing Law</h2>
                    <p className="mb-20">
                        You agree to indemnify and hold harmless SportConnect and its partners from any claims arising from your use of 
                        the Service or violation of these Terms. We reserve the right to modify these Terms at any time, with changes 
                        posted on this page. Your continued use of the Service constitutes acceptance of updated Terms. 
                    </p>
                </section>
                
                <section id="contact-info" className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">7. Contact Information</h2>
                    <p>
                    If you have any questions about these Terms, please contact us at <a href="mailto:sportconnect2024@gmail.com" className="text-blue-400">sportconnect2024@gmail.com</a>.
                    </p>
                </section>
            </div>
        </div>  

        <div className="about bg-gray-700 pt-5">
            <Footer/>
        </div>
    </>
    );
}

export default TermsOfServicePage;