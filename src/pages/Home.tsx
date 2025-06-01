import { Link } from 'react-router-dom';
import { RefrigeratorIcon, UtensilsCrossed, UserPlus, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-500 to-primary-700 text-white py-20 md:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Reduce Food Waste, Save Money, Help the Planet
            </h1>
            <p className="text-xl mb-8 text-white/90">
              FridgeCircle helps you track your food, suggests recipes with expiring ingredients, and lets you share with friends.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="btn bg-white text-primary-700 hover:bg-gray-100"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="btn bg-white text-primary-700 hover:bg-gray-100"
                  >
                    Get Started - It's Free
                  </Link>
                  <Link
                    to="/login"
                    className="btn bg-primary-600 text-white border border-white hover:bg-primary-700"
                  >
                    Log In
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How FridgeCircle Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our simple platform helps you track your food, prevent waste, and connect with friends to share extra items.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                <RefrigeratorIcon className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Track Your Food</h3>
              <p className="text-gray-600">
                Easily add food items with expiry dates, photos, and notes. Get alerts before items expire.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 bg-secondary-100 rounded-full flex items-center justify-center">
                <UtensilsCrossed className="w-8 h-8 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Generate Recipes</h3>
              <p className="text-gray-600">
                Get recipe suggestions based on items nearing expiry. Turn potential waste into delicious meals.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 bg-accent-100 rounded-full flex items-center justify-center">
                <UserPlus className="w-8 h-8 text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Share With Friends</h3>
              <p className="text-gray-600">
                Connect with up to 5 friends to share extra food items before they go to waste.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Reducing Food Waste Matters</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Food waste is a global problem with significant environmental and economic impacts.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <p className="text-4xl font-bold text-primary-600 mb-2">33%</p>
              <p className="text-gray-700">of all food produced globally is wasted each year</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <p className="text-4xl font-bold text-primary-600 mb-2">$1,500</p>
              <p className="text-gray-700">average annual cost of food waste per household</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <p className="text-4xl font-bold text-primary-600 mb-2">8%</p>
              <p className="text-gray-700">of global greenhouse gas emissions come from food waste</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join thousands of people who are reducing food waste with FridgeCircle.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="flex items-center mb-4">
                <img
                  src="https://i.pravatar.cc/150?img=32"
                  alt="Sarah J."
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">Sarah J.</h4>
                  <p className="text-sm text-gray-600">Busy parent</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "FridgeCircle has cut my family's food waste in half! The expiry alerts help me keep track of what needs to be used, and the recipe suggestions have given us some delicious new meal ideas."
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="flex items-center mb-4">
                <img
                  src="https://i.pravatar.cc/150?img=54"
                  alt="Michael T."
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">Michael T.</h4>
                  <p className="text-sm text-gray-600">Student</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "As a student, I'm always trying to save money. FridgeCircle helps me track what I have and share with friends when I have extra. I've saved hundreds of dollars this year already!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Reduce Food Waste?</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
            Join FridgeCircle today and start tracking your food, getting recipe suggestions, and sharing with friends.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="btn-primary text-base px-8 py-3"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="btn-primary text-base px-8 py-3"
                >
                  Get Started - It's Free
                </Link>
                <Link
                  to="/login"
                  className="btn-outline text-base px-8 py-3"
                >
                  Log In
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;