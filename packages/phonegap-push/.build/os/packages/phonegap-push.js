(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/phonegap-push/android.server.js                                                                       //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
var gcm = Npm.require('node-gcm');                                                                                // 1
Meteor.pushGCM = gcm;                                                                                             // 2
var message = new gcm.Message();                                                                                  // 3
var sender = new gcm.Sender('AIzaSyDG4qL7oJqpfhHxhQVAsE_so6FPsGDbpUk');                                           // 4
var registrationIds = [];                                                                                         // 5
                                                                                                                  // 6
//Meteor.pushSender = new gcm.Message();;                                                                         // 7
//Meteor.pushMessage = new gcm.Sender('AIzaSyDG4qL7oJqpfhHxhQVAsE_so6FPsGDbpUk');                                 // 8
                                                                                                                  // 9
Meteor.pushSender = sender;                                                                                       // 10
Meteor.pushMessage = message;                                                                                     // 11
                                                                                                                  // 12
message.addData('title','My Game');                                                                               // 13
message.addData('message','Your turn!!!!');                                                                       // 14
message.addData('msgcnt','1');                                                                                    // 15
message.collapseKey = 'demo';                                                                                     // 16
message.delayWhileIdle = true;                                                                                    // 17
message.timeToLive = 3;                                                                                           // 18
                                                                                                                  // 19
// // At least one token is required - each app registers a different token                                       // 20
registrationIds.push('APA91bG3c7jFfPtYzOBoCVg1GkU7BtJMhuXmnlwK90N5WHaRDs4ClV4UjE1XxthjBRikDbXlKjsxSNEgSSLWOTZnErtYFTwddmbgt5hRbJk28ZKU5OKniUgOKdKcLeErgSA7_HE9cNnaySPrF8lVzuIVDkupLLlEPA');
                                                                                                                  // 22
// /**                                                                                                            // 23
//  * Parameters: message-literal, registrationIds-array, No. of retries, callback-function                       // 24
//  */                                                                                                            // 25
// sender.send(message, registrationIds, 4, function (result) {                                                   // 26
//     console.log(result);                                                                                       // 27
// });                                                                                                            // 28
// Use the following line if you want to send the message without retries                                         // 29
// sender.sendNoRetry(message, registrationIds, function (result) {                                               // 30
// console.log(result); });                                                                                       // 31
                                                                                                                  // 32
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/phonegap-push/ios.server.js                                                                           //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
var http = Npm.require('http');                                                                                   // 1
var apn = Npm.require('apn');                                                                                     // 2
var url = Npm.require('url');                                                                                     // 3
                                                                                                                  // 4
Meteor.iphoneapn = apn;                                                                                           // 5
                                                                                                                  // 6
var myPhone = "d2d8d2a652148a5cea89d827d23eee0d34447722a2e7defe72fe19d733697fb0";                                 // 7
var myiPad = "51798aaef34f439bbb57d6e668c5c5a780049dae840a0a3626453cd4922bc7ac";                                  // 8
myPhone = "9904ab6b7e515d2c3f5cb8e460cb384903204aa017ce70320a5daa15d010b1f7";                                     // 9
var myDevice = new apn.Device(myPhone);                                                                           // 10
                                                                                                                  // 11
var note = new apn.Notification();                                                                                // 12
note.badge = 1;                                                                                                   // 13
note.sound = "notification-beep.wav";                                                                             // 14
note.alert = { "body" : "nicolsondsouza@gmail.com", "action-loc-key" : "Play" , "launch-image" : "mysplash.png"}; // 15
note.payload = {'messageFrom': 'nicolsondsouza@gmail.com'};                                                       // 16
                                                                                                                  // 17
note.device = myDevice;                                                                                           // 18
                                                                                                                  // 19
var callback = function(errorNum, notification){                                                                  // 20
    console.log('Error is: %s', errorNum);                                                                        // 21
    console.log(notification);                                                                                    // 22
}                                                                                                                 // 23
                                                                                                                  // 24
// var apnsProdCertText = Assets.getText('cert.pem');                                                             // 25
                                                                                                                  // 26
// var apnsProdKeyText = Assets.getText('key.pem');                                                               // 27
                                                                                                                  // 28
// // 'gateway.sandbox.push.apple.com'                                                                            // 29
// // 'gateway.push.apple.com'                                                                                    // 30
// var options = {                                                                                                // 31
//     gateway: 'gateway.push.apple.com', // this URL is different for Apple's Production Servers and changes when you go to production
//     errorCallback: callback,                                                                                   // 33
//     certData: apnsProdCertText,                                                                                // 34
//     keyData:  apnsProdKeyText,                                                                                 // 35
//     passphrase: 'wiberwibing',                                                                                 // 36
//     port: 2195,                                                                                                // 37
//     enhanced: true,                                                                                            // 38
//     cacheLength: 100                                                                                           // 39
// }                                                                                                              // 40
// var apnsConnection = new apn.Connection(options);                                                              // 41
// Meteor.iphoneConnection = apnsConnection ;                                                                     // 42
                                                                                                                  // 43
// apnsConnection.sendNotification(note);                                                                         // 44
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/phonegap-push/push.server.js                                                                          //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
/*                                                                                                                // 1
  A general purpose user CordovaPush                                                                              // 2
  ios, android, mail, twitter?, facebook?, sms?, snailMail? :)                                                    // 3
                                                                                                                  // 4
  Phonegap generic :                                                                                              // 5
  https://github.com/phonegap-build/PushPlugin                                                                    // 6
 */                                                                                                               // 7
                                                                                                                  // 8
// getText / getBinary                                                                                            // 9
                                                                                                                  // 10
                                                                                                                  // 11
CordovaPush = function(androidServerKey, options) {                                                               // 12
    var self = this;                                                                                              // 13
                                                                                                                  // 14
    // This function is called when a token is replaced on a device - normally                                    // 15
    // this should not happen, but if it does we should take action on it                                         // 16
    self.replaceToken = (typeof options.onReplace === 'function')?                                                // 17
                    options.onReplace:function(oldToken, newToken) {                                              // 18
                        console.log('Replace token: ' + oldToken + ' -- ' + newToken);                            // 19
                    };                                                                                            // 20
                                                                                                                  // 21
    self.removeToken = (typeof options.onRemove === 'function')?                                                  // 22
                    options.onRemove:function(token) {                                                            // 23
                        console.log('Remove token: ' + token);                                                    // 24
                    };                                                                                            // 25
                                                                                                                  // 26
    // https://npmjs.org/package/apn                                                                              // 27
                                                                                                                  // 28
    // After requesting the certificate from Apple, export your private key as a .p12 file and download the .cer file from the iOS Provisioning Portal.
                                                                                                                  // 30
    // gateway.push.apple.com, port 2195                                                                          // 31
    // gateway.sandbox.push.apple.com, port 2195                                                                  // 32
                                                                                                                  // 33
    // Now, in the directory containing cert.cer and key.p12 execute the following commands to generate your .pem files:
    // $ openssl x509 -in cert.cer -inform DER -outform PEM -out cert.pem                                         // 35
    // $ openssl pkcs12 -in key.p12 -out key.pem -nodes                                                           // 36
                                                                                                                  // 37
    var apn = Npm.require('apn');                                                                                 // 38
                                                                                                                  // 39
    var apnConnection = new apn.Connection( options );                                                            // 40
    // (cert.pem and key.pem)                                                                                     // 41
    self.sendIOS = function(from, userToken, title, text, count) {                                                // 42
                                                                                                                  // 43
        var myDevice = new apn.Device(userToken);                                                                 // 44
                                                                                                                  // 45
        var note = new apn.Notification();                                                                        // 46
                                                                                                                  // 47
        note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.                           // 48
        note.badge = count;                                                                                       // 49
        //note.sound = "";                                                                                        // 50
        note.alert = text;                                                                                        // 51
        note.payload = {'messageFrom': from };                                                                    // 52
                                                                                                                  // 53
        //console.log('I:Send message to: ' + userToken + ' count=' + count);                                     // 54
                                                                                                                  // 55
        apnConnection.pushNotification(note, myDevice);                                                           // 56
                                                                                                                  // 57
    };                                                                                                            // 58
                                                                                                                  // 59
    self.sendAndroid = function(from, userTokens, title, text, count) {                                           // 60
        var gcm = Npm.require('node-gcm');                                                                        // 61
        var Fiber = Npm.require('fibers');                                                                        // 62
                                                                                                                  // 63
        //var message = new gcm.Message();                                                                        // 64
        var message = new gcm.Message({                                                                           // 65
            collapseKey: from,                                                                                    // 66
        //    delayWhileIdle: true,                                                                               // 67
        //    timeToLive: 4,                                                                                      // 68
        //    restricted_package_name: 'dk.gi2.driftsstatus'                                                      // 69
            data: {                                                                                               // 70
                title: title,                                                                                     // 71
                message: text,                                                                                    // 72
                msgcnt: count                                                                                     // 73
            }                                                                                                     // 74
        });                                                                                                       // 75
        var sender = new gcm.Sender(androidServerKey);                                                            // 76
                                                                                                                  // 77
        _.each(userTokens, function(value, key) {                                                                 // 78
            //console.log('A:Send message to: ' + value + ' count=' + count);                                     // 79
        });                                                                                                       // 80
                                                                                                                  // 81
        /*message.addData('title', title);                                                                        // 82
        message.addData('message', text);                                                                         // 83
        message.addData('msgcnt', '1');                                                                           // 84
        message.collapseKey = 'sitDrift';                                                                         // 85
        message.delayWhileIdle = true;                                                                            // 86
        message.timeToLive = 3;*/                                                                                 // 87
                                                                                                                  // 88
        // /**                                                                                                    // 89
        //  * Parameters: message-literal, userTokens-array, No. of retries, callback-function                    // 90
        //  */                                                                                                    // 91
                                                                                                                  // 92
        var userToken = (userTokens.length === 1)?userTokens[0]:null;                                             // 93
                                                                                                                  // 94
        sender.send(message, userTokens, 5, function (err, result) {                                              // 95
            if (err) {                                                                                            // 96
                //console.log('ANDROID ERROR: result of sender: ' + result);                                      // 97
            } else {                                                                                              // 98
                //console.log('ANDROID: Result of sender: ' + JSON.stringify(result));                            // 99
                if (result.canonical_ids === 1 && userToken) {                                                    // 100
                                                                                                                  // 101
                    // This is an old device, token is replaced                                                   // 102
                    Fiber(function(self) {                                                                        // 103
                        // Run in fiber                                                                           // 104
                        try {                                                                                     // 105
                            self.callback(self.oldToken, self.newToken);                                          // 106
                        } catch(err) {                                                                            // 107
                                                                                                                  // 108
                        }                                                                                         // 109
                                                                                                                  // 110
                    }).run({                                                                                      // 111
                        oldToken: { androidToken: userToken },                                                    // 112
                        newToken: { androidToken: result.results[0].registration_id },                            // 113
                        callback: self.replaceToken                                                               // 114
                    });                                                                                           // 115
                    //self.replaceToken({ androidToken: userToken }, { androidToken: result.results[0].registration_id });
                                                                                                                  // 117
                }                                                                                                 // 118
                // We cant send to that token - might not be registred                                            // 119
                // ask the user to remove the token from the list                                                 // 120
                if (result.failure !== 0 && userToken) {                                                          // 121
                                                                                                                  // 122
                    // This is an old device, token is replaced                                                   // 123
                    Fiber(function(self) {                                                                        // 124
                        // Run in fiber                                                                           // 125
                        try {                                                                                     // 126
                            self.callback(self.token);                                                            // 127
                        } catch(err) {                                                                            // 128
                                                                                                                  // 129
                        }                                                                                         // 130
                                                                                                                  // 131
                    }).run({                                                                                      // 132
                        token: { androidToken: userToken },                                                       // 133
                        callback: self.removeToken                                                                // 134
                    });                                                                                           // 135
                    //self.replaceToken({ androidToken: userToken }, { androidToken: result.results[0].registration_id });
                                                                                                                  // 137
                }                                                                                                 // 138
                                                                                                                  // 139
            }                                                                                                     // 140
        });                                                                                                       // 141
        // /** Use the following line if you want to send the message without retries                             // 142
        // sender.sendNoRetry(message, userTokens, function (result) {                                            // 143
        //     console.log('ANDROID: ' + JSON.stringify(result));                                                 // 144
        // });                                                                                                    // 145
        // **/                                                                                                    // 146
    }; // EO sendAndroid                                                                                          // 147
                                                                                                                  // 148
    self.initFeedback = function() {                                                                              // 149
        var apn = Npm.require('apn');                                                                             // 150
                                                                                                                  // 151
        var feedbackOptions = {                                                                                   // 152
            "batchFeedback": true,                                                                                // 153
            "interval": 1000,                                                                                     // 154
            'address': 'feedback.push.apple.com'                                                                  // 155
        };                                                                                                        // 156
                                                                                                                  // 157
        var feedback = new apn.Feedback(feedbackOptions);                                                         // 158
        feedback.on("feedback", function(devices) {                                                               // 159
            devices.forEach(function(item) {                                                                      // 160
                // Do something with item.device and item.time;                                                   // 161
                //console.log('A:PUSH FEEDBACK ' + item.device + ' - ' + item.time);                              // 162
            });                                                                                                   // 163
        });                                                                                                       // 164
    };                                                                                                            // 165
                                                                                                                  // 166
                                                                                                                  // 167
    return self;                                                                                                  // 168
};                                                                                                                // 169
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);
