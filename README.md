<a href="https://luehangs.site/lue_hang/projects/react-native-camera-roll-gallery"><img src="https://luehangs.site/images/react-native-camera-roll-gallery-main.jpg" alt="react-native-camera-roll-gallery"/></a>

<a href="https://luehangs.site/marketplace/product/RN%20Posting%20Demo%20App%20Kit"><img src="https://luehangs.site/images/lh-mobile-strip.jpg" alt="LueHsoft LueH LABS Lue Hang luehang"/></a>
<br/>
<br/>

An easy and simple to use React Native component to render a custom layout for CameraRoll 
photos (next update will have videos) and displayed on a custom interactive image viewer for manipulation. Includes animations and support for both iOS and Android. Free and made possible along with costly maintenance and updates by [Lue Hang](https://www.facebook.com/lue.hang) (the author).

Check out the [docs](https://luehangs.site/lue_hang/projects/react-native-camera-roll-gallery) for a complete documentation.

- Choose a custom way to get images or use default CameraRoll getter.
- Optimized for large list rendering of images.
- Swipe up and down to close images with animations to original place. Supports iOS and Android.
- Support for dynamic device rotation.
- Easily and highly customizable.
- Includes guestures and important event listeners for pan, pinch, single tap and double tap.
- Includes zoom mode.
- Easily customizable.
- Intelligent scrolling detection to cushion rough swipe guestures.
- Supports both iOS and Android.

<br/>
<br/>
<br/>

---
<br/>
<br/>
<br/>

<h1 align="center">
    <img src="https://luehangs.site/videos/react-native-camera-roll-gallery-demo.gif" alt="react-native-camera-roll-gallery" />
</h1>

#### :information_source: Learn more about React Native with project examples along with Cyber Security and Ethical Hacking at [LueHsoft](https://www.luehangs.site).

Built with [`react-native-gallery-swiper`](https://npmjs.com/package/react-native-gallery-swiper) & [`react-native-smart-gallery`](https://npmjs.com/package/react-native-smart-gallery).

<br/>
<br/>
<br/>

---
<br/>
<br/>
<br/>

# :open_file_folder: Index

### 1.  [Getting Started](#gem-getting-started)
### 2.  [Example Usage Customization](#tada-example-usage-customization)
### 3.  [Example Usage With Provided CameraRoll](#tada-example-usage-with-provided-cameraroll)
### 4.  [API](#nut_and_bolt-api)
### 5.  :books: [Props](#books-props)
### 6.  [Installation For Provided CameraRoll](#gem-installation-for-provided-cameraroll)
### 7.  [Example Project](#clapper-example-project)
### 8.  [Author](#santa-author)
### 9.  [Contribute](#clap-contribute)
### 10. [License](#page_facing_up-license)

<br/>
<br/>
<br/>

---
<br/>
<br/>
<br/>

## :gem: Getting Started

Type in the following to the command line to install the dependency.

```bash
$ npm install --save react-native-camera-roll-gallery
```

or

```bash
$ yarn add react-native-camera-roll-gallery
```

<br/>
<br/>
<a href="https://luehangs.site/marketplace/product/RN%20Posting%20Demo%20App%20Kit"><img src="https://luehangs.site/images/lh-mobile-strip.jpg" alt="LueHsoft LueH LABS Lue Hang luehang"/></a>
<br/>
<br/>

## :tada: Example Usage Customization

**Version \*4.0.0 update**

> If you like [`react-native-camera-roll-gallery`](https://github.com/Luehang/react-native-camera-roll-gallery), please be sure to give it a star at [GitHub](https://github.com/Luehang/react-native-camera-roll-gallery). Thanks.

```javascript
import CameraRollGallery from "react-native-camera-roll-gallery";

//...
render() {
    return (
        <CameraRollGallery
            enableCameraRoll={false} // default true
            // Get data logic goes here.
            // This will get trigger initially
            // and when it reached the end
            // if there is more.
            onGetData={(fetchParams, resolve) => {
                resolve({
                    assets: [
                        // Can be used with different image object fieldnames.
                        // Ex. source, source.uri, uri, URI, url, URL
                        { uri: "https://luehangs.site/pic-chat-app-images/beautiful-blond-blonde-hair-478544.jpg" },
                        // { source: require("yourApp/image.png"),
                        //     // IMPORTANT: It is REQUIRED for LOCAL IMAGES
                        //     // to include a dimensions field with the
                        //     // actual width and height of the image or
                        //     // it will throw an error.
                        //     dimensions: { width: 1080, height: 1920 } },
                        { source: { uri: "https://luehangs.site/pic-chat-app-images/beautiful-beautiful-women-beauty-40901.jpg" } },
                        { uri: "https://luehangs.site/pic-chat-app-images/animals-avian-beach-760984.jpg" },
                        { URI: "https://luehangs.site/pic-chat-app-images/beautiful-blond-fishnet-stockings-48134.jpg" },
                        { url: "https://luehangs.site/pic-chat-app-images/beautiful-beautiful-woman-beauty-9763.jpg" },
                        { URL: "https://luehangs.site/pic-chat-app-images/attractive-balance-beautiful-186263.jpg" },
                    ],
                    pageInfo: {
                        hasNextPage: false
                    }
                });
            }}
        />
    );
}
//...
```

<br/>
<br/>
<br/>

---
<br/>
<br/>
<br/>

## :tada: Example Usage With Provided CameraRoll

:information_source: Additional installation is required to install additional package and link binaries. Follow the [Installation section](#gem-installation-for-provided-cameraroll).

> If you like [`react-native-camera-roll-gallery`](https://github.com/Luehang/react-native-camera-roll-gallery), please be sure to give it a star at [GitHub](https://github.com/Luehang/react-native-camera-roll-gallery). Thanks.

```javascript
import CameraRollGallery from "react-native-camera-roll-gallery";

//...
render() {
    return (
        <CameraRollGallery />
    );
}
//...
```

<br/>
<br/>
<a href="https://luehangs.site/marketplace/product/RN%20Posting%20Demo%20App%20Kit"><img src="https://luehangs.site/images/lh-mobile-strip.jpg" alt="LueHsoft LueH LABS Lue Hang luehang"/></a>
<br/>
<br/>

## :nut_and_bolt: API

``<CameraRollGallery />`` component accepts the following props...

<br/>

# :books: Props

### :small_blue_diamond: Image Layout Props of ``<CameraRollGallery />``

> If you like [`react-native-image-layout`](https://github.com/Luehang/react-native-image-layout), please be sure to give it a star at [GitHub](https://github.com/Luehang/react-native-image-layout). Thanks.

| Props | Description | Type | Default |
| ----- | ----------- | ---- | ------- |
| `enableCameraRoll`            | Enable the provide default CameraRoll. **Version \*3.0.0 update** | `boolean` | `true` |
| `onGetData`                   | Custom function to render provided images from initial to when reaching the end.  "Get" data logic should go here. `(fetchParams: { itemCount: number, groupTypes: string, assetType: string }, resolve: Function) => { assets: object, pageInfo: { hasNextPage: boolean } }` Find an example at the [example section](#tada-example-usage-customization). **Version \*4.0.0 update** | `Function` | |
| `imagesPerRow`                | Number of images per row. | `number` | 3 |
| `imageMargin`                 | Margin size of one image. | `number` | 5 |
| `containerWidth`              | Width of Camera Roll layout container. | `number` | device width |
| `initialNumToRender`          | Specifies how many items we want to render on our first render pass for the Camera Roll layout. | `number` | 6 |
| `itemCount`                   | The number of item to fetch and render. **Version \*3.0.0 update** | `number` | 200 |
| `groupTypes`                  | The group where the photos will be fetched, one of "Album", "All", "Event", "Faces", "Library", "PhotoStream" and "SavedPhotos". | `string` | "All" |
| `assetType`                   | The asset type, one of "Photos", "Videos" or "All". | `string` | "Photos" |
| `removeClippedSubViews`       | "When true, offscreen child views (whose overflow value is hidden) are removed from their native backing superview when offscreen. This can improve scrolling performance on long lists. The default value is true. | `boolean` | true |
| `backgroundColor`             | Set background color of Camera Roll layout. | `string` | "white" |
| `emptyText`                   | Text to display instead of a list when there are no photos found. | `string` | "No photos." |
| `emptyTextStyle`              | Styles to apply to the `emptyText`. | `object` | {textAlign: "center"} |
| `loader`                      | Camera Roll loader component node. | `React.Component` | `<ActivityIndicator />` |
| `loaderColor`                 | The foreground color of the initial load spinner. | `string` | `"lightblue"` |
| `cameraRollFlatListProps`     | Props to be passed to the underlying `FlatList` Camera Roll layout.  See [`FlatList props...`](https://facebook.github.io/react-native/docs/flatlist#props) | `object` | |
| `cameraRollListHeader`        | Custom function to render the Camera Roll list header.  `() => React.Element` | `Function` | |
| `cameraRollListFooter`        | Custom function to render the Camera Roll list footer.  `() => React.Element` | `Function` | |
| `imageContainerStyle`         | The styles object which is added to the Image component. | `object` | {} |
| `renderIndividualHeader`      | Custom function that is executed **ABOVE** each individual image.  `(item: object, index: number, onClose: Function) => ?React.Element` | `Function` | |
| `renderIndividualFooter`      | Custom function that is executed **BELOW** each individual image.  `(item: object, index: number, onClose: Function) => ?React.Element` | `Function` | |
| `onEndReached`                | Called once when the scroll position gets within `onEndReachedThreshold` of the rendered content. `() => void` **Version \*4.1.0 update** | `function` | |
| `onEndReachedThreshold`       | How far from the end (in units of visible length of the list) the bottom edge of the list must be from the end of the content to trigger the `onEndReached` callback. Thus a value of 0.5 will trigger `onEndReached` when the end of the content is within half the visible length of the list. **Version \*4.1.0 update** | `number` | |

<br/>
<br/>
<br/>

---
<br/>
<br/>
<br/>

### :small_blue_diamond: Props of ``<CameraRollGallery />`` WITH DEFAULT CAMERAROLL

Inorder to use these props, make sure `enableCameraRoll` prop is set to `true`.

| Props | Description | Type | Default |
| ----- | ----------- | ---- | ------- |
| `catchGetPhotosError`         | Custom function to catch errors from getting and loading images.  `(error) => void` **Version \*3.0.0 update** | `Function` | |
| `permissionDialogTitle`       | Starting on android M individual permissions must be granted for certain services, having access to the camera roll is one of them, you can use this to change the title of the dialog prompt requesting permissions. | `string` | `"Read Storage Permission"` |
| `permissionDialogMessage`     | Starting on android M individual permissions must be granted for certain services, having access to the camera roll is one of them, you can use this to change the content of the dialog prompt requesting permissions. | `string` | `"Needs access to your photos so you can use these awesome services."` |
| `pendingAuthorizedView`       | Starting on android M individual permissions must be granted for certain services, having access to the camera roll is one of them. This will be displayed when access to the camera roll has been denied. | `React.Element` | Defaults to `Waiting on access permission to camera roll.` message. |
| `notAuthorizedView`           | Starting on android M individual permissions must be granted for certain services, having access to the camera roll is one of them. This will be displayed when access to the camera roll has been denied completely. | `React.Element` | Defaults to `Access denied to camera roll.` message. |

<br/>
<br/>
<a href="https://luehangs.site/marketplace/product/RN%20Posting%20Demo%20App%20Kit"><img src="https://luehangs.site/images/lh-mobile-strip.jpg" alt="LueHsoft LueH LABS Lue Hang luehang"/></a>
<br/>
<br/>

<br/>

### :small_blue_diamond: Gallery Props of ``<CameraRollGallery />``

> If you like [`react-native-image-layout`](https://github.com/Luehang/react-native-image-layout), please be sure to give it a star at [GitHub](https://github.com/Luehang/react-native-image-layout). Thanks.

| Props | Description | Type | Default |
| ----- | ----------- | ---- | ------- |
| `imagePageComponent`          | Custom function to render the images for gallery.  First param is the image props and second param is the dimensions. `(imageProps: { imageLoaded: boolean, source: object, image: object, style: Array<object>, resizeMode: string, capInsets: object, onLoadStart: Function, onLoad: Function, ...extras }, imageDimensions: {width: number, height: number}, index: number) => React.Element` **index params included in Version \*1.3.0 update** | `Function` | `<Image/>` component |
| `errorPageComponent`          | Custom function to render the page of an image in gallery that couldn't be displayed. | `Function` | `<View/>` with stylized error |
| `renderPageHeader`            | Custom function to render gallery page header and must return a React Component.  `(item: object, index: number, onClose: Function) => ?React.Element` The `onClose` function is use to close gallery pages and return to the camera roll layout. | `Function` | |
| `renderPageFooter`            | Custom function to render gallery page footer and must return a React Component.  `(item: object, index: number, onClose: Function) => ?React.Element` The `onClose` function is use to close gallery pages and return to the camera roll layout. | `Function` | |
| `pagesFlatListProps`          | Props to be passed to the underlying `FlatList` gallery.  See [`FlatList` props...](https://facebook.github.io/react-native/docs/flatlist) | `object` | {windowSize: 3} |
| `pageMargin`                  | Blank space to show between images in gallery. | `number` | 0 |
| `sensitivePageScroll`         | Whether to enable an intelligent detection to detect rough and fast swiping gestures in order to "cushion" or slow down a swipe at the end. **Version \*1.2.0 update**. | `boolean` | `false` |
| `onPageSelected`              | Fired with the index of page that has been selected in gallery. `(index: number) => void` | `Function` | `Function` | |
| `onPageScrollStateChanged`    | Called when page scrolling state has changed in gallery.  See [scroll state and events...](#scroll-state-and-events) `(state: string) => void` | `Function` | |
| `onPageScroll`                | Scroll event for page gallery.  See [scroll state and events...](#scroll-state-and-events) `(event: { position: number, offset: number, fraction: number }) => void` | `Function` | |
| `pageScrollViewStyle`         | Custom style for the `FlatList` component for gallery. | `object` | {} |
| `onPageSingleTapConfirmed`    | Fired after a single tap on page in gallery. `() => void`  | `Function` | |
| `onPageLongPress`             | Fired after a long press on page in gallery. `() => void` | `Function` | |
| `onDoubleTapConfirmed` | Executed after a double tap. `(index: number) => void` **Version \*2.1.0 update**. | `Function` |
| `onDoubleTapStartReached` | Executed after scaling out or zooming out using double tap. `(transform: { scale: number, translateX: number, translateY: number }, index: number) => void` **Version \*2.1.0 update**. | `Function` |
| `onDoubleTapEndReached` | Executed after scaling in or zooming in using double tap. `(transform: { scale: number, translateX: number, translateY: number }, index: number) => void` **Version \*2.1.0 update**. | `Function` |
| `onPinchTransforming` | Executed while pinching to transform view or zoom (view transformer). `(transform: { scale: number, translateX: number, translateY: number }, index: number) => void` **Version \*2.1.0 update**. | `Function` |
| `onPinchStartReached` | Executed after scaling out or zooming out to initial size using the pinch gesture. `(transform: { scale: number, translateX: number, translateY: number }, index: number) => void` **Version \*2.1.0 update**. | `Function` |
| `enableScale` | Enable or disable zoom and double tap zoom (view transformer). **Version \*2.1.0 update**. | `boolean` | `true` |
| `maxScale` | Max zoom (view transformer). **Version \*2.1.0 update**. | `number` | `Math.max(imageWidth / viewWidth, imageHeight / viewHeight)` |
| `enableTranslate` | Enable or disable moving while in zoom (view transformer). **Version \*2.1.0 update**. | `boolean` | `true` |
| `resizeMode` | The mechanism that should be used to resize the image when the image's dimensions differ from the image view's dimensions. Expecting one of `"contain"`, `"cover"`, `"stretch"`, `"repeat"`, `"center"`. **Version \*2.1.0 update**. | `string` | `"contain"` |
| `enableResistance` | Enable or disable resistance over panning (view transformer). **Version \*2.1.0 update**. | `boolean` | `true` |
| `resistantStrHorizontal` | Resistant value for left and right panning (view transformer). `(dx: number) => number` **Version \*2.1.0 update**. | `Function`, `number` or `string` | `(dx) => (dx /= 3)` |
| `resistantStrVertical` | Resistant value for top and bottom panning (view transformer). `(dy: number) => number` **Version \*2.1.0 update**. | `Function`, `number` or `string` | `(dy) => (dy /= 3)` |
| `onViewTransformed` | Executed while being transformed in anyway (view transformer). `(transform: { scale: number, translateX: number, translateY: number }, index: number) => void` **Version \*2.1.0 update**. | `Function` |
| `onTransformGestureReleased` | Executed after a transform guesture released (view transformer). `(transform: { scale: number, translateX: number, translateY: number }, index: number) => void` **Version \*2.1.0 update**. | `Function` |
| `maxOverScrollDistance` | A number used to determine final scroll position triggered by fling (view transformer). **Version \*2.1.0 update**. | `number` | `20` |
| `enableVerticalExit` | Enable or disable exiting from swiping up or down in gallery. **Version \*2.2.0 update**. | `boolean` | `true` |

<br/>
<br/>
<a href="https://luehangs.site/marketplace/product/RN%20Posting%20Demo%20App%20Kit"><img src="https://luehangs.site/images/lh-mobile-strip.jpg" alt="LueHsoft LueH LABS Lue Hang luehang"/></a>
<br/>
<br/>

## :gem: Installation For Provided CameraRoll

### `react-native` >= 0.60

<details>
<summary>Android Installation</summary>
</br>

#### Install

```bash
$ npm install @react-native-community/cameraroll --save
```

or

```bash
$ yarn add @react-native-community/cameraroll
```

#### Linking

Autolinking will just do the job.

<br/>

#### :information_source: **Android REQUIREMENT.**

User's permission is required to access the Camera Roll.  Add the following to `AndroidManifest.xml` which can be found in `android/app/src/main`.

```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
```

</details>

<details>
<summary>iOS Installation</summary>
</br>

#### Install

```bash
$ npm install @react-native-community/cameraroll --save
```

or

```bash
$ yarn add @react-native-community/cameraroll
```

#### Linking

Autolinking will just do the job.

<br/>

#### :information_source: **Important:** On devices running **iOS 10 or later**.

 User's permission is required to access the Camera Roll.  Add the `NSPhotoLibraryUsageDescription` key in your `Info.plist` with a string that describes how your app will use this data. This key will appear as `Privacy - Photo Library Usage Description` in **Xcode**.

```xml
<dict>
    <!-- ... -->
    <key>NSPhotoLibraryUsageDescription</key>
    <string>Requesting access to the photo library.</string>
    <!-- ... -->
</dict>
```

<br/>

#### :information_source: **Optional:** On devices running **iOS 11 or later**.

It is required to add the `NSPhotoLibraryAddUsageDescription` key in your `Info.plist`.  After that, define a string that describes how your app will use this data.  By adding this key to your `Info.plist`, you will be able to request write-only access permission from the user. If you try to save to the camera roll without this permission, your app will exit.

```xml
<dict>
    <!-- ... -->
    <key>NSPhotoLibraryAddUsageDescription</key>
    <string>Requesting write-only access permission.</string>
    <!-- ... -->
</dict>
```

</details>

### `react-native` < 0.60

<details>
<summary>Android Installation</summary>
</br>

#### :information_source: **Android REQUIREMENT.**

User's permission is required to access the Camera Roll.  Add the following to `AndroidManifest.xml` which can be found in `android/app/src/main`.

```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
```

</details>

<details>
<summary>iOS Installation</summary>
</br>

#### :information_source: **iOS REQUIREMENT.**

1. `react-native-camera-roll-gallery` uses React Native's [`CameraRoll`](https://facebook.github.io/react-native/docs/cameraroll) API. It requires the `RCTCameraRoll` library to be linked. Learn more about [Linking Libraries (iOS) clicking here](https://facebook.github.io/react-native/docs/linking-libraries-ios) or read for further instructions.

<br/>

2. Access the `node_modules/react-native/Libraries/CameraRoll` directory and look for `RCTCameraRoll.xcodeproj`.  Drag this file to your project on Xcode (usually under the `Libraries` group on Xcode).

![iOS Linking Libraries: Add to Libraries](https://luehangs.site/images/add-to-libraries.jpg)

<br/>

3. Click on your main `.xcodeproj` project file and select the `Build Phases` tab and drag the static library from the `Products` folder inside the library you are importing to `Link Binary With Libraries`.

![iOS Linking Libraries: Add to Build Phases](https://luehangs.site/images/add-to-build-phases.jpg)

<br/>

#### :information_source: **Important:** On devices running **iOS 10 or later**.

 User's permission is required to access the Camera Roll.  Add the `NSPhotoLibraryUsageDescription` key in your `Info.plist` with a string that describes how your app will use this data. This key will appear as `Privacy - Photo Library Usage Description` in **Xcode**.

```xml
<dict>
    <!-- ... -->
    <key>NSPhotoLibraryUsageDescription</key>
    <string>Requesting access to the photo library.</string>
    <!-- ... -->
</dict>
```

<br/>

#### :information_source: **Optional:** On devices running **iOS 11 or later**.

It is required to add the `NSPhotoLibraryAddUsageDescription` key in your `Info.plist`.  After that, define a string that describes how your app will use this data.  By adding this key to your `Info.plist`, you will be able to request write-only access permission from the user. If you try to save to the camera roll without this permission, your app will exit.

```xml
<dict>
    <!-- ... -->
    <key>NSPhotoLibraryAddUsageDescription</key>
    <string>Requesting write-only access permission.</string>
    <!-- ... -->
</dict>
```

</details>

<br/>
<br/>
<a href="https://luehangs.site/marketplace/product/RN%20Posting%20Demo%20App%20Kit"><img src="https://luehangs.site/images/lh-mobile-strip.jpg" alt="LueHsoft LueH LABS Lue Hang luehang"/></a>
<br/>
<br/>

## :clapper: Example Project

Perform steps 1-2 to run locally:

<details>
<summary>1. Clone the Repo</summary>
</br>

**Clone** `react-native-camera-roll-gallery` locally. In a terminal, run:

```bash
$ git clone https://github.com/Luehang/react-native-camera-roll-gallery.git react-native-camera-roll-gallery
```

</details>

<details>
<summary>2. Install and Run</summary>
</br>

```bash
$ cd react-native-camera-roll-gallery/example/
```

#### iOS - Mac - Install & Run

	1. check out the code
	2. npm install
	3. npm run ios

#### Android - Mac - Install & Run

	1. check out the code
	2. npm install
	3. emulator running in separate terminal
	4. npm run android

</details>

<br/>
<br/>
<a href="https://luehangs.site"><img src="https://luehangs.site/images/lh-blog-strip.jpg" alt="LueHsoft LueH LABS Lue Hang luehang"/></a>
<br/>
<br/>

## :santa: Author

<a href="https://www.facebook.com/lue.hang">
<img src="https://www.luehangs.site/images/lue-hang2018-circle-150px.png"/>
</a>

Free and made possible along with costly maintenance and updates by [Lue Hang](https://www.facebook.com/lue.hang) (the author).

<br/>
<br/>
<br/>

---
<br/>
<br/>
<br/>

## :clap: Contribute

[Pull requests](https://github.com/Luehang/react-native-camera-roll-gallery/pulls) are welcomed.

<br/>

### :tophat: Contributors

Contributors will be posted here.

<br/>

### :baby: Beginners

Not sure where to start, or a beginner? Take a look at the [issues page](https://github.com/Luehang/react-native-camera-roll-gallery/issues).

<br/>
<br/>
<br/>

---
<br/>
<br/>
<br/>

## :page_facing_up: License

MIT © [Lue Hang](https://luehangs.site), as found in the LICENSE file.
