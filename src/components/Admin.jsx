import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { db, storage, auth, googleProvider } from '../firebase';
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL, deleteObject, uploadBytesResumable } from 'firebase/storage';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast, Toaster } from 'react-hot-toast';

const downloadImage = async (url, filename) => {
  try {
    // Direct fetch from the URL since we're on localhost
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Get the blob data
    const blob = await response.blob();
    
    // Create a blob URL and trigger download
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename.split('?')[0]; // Clean filename
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
    
    return true;
  } catch (error) {
    console.error('Error downloading image:', error);
    throw error;
  }
};

const getFileExtensionFromUrl = (url) => {
  // Extract the file extension from the URL before the query parameters
  const baseUrl = url.split('?')[0];
  const match = baseUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i);
  return match ? match[0] : '.jpg'; // Default to .jpg if no extension found
};

function Admin() {
  const [masseuses, setMasseuses] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    slogan: '',
    location: '',
    phone: '',
    introduction: '',
    instagram: '',
    twitter: '',
    onlyfans: '',
    mainPicture: null,
    additionalPictures: [],
    prices: {
      thirtyMin: 50,
      sixtyMin: 80,
      ninetyMin: 110
    },
    currency: 'GBP',
    metaDescription: '',
    keywords: []
  });
  const [services, setServices] = useState([{ description: '' }]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [siteConfig, setSiteConfig] = useState({
    siteName: '',
    pageTitle: '',
    pageSubtitle: '',
    metaDescription: '',
    metaKeywords: '',
    currency: 'GBP',
    disclaimer: '',
    termsOfUse: '',
    updatedAt: null
  });
  const [editingId, setEditingId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [keywordInput, setKeywordInput] = useState('');
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [additionalImagePreviews, setAdditionalImagePreviews] = useState([]);

  // Check authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email === import.meta.env.VITE_FIREBASE_AUTH_EMAIL) {
        setIsAuthenticated(true);
        setAuthError(null);
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Authentication error:', error);
      setAuthError(error.message);
    }
  };

  // Fetch masseuses when authenticated
  useEffect(() => {
    const fetchMasseuses = async () => {
      if (!isAuthenticated) return;
      
      try {
        const querySnapshot = await getDocs(collection(db, "masseuse"));
        setMasseuses(querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })));
      } catch (error) {
        console.error('Error fetching masseuses:', error);
      }
    };

    fetchMasseuses();
  }, [isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      let mainPicUrl = null;
      let additionalPicUrls = [];

      // Handle main picture upload with progress
      if (formData.mainPicture instanceof File) {
        const storageRef = ref(storage, `masseuses/${formData.name}/${formData.mainPicture.name}`);
        const uploadTask = uploadBytesResumable(storageRef, formData.mainPicture);
        
        await new Promise((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setUploadProgress(progress);
            },
            (error) => reject(error),
            async () => {
              mainPicUrl = await getDownloadURL(uploadTask.snapshot.ref);
              resolve();
            }
          );
        });
      }

      // Handle additional pictures upload with progress
      if (formData.additionalPictures?.length) {
        const totalFiles = formData.additionalPictures.length;
        let completedFiles = 0;

        for (const pic of formData.additionalPictures) {
          if (pic instanceof File) {
            const storageRef = ref(storage, `masseuses/${formData.name}/${pic.name}`);
            const uploadTask = uploadBytesResumable(storageRef, pic);

            await new Promise((resolve, reject) => {
              uploadTask.on(
                'state_changed',
                (snapshot) => {
                  const fileProgress = (snapshot.bytesTransferred / snapshot.totalBytes);
                  const totalProgress = ((completedFiles + fileProgress) / totalFiles) * 100;
                  setUploadProgress(totalProgress);
                },
                (error) => reject(error),
                async () => {
                  const url = await getDownloadURL(uploadTask.snapshot.ref);
                  additionalPicUrls.push(url);
                  completedFiles++;
                  resolve();
                }
              );
            });
          } else {
            // If it's an existing URL, keep it
            additionalPicUrls.push(pic);
            completedFiles++;
            setUploadProgress((completedFiles / totalFiles) * 100);
          }
        }
      }

      // Create the custom URL-friendly ID
      const last3Digits = formData.phone.slice(-3);
      const nameForUrl = formData.name
        .toLowerCase()
        .replace(/ /g, '_')
        .replace(/[^a-z0-9_]/g, '');
      const customId = `${nameForUrl}_${last3Digits}`;

      // Prepare the data to save
      const dataToSave = {
        name: formData.name,
        slogan: formData.slogan,
        location: formData.location,
        phone: formData.phone,
        introduction: formData.introduction,
        instagram: formData.instagram,
        twitter: formData.twitter,
        onlyfans: formData.onlyfans,
        mainPicture: mainPicUrl || formData.mainPicture,
        additionalPictures: additionalPicUrls.length ? additionalPicUrls : formData.additionalPictures,
        prices: formData.prices,
        currency: formData.currency,
        services: services,
        metaDescription: formData.metaDescription,
        keywords: formData.keywords,
        updatedAt: new Date()
      };

      if (!editingId) {
        dataToSave.createdAt = new Date();
      }

      // Save to Firestore
      const docRef = doc(db, 'masseuse', customId);
      await setDoc(docRef, dataToSave);

      // Reset form and states
      setFormData({
        name: '',
        slogan: '',
        location: '',
        phone: '',
        introduction: '',
        instagram: '',
        twitter: '',
        onlyfans: '',
        mainPicture: null,
        additionalPictures: [],
        prices: {
          thirtyMin: 50,
          sixtyMin: 80,
          ninetyMin: 110
        },
        currency: 'GBP',
        metaDescription: '',
        keywords: []
      });
      setServices([{ description: '' }]);
      setEditingId(null);
      setMainImagePreview(null);
      setAdditionalImagePreviews([]);

      toast.success('Masseuse saved successfully!');

    } catch (error) {
      console.error('Error saving masseuse:', error);
      toast.error(`Error saving masseuse: ${error.message}`);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleServiceChange = (index, value) => {
    const newServices = [...services];
    newServices[index].description = value;
    setServices(newServices);
  };

  const addService = () => {
    setServices([...services, { description: '' }]);
  };

  const removeService = (index) => {
    const newServices = services.filter((_, i) => i !== index);
    setServices(newServices);
  };

  const handleFileChange = (e, type) => {
    if (type === 'main') {
      const file = e.target.files[0];
      if (file) {
        setFormData(prev => ({
          ...prev,
          mainPicture: file
        }));
        setMainImagePreview(URL.createObjectURL(file));
      }
    } else {
      const files = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        additionalPictures: [...prev.additionalPictures, ...files]
      }));
      
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setAdditionalImagePreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/[^\d+]/g, '');
    setFormData(prev => ({ ...prev, phone: value }));
  };

  const fillWithTestData = () => {
    // Keep existing random selection helpers and arrays
    const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const getRandomPhone = () => `+44${Math.floor(Math.random() * 10000000000)}`;
    
    const names = ['Sophie', 'Emma', 'Isabella', 'Olivia', 'Charlotte', 'Luna', 'Victoria', 'Zara'];
    const locations = ['London', 'Manchester', 'Birmingham', 'Leeds', 'Liverpool', 'Bristol', 'Edinburgh'];
    const slogans = [
      'Your relaxation journey begins here',
      'Experience pure bliss',
      'Luxury massage therapy',
      'Unwind and rejuvenate',
      'Professional massage services'
    ];
    const introductions = [
      'Professional massage therapist with over 5 years of experience. Specializing in Swedish and deep tissue massage.',
      'Certified therapist offering a blend of Eastern and Western massage techniques for ultimate relaxation.',
      'Experienced in various massage modalities, dedicated to providing a peaceful and rejuvenating experience.',
    ];

    // Add sample meta descriptions
    const metaDescriptions = [
      'Professional massage therapy services in {location}. Specializing in relaxation and therapeutic massage treatments.',
      'Experienced massage therapist offering luxury treatments in {location}. Book your relaxation session today.',
      'Discover ultimate relaxation with professional massage services in {location}. Swedish, deep tissue, and more.',
    ];

    // Add sample keywords
    const sampleKeywords = [
      'massage therapy',
      'relaxation massage',
      'professional massage',
      'therapeutic massage',
      'swedish massage',
      'deep tissue massage',
      'spa services',
      'wellness therapy',
      'body treatments'
    ];

    // Get random location first as we'll use it in meta description
    const randomLocation = getRandomItem(locations);
    
    // Get random meta description and replace {location} placeholder
    const metaDescription = getRandomItem(metaDescriptions).replace('{location}', randomLocation);
    
    // Get 3-5 random keywords
    const numberOfKeywords = Math.floor(Math.random() * 3) + 3; // Random number between 3-5
    const randomKeywords = [...sampleKeywords]
      .sort(() => 0.5 - Math.random())
      .slice(0, numberOfKeywords);

    // Set form data with all fields including new meta fields
    setFormData({
      name: getRandomItem(names),
      slogan: getRandomItem(slogans),
      location: randomLocation,
      phone: getRandomPhone(),
      introduction: getRandomItem(introductions),
      instagram: '@massage_therapy',
      twitter: '@massage_pro',
      onlyfans: 'massage_therapy',
      mainPicture: null,
      additionalPictures: [],
      prices: {
        thirtyMin: Math.floor(Math.random() * 50) + 50,
        sixtyMin: Math.floor(Math.random() * 50) + 80,
        ninetyMin: Math.floor(Math.random() * 50) + 110
      },
      currency: 'GBP',
      metaDescription: metaDescription,
      keywords: randomKeywords
    });

    // Keep existing services setup
    const numberOfServices = Math.floor(Math.random() * 3) + 3;
    const randomServices = Array.from({ length: numberOfServices }, () => ({
      description: getRandomItem(sampleServices)
    }));
    setServices(randomServices);
  };

  const handleDelete = async (masseuse) => {
    if (!window.confirm(`Are you sure you want to delete ${masseuse.name}?`)) {
      return;
    }

    try {
      // Delete main picture from storage if it exists
      if (masseuse.mainPicture) {
        const mainPicRef = ref(storage, masseuse.mainPicture);
        await deleteObject(mainPicRef).catch(error => console.log('Error deleting main picture:', error));
      }

      // Delete additional pictures from storage if they exist
      if (masseuse.additionalPictures && masseuse.additionalPictures.length > 0) {
        for (const picUrl of masseuse.additionalPictures) {
          const picRef = ref(storage, picUrl);
          await deleteObject(picRef).catch(error => console.log('Error deleting additional picture:', error));
        }
      }

      // Delete the Firestore document
      await deleteDoc(doc(db, "masseuse", masseuse.id));
      
      // Update the local state
      setMasseuses(prev => prev.filter(m => m.id !== masseuse.id));
      
      toast.success('Masseuse deleted successfully!');
    } catch (error) {
      console.error('Error deleting masseuse:', error);
      toast.error(`Error deleting masseuse: ${error.message}`);
    }
  };

  const handleBulkDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete ${selectedItems.length} items?`)) {
      return;
    }

    try {
      for (const id of selectedItems) {
        const masseuse = masseuses.find(m => m.id === id);
        if (masseuse) {
          await handleDelete(masseuse);
        }
      }
      setSelectedItems([]);
    } catch (error) {
      console.error('Error in bulk delete:', error);
      toast.error(`Error in bulk delete: ${error.message}`);
    }
  };

  const handleSiteConfigSubmit = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, 'siteConfig', 'main'), {
        ...siteConfig,
        updatedAt: new Date().toISOString()
      });
      toast.success('Site configuration updated successfully!');
    } catch (error) {
      console.error('Error updating site configuration:', error);
      toast.error(`Error updating site configuration: ${error.message}`);
    }
  };

  // Add this useEffect after your other useEffects
  useEffect(() => {
    const fetchSiteConfig = async () => {
      if (!isAuthenticated) return;
      
      try {
        const docSnap = await getDoc(doc(db, 'siteConfig', 'main'));
        if (docSnap.exists()) {
          const data = docSnap.data();
          setSiteConfig(data);
        }
      } catch (error) {
        console.error('Error fetching site configuration:', error);
      }
    };

    fetchSiteConfig();
  }, [isAuthenticated]);

  const handleEdit = async (masseuse) => {
    // Set form data while preserving existing image URLs
    setFormData({
      ...masseuse,
      // Keep the existing image URLs instead of setting to null
      mainPicture: masseuse.mainPicture || null,
      additionalPictures: masseuse.additionalPictures || [],
      prices: masseuse.prices || {
        thirtyMin: 50,
        sixtyMin: 80,
        ninetyMin: 110
      },
      metaDescription: masseuse.metaDescription || '',
      keywords: masseuse.keywords || []
    });
    
    // Set image previews using existing URLs
    if (masseuse.mainPicture) {
      setMainImagePreview(masseuse.mainPicture);
    }
    if (masseuse.additionalPictures && masseuse.additionalPictures.length > 0) {
      setAdditionalImagePreviews(masseuse.additionalPictures);
    }
    
    setServices(masseuse.services || [{ description: '' }]);
    setEditingId(masseuse.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleKeywordInput = (e) => {
    if (e.key === ',' || e.key === 'Enter') {
      e.preventDefault();
      const keyword = keywordInput.trim();
      if (keyword && !formData.keywords.includes(keyword)) {
        setFormData(prev => ({
          ...prev,
          keywords: [...prev.keywords, keyword]
        }));
      }
      setKeywordInput('');
    }
  };

  const removeKeyword = (keywordToRemove) => {
    setFormData(prev => ({
      ...prev,
      keywords: prev.keywords.filter(keyword => keyword !== keywordToRemove)
    }));
  };

  const removeMainImage = () => {
    setFormData(prev => ({ ...prev, mainPicture: null }));
    setMainImagePreview(null);
  };

  const removeAdditionalImage = (index) => {
    setFormData(prev => ({
      ...prev,
      additionalPictures: prev.additionalPictures.filter((_, i) => i !== index)
    }));
    setAdditionalImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleDownloadAllPhotos = async (masseuse) => {
    const loadingToast = toast.loading('Downloading images...');
    
    try {
      let successCount = 0;
      let totalFiles = 0;

      // Count total files
      if (masseuse.mainPicture) totalFiles++;
      if (masseuse.additionalPictures) totalFiles += masseuse.additionalPictures.length;

      // Download main picture
      if (masseuse.mainPicture) {
        try {
          const extension = getFileExtensionFromUrl(masseuse.mainPicture);
          const mainFileName = `${masseuse.name}_main${extension}`;
          await downloadImage(masseuse.mainPicture, mainFileName);
          successCount++;
        } catch (error) {
          console.error('Error downloading main picture:', error);
        }
      }

      // Download additional pictures
      if (masseuse.additionalPictures?.length > 0) {
        for (let i = 0; i < masseuse.additionalPictures.length; i++) {
          try {
            const url = masseuse.additionalPictures[i];
            const extension = getFileExtensionFromUrl(url);
            const fileName = `${masseuse.name}_additional_${i + 1}${extension}`;
            await downloadImage(url, fileName);
            successCount++;
          } catch (error) {
            console.error(`Error downloading additional picture ${i + 1}:`, error);
          }
        }
      }

      // Update toast based on success
      if (successCount === totalFiles) {
        toast.success('All images downloaded successfully!', { id: loadingToast });
      } else {
        toast.error(`Downloaded ${successCount}/${totalFiles} images`, { id: loadingToast });
      }

    } catch (error) {
      console.error('Error in download process:', error);
      toast.error('Error downloading images', { id: loadingToast });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-4xl mx-auto mt-10 p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Admin Access Required</h2>
          <button
            onClick={handleSignIn}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Sign in with Google
          </button>
          {authError && (
            <div className="mt-4 text-red-600">
              Error: {authError}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Form Container */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-6">Add/Edit Masseuse</h2>
          
          {/* Test Data Button */}
          <div className="flex justify-end mb-4">
            <button
              type="button"
              onClick={fillWithTestData}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
            >
              Fill with Test Data
            </button>
          </div>
          
          {/* Main Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Slogan</label>
                <input
                  type="text"
                  name="slogan"
                  value={formData.slogan}
                  onChange={(e) => setFormData(prev => ({ ...prev, slogan: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            {/* Location and Phone */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  placeholder="+44 XXXX XXXXXX"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            {/* Introduction - back to textarea */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Introduction</label>
              <textarea
                value={formData.introduction}
                onChange={(e) => setFormData(prev => ({ ...prev, introduction: e.target.value }))}
                rows="4"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter your introduction..."
              />
            </div>

            {/* Services */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Services</label>
              {services.map((service, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={service.description}
                    onChange={(e) => handleServiceChange(index, e.target.value)}
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Service description"
                  />
                  <button
                    type="button"
                    onClick={() => removeService(index)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addService}
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Add Service
              </button>
            </div>

            {/* Social Media */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Instagram</label>
                <input
                  type="text"
                  name="instagram"
                  value={formData.instagram}
                  onChange={(e) => setFormData(prev => ({ ...prev, instagram: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Twitter</label>
                <input
                  type="text"
                  name="twitter"
                  value={formData.twitter}
                  onChange={(e) => setFormData(prev => ({ ...prev, twitter: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">OnlyFans</label>
                <input
                  type="text"
                  name="onlyfans"
                  value={formData.onlyfans}
                  onChange={(e) => setFormData(prev => ({ ...prev, onlyfans: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Images */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Main Picture</label>
                <div className="mt-1 flex items-center space-x-4">
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, 'main')}
                    accept="image/*"
                    className="hidden"
                    id="mainPicture"
                  />
                  <label
                    htmlFor="mainPicture"
                    className="cursor-pointer bg-white px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Choose File
                  </label>
                  
                  {mainImagePreview && (
                    <div className="relative w-24 h-32">
                      <img
                        src={mainImagePreview}
                        alt="Main preview"
                        className="w-full h-full object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={removeMainImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Additional Pictures</label>
                <div className="mt-1">
                  <input
                    type="file"
                    multiple
                    onChange={(e) => handleFileChange(e, 'additional')}
                    accept="image/*"
                    className="hidden"
                    id="additionalPictures"
                  />
                  <label
                    htmlFor="additionalPictures"
                    className="cursor-pointer bg-white px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Add Pictures
                  </label>
                </div>
                
                {additionalImagePreviews.length > 0 && (
                  <div className="mt-4 grid grid-cols-4 gap-4">
                    {additionalImagePreviews.map((preview, index) => (
                      <div key={index} className="relative w-full aspect-[3/4]">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() => removeAdditionalImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Prices Section */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">Prices</label>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-600">30 Minutes</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">£</span>
                    </div>
                    <input
                      type="number"
                      value={formData.prices?.thirtyMin || ''}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        prices: {
                          ...prev.prices,
                          thirtyMin: Number(e.target.value)
                        }
                      }))}
                      className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600">60 Minutes</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">£</span>
                    </div>
                    <input
                      type="number"
                      value={formData.prices?.sixtyMin || ''}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        prices: {
                          ...prev.prices,
                          sixtyMin: Number(e.target.value)
                        }
                      }))}
                      className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600">90 Minutes</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">£</span>
                    </div>
                    <input
                      type="number"
                      value={formData.prices?.ninetyMin || ''}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        prices: {
                          ...prev.prices,
                          ninetyMin: Number(e.target.value)
                        }
                      }))}
                      className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Meta Information */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Meta Description</label>
                <textarea
                  value={formData.metaDescription}
                  onChange={(e) => setFormData(prev => ({ ...prev, metaDescription: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  rows="3"
                  placeholder="Enter SEO meta description..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Keywords</label>
                <div className="mt-1 flex flex-wrap gap-2 p-2 border rounded-md">
                  {formData.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-md flex items-center gap-1"
                    >
                      {keyword}
                      <button
                        type="button"
                        onClick={() => removeKeyword(keyword)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyDown={handleKeywordInput}
                    className="flex-1 min-w-[200px] outline-none border-none"
                    placeholder="Type and press comma or enter to add keywords..."
                  />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={isUploading}
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed relative"
              >
                {isUploading ? (
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-full h-2 bg-white/20 rounded-full">
                      <div 
                        className="h-full bg-white transition-all duration-300 ease-out rounded-full"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <span className="text-sm">
                      Uploading... {Math.round(uploadProgress)}%
                    </span>
                  </div>
                ) : (
                  <span>
                    {editingId ? 'Update Masseuse' : 'Add Masseuse'}
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Site Config Container */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-6">Site Configuration</h2>
          <form onSubmit={handleSiteConfigSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Site Name</label>
                <input
                  type="text"
                  value={siteConfig.siteName}
                  onChange={(e) => setSiteConfig(prev => ({ ...prev, siteName: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Page Title</label>
                <input
                  type="text"
                  value={siteConfig.pageTitle}
                  onChange={(e) => setSiteConfig(prev => ({ ...prev, pageTitle: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Page Subtitle</label>
              <input
                type="text"
                value={siteConfig.pageSubtitle}
                onChange={(e) => setSiteConfig(prev => ({ ...prev, pageSubtitle: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Meta Description</label>
              <textarea
                value={siteConfig.metaDescription}
                onChange={(e) => setSiteConfig(prev => ({ ...prev, metaDescription: e.target.value }))}
                rows="2"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Meta Keywords</label>
              <input
                type="text"
                value={siteConfig.metaKeywords}
                onChange={(e) => setSiteConfig(prev => ({ ...prev, metaKeywords: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Comma-separated keywords"
              />
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Disclaimer</label>
                <div className="mt-1">
                  <ReactQuill
                    theme="snow"
                    value={siteConfig.disclaimer}
                    onChange={(content) => setSiteConfig(prev => ({ ...prev, disclaimer: content }))}
                    className="bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Terms of Use</label>
                <div className="mt-1">
                  <ReactQuill
                    theme="snow"
                    value={siteConfig.termsOfUse}
                    onChange={(content) => setSiteConfig(prev => ({ ...prev, termsOfUse: content }))}
                    className="bg-white"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Update Site Configuration
            </button>
          </form>
        </div>

        {/* Masseuses Table Container */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Existing Masseuses</h2>
            {selectedItems.length > 0 && (
              <div className="space-x-4">
                <button
                  onClick={handleBulkDelete}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                >
                  Delete Selected ({selectedItems.length})
                </button>
                <button
                  onClick={handleBulkDownloadPhotos}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                  Download Photos ({selectedItems.length})
                </button>
              </div>
            )}
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedItems(masseuses.map(m => m.id));
                        } else {
                          setSelectedItems([]);
                        }
                      }}
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {masseuses.map((masseuse) => (
                  <tr key={masseuse.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(masseuse.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedItems([...selectedItems, masseuse.id]);
                          } else {
                            setSelectedItems(selectedItems.filter(id => id !== masseuse.id));
                          }
                        }}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{masseuse.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{masseuse.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{masseuse.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button 
                        onClick={() => handleEdit(masseuse)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(masseuse)}
                        className="text-red-600 hover:text-red-900 mr-4"
                      >
                        Delete
                      </button>
                      <button 
                        onClick={() => handleDownloadAllPhotos(masseuse)}
                        className="text-green-600 hover:text-green-900"
                        title="Download all photos"
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-5 w-5 inline" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" 
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin; 