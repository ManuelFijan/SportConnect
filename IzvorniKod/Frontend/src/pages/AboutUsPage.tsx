import { Link , useLocation} from 'react-router-dom';
import '../styles/AboutUsPage.css';
import Footer from '../components/Footer';

function AboutUsPage() {
    const location = useLocation()
    // vraca dio url-a gdje su parametri, tj. nakon znaka ?
    let s = location.search
    const bool = s.includes("main")
    const bool2 = s.includes("acc")

    const {user} = useLocation().state || {}

    return (
        <div className="about-us-main-div bg-gray-700 min-h-screen min-w-screen pb-6">
            
            <div className="w-full mb-8 relative">
                <img src="/about.jpg" alt="About-us-img" className="picture-about-us"/>
                <div className="title-about-us">
                    <p>About SportConnect</p>
                </div>
                <div className="connect-text">
                    <p>Connect to your strongest self today!</p>

                    {(bool || bool2) ? (
                        <div className="start-now-button-new">About SportConnect</div>
                    ) : (
                        <Link to="/" className="">
                            <button className="start-now-button" role="button">Start now</button>
                        </Link>
                    )}
                </div>

                <div className="healty-lifestyle-text">
                    <p>SportConnect is your go-to web app for a healthy lifestyle</p>
                </div>

                <div className="motivation-text">
                    <p>
                    No matter where you are on your journey, this is your chance to build unstoppable habits, stay motivated
                    and transform your life.
                    </p>
                    <p>
                    Take control of your health today and become the strongest, healthiest version of 
                    yourself!
                    </p>
                </div>
            </div>

            <div className="justify-text pl-16 pr-16 pt-5">
                <h4 className="text-xl font-semibold mb-6">SC - Nourish & Thrive</h4>
                <p className="mb-4">
                    Welcome to SportConnect, a social network designed to connect people with a shared goal of
                    enhancing healthy habits and exchanging knowledge about sports, fitness, and wellness. SportConnect
                    is a space where clients and partners come together to motivate, inspire, and share valuable tips
                    for achieving better health and fitness.
                </p>
                <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
                <p className="mb-4">
                    Our mission is to create a platform that facilitates connection and collaboration among like-minded
                    individuals. We believe that everyone can thrive with the support of a community and access to
                    quality information, plans, and advice. With SportConnect, you can find relevant partners, learn
                    new techniques, and build a healthier lifestyle.
                </p>
                <h2 className="text-2xl font-bold mb-3">How It Works</h2>
                <p className="mb-2">
                    SportConnect offers a flexible and engaging way for two types of users to interact:
                </p>
                <ul className="list-about-us list-disc list-inside mb-4">
                    <li>
                        <strong>Clients:</strong> Gain access to a variety of content, including blogs, tips, and plans
                        that help develop and maintain healthy habits. Clients choose their level of content access,
                        ranging from free articles to exclusive blogs and plans, with subscription options for bronze,
                        silver, or gold packages.
                    </li>
                    <li>
                        <strong>Partners:</strong> Partners are experts or enthusiasts in sports, fitness, and wellness
                        who share their knowledge with the community. Their status (bronze, silver, gold) depends on
                        the quality and usefulness of the content they share, and all users can mark their posts as
                        "useful," comment, and save content.
                    </li>
                </ul>
                <h2 className="text-2xl font-bold mb-3">What to Expect on SportConnect</h2>
                <ul className="list-about-us list-disc list-inside mb-4">
                    <li><strong>Interactive Blogs and Advice:</strong> Follow content shared by our partners, including articles, training and nutrition plans, and wellness tips.</li>
                    <li><strong>Flexible Subscription System:</strong> Access different levels of content (bronze, silver, gold) based on your needs and goals.</li>
                    <li><strong>Seamless Communication:</strong> Messages and notifications are easily accessible via the app or email. Whether you’re a partner or a client, communication is always at your fingertips.</li>
                    <li><strong>Security and Reliability:</strong> Payments are handled through PayPal or Stripe, with verified authentication via OAuth2.0 and Firebase Authentication ensuring a safe experience.</li>
                </ul>
                <h2 className="text-2xl font-bold mb-3">Why Choose SportConnect</h2>
                <p className="mb-4">
                    SportConnect is not just another fitness app. Our platform enables genuine connections among people
                    with similar goals. Whether you're looking for professional advice, community support, or an
                    opportunity to share your own knowledge, SportConnect is the place for you. We encourage healthy
                    changes in our users lives through knowledge exchange, inspiration, and building a supportive
                    community that is with you every step of the way.
                </p>
                <h2 className="text-2xl font-bold mb-3">Join the Community</h2>
                <p>
                    Join thousands of users who are already using SportConnect to improve their health and lifestyle.
                    Whether you're a beginner or an experienced professional, there's always something new to learn and
                    share. Sign up today and start your journey towards a healthier life with SportConnect.
                </p>
                <p className="mt-6 font-bold">SportConnect - Nourish & Thrive. Your community for healthy living.</p>
            </div>

            {(bool || bool2) ? (
                <div className="about bg-gray-700 pt-24 flex justify-end pr-10">
                    <Link to={bool ? "/main-page" : "/my-account"} state={{user, fromMainPage:true}}>
                        <button className='btn btn-secondary'>Back</button>
                    </Link>
                </div>
            ) : (
                <div className="about bg-gray-700 pt-24">
                    <Footer/>
                </div>
            )}
        </div>
    )
}

export default AboutUsPage;
