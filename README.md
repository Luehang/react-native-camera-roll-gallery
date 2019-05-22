<a href="https://luehangs.site/lue_hang/projects/react-native-camera-roll-gallery"><img src="https://luehangs.site/images/react-native-camera-roll-gallery-main.jpg" alt="react-native-camera-roll-gallery"/></a>

<a href="https://luehangs.site/marketplace/product/RN%20Posting%20Demo%20App%20Kit"><img src="https://luehangs.site/images/lh-mobile-strip.jpg" alt="LH LABS"/></a>
<br/>
<br/>

An easy and simple to use React Native component to render a custom layout for CameraRoll 
photos (next update will have videos) and displayed on a custom interactive image viewer for manipulation. Includes animations and support for both iOS and Android. Free and made possible along with costly maintenance and updates by [Lue Hang](https://www.facebook.com/lue.hang) (the author).

Check out the [docs](https://luehangs.site/lue_hang/projects/react-native-camera-roll-gallery) for a complete documentation.

- Optimized for large list rendering for Camera Roll images.
- Swipe up and down to close images with animations to original place. Support iOS. (Feature now disabled and stable feature will be released in future releases)
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

![react-native-camera-roll-gallery](https://luehangs.site/videos/react-native-camera-roll-gallery-demo.gif)

#### :information_source: Learn more about React Native with project examples along with Cyber Security and Ethical Hacking at [LH LABS](https://www.luehangs.site).

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
### 2.  [Android Installation](#gem-android-installation)
### 3.  [iOS Installation](#gem-ios-installation)
### 4.  [Usage Example](#tada-usage-example)
### 5.  [API](#nut_and_bolt-api)
### 6.  :books: [Props](#books-props)
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

#### :information_source: **No further installation is required for Android.**

<br/>
<br/>
<a href="https://luehangs.site/marketplace/product/RN%20Posting%20Demo%20App%20Kit"><img src="https://luehangs.site/images/lh-mobile-strip.jpg" alt="LH LABS"/></a>
<br/>
<br/>

## :gem: Android Installation

<br/>

#### :information_source: **Android REQUIREMENT.**

User's permission is required to access the Camera Roll.  Add the following to `AndroidManifest.xml` which can be found in `android/app/src/main`.

```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
```

<br/>
<br/>
<br/>

---
<br/>
<br/>
<br/>

## :gem: iOS Installation

<br/>

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

<br/>
<br/>
<a href="https://luehangs.site/marketplace/product/RN%20Posting%20Demo%20App%20Kit"><img src="https://luehangs.site/images/lh-mobile-strip.jpg" alt="LH LABS"/></a>
<br/>
<br/>

## :tada: Usage Example

Add an ``import`` to the top of the file.

At minimal, declare the ``CameraRollGallery`` component in the ``render()``.

> If you like [`react-native-image-layout`](https://github.com/Luehang/react-native-image-layout), please be sure to give it a star at [GitHub](https://github.com/Luehang/react-native-image-layout). Thanks.

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

To select, callback and manipulate an image...

```javascript
import CameraRollGallery from "react-native-camera-roll-gallery";
//...

//...
_renderPageHeader = (image, index, onClose) => {
    // Individual image object data.
    console.log(image);
    return (
        <View>
            {/*
                onClose params (third params) is a function
                that will close the react-native-gallery-swiper.

                Swiping up and down animations for closing the
                gallery is only compatible with iOS at
                the moment.  It will be compatible with
                Android in future releases.
            */}
            <TouchableWithoutFeedback onPress={() => {onClose();}}>
                <Image
                    source={backIcon}
                    style={{marginLeft: 10, height: 30, width: 30}}
                />
            </TouchableWithoutFeedback>
            <Text>{image.filename}</Text>
        </View>
    );
}

render() {
    return (
        <CameraRollGallery
            renderPageHeader={this._renderPageHeader}
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

## :nut_and_bolt: API

``<CameraRollGallery />`` component accepts the following props...

<br/>

# :books: Props

### :small_blue_diamond: Camera Roll Layout Props of ``<CameraRollGallery />``

> If you like [`react-native-image-layout`](https://github.com/Luehang/react-native-image-layout), please be sure to give it a star at [GitHub](https://github.com/Luehang/react-native-image-layout). Thanks.

| Props                         | Description                                                                                                                                                                                    | Type              | Default |
|-------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------|---------|
| `imagesPerRow`                | Number of images per row. | `number` | 3 |
| `imageMargin`                 | Margin size of one image. | `number` | 5 |
| `containerWidth`              | Width of Camera Roll layout container. | `number` | device width |
| `initialNumToRender`          | Specifies how many items we want to render on our first render pass for the Camera Roll layout. | `number` | 6 |
| `removeClippedSubViews`       | "When true, offscreen child views (whose overflow value is hidden) are removed from their native backing superview when offscreen. This can improve scrolling performance on long lists. The default value is true. | `Boolean` | true | 
| `groupTypes`                  | The group where the photos will be fetched, one of "Album", "All", "Event", "Faces", "Library", "PhotoStream" and "SavedPhotos". | `String` | "All" |
| `assetType`                   | The asset type, one of "Photos", "Videos" or "All". | `String` | "Photos" |
| `backgroundColor`             | Set background color of Camera Roll layout. | `String` | "white" |
| `emptyText`                   | Text to display instead of a list when there are no photos found. | `String` | "No photos." |
| `emptyTextStyle`              | Styles to apply to the `emptyText`. | `Object` | {textAlign: "center"} |
| `loader`                      | Camera Roll loader component node. | `React.Component` | `<ActivityIndicator />` |
| `loaderColor`                 | The foreground color of the initial load spinner. | `string` | `"lightblue"` |
| `cameraRollFlatListProps`     | Props to be passed to the underlying `FlatList` Camera Roll layout.  See [`FlatList props...`](https://facebook.github.io/react-native/docs/flatlist#props) | `Object` | |
| `cameraRollListHeader`        | Custom function to render the Camera Roll list header.  `() => React.Element` | `Function` | |
| `cameraRollListFooter`        | Custom function to render the Camera Roll list footer.  `() => React.Element` | `Function` | |
| `imageContainerStyle`         | The styles object which is added to the Image component. | `Object` | {} |
| `renderIndividualHeader`      | Custom function that is executed **ABOVE** each individual image.  `(item: Object, index: number, onClose: Function) => ?React.Element` | `Function` | |
| `renderIndividualFooter`      | Custom function that is executed **BELOW** each individual image.  `(item: Object, index: number, onClose: Function) => ?React.Element` | `Function` | |
| `permissionDialogTitle` | Starting on android M individual permissions must be granted for certain services, having access to the camera roll is one of them, you can use this to change the title of the dialog prompt requesting permissions. | `string` | `"Read Storage Permission"` |
| `permissionDialogMessage` | Starting on android M individual permissions must be granted for certain services, having access to the camera roll is one of them, you can use this to change the content of the dialog prompt requesting permissions. | `string` | `"Needs access to your photos so you can use these awesome services."` |
| `pendingAuthorizedView` | Starting on android M individual permissions must be granted for certain services, having access to the camera roll is one of them. This will be displayed when access to the camera roll has been denied. | `React.Element` | Defaults to `Waiting on access permission to camera roll.` message. |
| `notAuthorizedView` | Starting on android M individual permissions must be granted for certain services, having access to the camera roll is one of them. This will be displayed when access to the camera roll has been denied completely. | `React.Element` | Defaults to `Access denied to camera roll.` message. |

<br/>
<br/>
<a href="https://luehangs.site/marketplace/product/RN%20Posting%20Demo%20App%20Kit"><img src="https://luehangs.site/images/lh-mobile-strip.jpg" alt="LH LABS"/></a>
<br/>
<br/>

<br/>

### :small_blue_diamond: Gallery Props of ``<CameraRollGallery />``

> If you like [`react-native-image-layout`](https://github.com/Luehang/react-native-image-layout), please be sure to give it a star at [GitHub](https://github.com/Luehang/react-native-image-layout). Thanks.

| Props                         | Description                                                                                                                                                                                    | Type              | Default |
|-------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------|---------|
| `imagePageComponent`          | Custom function to render the images for gallery.  First param is the image props and second param is the dimensions. `(imageProps: { imageLoaded: Boolean, source: object, image: object, style: Array<object>, resizeMode: string, capInsets: object, onLoadStart: Function, onLoad: Function, ...extras }, imageDimensions: {width: number, height: number}, index: number) => React.Element` **index params included in Version \*1.3.0 update** | `Function` | `<Image/>` component |
| `errorPageComponent`          | Custom function to render the page of an image in gallery that couldn't be displayed. | `Function` | `<View/>` with stylized error |
| `renderPageHeader`            | Custom function to render gallery page header and must return a React Component.  `(item: Object, index: number, onClose: Function) => ?React.Element` The `onClose` function is use to close gallery pages and return to the camera roll layout. | `Function` | |
| `renderPageFooter`            | Custom function to render gallery page footer and must return a React Component.  `(item: Object, index: number, onClose: Function) => ?React.Element` The `onClose` function is use to close gallery pages and return to the camera roll layout. | `Function` | |
| `pagesFlatListProps`          | Props to be passed to the underlying `FlatList` gallery.  See [`FlatList` props...](https://facebook.github.io/react-native/docs/flatlist) | `Object` | {windowSize: 3} |
| `pageMargin`                  | Blank space to show between images in gallery. | `number` | 0 |
| `sensitivePageScroll`         | Whether to enable an intelligent detection to detect rough and fast swiping gestures in order to "cushion" or slow down a swipe at the end. **Version \*1.2.0 update**. | `Boolean` | `false` |
| `onPageSelected`              | Fired with the index of page that has been selected in gallery. `(index: number) => void` | `Function` | `Function` | |
| `onPageScrollStateChanged`    | Called when page scrolling state has changed in gallery.  See [scroll state and events...](#scroll-state-and-events) `(state: string) => void` | `Function` | |
| `onPageScroll`                | Scroll event for page gallery.  See [scroll state and events...](#scroll-state-and-events) `(event: { position: number, offset: number, fraction: number }) => void` | `Function` | |
| `pageScrollViewStyle`         | Custom style for the `FlatList` component for gallery. | `Object` | {} |
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

<br/>
<br/>
<a href="https://luehangs.site/marketplace/product/RN%20Posting%20Demo%20App%20Kit"><img src="https://luehangs.site/images/lh-mobile-strip.jpg" alt="LH LABS"/></a>
<br/>
<br/>

## :clapper: Example Project

Perform steps 1-2 to run locally:

1. [Clone the Repo](#1-clone-the-repo)
2. [Install and Run](#2-install-and-run)

<br/>

### :small_blue_diamond: 1. Clone the Repo

**Clone** `react-native-camera-roll-gallery` locally. In a terminal, run:

```bash
$ git clone https://github.com/Luehang/react-native-camera-roll-gallery.git react-native-camera-roll-gallery
```

<br/>

### :small_blue_diamond: 2. Install and Run

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

<br/>
<br/>
<a href="https://luehangs.site"><img src="https://luehangs.site/images/lh-blog-strip.jpg" alt="LH LABS"/></a>
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
