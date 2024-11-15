import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db, storage, performance } from '../firebase';
import Lottie from 'lottie-react';
import scrollAnimation from '../assets/scroll.json';
import { HelmetProvider, Helmet } from 'react-helmet-async';

function Collection({ initialData }) {
  const { id } = useParams();
  const [masseuse, setMasseuse] = useState(initialData?.masseuse || null);
  const [siteConfig, setSiteConfig] = useState(initialData?.siteConfig || null);
  
  // Add missing state declarations
  const [showTerms, setShowTerms] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [currentImage, setCurrentImage] = useState(null);
  const lottieRef = useRef(null);

  // Add missing function for opening image modal
  const openImageModal = (imageUrl) => {
    setModalImage(imageUrl);
    setIsModalOpen(true);
  };

  // Add scroll animation effect
  useEffect(() => {
    const handleScroll = () => {
      if (lottieRef.current) {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const currentProgress = window.pageYOffset / scrollHeight;
        const totalFrames = lottieRef.current.getDuration(true);
        const frame = Math.min(Math.floor(currentProgress * totalFrames * 0.95), totalFrames * 0.95);
        lottieRef.current.goToAndStop(frame, true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Add currency helper function if not imported
  const getCurrencySymbol = (currency) => {
    const symbols = {
      GBP: '£',
      EUR: '€',
      USD: '$',
      // Add more currencies as needed
    };
    return symbols[currency] || currency;
  };

  // Only fetch if no initial data
  useEffect(() => {
    if (!initialData?.masseuse) {
      const fetchData = async () => {
        try {
          const masseuseDoc = await getDoc(doc(db, 'masseuse', id));

          if (masseuseDoc.exists()) {
            const data = masseuseDoc.data();
            setMasseuse({ id: masseuseDoc.id, ...data });
          } else {
            setMasseuse(null);
          }
        } catch (error) {
          setMasseuse(null);
        }
      };
      fetchData();
    }
    if (!initialData?.siteConfig) {
      const fetchSiteConfig = async () => {
        try {
          const configDoc = await getDoc(doc(db, 'siteConfig', 'main'));
          if (configDoc.exists()) {
            setSiteConfig(configDoc.data());
          }
        } catch (error) {
        }
      };
      fetchSiteConfig();
    }
  }, [id, initialData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-50 to-white">
      {masseuse && (
        <>
          <HelmetProvider>
            <Helmet>
              <title>{`${masseuse.name} | ${masseuse.location} | ${siteConfig?.pageTitle || 'MassageHub'}`}</title>
              <meta 
                name="description" 
                content={
                  masseuse.metaDescription || 
                  `${masseuse.name} - ${masseuse.slogan || 'Professional massage services'} in ${masseuse.location}. ${siteConfig?.metaDescription || ''}`
                } 
              />
              <meta 
                name="keywords" 
                content={
                  (masseuse.keywords?.length > 0 
                    ? masseuse.keywords 
                    : (siteConfig?.metaKeywords || '').split(',')
                  ).join(', ')
                } 
              />
            </Helmet>
          </HelmetProvider>
        </>
      )}

      <nav className="bg-white/80 backdrop-blur-sm shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link 
              to="/" 
              className="text-2xl font-bold text-gradient hover:opacity-80 transition-opacity"
            >
              {siteConfig?.siteName || 'Home'}
            </Link>
          </div>
        </div>
      </nav>

      <div className="py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-8 max-w-2xl mx-auto">
            <img
              src={masseuse?.mainPicture || '/placeholder.jpg'}
              alt={`${masseuse?.name} - ${masseuse?.location} massage services`}
              className="w-full h-full object-cover cursor-pointer"
              onClick={() => openImageModal(masseuse?.mainPicture)}
              fetchpriority="high"
              loading="eager"
              decoding="async"
            />
          </div>

          {masseuse?.additionalPictures && masseuse.additionalPictures.length > 0 && (
            <div className="grid grid-cols-6 gap-4 mb-8 max-w-2xl mx-auto">
              <div
                className={`aspect-[3/4] rounded-lg overflow-hidden cursor-pointer ${
                  masseuse?.mainPicture === masseuse.mainPicture ? 'ring-2 ring-pink-500' : ''
                }`}
                onClick={() => setCurrentImage(masseuse.mainPicture)}
              >
                <img
                  src={masseuse.mainPicture}
                  alt={`${masseuse.name} - ${masseuse.location} main profile`}
                  className="w-full h-full object-cover"
                />
              </div>
              {masseuse.additionalPictures.map((pic, index) => (
                <div
                  key={index}
                  className={`aspect-[3/4] rounded-lg overflow-hidden cursor-pointer ${
                    masseuse?.mainPicture === pic ? 'ring-2 ring-pink-500' : ''
                  }`}
                  onClick={() => setCurrentImage(pic)}
                >
                  <img
                    src={pic}
                    alt={`${masseuse.name} - ${masseuse.location} massage therapy ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-gray-900">{masseuse?.name}</h1>
              <p className="text-lg text-gray-600">{masseuse?.slogan}</p>
              
              <div className="mt-4 space-y-3">
                <a 
                  href={`tel:${masseuse?.phone}`}
                  className="inline-flex items-center text-2xl font-semibold text-pink-600 hover:text-pink-700 transition-colors"
                >
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                    />
                  </svg>
                  {masseuse?.phone}
                </a>

                <div className="flex items-center text-lg text-gray-600">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
                    />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
                    />
                  </svg>
                  <span>{masseuse?.location}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Pricing</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {Object.entries(masseuse?.prices || {}).filter(([_, price]) => price && price !== 0).map(([duration, price]) => (
                  <div
                    key={duration}
                    className="bg-white rounded-lg shadow-md p-6 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="text-lg font-medium text-gray-900">{duration}</div>
                    <div className="text-2xl font-bold text-pink-600 mt-2">
                      {`${getCurrencySymbol(masseuse?.currency)}${price}`}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">About Me</h2>
              <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                {masseuse?.introduction}
              </div>
            </div>

            {masseuse?.services && masseuse.services.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Services</h2>
                <ul className="space-y-2">
                  {masseuse.services.map((service, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 text-pink-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {service.description}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {(masseuse?.instagram || masseuse?.twitter || masseuse?.onlyfans) && (
              <div className="pt-4 border-t border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Social Media</h2>
                <div className="flex space-x-4">
                  {masseuse?.instagram && (
                    <a 
                      href={`https://instagram.com/${masseuse.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-pink-500 transition-colors"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                  )}

                  {masseuse?.twitter && (
                    <a 
                      href={`https://twitter.com/${masseuse.twitter.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-400 transition-colors"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                  )}

                  {masseuse?.onlyfans && (
                    <a 
                      href={`https://onlyfans.com/${masseuse.onlyfans}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-500 transition-colors"
                    >
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-15.5c-3.038 0-5.5 2.462-5.5 5.5s2.462 5.5 5.5 5.5 5.5-2.462 5.5-5.5-2.462-5.5-5.5-5.5z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {siteConfig?.disclaimer && (
          <div 
            className="prose prose-pink max-w-none text-gray-500 text-sm"
            dangerouslySetInnerHTML={{ __html: siteConfig.disclaimer }}
          />
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

      {showTerms && (
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
                dangerouslySetInnerHTML={{ __html: siteConfig?.termsOfUse }}
              />
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-4 right-4 w-24 h-24 z-50 pointer-events-none">
        <div className="w-full h-full transform scale-x-[-1]">
          <Lottie
            lottieRef={lottieRef}
            animationData={scrollAnimation}
            loop={false}
            autoplay={false}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>

      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="relative max-h-[90vh] max-w-[90vw]">
            <img
              src={modalImage}
              alt={`${masseuse?.name} - ${masseuse?.location} full size image`}
              className="max-h-[90vh] max-w-[90vw] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute top-4 right-4 text-white hover:text-gray-300"
              onClick={() => setIsModalOpen(false)}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Collection; 