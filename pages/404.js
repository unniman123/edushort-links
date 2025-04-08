import Head from 'next/head';
import Link from 'next/link';

export default function Custom404() {
  // Get Play Store URL from environment variables
  const playStoreUrl = process.env.NEXT_PUBLIC_PLAY_STORE_URL || 'https://play.google.com/store/apps/details?id=com.ajilkojilgokulravi.unniman';

  // Function to redirect to Play Store
  const goToPlayStore = () => {
    window.location.href = playStoreUrl;
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
    }}>
      <Head>
        <title>Page Not Found - Edushorts</title>
        <meta name="robots" content="noindex" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <main style={{
        maxWidth: '500px',
        width: '100%',
      }}>
        <div style={{
          marginBottom: '30px',
        }}>
          <img
            src="/logo.png"
            alt="Edushorts Logo"
            style={{
              width: '80px',
              height: '80px',
              marginBottom: '20px',
            }}
          />
          <h1 style={{
            fontSize: '2rem',
            fontWeight: '600',
            color: '#4285F4', // Replace with your brand color
            margin: '0 0 15px 0',
          }}>
            Page Not Found
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: '#666',
            margin: '0 0 30px 0',
            lineHeight: '1.5',
          }}>
            The page you're looking for doesn't exist or the link may be broken.
          </p>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
        }}>
          <Link href="/" passHref>
            <a style={{
              color: '#4285F4', // Replace with your brand color
              textDecoration: 'none',
              fontSize: '1rem',
            }}>
              Go to Homepage
            </a>
          </Link>

          <button
            onClick={goToPlayStore}
            style={{
              backgroundColor: '#4285F4', // Replace with your brand color
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 25px',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color 0.2s',
              marginTop: '10px',
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#3367d6'} // Darker shade on hover
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4285F4'} // Back to original on mouse out
          >
            Download Edushorts App
          </button>
        </div>
      </main>

      <footer style={{
        marginTop: 'auto',
        padding: '20px 0',
        color: '#666',
        fontSize: '0.9rem',
      }}>
        <p>© {new Date().getFullYear()} Edushorts. All rights reserved.</p>
      </footer>
    </div>
  );
}