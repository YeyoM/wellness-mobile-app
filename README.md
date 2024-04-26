<br />
<div align="center">
  <a href="https://github.com/YeyoM/lofi_code">
    <img src="assets/icon.png" alt="Logo" width="90" height="90">
  </a>
<h3 align="center">Wellness</h3>
  <br />
  <br />
</div>

## About the project

Welcome to Wellness, where health isn't just a goal—it's a way of life. This mobile app is your perfect gym companion, designed for everyone, from beginners taking their first steps to fitness pros pushing their limits. Crafted with React Native, Expo, and Firebase, Wellness is more than an app; it's a commitment to your well-being. Unfurtunately, the app is not available on the App Store or Google Play Store yet but soon it will be.

[![Product Name Screen Shot][product-screenshot]]()

Wellness isn't just about surviving; it's about thriving by practicing healthy habits daily. It's the synergy of physical, mental, and social well-being, forming the pillars of the Health Triangle. The Wellness app is your guide to achieving and tracking this holistic wellness journey.

#### Key Features

- Comprehensive Wellness Tracking: Monitor and track your physical and mental health with user-friendly interfaces that adapt to your fitness level.
- Personalized Workouts: Whether you're a fitness rookie or a seasoned pro, Wellness offers personalized workout plans tailored to your goals.
- Firebase Integration: Seamless data storage and retrieval with Firebase, ensuring your wellness journey is always backed up and accessible.

#### Future Vision - AI and ML Integration

Our journey doesn't end here. The Wellness app is set to evolve with the integration of Artificial Intelligence (AI) and Machine Learning (ML). Imagine having a virtual fitness coach powered by AI, analyzing your progress, adapting your workout plans, and offering insights to enhance your gains. The future of wellness is smart, adaptive, and tailored just for you.

## Tech Stack

- Languages: JavaScript
- Tools: Git, GitHub, Firebase, FIrestore, Expo
- Frameworks: React Native

## Requirements

To execute the app locally you need to have installed node and npm on your computer. If you have already installed them on your computer the next step is to clone the repository on on your computer and install the dependencies using

```
npm install
```

## Available Scripts

If Yarn was installed when the project was initialized, then dependencies will have been installed via Yarn, and you should probably use it to run these commands as well. Unlike dependency installation, command running syntax is identical for Yarn and NPM at the time of this writing.

### `npm start`

Runs your app in development mode.

Open it in the [Expo app](https://expo.io) on your phone to view it. It will reload if you save edits to your files, and you will see build errors and logs in the terminal.

Sometimes you may need to reset or clear the React Native packager's cache. To do so, you can pass the `--reset-cache` flag to the start script:

```
npm start --reset-cache
# or
yarn start --reset-cache
```

Once you run this command, in your terminal there should appear a couple options, for example to run it on a mobile device, to achieve this, just download the Expo Go app in your device and scan the qr code displayed when running the above command.

#### `npm run ios`

Like `npm start`, but also attempts to open your app in the iOS Simulator if you're on a Mac and have it installed.

#### `npm run android`

Like `npm start`, but also attempts to open your app on a connected Android device or emulator. Requires an installation of Android build tools (see [React Native docs](https://facebook.github.io/react-native/docs/getting-started.html) for detailed setup). We also recommend installing Genymotion as your Android emulator. Once you've finished setting up the native build environment, there are two options for making the right copy of `adb` available to Create React Native App:

##### Using Android Studio's `adb`

1. Make sure that you can run adb from your terminal.
2. Open Genymotion and navigate to `Settings -> ADB`. Select “Use custom Android SDK tools” and update with your [Android SDK directory](https://stackoverflow.com/questions/25176594/android-sdk-location).

### Environment Variables

The environment variables are stored in a file called `.env` in the root of the project. This file is not included in the repository, so you need to create it manually. The file should look like this:

```
WELLNESS_FIREBASE_API_KEY
WELLNESS_FIREBASE_MESSAGE_SENDER_ID
WELLNESS_FIREBASE_APP_ID
WELLNESS_FIREBASE_MEASUREMENT_ID
WELLNESS_NINJA_API_KEY
WELLNESS_UNSPLASH_API_KEY
CROWDMETER_API_KEY
```

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[product-screenshot]: assets/wellnessMockups.png
