import '../styles/TermsOfServicePage.css';
import Footer from "../components/Layout/Footer.tsx";

function CookieUsePage(){
    return (
        <>
            <div className="terms-of-service-header text-white bg-gray-700 flex">
                <img src="/logo.png" alt="Logo" className="w-[300px] ml-8 mt-3" />
                <p>Cookie policy</p>
            </div>
    
            <div className="flex">
                <div className="left-div-terms bg-gray-700 sticky top-0 h-screen p-4">
                    <div className="small-div-inside">
                        <p><a href="#cookies-LocalStorage" className="text-white">1. What are cookies and Local Storage</a></p>
                        <p><a href="#cookie-use" className="text-white">2. How we use cookies</a></p>
                        <p><a href="#third-party-cookies" className="text-white">3. Third-party cookies</a></p>
                        <p><a href="#manage-cookies" className="text-white">4. Managing cookies</a></p>
                        <p><a href="#policy-updates" className="text-white">5. Updates to this policy</a></p>
                        <p><a href="#contact-info" className="text-white">6. Contact Information</a></p>
                    </div>
                </div>
    
                <div className="right-div-terms bg-gray-700 p-8 text-white overflow-y-auto">
                    <p className="mb-16">Last Updated: 29.10.2024.</p>
    
                    <p className="mb-20">
                        Welcome to <strong>SportConnect !</strong> To provide you with the best experience on our platform, 
                        we use cookies and similar tracking technologies (e.g. Local Storage) to create a smoother,
                        faster, and safer experience for our users. These technologies allow us to operate and enhance
                        our services. Furthermore this page explains what cookies are, how we use them, and your choices regarding them.
                    </p>
                    
                    <section id="cookies-LocalStorage" className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">1. What are cookies and Local Storage</h2>
                        <p className="mb-20">
                            Cookies are small text files stored on your device by your web browser. 
                            They help websites remember information about your visit, like your preferences and settings, 
                            ensuring a seamless and tailored browsing experience. 
                            <br /><br />
                            Local Storage is used to retain information about your browsing experience, 
                            such as video settings or items viewed.
                        </p>
                    </section>
                    
                    <section id="cookie-use" className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">2. How we use cookies</h2>
                        
                        <h3 className="text-xl font-medium mb-4">2.1. Essential Cookies</h3>
                        <p className="mb-8">
                            These cookies are necessary for the basic functions of our website, 
                            such as logging in, navigating pages, accessing secure areas, detecting and preventing 
                            security issues, protecting your account and our services.
                        </p>
                        
                        <h3 className="text-xl font-medium mb-4">2.2. Performance Cookies</h3>
                        <p className="mb-8">
                            These cookies help us understand how visitors interact with <strong>SportConnect</strong> 
                            by collecting information about how the platform is used. This data is anonymous 
                            and helps us improve features and functionality. Data from cookies helps us test 
                            new features and optimize performance. Based on your activities and interactions, 
                            we may personalize the content you see to help you discover relevant sports information, 
                            food tips, and healthy lifestyle content.
                        </p>

                        <h3 className="text-xl font-medium mb-4">2.3. Functional Cookies</h3>
                        <p className="mb-8">
                            These cookies remember your preferences and settings, 
                            such as language selection and display preferences, so we can provide you 
                            with a customized experience. 
                        </p>

                        <h3 className="text-xl font-medium mb-4">2.4. Marketing Cookies</h3>
                        <p className="mb-20">
                            We may use these cookies to show you relevant promotions and advertisements 
                            based on your activity on <strong>SportConnect</strong>, including ads that promote sports, 
                            food, and lifestyle products, or to track the performance of our marketing efforts. 
                            We assess the effectiveness of advertising and content delivery through cookies. 
                        </p>
                    </section>
                    
                    <section id="third-party-cookies" className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">3. Third-party cookies</h2>                        
                        <p className="mb-20">
                            <strong>SportConnect</strong> may work with third-party service providers (e.g. analytics providers) 
                            who place cookies on our behalf to improve our services, analyze user behavior, 
                            or provide advertisements.
                        </p>
                    </section>
                    
                    <section id="manage-cookies" className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">4. Managing cookies</h2>
                        <p className="mb-20">
                            You can control over how cookies are used and manage cookies through your 
                            browser settings to limit or delete them. However, please note that blocking 
                            or disabling certain types of cookies may impact your experience on <strong>SportConnect</strong>. 
                            Adjust settings directly on <strong>SportConnect</strong>, where you can manage preferences for 
                            personalized ads, tracking, and functionality. Please note that certain cookies 
                            are necessary for SportConnect to operate correctly.
                        </p>
                    </section>
                    
                    <section id="policy-updates" className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">5. Updates to this policy</h2>
                        <p className="mb-20">
                            We may update this Cookie Policy from time to time. We encourage you to 
                            review this page periodically to stay informed about how we use cookies.
                        </p>
                    </section>
                    
                    <section id="contact-info" className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">6. Contact Information</h2>
                        <p>
                        If you have any questions about our use of cookies or you need more details,
                        please contact us at  <a href="mailto:sportconnect2024@gmail.com" className="text-blue-400">sportconnect2024@gmail.com</a>.
                        </p>
                    </section>
                </div>
            </div>  
    
            <div className="about bg-gray-700 pt-3">
                <Footer/>
            </div>
        </>
    ) 
}
  
export default CookieUsePage;