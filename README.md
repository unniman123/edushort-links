# Edushort Links

A microsite for handling deep links to the Edushort mobile app. This site serves as a bridge between shared links and the app, redirecting users to either open the article in the app (if installed) or download the app from the Play Store (if not installed).

## Features

- Handles deep links to articles in the Edushort app
- Redirects users without the app to the Play Store
- Simple, lightweight implementation with minimal dependencies
- Properly configured for Android App Links

## Setup

### Prerequisites

- Node.js 16 or higher
- npm or yarn
- A Netlify account for deployment

### Local Development

1. Clone this repository
2. Copy `.env.local.example` to `.env.local`
3. Install dependencies:


4. Start the development server:

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Environment Variables

The following environment variables are required:

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `NEXT_PUBLIC_APP_PACKAGE_NAME`: Your Android app package name
- `NEXT_PUBLIC_PLAY_STORE_URL`: Your app's Play Store URL
- `NEXT_PUBLIC_APP_SCHEME`: Your app's URL scheme (e.g., `edushort`)

### Deployment

This site is designed to be deployed to Netlify:

1. Push your code to a Git repository
2. Connect the repository to Netlify
3. Configure the environment variables in Netlify's dashboard
4. Deploy the site

## Android App Configuration

To make deep linking work with your Android app, you need to:

1. Update your `AndroidManifest.xml` to include intent filters for your domain:
```xml
<intent-filter android:autoVerify="true">
  <action android:name="android.intent.action.VIEW" />
  <category android:name="android.intent.category.DEFAULT" />
  <category android:name="android.intent.category.BROWSABLE" />
  <data android:scheme="https" android:host="your-microsite-domain.com" android:pathPrefix="/article" />
</intent-filter>


const handleShare = async () => {
  const webUrl = `https://your-microsite-domain.com/article/${articleId}`;
  await Share.share({
    message: `Check out this article: ${article.title}\n\n${webUrl}`,
    url: webUrl,
  });
};

