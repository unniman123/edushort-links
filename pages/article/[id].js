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

    // Try to detect if we're in Chrome on Android for better intent handling
    const isAndroidChrome = /android/i.test(navigator.userAgent) && /chrome/i.test(navigator.userAgent);

    if (isAndroidChrome) {
      // Use Android intent URL format for Chrome (better handling)
      const intentUrl = `intent://article/${id}#Intent;scheme=${appScheme};package=${appPackageName};S.browser_fallback_url=${encodeURIComponent(playStoreUrl)};end`;
      window.location.href = intentUrl;

      // Still set a fallback timeout in case the intent doesn't work
      const timeout = setTimeout(redirectToPlayStore, appOpenTimeout);
      return () => clearTimeout(timeout);
    } else {
      // For other browsers, use the standard URL scheme approach
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