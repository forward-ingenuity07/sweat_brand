import {Splashscreen} from '@ionic-native/splash-screen';


initializeApp() {
    this.platform.ready().then(() => {
        this.hideSplashScreen();
    });
}

hideSplashScreen() {
    if (Splashscreen) {
        setTimeout(() => {
            Splashscreen.hide();
        }, 100);
    }
}