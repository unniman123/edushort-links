import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function ArticleRedirect() {
  const router = useRouter();
  const { id } = router.query;
  const [redirecting, setRedirecting] = useState(true);

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
      window.location.href = playStoreUrl;
      setRedirecting(false);
    };

    // Detect browser and platform
    const ua = navigator.userAgent || '';
    const isAndroid = /android/i.test(ua);
    const isChrome = /chrome|chromium|crios/i.test(ua);
    const isSamsung = /samsung/i.test(ua);
    const isFirefox = /firefox|fxios/i.test(ua);

    // Try multiple approaches for maximum compatibility
    if (isAndroid) {
      // Create an iframe for better handling in some browsers
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);

      // Try multiple URI schemes
      try {
        // 1. First try the intent URL for Chrome (most reliable)
        if (isChrome || isSamsung) {
          // Use Android intent URL format with multiple fallbacks
          const intentUrl = `intent://article/${id}#Intent;` +
            `scheme=${appScheme};` +
            `package=${appPackageName};` +
            `S.browser_fallback_url=${encodeURIComponent(playStoreUrl)};` +
            `end`;
          window.location.href = intentUrl;
        }
        // 2. For Firefox and others, try direct scheme
        else {
          // Try the app scheme directly
          iframe.contentWindow.location.href = `${appScheme}://article/${id}`;
          // Also try as a backup
          window.location.href = `${appScheme}://article/${id}`;
        }
      } catch (e) {
        console.error('Error during deep link attempt:', e);
      }

      // Set a fallback timeout to redirect to Play Store if app doesn't open
      const timeout = setTimeout(() => {
        // Remove the iframe after timeout
        if (iframe && iframe.parentNode) {
          iframe.parentNode.removeChild(iframe);
        }
        redirectToPlayStore();
      }, appOpenTimeout);

      return () => {
        clearTimeout(timeout);
        // Clean up iframe if component unmounts
        if (iframe && iframe.parentNode) {
          iframe.parentNode.removeChild(iframe);
        }
      };
    } else {
      // For non-Android devices, just use the standard URL scheme approach
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

        {/* App link meta tags */}
        <meta property="al:android:package" content={appPackageName} />
        <meta property="al:android:url" content={`${appScheme}://article/${id}`} />
        <meta property="al:android:app_name" content="Edushorts" />
        <meta property="al:web:url" content={playStoreUrl} />

        {/* For Twitter */}
        <meta name="twitter:app:name:googleplay" content="Edushorts" />
        <meta name="twitter:app:id:googleplay" content={appPackageName} />
        <meta name="twitter:app:url:googleplay" content={`${appScheme}://article/${id}`} />
      </Head>

      <img
        src="/logo.png"
        alt="Edushorts Logo"
        style={{ width: '80px', height: '80px', marginBottom: '20px' }}
      />

      <h1 style={{ margin: '0 0 10px 0', color: '#4285F4' }}>Edushorts</h1>

      {redirecting ? (
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
        </>
      ) : (
        <p style={{ margin: '0 0 20px 0', color: '#666' }}>
          Redirecting to Play Store...
        </p>
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