# Gentlestudent Native App

## Install pod
- `sudo gem install cacoapods`
- `cd ios`
- `pod init`
- Open podfile and paste following code:
```
# Uncomment the next line to define a global platform for your project
# platform :ios, '9.0'

target 'Gentlestudent' do
  rn_path = '../node_modules/react-native'
  rn_maps_path = '../node_modules/react-native-maps'

  pod 'yoga', path: "#{rn_path}/ReactCommon/yoga/yoga.podspec"
  pod 'React', path: rn_path, subspecs: [
    'Core',
    'RCTActionSheet',
    'RCTAnimation',
    'RCTGeolocation',
    'RCTImage',
    'RCTLinkingIOS',
    'RCTNetwork',
    'RCTSettings',
    'RCTText',
    'RCTVibration',
    'RCTWebSocket'
  ]

  pod 'react-native-maps', path: rn_maps_path

  pod 'GoogleMaps'  # Remove this line if you don't want to support Google Maps on iOS
  pod 'react-native-google-maps', path: rn_maps_path  # Remove this line if you don't want to support Google Maps on iOS
end

post_install do |installer|
  installer.pods_project.targets.each do |target|
    if target.name == 'react-native-google-maps'
      target.build_configurations.each do |config|
        config.build_settings['CLANG_ENABLE_MODULES'] = 'No'
      end
    end
    if target.name == "React"
      target.remove_from_project
    end
    if target.name == 'yoga'
        target.build_configurations.each do |config|
            config.build_settings['GCC_TREAT_WARNINGS_AS_ERRORS'] = 'NO'
            config.build_settings['GCC_WARN_64_TO_32_BIT_CONVERSION'] = 'NO'
        end
    end
  end
end
```
- `pod install`

## Run
- open **Gentlestudent.xcworkspace** and **not** xcodeproj
- ⌘+R or click on play button

## Known issues (xcode)
- After changing something simple, the app loads within 1 - 2 minute on device (xcode)
- If you get too many logs in your xcode `nw_connection_get_connected_socket Connection has no connected handler`. Solution: https://stackoverflow.com/questions/44081674/react-native-connection-has-no-connection-handler-error-meaning#answer-44083635

## Known bugs or errors (xcode)
- Sometimes the app starts in black screen, but it loads after a few moments
- Sometimes you need to build(⌘+B) first and afterwards run(⌘+R), normally Run-command builds first before starting the app, sometimes it doesn't.
- If you didn't work for a long time with xcode, you'll probably get "`An eror was encountered while attempting to communicate with this device ...`". The solution is to go to xcode > Window > Devices and Simulator > Unplug device > Remove device from the list > Replug device and wait a couple of times.
- After build it gives error called "`/Users/.../Gentlestudent/node_modules/react-native-permissions/ios/RCTConvert+RNPStatus.h:36:24: Missing ',' between enumerators`". You need to add comma's in the two files manually.

![image](http://i64.tinypic.com/2v0zxfo.png)
