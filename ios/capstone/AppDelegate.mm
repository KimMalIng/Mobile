#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>

#import <RNKakaoLogins.h>

#import <RNSplashScreen.h>
//#import <KakaoOpenSDK/KakaoOpenSDK.h>
//- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
//                                      sourceApplication:(NSString *)sourceApplication
//                                              annotation:(id)annotation {
//    if ([KOSession isKakaoAccountLoginCallback:url]) {
//        return [KOSession handleOpenURL:url];
//    }
//
//    return false;
//}
//
//- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
//                                                options:(NSDictionary<NSString *,id> *)options {
//    if ([KOSession isKakaoAccountLoginCallback:url]) {
//        return [KOSession handleOpenURL:url];
//    }
//
//    return false;
//}
//
//- (void)applicationDidBecomeActive:(UIApplication *)application
//{
//    [KOSession handleDidBecomeActive];
//}

@implementation AppDelegate


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"capstone";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  [super application:application didFinishLaunchingWithOptions:launchOptions];
  [RNSplashScreen show];  // 추가

  return YES; // 수정
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self getBundleURL];
}

- (NSURL *)getBundleURL
{

#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
