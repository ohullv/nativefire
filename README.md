# NativeFire

Nativefire is a mobile app for iOS that is able to receive push notifications for logged in users.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installing

A step by step series of examples that tell you how to get a development env running

First install the dependencies

```
yarn install

```


# iOS steps

```
cd ios/
pod install --repo-update
cd ..
npx react-native run-ios

```

Next; run your simulator for iOS

```
yarn ios
```

Next you should be able to login


```
test@nativefire.local
nativefire2020
```


To trigger a notification we run

```
xcrun simctl push booted test-push.json 
```

