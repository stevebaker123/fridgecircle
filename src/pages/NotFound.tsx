import { Link } from 'react-router-dom';
import { RefrigeratorIcon } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 animate-fade-in">
      <div className="max-w-md w-full text-center">
        <RefrigeratorIcon className="mx-auto h-24 w-24 text-primary-500" strokeWidth={1.5} />
        <h1 className="mt-6 text-3xl font-bold text-gray-900">Page Not Found</h1>
        <p className="mt-3 text-lg text-gray-600">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="btn-primary"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;