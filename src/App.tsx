import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { FoodItemsProvider } from './contexts/FoodItemsContext';
import { FriendsProvider } from './contexts/FriendsContext';
import { RecipesProvider } from './contexts/RecipesContext';
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/ui/LoadingSpinner';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Friends = lazy(() => import('./pages/Friends'));
const Recipes = lazy(() => import('./pages/Recipes'));
const Profile = lazy(() => import('./pages/Profile'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <Router>
      <AuthProvider>
        <FoodItemsProvider>
          <FriendsProvider>
            <RecipesProvider>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route
                    index
                    element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <Home />
                      </Suspense>
                    }
                  />
                  <Route
                    path="dashboard"
                    element={
                      <ProtectedRoute>
                        <Suspense fallback={<LoadingSpinner />}>
                          <Dashboard />
                        </Suspense>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="friends"
                    element={
                      <ProtectedRoute>
                        <Suspense fallback={<LoadingSpinner />}>
                          <Friends />
                        </Suspense>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="recipes"
                    element={
                      <ProtectedRoute>
                        <Suspense fallback={<LoadingSpinner />}>
                          <Recipes />
                        </Suspense>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="profile"
                    element={
                      <ProtectedRoute>
                        <Suspense fallback={<LoadingSpinner />}>
                          <Profile />
                        </Suspense>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="login"
                    element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <Login />
                      </Suspense>
                    }
                  />
                  <Route
                    path="signup"
                    element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <Signup />
                      </Suspense>
                    }
                  />
                  <Route
                    path="*"
                    element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <NotFound />
                      </Suspense>
                    }
                  />
                </Route>
              </Routes>
            </RecipesProvider>
          </FriendsProvider>
        </FoodItemsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;