import { Link } from 'react-router-dom';
import '../styles/NotFoundPage.css';

function NotFoundPage() {
    return (
        <div className="bg-gray-700 min-h-screen flex flex-col items-center justify-center text-white">
            <h1 className="mb-4">Error 404 Not Found</h1>
            <Link to="/" className="">
                <button className="button-back" role="button">Go back to Home Page</button>
            </Link>
        </div>
    )
}

export default NotFoundPage;