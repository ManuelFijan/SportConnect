import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from "../context/AuthContext";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import ChatWindow from '../components/ChatWindow';

function ChatPage() {
    const navigate = useNavigate();
    const { token, user } = useContext(AuthContext); // Access AuthContext
    const [isMenuOpen, setMenuOpen] = useState(false);

    // Redirect na home ako nije authenticated
	useEffect(() => {
		if (!token) {
			navigate("/");
		}
	}, [token, navigate]);

    return (
        <div className="main-page text-white bg-gray-700 min-h-screen min-w-screen">
            {user ? (
                <div>
                    <Navbar isOpen={isMenuOpen} setIsOpen={setMenuOpen} userPic={user.profilePicture || "/user.png"}/>

                    <div className='flex'>
                        <div className='w-[10%]'/>

                        <div className='w-[80%] flex flex-col justify-center items-center'>
                            <ChatWindow/>
                        </div>

                        <div className='w-[10%]'/>
                    </div>

                </div>
            ) : (
                <p>No user data available.</p>
            )}
        </div>

    );
}

export default ChatPage;