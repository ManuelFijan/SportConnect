import '../styles/PrivacyPolicyPage.css';
import Footer from "../components/Footer.tsx";

function PrivacyPolicyPage() {
    return (
        <>
            <div className="privacy-policy-header text-white bg-gray-700 flex">
                <img src="/logo.png" alt="Logo" className="w-[300px] ml-8 mt-3" />
                <p>Privacy Policy</p>
            </div>

            <div className="flex">
                <div className="left-div-privacy bg-gray-700 sticky top-0 h-screen p-4">
                    <div className="small-div-inside">
                        <p><a href="#introduction" className="text-white">1. Introduction</a></p>
                        <p><a href="#information-we-collect" className="text-white">2. Information We Collect</a></p>
                        <p><a href="#information-use" className="text-white">3. How We Use Your Information</a></p>
                        <p><a href="#information-sharing" className="text-white">4. Sharing Your Information</a></p>
                        <p><a href="#data-security" className="text-white">5. Data Security</a></p>
                        <p><a href="#your-rights" className="text-white">6. Your Rights</a></p>
                        <p><a href="#third-parties" className="text-white">7. Payments and Subscriptions</a></p>
                        <p><a href="#notification-communication" className="text-white">8. Notification and Communication</a></p>
                        <p><a href="#changes-policy" className="text-white">9. Changes to this Privacy Policy</a></p>
                        <p><a href="#contact-us" className="text-white">10. Contact Us</a></p>
                    </div>
                </div>

                <div className="right-div-privacy bg-gray-700 p-8 text-white overflow-y-auto">
                    <p className="mb-16">Last Updated: 25.10.2024.</p>

                    <section id="introduction" className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                        <p className="mb-20">
                            Welcome to <strong>SportConnect!</strong> We value your privacy and are committed to protect your personal information. 
                            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our 
                            web application <strong>"SportConnect"</strong>. 
                            By accessing or using our Service, you agree to the terms outlined in this policy.
                        </p>
                    </section>

                    <section id="information-we-collect" className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
                        
                        <h3 className="text-xl font-medium mb-4">2.1. Personal Information</h3>
                        <p className="mb-4">
                            When you create an account, we collect personal details such as your name, surname, email-address, phone number and payment 
                            information for subscriptions. If you choose to be a partner, additional information may be requested 
                            for verification purposes.
                        </p>
                                              
                        <h3 className="text-xl font-medium mb-4">2.2. Payment Information</h3>
                        <p className="mb-4">
                            We use third-party payment processors (e.g., PayPal, Stripe) for subscription transactions. These 
                            processors follow their own privacy policies regarding payment information, which we do not store or 
                            have direct access to.
                        </p>
                        
                        <h3 className="text-xl font-medium mb-4">2.3. Cookies and Tracking Technologies</h3>
                        <p className="mb-20">
                            We use cookies and similar tracking technologies to enhance user experience, analyze traffic, and 
                            personalize content. You can control the use of cookies through your browser settings.
                        </p>
                    </section>

                    <section id="information-use" className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
                        <p className="mb-4">
                            We may use the collected information for various purposes, including:
                        </p>
                        <ul className="list-disc ml-6 mb-20">
                            <li className="mb-3">To provide, operate, and maintain our Service.</li>
                            <li className="mb-3">To improve, personalize, and expand our Service.</li>
                            <li className="mb-3">To process transactions and manage subscriptions.</li>
                            <li className="mb-3">To communicate with you, including sending you notifications, updates, and customer support responses.</li>
                            <li className="mb-3">To monitor and analyze usage trends to improve user experience.</li>
                            <li className="mb-3">To enforce our terms and conditions, and for compliance with legal obligations.</li>
                        </ul>
                    </section>

                    <section id="information-sharing" className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">4. Sharing Your Information</h2>
                        <p className="mb-4">
                            We may share your information in the following situations:
                        </p>
                        <ul className="list-disc ml-6 mb-20">
                            <li className="mb-3">
                                <strong>With Partners:</strong> If you interact with partners (e.g., subscribing to their content), your profile information 
                                and engagement data may be shared with them.
                            </li>
                            <li className="mb-3">
                                <strong>Service Providers:</strong> We engage third-party vendors to perform functions on our behalf, such as payment 
                                processing, email notifications, and data analytics.
                            </li>
                            <li className="mb-3">
                                <strong>Legal Compliance:</strong> We may disclose your information if required to do so by law or in response to valid 
                                requests by public authorities.
                            </li>
                        </ul>
                    </section>


                    <section id="data-security" className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
                        <p className="mb-20">
                            We implement appropriate security measures to protect your information from unauthorized access, 
                            alteration, disclosure, or destruction. However, please be aware that no transmission over the Internet 
                            is entirely secure, and we cannot guarantee the absolute security of your data.
                        </p>
                    </section>

                    <section id="your-rights" className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
                        <p className="mb-4">
                            You have the following data protection rights:
                        </p>
                        <ul className="list-disc ml-6 mb-12">
                            <li className="mb-4">The right to access, update, or delete your personal information.</li>
                            <li className="mb-4">The right to object to or restrict our processing of your data.</li>
                            <li className="mb-4">The right to withdraw consent if we are processing your information based on consent.</li>
                            <li className="mb-4">The right to lodge a complaint with a supervisory authority.</li>
                        </ul>
                        <p className="mb-20">
                            You can manage these rights by contacting us at <a href="mailto:sportconnect2024@gmail.com" className="text-blue-400">sportconnect2024@gmail.com</a>.
                        </p>
                    </section>


                    <section id="third-parties" className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">7. Payments and Subscriptions</h2>
                        <p className="mb-20">
                            Payments for subscription services are processed through third-party services like PayPal and Stripe.
                            These services handle your payment information and comply with relevant security standards (e.g., PCI-DSS). 
                            We do not store your payment details directly.
                        </p>
                    </section>

                    <section id="notification-communication" className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">8. Notification and Communication</h2>
                        <p className="mb-20">
                            Notifications regarding account activity, payments, and updates will be sent to your registered email address. 
                            Communications are handled through third-party services such as Firebase Cloud Messaging or FreeChat, which operate 
                            under their own privacy policies.
                        </p>
                    </section>


                    <section id="changes-policy" className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">9. Changes to this Privacy Policy</h2>
                        <p className="mb-20">
                            We may update this Privacy Policy from time to time. Any changes will be posted on this page, and the date
                            of the latest update will be indicated. You are advised to review this Privacy Policy periodically for any 
                            updates.
                        </p>
                    </section>

                    <section id="contact-us" className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
                        <p className="mb-12">
                            If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:sportconnect2024@gmail.com" className="text-blue-400">sportconnect2024@gmail.com</a>
                        </p>
                        <p>
                            By using <strong>SportConnect</strong>, you acknowledge that you have read, understood, and agree to the terms of this Privacy Policy.
                        </p>
                    </section>
                </div>
            </div>

            <div className="about bg-gray-700 pt-3">
                <Footer />
            </div>
        </>
    );
}

export default PrivacyPolicyPage;