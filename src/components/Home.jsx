import React from 'react';
import { useState, useEffect, useRef } from 'react';
import Lottie from 'lottie-react';
import scrollAnimation from '../assets/scroll.json';
import { collection, getDocs, getDoc, doc } from 'firebase/firestore';
import { db, auth, googleProvider } from '../firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

function Home({ initialData }) {
  const [masseuses, setMasseuses] = useState(initialData?.masseuses || []);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);
  const [user, setUser] = useState(null);
  const [siteConfig, setSiteConfig] = useState(initialData?.siteConfig || {});
  const [error, setError] = useState(null);
  const lottieRef = useRef();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTerms, setShowTerms] = useState(false);
  const [firstMasseuse, setFirstMasseuse] = useState(null);

  // Auth state observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Fetch masseuses
  useEffect(() => {
    if (!initialData?.masseuses) {
      const fetchMasseuses = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "masseuse"));
          const masseuseData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setMasseuses(masseuseData);
          
          // Set the first masseuse for preloading
          if (masseuseData.length > 0) {
            setFirstMasseuse(masseuseData[0]);
          }
        } catch (error) {
          console.error('Error fetching masseuses:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchMasseuses();
    }
  }, [initialData]);

  // Add preload link effect
  useEffect(() => {
    if (firstMasseuse?.mainPicture) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = firstMasseuse.mainPicture;
      document.head.appendChild(link);
    }
  }, [firstMasseuse]);

  // Get unique locations
  const locations = [...new Set(masseuses.map(m => m.location))];

  // Filter masseuses
  const filteredMasseuses = selectedLocation
    ? masseuses.filter(m => m.location === selectedLocation)
    : masseuses;

  const visibleMasseuses = filteredMasseuses.slice(0, visibleCount);

  // Fetch site config
  useEffect(() => {
    if (!initialData?.siteConfig) {
      const fetchSiteConfig = async () => {
        try {
          const configDoc = await getDoc(doc(db, 'siteConfig', 'main'));
          if (configDoc.exists()) {
            const data = configDoc.data();
            setSiteConfig(data);
            if (data.pageTitle) {
              document.title = data.pageTitle;
            }
          }
        } catch (error) {
          console.error('Error fetching site config:', error);
          setError(error.message);
        }
      };

      fetchSiteConfig();
    }
  }, [initialData]);

  // Add this useEffect after the site config fetch useEffect
  useEffect(() => {
    if (siteConfig?.pageTitle) {
      document.title = siteConfig.pageTitle;
    }
  }, [siteConfig?.pageTitle]);

  // Add this useEffect after your other useEffects
  useEffect(() => {
    // Debug logs
    console.log('Meta update triggered');
    console.log('Current siteConfig:', siteConfig);
    console.log('Description:', siteConfig?.metaDescription);
    console.log('Keywords:', siteConfig?.metaKeywords);
    
    // Check if we can find the elements
    const descriptionMeta = document.querySelector('meta[name="description"]');
    const keywordsMeta = document.querySelector('meta[name="keywords"]');
    
    console.log('Found description meta?', !!descriptionMeta);
    console.log('Found keywords meta?', !!keywordsMeta);

    if (siteConfig?.metaDescription) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', siteConfig.metaDescription);
    }
    if (siteConfig?.metaKeywords) {
      document.querySelector('meta[name="keywords"]')?.setAttribute('content', siteConfig.metaKeywords);
    }
  }, [siteConfig.metaDescription, siteConfig.metaKeywords]);

  useEffect(() => {
    console.log('Current siteConfig:', siteConfig); // Debug log
  }, [siteConfig]);

  // Add scroll event listener with animation control
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.pageYOffset / scrollHeight);
      setScrollProgress(currentProgress * 100);

      if (lottieRef.current) {
        const totalFrames = lottieRef.current.getDuration(true);
        const frame = Math.min(Math.floor(currentProgress * totalFrames * 0.95), totalFrames * 0.95);
        lottieRef.current.goToAndStop(frame, true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (error) {
    return <div className="text-red-600">Error loading site configuration: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-50 to-white">
      {/* Modern Navbar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 fixed w-full z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-semibold bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text">
                {siteConfig?.siteName || 'MassageHub'}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-8 h-8 rounded-full border-2 border-pink-200"
                  />
                  <button
                    onClick={handleSignOut}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Sign Out
                  </button>
                  {user.email === 'bbalazsb@gmail.com' && (
                    <a
                      href="/admin"
                      className="bg-gradient-to-r from-pink-500 to-violet-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
                    >
                      Admin Panel
                    </a>
                  )}
                </div>
              ) : (
                <button
                  onClick={handleSignIn}
                  className="flex items-center space-x-2 bg-white border border-gray-200 px-4 py-2 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors duration-200 shadow-sm hover:shadow"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07"
                    />
                  </svg>
                  <span>Sign In</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Add this header section */}
      <div className="container mx-auto pt-24 px-4">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text">
            {siteConfig?.pageTitle || 'Welcome'}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {siteConfig?.pageSubtitle || ''}
          </p>
        </header>

        {/* Location selector */}
        <div className="max-w-xs mx-auto mb-12">
          <select
            className="w-full p-3 rounded-full border border-gray-200 shadow-sm focus:ring-2 focus:ring-pink-200 focus:border-pink-300 transition-all duration-200"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="">All Locations</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>
      </div>

      <main className="container mx-auto px-4">
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {visibleMasseuses.map((masseuse) => (
              <a
                key={masseuse.id}
                href={`/ladies/${masseuse.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="transform transition-all duration-300 hover:-translate-y-1"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl">
                  <div className="relative h-0 pb-[133.33%]">
                    <img
                      src={masseuse.mainPicture || '/placeholder.jpg'}
                      alt={masseuse.name || 'Masseuse'}
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/placeholder.jpg';
                        e.target.onerror = null;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4 text-white">
                      <h2 className="text-xl font-semibold">{masseuse.name || 'Unknown'}</h2>
                      <div className="flex items-center text-sm">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {masseuse.location || 'Location not specified'}
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </main>

      {filteredMasseuses.length > visibleCount && (
        <div className="text-center mt-8 pb-8">
          <button
            onClick={() => setVisibleCount(prev => prev + 8)}
            className="bg-white px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50"
          >
            Load More
            <svg className="w-4 h-4 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}

      {/* Simplified Lottie container */}
      <div className="fixed bottom-4 left-4 w-24 h-24 z-50 pointer-events-none">
        <div className="w-full h-full">
          <Lottie
            lottieRef={lottieRef}
            animationData={scrollAnimation}
            loop={false}
            autoplay={false}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>

      {/* Disclaimer and Terms */}
      <div className="container mx-auto px-4 py-12">
        {siteConfig?.disclaimer && (
          <div className="mb-8">
            <div 
              className="prose prose-pink max-w-none text-gray-500 text-sm"
              dangerouslySetInnerHTML={{ __html: siteConfig.disclaimer }}
            />
          </div>
        )}
        
        {siteConfig?.termsOfUse && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowTerms(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >
              View Terms & Conditions
            </button>
          </div>
        )}
      </div>

      {/* Add the Terms Modal */}
      {showTerms && siteConfig?.termsOfUse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-3xl max-h-[80vh] overflow-y-auto rounded-t-xl shadow-xl">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Terms & Conditions</h3>
              <button
                onClick={() => setShowTerms(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div 
                className="prose prose-pink max-w-none"
                dangerouslySetInnerHTML={{ __html: siteConfig.termsOfUse }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home; 