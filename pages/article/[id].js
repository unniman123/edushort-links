import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function ArticleRedirect() {
  const router = useRouter();
  const { id } = router.query;
  const [status, setStatus] = useState('initializing'); // 'initializing', 'opening-app', 'redirecting-store', 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const iframeRef = useRef(null);

  // Get values from environment variables
  const appPackageName = process.env.NEXT_PUBLIC_APP_PACKAGE_NAME || 'com.ajilkojilgokulravi.unniman';
  const playStoreUrl = process.env.NEXT_PUBLIC_PLAY_STORE_URL || 'https://play.google.com/store/apps/details?id=com.ajilkojilgokulravi.unniman';
  const appScheme = process.env.NEXT_PUBLIC_APP_SCHEME || 'edushort';
  const appOpenTimeout = parseInt(process.env.NEXT_PUBLIC_APP_OPEN_TIMEOUT || '1500', 10);

  useEffect(() => {
    // Only proceed if we have an article ID from the URL
    if (!id) return;

    // Function to handle redirection to Play Store
    const redirectToPlayStore = () => {
      setStatus('redirecting-store');
      window.location.href = playStoreUrl;
    };

    // Detect browser and platform with more detailed detection
    const ua = navigator.userAgent || '';
    const isAndroid = /android/i.test(ua);
    const isChrome = /chrome|chromium|crios/i.test(ua);
    const isSamsung = /samsung/i.test(ua);
    const isFirefox = /firefox|fxios/i.test(ua);
    const isOpera = /opr\//i.test(ua);
    const isUCBrowser = /ucbrowser/i.test(ua);
    const isEdge = /edg/i.test(ua);

    // Log device info for debugging
    console.log(`Device: ${isAndroid ? 'Android' : 'Non-Android'}, Browser: ${isChrome ? 'Chrome' :
      isSamsung ? 'Samsung' :
        isFirefox ? 'Firefox' :
          isOpera ? 'Opera' :
            isUCBrowser ? 'UC Browser' :
              isEdge ? 'Edge' :
                'Other'
      }`);

    // Set status to opening app
    setStatus('opening-app');

    // Try multiple approaches for maximum compatibility
    if (isAndroid) {
      // Create an iframe for better handling in some browsers
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframeRef.current = iframe;
      document.body.appendChild(iframe);

      // Try multiple URI schemes
      try {
        // 1. First try the intent URL for Chrome and Samsung (most reliable)
        if (isChrome || isSamsung || isEdge) {
          // Enhanced intent URL with more parameters
          const intentUrl = `intent://article/${id}#Intent;` +
            `scheme=${appScheme};` +
            `package=${appPackageName};` +
            `S.browser_fallback_url=${encodeURIComponent(playStoreUrl)};` +
            `S.market_referrer=utm_source%3Dedushortlinks%26utm_medium%3Dweblink%26utm_campaign%3Darticle_${id};` +
            `action=android.intent.action.VIEW;` +
            `category=android.intent.category.BROWSABLE;` +
            `end`;

          console.log('Using intent URL:', intentUrl);
          window.location.href = intentUrl;
        }
        // 2. For Firefox, Opera and others, try direct scheme with iframe approach
        else {
          // Try multiple approaches for maximum compatibility
          console.log('Using direct scheme approach');

          // Try the app scheme directly via iframe
          iframe.contentWindow.location.href = `${appScheme}://article/${id}`;

          // Also try direct approach as backup
          setTimeout(() => {
            window.location.href = `${appScheme}://article/${id}`;
          }, 100);

          // For UC Browser, try a different approach
          if (isUCBrowser) {
            setTimeout(() => {
              document.location.href = `${appScheme}://article/${id}`;
            }, 250);
          }
        }
      } catch (e) {
        console.error('Error during deep link attempt:', e);
        setErrorMessage(`Error: ${e.message}`);
      }

      // Set a fallback timeout to redirect to Play Store if app doesn't open
      const timeout = setTimeout(() => {
        // Remove the iframe after timeout
        if (iframe && iframe.parentNode) {
          iframe.parentNode.removeChild(iframe);
          iframeRef.current = null;
        }
        redirectToPlayStore();
      }, appOpenTimeout);

      return () => {
        clearTimeout(timeout);
        // Clean up iframe if component unmounts
        if (iframe && iframe.parentNode) {
          iframe.parentNode.removeChild(iframe);
          iframeRef.current = null;
        }
      };
    } else {
      // For non-Android devices, use the standard URL scheme approach
      console.log('Non-Android device detected, using standard URL scheme');
      const appUrl = `${appScheme}://article/${id}`;
      window.location.href = appUrl;

      // Set a timeout to redirect to Play Store if app doesn't open
      const timeout = setTimeout(redirectToPlayStore, appOpenTimeout);
      return () => clearTimeout(timeout);
    }
  }, [id, appPackageName, playStoreUrl, appScheme, appOpenTimeout]);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      flexDirection: 'column',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      padding: '20px'
    }}>
      <Head>
        <title>Opening Edushorts...</title>
        <meta name="robots" content="noindex" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Prevent caching to ensure fresh redirects */}
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />

        {/* Enhanced App link meta tags */}
        <meta property="al:android:package" content={appPackageName} />
        <meta property="al:android:url" content={`${appScheme}://article/${id}`} />
        <meta property="al:android:app_name" content="Edushorts" />
        <meta property="al:web:url" content={playStoreUrl} />

        {/* For Twitter */}
        <meta name="twitter:app:name:googleplay" content="Edushorts" />
        <meta name="twitter:app:id:googleplay" content={appPackageName} />
        <meta name="twitter:app:url:googleplay" content={`${appScheme}://article/${id}`} />

        {/* For Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content="View in Edushorts App" />
        <meta property="og:description" content="Open this article in the Edushorts app for the best experience" />
        <meta property="og:url" content={`https://edushortlinks.netlify.app/article/${id}`} />

        {/* Additional app-specific meta tags */}
        <meta name="apple-itunes-app" content={`app-id=123456789, app-argument=${appScheme}://article/${id}`} />
        <meta name="google-play-app" content={`app-id=${appPackageName}`} />
        <meta name="msApplication-PackageFamilyName" content="Edushorts" />
        <meta name="msApplication-ID" content={appPackageName} />
      </Head>

      <img
        src="/logo.png"
        alt="Edushorts Logo"
        style={{ width: '80px', height: '80px', marginBottom: '20px' }}
      />

      <h1 style={{ margin: '0 0 10px 0', color: '#4285F4' }}>Edushorts</h1>

      {status === 'initializing' && (
        <>
          <p style={{ margin: '0 0 20px 0', color: '#666' }}>
            Initializing...
          </p>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #4285F4',
            borderRadius: '50%'
          }} className="spinner" />
        </>
      )}

      {status === 'opening-app' && (
        <>
          <p style={{ margin: '0 0 20px 0', color: '#666' }}>
            Opening article in Edushorts app...
          </p>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #4285F4',
            borderRadius: '50%'
          }} className="spinner" />
          <p style={{ fontSize: '0.8rem', color: '#999', marginTop: '15px' }}>
            If the app doesn't open automatically,
            <br />you may need to install it first.
          </p>
        </>
      )}

      {status === 'redirecting-store' && (
        <>
          <p style={{ margin: '0 0 20px 0', color: '#666' }}>
            Redirecting to Play Store...
          </p>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #34A853',
            borderRadius: '50%'
          }} className="spinner" />
        </>
      )}

      {status === 'error' && (
        <>
          <p style={{ margin: '0 0 10px 0', color: '#DB4437' }}>
            Something went wrong
          </p>
          <p style={{ margin: '0 0 20px 0', color: '#666', fontSize: '0.9rem' }}>
            {errorMessage || 'Unable to open the app'}
          </p>
          <button
            onClick={() => window.location.href = playStoreUrl}
            style={{
              backgroundColor: '#4285F4',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 24px',
              fontSize: '1rem',
              cursor: 'pointer',
            }}
          >
            Download Edushorts App
          </button>
        </>
      )}

      <style jsx>{`
        .spinner {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}