import Navbar from "../components/Navbar.tsx";
import {useState} from "react";
import ProfileMainCard from "../components/ProfileMainCard.tsx";

function MyAccountPage(){
    const [isMenuOpen, setMenuOpen] = useState(false);

    return (
        <div className="bg-gray-700 min-w-screen min-h-screen">
            <Navbar isOpen={isMenuOpen} setIsOpen={setMenuOpen} />
            {!isMenuOpen && (
            <div className="flex h-[calc(100vh-5rem)] align-items-top">
                <div className="bg-gray-700 w-1/4 p-4">
                    <h3>Left Section</h3>
                    <p>Content for the left section.</p>
                </div>
                <div className="edit-container bg-gray-700 w-1/2 p-4 flex justify-center items-start">
                    <ProfileMainCard/>
                </div>
                <div className="bg-gray-700 w-1/4 p-4">
                    <h3>Right Section</h3>
                    <p>Content for the right section.</p>
                </div>
            </div>
                )}
        </div>
    );
}

export default MyAccountPage;