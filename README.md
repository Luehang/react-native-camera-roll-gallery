<a href="https://luehangs.site/lue_hang/projects/react-native-camera-roll-gallery"><img src="https://luehangs.site/images/react-native-camera-roll-gallery-main.jpg" alt="react-native-camera-roll-gallery"/></a>

> An easy and simple to use React Native component to render a custom layout for CameraRoll 
photos (next update will have videos) and displayed on a custom interactive image viewer for manipulation. Includes animations and support for both iOS and Android. Free and made possible along with costly maintenance and updates by [Lue Hang](https://www.facebook.com/lue.hang) (the author).

<a href="https://luehangs.site"><img src="https://luehangs.site/images/lh-blog-strip.jpg" alt="LH BLOG"/></a>

![react-native-camera-roll-gallery](https://luehangs.site/videos/react-native-camera-roll-gallery-demo.gif)

Learn more about React Native with project examples along with Cyber Security and Ethical Hacking at [LH BLOG](https://www.luehangs.site).

Built with [`react-native-gallery-swiper`](https://npmjs.com/package/react-native-gallery-swiper).

## Index

- [Getting Started](#getting-started)
- [Manual Installation](#manual-installation)
- [Usage Example](#usage-example)
- [API](#api)
- [Props](#props)
- [Scroll State and Events](#scroll-state-and-events)
- [Example Project](#example-project)
- [Author](#author)
- [Contribute](#contribute)
- [License](#license)

## Getting Started

Type in the following to the command line to install the dependency.

```bash
$ npm install --save react-native-camera-roll-gallery
```

or

```bash
$ yarn add react-native-camera-roll-gallery
```

**No further installation is required for Android.**

<a href="https://luehangs.site"><img src="https://luehangs.site/images/lh-blog-strip.jpg" alt="LH BLOG"/></a>

### Manual Installation (iOS)

**No further installation is required for Android.**

**THIS IS A REACT NATIVE REQUIREMENT.**

1. `react-native-camera-roll-gallery` uses React Native's [`CameraRoll`](https://facebook.github.io/react-native/docs/cameraroll) API. It requires the `RCTCameraRoll` library to be linked. Learn more about [Linking Libraries (iOS) clicking here](https://facebook.github.io/react-native/docs/linking-libraries-ios) or read for further instructions.

2. Access the `node_modules/react-native/Libraries/CameraRoll` directory and look for `RCTCameraRoll.xcodeproj`.  Drag this file to your project on Xcode (usually under the `Libraries` group on Xcode).

![iOS Linking Libraries: Add to Libraries](https://luehangs.site/images/add-to-libraries.jpg)

3. Click on your main `.xcodeproj` project file and select the `Build Phases` tab and drag the static library from the `Products` folder inside the library you are importing to `Link Binary With Libraries`.

![iOS Linking Libraries: Add to Build Phases](https://luehangs.site/images/add-to-build-phases.jpg)

**Important:** On devices running **iOS 10 or later**, user's permission is required to access the Camera Roll.  Add the `NSPhotoLibraryUsageDescription` key in your `Info.plist` with a string that describes how your app will use this data. This key will appear as `Privacy - Photo Library Usage Description` in **Xcode**.

```xml
<dict>
    <!-- ... -->
    <key>NSPhotoLibraryUsageDescription</key>
    <string>Requesting access to the photo library.</string>
    <!-- ... -->
</dict>
```

**Optional:** On devices running **iOS 11 or later**, it is required to add the `NSPhotoLibraryAddUsageDescription` key in your `Info.plist`.  After that, define a string that describes how your app will use this data.  By adding this key to your `Info.plist`, you will be able to request write-only access permission from the user. If you try to save to the camera roll without this permission, your app will exit.

```xml
<dict>
    <!-- ... -->
    <key>NSPhotoLibraryAddUsageDescription</key>
    <string>Requesting write-only access permission.</string>
    <!-- ... -->
</dict>
```

<a href="https://luehangs.site"><img src="https://luehangs.site/images/lh-blog-strip.jpg" alt="LH BLOG"/></a>

## Usage Example

Add an ``import`` to the top of the file.

At minimal, declare the ``CameraRollGallery`` component in the ``render()``.

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

## API

``<CameraRollGallery />`` component accepts the following props...

## Props

### Camera Roll Layout Props of ``<CameraRollGallery />``

| Props                         | Description                                                                                                                                                                                    | Type              | Default |
|-------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------|---------|
| `imagesPerRow`                | Number of images per row. | `number` | 3 |
| `imageMargin`                 | Margin size of one image. | `number` | 5 |
| `containerWidth`              | Width of Camera Roll layout container. | `number` | device width |
| `initialNumToRender`          | Specifies how many items we want to render on our first render pass for the Camera Roll layout. | `number` | 6 |
| `removeClippedSubViews`       | "When true, offscreen child views (whose overflow value is hidden) are removed from their native backing superview when offscreen. This can improve scrolling performance on long lists. The default value is true. | `Boolean` | true | 
| `groupTypes`                  | The group where the photos will be fetched, one of "Album", "All", "Event", "Faces", "Library", "PhotoStream" and "SavedPhotos". | `String` | "SavedPhotos" |
| `assetType`                   | The asset type, one of "Photos", "Videos" or "All". | `String` | "Photos" |
| `backgroundColor`             | Set background color of Camera Roll layout. | `String` | "white" |
| `emptyText`                   | Text to display instead of a list when there are no photos found. | `String` | "No photos." |
| `emptyTextStyle`              | Styles to apply to the `emptyText`. | `Object` | {textAlign: "center"} |
| `loader`                      | Camera Roll loader component node. | `React.Component` | `<ActivityIndicator />` |
| `cameraRollFlatListProps`     | Props to be passed to the underlying `FlatList` Camera Roll layout.  See [`FlatList props...`](https://facebook.github.io/react-native/docs/flatlist#props) | `Object` | |
| `cameraRollListHeader`        | Custom function to render the Camera Roll list header.  This function must return a React Component. | `Function` | |
| `cameraRollListFooter`        | Custom function to render the Camera Roll list footer.  This function must return a React Component. | `Function` | |
| `imageContainerStyle`         | The styles object which is added to the Image component. | `Object` | {} |
| `renderIndividualHeader`      | Custom function that is executed **ABOVE** each individual image.  First param is the individual data and second param is the index.  This function must return a React Component. | `Function` | |
| `renderIndividualFooter`      | Custom function that is executed **BELOW** each individual image.  First param is the individual data and second param is the index.  This function must return a React Component. | `Function` | |

<a href="https://luehangs.site"><img src="https://luehangs.site/images/lh-blog-strip.jpg" alt="LH BLOG"/></a>

### Gallery Props of ``<CameraRollGallery />``

| Props                         | Description                                                                                                                                                                                    | Type              | Default |
|-------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------|---------|
| `imagePageComponent`          | Custom function to render the images for gallery.  First param is the image props and second param is the dimensions. | `Function` | `<Image/>` component |
| `errorPageComponent`          | Custom function to render the page of an image in gallery that couldn't be displayed. | `Function` | `<View/>` with stylized error |
| `renderPageHeader`            | Custom function to render gallery page header and must return a React Component.  First param is the individual data and second param is the index.  Third param is the onClose function to close gallery pages and return to the masonry layout. | `Function` | |
| `renderPageFooter`            | Custom function to render gallery page footer and must return a React Component.  First param is the individual data and second param is the index.  Third param is the onClose function to close gallery pages and return to the masonry layout. | `Function` | |
| `pagesFlatListProps`          | Props to be passed to the underlying `FlatList` gallery.  See [`FlatList` props...](https://facebook.github.io/react-native/docs/flatlist) | `Object` | {windowSize: 3} |
| `pageMargin`                  | Blank space to show between images in gallery. | `number` | 0 |
| `sensitivePageScroll`         | Whether to enable an intelligent detection to detect rough and fast swiping gestures in order to "cushion" or slow down a swipe at the end. **Version ^1.2.0 update**. | `Boolean` | `false` |
| `onPageSelected`              | Fired with the index of page that has been selected in gallery. | `Function` | |
| `onPageScrollStateChanged`    | Called when page scrolling state has changed in gallery.  See [scroll state and events...](#scroll-state-and-events) | `Function` | |
| `onPageScroll`                | Scroll event for page gallery.  See [scroll state and events...](#scroll-state-and-events) | `Function` | |
| `pageScrollViewStyle`         | Custom style for the `FlatList` component for gallery. | `Object` | {} |
| `onPageSingleTapConfirmed`    | Fired after a single tap on page in gallery. | `Function` | |
| `onPageLongPress`             | Fired after a long press on page in gallery. | `Function` | |

<a href="https://luehangs.site"><img src="https://luehangs.site/images/lh-blog-strip.jpg" alt="LH BLOG"/></a>

## Scroll State and Events

Built with [`react-native-gallery-swiper`](https://npmjs.com/package/react-native-gallery-swiper).

* `onPageScroll(event: { position: number, offset: number, fraction: number }) => void`

  The event object carries the following data: 

  * `position: number`:  index of first page from the left that is currently visible.
  * `offset: number`: value from range [0,1) describing stage between page transitions.
  * `fraction: number`: means that (1 - x) fraction of the page at "position" index is visible, and x fraction of the next page is visible.

* `onPageScrollStateChanged(state: string) => void`

  Called when the page scrolling state has changed. The page scrolling state can be in 3 states:

  * `'idle': string`: there is no interaction with the page scroller happening at the time.
  * `'dragging': string`: there is currently an interaction with the page scroller.
  * `'settling': string`: there was an interaction with the page scroller, and the page scroller is now finishing its closing or opening animation.

## Example Project

Perform steps 1-2 to run locally:

1. [Clone the Repo](#1-clone-the-repo)
2. [Install and Run](#2-install-and-run)

### 1. Clone the Repo

**Clone** `react-native-camera-roll-gallery` locally. In a terminal, run:

```bash
$ git clone https://github.com/Luehang/react-native-camera-roll-gallery.git react-native-camera-roll-gallery
```

### 2. Install and Run

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

<a href="https://luehangs.site"><img src="https://luehangs.site/images/lh-blog-strip.jpg" alt="LH BLOG"/></a>

## Author

<a href="https://www.facebook.com/lue.hang">
<img src="https://www.luehangs.site/images/lue-hang2018-circle-150px.png"/>
</a>

Free and made possible along with costly maintenance and updates by [Lue Hang](https://www.facebook.com/lue.hang) (the author).

## Contribute

[Pull requests](https://github.com/Luehang/react-native-camera-roll-gallery/pulls) are welcomed.

### Beginners

Not sure where to start, or a beginner? Take a look at the [issues page](https://github.com/Luehang/react-native-camera-roll-gallery/issues).

### Contributors

Contributors will be posted here.

## License

MIT © [Lue Hang](https://luehangs.site), as found in the LICENSE file.
