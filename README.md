# RemindMe

In order to set up, clone the repo and run npm install in the top level of the directory. Make sure you are using the command prompt in admin mode, since some of the NPM modules require elevated permissions to install.

After npm install has completed, one of the modules in the node_modules folder will need to be edited. Navigate to node_modules/react-native-maps/lib/android. There should be a file at this location called build.gradle. Replace its contents with the following:

    apply plugin: 'com.android.library'
    apply from: 'gradle-maven-push.gradle'

    def DEFAULT_COMPILE_SDK_VERSION             = 25
    def DEFAULT_BUILD_TOOLS_VERSION             = "25.0.3"
    def DEFAULT_TARGET_SDK_VERSION              = 25
    def DEFAULT_GOOGLE_PLAY_SERVICES_VERSION    = "10.2.4"
    def DEFAULT_ANDROID_MAPS_UTILS_VERSION      = "0.5+"

    android {
        compileSdkVersion rootProject.hasProperty('compileSdkVersion') ? rootProject.compileSdkVersion : DEFAULT_COMPILE_SDK_VERSION
        buildToolsVersion rootProject.hasProperty('buildToolsVersion') ? rootProject.buildToolsVersion : DEFAULT_BUILD_TOOLS_VERSION
  
        defaultConfig {
            minSdkVersion 16
            targetSdkVersion rootProject.hasProperty('targetSdkVersion') ? rootProject.targetSdkVersion : DEFAULT_TARGET_SDK_VERSION
        }
  
      packagingOptions {  
          exclude 'META-INF/LICENSE'    
          exclude 'META-INF/DEPENDENCIES.txt'    
          exclude 'META-INF/LICENSE.txt'    
          exclude 'META-INF/NOTICE.txt'    
          exclude 'META-INF/NOTICE'    
          exclude 'META-INF/DEPENDENCIES'    
          exclude 'META-INF/notice.txt'    
          exclude 'META-INF/license.txt'    
          exclude 'META-INF/dependencies.txt'    
          exclude 'META-INF/LGPL2.1'    
      }
  
      lintOptions {  
          disable 'InvalidPackage'
      }
  
      compileOptions {  
          sourceCompatibility JavaVersion.VERSION_1_7    
          targetCompatibility JavaVersion.VERSION_1_7 
      }
  
    }

    dependencies {
        def googlePlayServicesVersion = rootProject.hasProperty('googlePlayServicesVersion')  ? rootProject.googlePlayServicesVersion :         DEFAULT_GOOGLE_PLAY_SERVICES_VERSION  
        def androidMapsUtilsVersion   = rootProject.hasProperty('androidMapsUtilsVersion')    ? rootProject.androidMapsUtilsVersion   :         DEFAULT_ANDROID_MAPS_UTILS_VERSION
  
        provided "com.facebook.react:react-native:+"  
        compile "com.google.android.gms:play-services-base:$googlePlayServicesVersion"  
        compile "com.google.android.gms:play-services-maps:$googlePlayServicesVersion"  
        compile "com.google.maps.android:android-maps-utils:$androidMapsUtilsVersion"
  
    }

Make sure to save your changes. The app should now be ready to build. This can be done with the command react-native run-android. Happy coding!
