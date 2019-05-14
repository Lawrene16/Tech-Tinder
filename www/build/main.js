webpackJsonp([0],{

/***/ 152:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_chat_chat_service__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_message_model__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_message_message_service__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_user_user_service__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ChatPage = (function () {
    function ChatPage(authService, chatService, messageService, navCtrl, navParams, userService) {
        this.authService = authService;
        this.chatService = chatService;
        this.messageService = messageService;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userService = userService;
    }
    ChatPage.prototype.ionViewCanEnter = function () {
        return this.authService.authenticated;
    };
    ChatPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.recipient = this.navParams.get('recipientUser'); //recebe de parametro na home.ts
        this.pageTitle = this.recipient.name;
        this.userService.currentUser
            .first()
            .subscribe(function (currentUser) {
            _this.sender = currentUser;
            // pega os chats para o remetente e para o destinatário
            _this.chat1 = _this.chatService.getDeepChat(_this.sender.$key, _this.recipient.$key);
            _this.chat2 = _this.chatService.getDeepChat(_this.recipient.$key, _this.sender.$key);
            // atualizar a foto do usuário
            if (_this.recipient.photo) {
                _this.chat1
                    .first()
                    .subscribe(function (chat) {
                    _this.chatService.updatePhoto(_this.chat1, chat.photo, _this.recipient.photo);
                });
            }
            var doSubscription = function () {
                _this.messages.subscribe(function (messages) {
                    _this.scrollToBottom();
                });
            };
            var updateSenderReadMessage = function () {
                _this.messages.subscribe(function (message) {
                    message.filter(function (msg) {
                        if ((msg.read == false || msg.read == undefined) && msg.userId != _this.sender.$key) {
                            _this.messageService.setMessageRead(_this.sender.$key, _this.recipient.$key, msg.$key);
                        }
                    });
                });
            };
            var updateRecipientReadMessage = function () {
                _this.messages.subscribe(function (message) {
                    message.filter(function (msg) {
                        if ((msg.read == false || msg.read == undefined) && msg.userId != _this.sender.$key) {
                            _this.messageService.setMessageRead(_this.recipient.$key, _this.sender.$key, msg.$key);
                        }
                    });
                });
            };
            //  busca de mensagens do chat: (tem q ver se a ordem do usuario está certa
            //  as vezes o remetente (id 1) na vdd é o destinatário (id 2) e vice-versa
            _this.messages = _this.messageService.getMessages(_this.sender.$key, _this.recipient.$key);
            //verifica se há alguma mensagem nesse tipo de chat
            _this.messages
                .first()
                .subscribe(function (messageList) {
                if (messageList.length === 0) {
                    //faz a busca com os ID's trocados de ordem
                    _this.messages = _this.messageService.getMessages(_this.recipient.$key, _this.sender.$key);
                    updateRecipientReadMessage();
                }
                else {
                    // se o NÓ do chat é o ID do sender primeiro dps o do recipient
                    updateSenderReadMessage();
                }
                doSubscription();
            });
        });
    };
    ChatPage.prototype.sendMessage = function (newMessage) {
        var _this = this;
        if (newMessage) {
            var currentTimeStamp_1 = __WEBPACK_IMPORTED_MODULE_7_firebase___default.a.database.ServerValue.TIMESTAMP;
            this.messageService
                .create(// parametros do metodo create
            new __WEBPACK_IMPORTED_MODULE_4__models_message_model__["a" /* Message */](this.sender.$key, newMessage, currentTimeStamp_1, false), this.messages).then(function () {
                //atualiza lastMessage e timestamp dos 2 chats
                _this.chat1
                    .update({
                    lastMessage: newMessage,
                    timeStamp: currentTimeStamp_1
                });
                _this.chat2
                    .update({
                    lastMessage: newMessage,
                    timeStamp: currentTimeStamp_1
                });
            });
        }
    };
    // parametro opcional de duração da animação
    ChatPage.prototype.scrollToBottom = function (duration) {
        var _this = this;
        setTimeout(function () {
            if (_this.content) {
                _this.content.scrollToBottom(duration || 300);
            }
        }, 50);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */])
    ], ChatPage.prototype, "content", void 0);
    ChatPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-chat',template:/*ion-inline-start:"/home/lawrene/Tech-Tinder/src/pages/chat/chat.html"*/'<ion-header>\n\n  <custom-logged-header [title]="pageTitle" [user]="recipient"></custom-logged-header>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-list no-lines>\n    <!-- <ion-item *ngFor="let message of messages | async">{{message.text}}</ion-item> -->\n    <message-box *ngFor="let message of messages | async" [message]="message" \n                  [isFromSender]="(message.userId == sender.$key)" [alreadyRead]="(message.read)">\n                  <!-- Se o id do usuario (sender.$key) for igual ao id do dono da mensagem (message.userId)\n                       então vai retornar true -->\n    </message-box>\n  </ion-list>\n</ion-content>\n\n<ion-footer>\n\n  <ion-toolbar>\n    <ion-item no-lines>\n      <ion-input type="text" (keyup.enter)="sendMessage(newMessage); newMessage = \'\' "\n                 placeholder="Type here..." [(ngModel)]="newMessage">\n                 <!-- key up detecta se pressionar enter ativa a funçao de enviar msg -->\n      </ion-input>\n      <button ion-button item-right (click)="sendMessage(newMessage); newMessage = \'\' "> \n        <!-- dps q chamar a funçao, o new message vira uma string vazia-->\n        <ion-icon name="send"></ion-icon>\n      </button>\n    </ion-item>\n  </ion-toolbar>\n\n</ion-footer>'/*ion-inline-end:"/home/lawrene/Tech-Tinder/src/pages/chat/chat.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_auth_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_3__providers_chat_chat_service__["a" /* ChatService */],
            __WEBPACK_IMPORTED_MODULE_5__providers_message_message_service__["a" /* MessageService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_6__providers_user_user_service__["a" /* UserService */]])
    ], ChatPage);
    return ChatPage;
}());

//# sourceMappingURL=chat.js.map

/***/ }),

/***/ 153:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SigninPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular_components_loading_loading_controller__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__signup_signup__ = __webpack_require__(154);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var SigninPage = (function () {
    function SigninPage(alertCtrl, authService, formBuilder, loadingCtrl, navCtrl, navParams) {
        this.alertCtrl = alertCtrl;
        this.authService = authService;
        this.formBuilder = formBuilder;
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.firedata = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database();
        var emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        this.signinForm = this.formBuilder.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern(emailRegex)])],
            password: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(6)]]
        });
    }
    SigninPage.prototype.onSignUp = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__signup_signup__["a" /* SignupPage */]);
    };
    SigninPage.prototype.onSubmit = function () {
        var _this = this;
        var loading = this.showLoading(); // retorna o loading
        var user = this.signinForm.value;
        this.authService.signInWithEmail(user)
            .then(function (isLogged) {
            if (isLogged) {
                console.log(user);
                // this.firedata.ref('/users').orderByChild('value').once('value', (snapshot) => {
                //   let result = snapshot.val();
                //   let temparr = [];
                //   for (var key in result) {
                //     temparr.push(result[key]);
                //   }
                //   temparr.forEach((fireuser) => {
                //     console.log(fireuser);
                //   });
                // })
                // this.navCtrl.setRoot(HomePage);
                loading.dismiss();
            }
        })
            .catch(function (er) {
            loading.dismiss();
            _this.showAlert(er);
        });
    };
    SigninPage.prototype.showLoading = function () {
        var loading = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loading.present();
        return loading;
    };
    SigninPage.prototype.showAlert = function (message) {
        this.alertCtrl.create({
            message: message,
            buttons: ['Ok']
        }).present();
    };
    SigninPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-signin',template:/*ion-inline-start:"/home/lawrene/Tech-Tinder/src/pages/signin/signin.html"*/'<ion-content padding>\n\n    <br>\n    <br>\n    <br>\n    <p align="center">\n      <img src="../../assets/icon.png" height="110">\n      <!-- <b style="font-size: 35px; color: white">ech-Tinder</b> -->\n    </p>\n  \n    <br>\n\n  <form (ngSubmit)="onSubmit()" [formGroup]="signinForm">\n\n      <ion-item class="listt">\n          <ion-label floating>E-mail or Phone</ion-label>\n          <ion-input type="email" formControlName="email"></ion-input>\n        </ion-item>\n    \n        <ion-item class="listt">\n            <ion-label floating>Password</ion-label>\n            <ion-input type="password" formControlName="password"></ion-input>          \n        </ion-item>\n\n        <button  ion-button type="submit" [disabled]="signinForm.invalid" class="btn success">SIGN IN</button>\n    \n  </form>\n  \n    <!-- <p align="center"><b >Or</b></p> -->\n    <button ion-button \n    block style="border-radius: 5px;\n    margin-top: 20px;\n    margin-left: 30px;\n    width: 75vw;" \n    color="testone">\n    <ion-icon style="font-size: 30px;\n     position: absolute; left: 20px;" name="logo-linkedin"></ion-icon>                    \n     Sign in with LinkedIn\n</button>\n\n    <br>\n    <br>\n    \n    <div>\n      <b class="forgotp">FORGOT PASSWORD?</b>\n      <b class="joinn" (click)="onSignUp()">JOIN NOW</b>\n    </div>\n\n\n\n\n\n</ion-content>\n'/*ion-inline-end:"/home/lawrene/Tech-Tinder/src/pages/signin/signin.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular_components_loading_loading_controller__["a" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], SigninPage);
    return SigninPage;
}());

//# sourceMappingURL=signin.js.map

/***/ }),

/***/ 154:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase_app__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_alert_alert_controller__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular_components_loading_loading_controller__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_auth_auth_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_user_user_service__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__tabsclient_tabsclient__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__setupprofile_setupprofile__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_geolocation__ = __webpack_require__(95);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








// import { User } from '../../models/user.model';


// import { emailValidator } from '../../validators/email';

var SignupPage = (function () {
    function SignupPage(alertCtrl, authService, // service de criação de usuario de autenticação
        formBuilder, // para trabalhar com formulário
        loadingCtrl, // mostrar o loading
        navCtrl, navParams, geolocation, userService) {
        this.alertCtrl = alertCtrl;
        this.authService = authService;
        this.formBuilder = formBuilder;
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.geolocation = geolocation;
        this.userService = userService;
        this.checkingEmail = true;
        this.firedata = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["database"]();
        this.cardbackgroundr = "#ffffff";
        this.cardbackgroundf = "#ffffff";
        this.cardtextf = "#000000";
        this.cardtextr = "#000000";
        // variavel com a expressão regular de validação de e-mail
        // let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.signupForm = this.formBuilder.group({
            // o primeiro item do array é o valor inicial, o segundo é o array de validators
            name: ['', [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].minLength(3)]],
            username: ['', [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].minLength(3)]],
            // email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)]), emailValidator.checkEmail ], // validator tem q ser obrigatório E seguir a expressão regular do emailRegex
            email: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].pattern(emailRegex)])],
            password: ['', [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].minLength(6)]],
        });
    }
    SignupPage.prototype.isRecruiter = function () {
        this.userType = "recruiter";
        this.cardbackgroundr = "#006096";
        this.cardbackgroundf = "#ffffff";
        this.cardtextr = "#ffffff";
        this.cardtextf = "#000000";
    };
    SignupPage.prototype.isFreelancer = function () {
        this.userType = "freelancer";
        this.cardbackgroundf = "#006096";
        this.cardbackgroundr = "#ffffff";
        this.cardtextf = "#ffffff";
        this.cardtextr = "#000000";
    };
    SignupPage.prototype.onSubmit = function () {
        var _this = this;
        var loading = this.showLoading();
        // para pegar os atributos do formulario: this.signupForm.value (retorna o objeto inteiro)
        // let user: User = this.signupForm.value; não é mais do tipo User pq tirou a senha do model
        var formUser = this.signupForm.value;
        var username = formUser.username;
        var fullname = formUser.name;
        this.userService.userExists(username) // retorna um observable
            .first() // recebe o primeiro valor recebido pelo observable, o resto será ignorado
            .subscribe(function (userExists) {
            if (!userExists) {
                _this.authService.createAuthUser({
                    // cria o objeto de usuario para criar um usuário de autenticação no service Auth
                    email: formUser.email,
                    password: formUser.password,
                }).then(function (authState) {
                    //depois de cadastrar o usuário de autenticação:
                    // pra não ter que passar o atributo PASSWORD do objeto formUser, tem q deletar este atributo
                    delete formUser.password;
                    // tem q adicionar o uid (id Único) criado na criação de usuário de autenticação (funçao createAuthUser)
                    // formUser.uid = authState.auth.uid;
                    var userUniqueId = authState.auth.uid;
                    _this.userService.create(formUser, userUniqueId) // cria usuario (nó no database)
                        .then(function () {
                        _this.geolocation.getCurrentPosition().then(function (resp) {
                            console.log(resp.coords);
                            console.log(_this.userType);
                            _this.firedata.ref('/users').child(userUniqueId).update({
                                userType: _this.userType,
                                uid: userUniqueId,
                                lat: resp.coords.latitude,
                                lng: resp.coords.longitude
                            }).then(function () {
                                loading.dismiss();
                                if (_this.userType == "freelancer") {
                                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_9__setupprofile_setupprofile__["a" /* SetupprofilePage */], { "fullname": fullname });
                                }
                                else if (_this.userType == "recruiter") {
                                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__tabsclient_tabsclient__["a" /* TabsclientPage */]);
                                }
                            });
                        }).catch(function (err) {
                            _this.showAlert(err);
                        });
                    }).catch(function (error) {
                        loading.dismiss();
                        _this.showAlert(error);
                    });
                }).catch(function (error) {
                    loading.dismiss();
                    _this.showAlert(error);
                });
            }
            else {
                _this.showAlert("Username already in use! Pick another one.");
                loading.dismiss();
            }
        });
    };
    SignupPage.prototype.showLoading = function () {
        var loading = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loading.present();
        return loading;
    };
    SignupPage.prototype.showAlert = function (message) {
        this.alertCtrl.create({
            message: message,
            buttons: ['Ok']
        }).present();
    };
    SignupPage.prototype.alreadyaMember = function () {
        this.navCtrl.pop();
    };
    SignupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-signup',template:/*ion-inline-start:"/home/lawrene/Tech-Tinder/src/pages/signup/signup.html"*/'<ion-content padding>\n    <p align="center">\n        <img src="../../assets/icon.png" height="110">\n        <!-- <b style="font-size: 35px; color: white">ech-Tinder</b> -->\n      </p>\n\n  <form (ngSubmit)="onSubmit()" [formGroup]="signupForm">\n  \n    <ion-item [class.invalid]="!signupForm.controls.name.valid && signupForm.controls.name.dirty">\n      <ion-icon [class.invalid-icon]="!signupForm.controls.name.valid && signupForm.controls.name.dirty" name="person" item-left color="primary"></ion-icon>\n      <ion-input type="text" placeholder="Name" formControlName="name"></ion-input>\n    </ion-item>\n    <ion-item *ngIf="!signupForm.controls.name.valid  && signupForm.controls.name.dirty">\n      <p class="invalid-icon" *ngIf="signupForm.controls.name.errors.required">Please enter a valid name.</p>\n      <p class="invalid-icon" *ngIf="signupForm.controls.name.errors.minlength">Your name must have at least 3 characteres</p>\n    </ion-item>\n    \n    <ion-item [class.invalid]="!signupForm.controls.username.valid && signupForm.controls.username.dirty">\n      <ion-icon [class.invalid-icon]="!signupForm.controls.username.valid && signupForm.controls.username.dirty" name="at" item-left color="primary"></ion-icon>\n      <ion-input type="text" placeholder="Username" formControlName="username"></ion-input>\n    </ion-item>\n    <ion-item *ngIf="!signupForm.controls.username.valid  && (signupForm.controls.username.dirty || signupForm.controls.username.touched)">\n      <p class="invalid-icon" *ngIf="signupForm.controls.username.errors.required">Please enter a valid username.</p>\n      <p class="invalid-icon" *ngIf="signupForm.controls.username.errors.minlength">Your username must have at least 3 characteres.</p>\n    </ion-item>\n    \n    <ion-item [class.invalid]="!signupForm.controls.email.valid && signupForm.controls.email.dirty">\n      <ion-icon [class.invalid-icon]="!signupForm.controls.email.valid && signupForm.controls.email.dirty" name="mail" item-left color="primary"></ion-icon>\n      <ion-input type="email" placeholder="Email" formControlName="email"></ion-input> \n    </ion-item>\n    <ion-item *ngIf="!signupForm.controls.email.valid && (signupForm.controls.email.dirty || signupForm.controls.email.touched)">\n      <p class="invalid-icon" *ngIf="!signupForm.controls.email.pending">Please enter a valid email.</p>\n    </ion-item>\n    <!-- <ion-item *ngIf="signupForm.controls.email.pending">\n      <p>Checking email</p>\n    </ion-item> -->\n    \n    <ion-item [class.invalid]="!signupForm.controls.password.valid && signupForm.controls.password.dirty">\n      <ion-icon [class.invalid-icon]="!signupForm.controls.password.valid && signupForm.controls.password.dirty" name="lock" item-left color="primary"></ion-icon>\n      <ion-input type="password" placeholder="Password" formControlName="password"></ion-input>\n    </ion-item>\n    <ion-item *ngIf="!signupForm.controls.password.valid  && (signupForm.controls.password.dirty || signupForm.controls.password.touched)">\n      <p class="invalid-icon" *ngIf="signupForm.controls.password.errors.required">Please enter a valid password.</p>\n      <p class="invalid-icon" *ngIf="signupForm.controls.password.errors.minlength">Your password must have at least 6 characters.</p>\n    </ion-item>\n    <br>\n\n    <h5 style="text-align: center; opacity: 0.7">I want to be a </h5>\n    <ion-grid>\n      <ion-row>\n        <ion-col>\n            <ion-card\n            [ngStyle]="{\'background-color\': cardbackgroundr}"\n            (click)="isRecruiter()"\n             class="choosecard">\n             <h2 \n            [ngStyle]="{\'color\': cardtextr}"             \n             style="opacity: 0.8">Recruiter\n            </h2></ion-card>\n        </ion-col>\n        <ion-col>\n            <ion-card \n            [ngStyle]="{\'background-color\': cardbackgroundf}"            \n            (click)="isFreelancer()" class="choosecard">\n            <h2\n            [ngStyle]="{\'color\': cardtextf}"             \n             style="opacity: 0.8">Freelancer</h2>\n          </ion-card>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n\n    \n\n    <button ion-button block class="btn success" type="submit" [disabled]="signupForm.invalid">Create Account</button>\n    <!-- se o signupForm for inválido, vai retornar TRUE e DESABILITAR o botão -->\n    \n  </form>\n\n  <button ion-button \n  (click)="linkedinsignup()"\n  block style="border-radius: 5px;\n  margin-top: 20px;\n  margin-left: 30px;\n  width: 75vw;" \n  color="testone">\n  <ion-icon style="font-size: 30px;\n   position: absolute; left: 20px;" name="logo-linkedin"></ion-icon>                    \n   Join now with LinkedIn!\n</button>\n\n<br>\n    <div>\n      <!-- <b class="forgotp">F?</b> -->\n      <b class="joinn" (click)="alreadyaMember()">ALREADY A MEMBER?</b>\n    </div>\n\n  \n</ion-content>\n'/*ion-inline-end:"/home/lawrene/Tech-Tinder/src/pages/signup/signup.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_alert_alert_controller__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_alert_alert_controller__["a" /* AlertController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_6__providers_auth_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__providers_auth_auth_service__["a" /* AuthService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5_ionic_angular_components_loading_loading_controller__["a" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5_ionic_angular_components_loading_loading_controller__["a" /* LoadingController */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_10__ionic_native_geolocation__["a" /* Geolocation */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_10__ionic_native_geolocation__["a" /* Geolocation */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_7__providers_user_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__providers_user_user_service__["a" /* UserService */]) === "function" && _h || Object])
    ], SignupPage);
    return SignupPage;
    var _a, _b, _c, _d, _e, _f, _g, _h;
}());

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 155:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_chat_chat_service__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_user_user_service__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__chat_chat__ = __webpack_require__(152);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ChatsPage = (function () {
    function ChatsPage(navCtrl, chatService, userService, // injeta o user service
        navParams) {
        // console.log(this.chats);
        this.navCtrl = navCtrl;
        this.chatService = chatService;
        this.userService = userService;
        this.navParams = navParams;
    }
    ChatsPage.prototype.ionViewDidLoad = function () {
        this.chats = this.chatService.chats;
        console.log(this.chats);
    };
    ChatsPage.prototype.onChatOpen = function (chat) {
        var _this = this;
        var recipientUserId = chat.$key; // recebe o ID do usuario destinatário
        this.userService.getUser(recipientUserId)
            .first()
            .subscribe(function (user) {
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__chat_chat__["a" /* ChatPage */], {
                recipientUser: user // envia o parametro que é o destinatário da mensagem pra pagina ChatPage
            });
        });
    };
    ChatsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-chats',template:/*ion-inline-start:"/home/lawrene/Tech-Tinder/src/pages/chats/chats.html"*/'<ion-header>\n  <ion-navbar color="light">\n    <ion-buttons start>\n      <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    </ion-buttons>\n\n    <ion-buttons end>\n      <button ion-button icon-only (click)="openSecondModal()">\n          <ion-icon  class="icon ion-home custom-icon" name="ios-search"></ion-icon>\n      </button>\n  </ion-buttons>\n    <ion-title>Chats</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n\n<ion-content padding>\n\n    <ion-list no-lines> <!-- se o view for o CHATS -->\n      <button ion-item *ngFor="let chat of chats | async" (click)="onChatOpen(chat)">\n        <ion-avatar item-start>\n          <img [src]="chat.photo || \'assets/imgs/no-photo.jpg\'">\n        </ion-avatar>\n        <h2>{{ chat.title }}</h2>\n        <!-- se c.lastMessage for FALSE, ele cai no else, que vai chamar o elemento abaixo (através do #) -->\n        <!-- <p *ngIf="chat.lastMessage; else customMessage"> {{ chat.timeStamp | date: \'dd/MM/yyyy HH:mm\'}} - {{ chat.lastMessage }}</p>\n        <ng-template #customMessage>\n          <p>No messages.</p>\n        </ng-template> -->\n        <p *ngIf="chat.lastMessage"> {{ chat.timeStamp | date: \'dd/MM/yyyy HH:mm\'}} - {{ chat.lastMessage }}</p>\n        <p *ngIf="!chat.lastMessage">No messages.</p>\n      </button>\n    </ion-list>\n\n</ion-content>\n'/*ion-inline-end:"/home/lawrene/Tech-Tinder/src/pages/chats/chats.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_chat_chat_service__["a" /* ChatService */],
            __WEBPACK_IMPORTED_MODULE_3__providers_user_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], ChatsPage);
    return ChatsPage;
}());

//# sourceMappingURL=chats.js.map

/***/ }),

/***/ 156:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsfreelancerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__chats_chats__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__jobs_jobs__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__profilefreelancer_profilefreelancer__ = __webpack_require__(284);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TabsfreelancerPage = (function () {
    function TabsfreelancerPage() {
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_2__jobs_jobs__["a" /* JobsPage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_1__chats_chats__["a" /* ChatsPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_3__profilefreelancer_profilefreelancer__["a" /* ProfilefreelancerPage */];
    }
    TabsfreelancerPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/home/lawrene/Tech-Tinder/src/pages/tabsfreelancer/tabsfreelancer.html"*/'<ion-tabs>\n    <ion-tab [root]="tab1Root" tabTitle="Jobs" tabIcon="ios-briefcase"></ion-tab>\n    <ion-tab [root]="tab2Root" tabTitle="Chats" tabIcon="ios-chatbubbles"></ion-tab>\n    <ion-tab [root]="tab3Root" tabTitle="Profile" tabIcon="ios-contact"></ion-tab>\n</ion-tabs>'/*ion-inline-end:"/home/lawrene/Tech-Tinder/src/pages/tabsfreelancer/tabsfreelancer.html"*/,
        }),
        __metadata("design:paramtypes", [])
    ], TabsfreelancerPage);
    return TabsfreelancerPage;
}());

//# sourceMappingURL=tabsfreelancer.js.map

/***/ }),

/***/ 157:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__signup_signup__ = __webpack_require__(154);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ModalPage = (function () {
    function ModalPage(navCtrl, view, element, navParams) {
        this.navCtrl = navCtrl;
        this.view = view;
        this.element = element;
        this.navParams = navParams;
        this.writeup = "";
        this.callback = this.navParams.get('callback');
    }
    ModalPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ModalPage');
    };
    ModalPage.prototype.goPrevious = function () {
        var _this = this;
        this.callback(this.writeup).then(function () {
            _this.navCtrl.pop();
        });
    };
    ModalPage.prototype.doit = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__signup_signup__["a" /* SignupPage */]);
    };
    ModalPage.prototype.autoSizeDescription = function () {
        var textArea = this.element.nativeElement.getElementsByTagName('textarea')[0];
        textArea.style.overflow = 'hidden';
        textArea.style.height = 'auto';
        textArea.style.height = textArea.scrollHeight + 'px';
        return;
    };
    ModalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-modal',template:/*ion-inline-start:"/home/lawrene/Tech-Tinder/src/pages/modal/modal.html"*/'<!--\n  Generated template for the ModalPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n    <ion-navbar color="light">\n      <ion-title>Write about yourself</ion-title>\n    </ion-navbar>\n  </ion-header>\n  \n  <ion-content padding>\n      <!-- <ion-textarea style="height: 40vh" placeholder="Write about yourself here">\n  \n      </ion-textarea> -->\n  \n      <ion-textarea placeholder="Write about yourself here" type="text" [(ngModel)]="writeup" (input)="autoSizeDescription($event);"></ion-textarea>\n  \n  \n      <button ion-button block (click)="goPrevious()">Save</button>\n  </ion-content>\n  '/*ion-inline-end:"/home/lawrene/Tech-Tinder/src/pages/modal/modal.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], ModalPage);
    return ModalPage;
}());

//# sourceMappingURL=modal.js.map

/***/ }),

/***/ 158:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return User; });
var User = (function () {
    function User(name, username, email, 
        // public password: string,
        // public uid: string, // como não precisamos conhecer a senha do usuário, substituimos a senha pelo ID
        photo) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.photo = photo;
    }
    ;
    return User;
}());

//# sourceMappingURL=user.model.js.map

/***/ }),

/***/ 168:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 168;

/***/ }),

/***/ 208:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 208;

/***/ }),

/***/ 276:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Message; });
var Message = (function () {
    function Message(userId, text, timeStamp, read) {
        this.userId = userId;
        this.text = text;
        this.timeStamp = timeStamp;
        this.read = read;
    }
    return Message;
}());

//# sourceMappingURL=message.model.js.map

/***/ }),

/***/ 277:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessageService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__base_base_service__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2__ = __webpack_require__(83);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MessageService = (function (_super) {
    __extends(MessageService, _super);
    function MessageService(http, af) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.af = af;
        return _this;
    }
    MessageService.prototype.getMessages = function (userId1, userId2) {
        return this.af.database.list("/messages/" + userId1 + "-" + userId2, {
            query: {
                orderByChild: 'timeStamp',
                limitToLast: 30 //limita em pegar as ultimas 30 mensagens
            }
        }).catch(this.handleObservableError);
    };
    MessageService.prototype.setMessageRead = function (userId1, userId2, messageId) {
        // this.af.database.list(`/messages/${userId1}-${userId2}/${messageId}`)
        this.af.database.list("/messages/" + userId1 + "-" + userId2)
            .update(messageId, {
            read: true
        });
    };
    MessageService.prototype.create = function (message, listMessages) {
        return listMessages.push(message)
            .catch(this.handlePromiseError);
    };
    MessageService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_4_angularfire2__["a" /* AngularFire */]])
    ], MessageService);
    return MessageService;
}(__WEBPACK_IMPORTED_MODULE_3__base_base_service__["a" /* BaseService */]));

//# sourceMappingURL=message.service.js.map

/***/ }),

/***/ 278:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return baseComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_signin_signin__ = __webpack_require__(153);

// import { App } from 'ionic-angular/components/app/app';
// import { MenuController } from 'ionic-angular/components/app/menu-controller';
var baseComponent = (function () {
    /*  Pode utilizar este component dentro de um menu ou header da página
        Pois pega a navegação atual (ngOnInit) */
    function baseComponent(alertCtrl, authService, app, menuCtrl) {
        this.alertCtrl = alertCtrl;
        this.authService = authService;
        this.app = app;
        this.menuCtrl = menuCtrl;
    }
    baseComponent.prototype.ngOnInit = function () {
        // this.navCtrl = this.app.getActiveNav(); // recebe o navController usado
        this.navCtrl = this.app.getActiveNavs()[0];
    };
    baseComponent.prototype.onLogOut = function () {
        var _this = this;
        this.alertCtrl.create({
            message: "Do you wanna quit?",
            buttons: [
                {
                    text: "Yes",
                    handler: function () {
                        _this.authService.logOut()
                            .then(function () {
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_0__pages_signin_signin__["a" /* SigninPage */]);
                            _this.menuCtrl.enable(false, 'user-menu');
                        });
                    }
                },
                { text: "No" }
            ]
        }).present(); // apresenta o alert
    };
    return baseComponent;
}());

//# sourceMappingURL=base.component.js.map

/***/ }),

/***/ 279:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShortlistedPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ShortlistedPage = (function () {
    function ShortlistedPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    ShortlistedPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ShortlistedPage');
    };
    ShortlistedPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-shortlisted',template:/*ion-inline-start:"/home/lawrene/Tech-Tinder/src/pages/shortlisted/shortlisted.html"*/'<ion-header>\n    <ion-navbar color="light">\n      <ion-buttons start>\n        <button ion-button menuToggle>\n        <ion-icon name="menu"></ion-icon>\n      </button>\n      </ion-buttons>\n  \n      <ion-buttons end>\n        <button ion-button icon-only (click)="openSecondModal()">\n            <ion-icon  class="icon ion-home custom-icon" name="ios-search"></ion-icon>\n        </button>\n    </ion-buttons>\n      <ion-title>Shortlisted</ion-title>\n    </ion-navbar>\n  </ion-header>\n  \n  \n  <ion-content>\n  \n      <ion-list>\n  \n  \n        <ion-card>\n          <ion-item  (click)="gotoChat(user)">\n            <ion-avatar item-left>\n              <img src="../../assets/one.jpg">\n            </ion-avatar>\n            <b>Edung Divine (Expert iOS Developer)</b>\n            <p>Have you started to make the designs</p>\n          </ion-item>\n  \n        </ion-card>\n  \n  \n        <ion-card>\n          <ion-item  (click)="gotoChat(user)">\n            <ion-avatar item-left>\n              <img src="../../assets/three.jpg">\n            </ion-avatar>\n            <b>Edung Divine (Expert iOS Developer)</b>\n            <p>Have you started to make the designs</p>\n          </ion-item>\n  \n        </ion-card>\n        <ion-card>\n          <ion-item  (click)="gotoChat(user)">\n            <ion-avatar item-left>\n              <img src="../../assets/three.jpg">\n            </ion-avatar>\n            <b>Edung Divine (Expert iOS Developer)</b>\n            <p>Have you started to make the designs</p>\n          </ion-item>\n  \n        </ion-card>\n        </ion-list>\n  </ion-content>\n  '/*ion-inline-end:"/home/lawrene/Tech-Tinder/src/pages/shortlisted/shortlisted.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], ShortlistedPage);
    return ShortlistedPage;
}());

//# sourceMappingURL=shortlisted.js.map

/***/ }),

/***/ 280:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FreelancersPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__detailsfreelancer_detailsfreelancer__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(253);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_auth_auth_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__ = __webpack_require__(95);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var FreelancersPage = (function () {
    function FreelancersPage(navCtrl, keyboard, authService, storage, geolocation, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.keyboard = keyboard;
        this.authService = authService;
        this.storage = storage;
        this.geolocation = geolocation;
        this.loadingCtrl = loadingCtrl;
        this.firedata = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database();
        this.firebaseArray = [];
        this.markerslist = [];
        this.zoomvalue = 20;
        this.radius = 0;
        this.num = 20;
        this.list = ['Android',
            'UI',
            'Photoshop',
            'Excel',
            'Xcode',
            'Ionic',
            'Visual Studio',
            'React',
            'Vue',
            'iOS',
            'Project Management',
            'Swift'];
        this.searchedtag = '';
        this.countries = [];
        Window["myComponent"] = this;
    }
    FreelancersPage.prototype.add = function (item, i) {
        this.countries = [];
        this.searchedtag = item;
    };
    FreelancersPage.prototype.ionViewCanEnter = function () {
        return this.authService.authenticated;
    };
    FreelancersPage.prototype.search = function () {
        var _this = this;
        if (!this.searchedtag.trim().length || !this.keyboard.isOpen()) {
            this.countries = [];
            return;
        }
        this.countries = this.list.filter(function (item) {
            return item.toUpperCase().includes(_this.searchedtag.toUpperCase());
        });
    };
    FreelancersPage.prototype.removeFocus = function () {
        this.keyboard.close();
    };
    FreelancersPage.prototype.ionViewDidLoad = function () {
        this.loadMap();
    };
    FreelancersPage.prototype.populateMap = function (map) {
        var _this = this;
        this.getdist();
        var icon = {
            url: '../../assets/icon/dot.png',
            scaledSize: new google.maps.Size(40, 40),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 0) // anchor
        };
        var load = this.loadingCtrl.create({
            content: 'Finding Freelancers...',
        });
        load.present();
        this.firedata.ref('/users').orderByChild('mjbmmn').once('value', function (snapshot) {
            var result = snapshot.val();
            var temparr = [];
            for (var key in result) {
                temparr.push(result[key]);
            }
            load.dismiss();
            var contentwindow = new google.maps.InfoWindow({});
            temparr.forEach(function (firebaseSpot) {
                // console.log(firebaseSpot)
                if (firebaseSpot.userType == "freelancer") {
                    var marker = new google.maps.Marker({
                        position: new google.maps.LatLng(firebaseSpot.lat, firebaseSpot.lng),
                        icon: icon,
                        animation: google.maps.Animation.DROP,
                        map: map
                    });
                    _this.markerslist.push(marker);
                    _this.storage.set("clickedmarker", firebaseSpot);
                    var strinh = '<p align="center" id="intitalstring">' +
                        '<b>' + firebaseSpot.name + '</b><br>' +
                        'Hourly rate - ' + firebaseSpot.hourlyRate + '<br>' +
                        'Skills - ' + firebaseSpot.skillsstring + '<br>' +
                        '<br>' +
                        '<button onclick="Window.myComponent.viewProfile()" class="contactbtn">View Profile</button>' +
                        '</p>';
                    marker.addListener('click', function (event) {
                        if (map.getZoom() != _this.zoomvalue && map.getZoom() != _this.zoomvalue) {
                            map.setZoom(16);
                            map.panTo(marker.getPosition());
                        }
                        else if (map.getZoom() == _this.zoomvalue) {
                            contentwindow.setContent(strinh);
                            _this.storage.set("clickedmarker", firebaseSpot);
                            contentwindow.open(map, marker);
                        }
                    });
                }
            });
        }).catch(function (err) {
            alert(err);
        });
    };
    FreelancersPage.prototype.rad = function (x) {
        return x * Math.PI / 180;
    };
    ;
    FreelancersPage.prototype.getDistance = function (p1, p2) {
        var R = 6378137; // Earth’s mean radius in meter
        var dLat = this.rad(p2.lat() - p1.lat());
        var dLong = this.rad(p2.lng() - p1.lng());
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.rad(p1.lat())) * Math.cos(this.rad(p2.lat())) *
                Math.sin(dLong / 2) * Math.sin(dLong / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d; // returns the distance in meter
    };
    FreelancersPage.prototype.viewProfile = function () {
        var _this = this;
        this.storage.get("clickedmarker").then(function (res) {
            // console.log(res);
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__detailsfreelancer_detailsfreelancer__["a" /* DetailsfreelancerPage */], { 'res': res });
        });
    };
    FreelancersPage.prototype.getdist = function () {
        google.maps.LatLng.prototype.distanceFrom = function (latlng) {
            var lat = [this.lat(), latlng.lat()];
            var lng = [this.lng(), latlng.lng()];
            var R = 6378137;
            var dLat = (lat[1] - lat[0]) * Math.PI / 180;
            var dLng = (lng[1] - lng[0]) * Math.PI / 180;
            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat[0] * Math.PI / 180) * Math.cos(lat[1] * Math.PI / 180) *
                    Math.sin(dLng / 2) * Math.sin(dLng / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c;
            return Math.round(d);
        };
    };
    FreelancersPage.prototype.loadMap = function () {
        var _this = this;
        var mapStyle = [
            {
                featureType: "administrative",
                elementType: "labels",
                stylers: [
                    { visibility: "off" }
                ]
            }, {
                featureType: "poi",
                elementType: "labels",
                stylers: [
                    { visibility: "off" }
                ]
            }, {
                featureType: "water",
                elementType: "labels",
                stylers: [
                    { visibility: "off" }
                ]
            }, {
                featureType: "road",
                elementType: "labels",
                stylers: [
                    { visibility: "off" }
                ]
            }
        ];
        this.geolocation.getCurrentPosition().then(function (resp) {
            var latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
            var mapOptions = {
                center: latLng,
                zoom: _this.zoomvalue,
                disableDefaultUI: true,
                mapTypeId: 'terrain'
            };
            _this.map = new google.maps.Map(_this.mapElement.nativeElement, mapOptions);
            _this.map.set('styles', mapStyle);
            _this.addDefaultMarker(_this.map, latLng);
            _this.populateMap(_this.map);
            _this.map.addListener('click', function (e) {
                console.log(_this.map.getZoom());
            });
        }).catch(function (err) {
            alert(err);
        });
    };
    FreelancersPage.prototype.addDefaultMarker = function (map, position) {
        var icon = {
            url: '../../assets/icon/red.png',
            scaledSize: new google.maps.Size(40, 40),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 0) // anchor
        };
        var defmarker = new google.maps.Marker({
            position: position,
            map: map,
            // icon: icon,
            // animation: google.maps.Animation.BOUNCE,
            title: 'Hello World!'
        });
        defmarker.addListener('click', function () {
            map.setZoom(this.zoomvalue);
            map.panTo(defmarker.getPosition());
        });
        // this.circle = new google.maps.Circle({
        //   map: map,
        //   radius: this.radius,    // 10 miles in metres
        //   fillColor: '#AA0000'
        // });
        // this.circle.bindTo('center', defmarker, 'position');
        return defmarker;
    };
    FreelancersPage.prototype.increase = function () {
        this.radius = this.radius + 5;
        if (this.radius >= 0) {
            this.num = this.num - 0.2;
            // this.circle.setRadius(this.radius);
            this.map.setZoom(this.num);
        }
        // this.markerslist.forEach(marker =>{
        // console.log(marker);
        // var loc1 = new google.maps.LatLng(52.5773139, 1.3712427);
        // var loc2 = marker.getPosition();
        // var bla = this.getDistance(loc1, loc2)
        // if(this.radius >= bla){
        //   console.log("is more")
        // }
        // });
        // console.log(this.radius);
    };
    FreelancersPage.prototype.eventHandler = function (keyCode) {
        console.log(keyCode);
        if (keyCode == 13) {
            // this.radius = this.radius - 1;
            console.log(this.radius);
            // this.map.setZoom(this.radius);
        }
    };
    FreelancersPage.prototype.reduce = function () {
        if (this.radius >= 0) {
            this.radius = this.radius - 5;
            this.num = this.num + 0.2;
            // this.circle.setRadius(this.radius);
            this.map.setZoom(this.num);
        }
        // this.markerslist.forEach(marker =>{
        // var loc1 = new google.maps.LatLng(52.5773139, 1.3712427);
        // var loc2 = marker.getPosition();
        // var bla = this.getDistance(loc1, loc2)
        // if(this.radius <= bla){
        //   console.log("is more")
        // }
        // });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('map'),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */]) === "function" && _a || Object)
    ], FreelancersPage.prototype, "mapElement", void 0);
    FreelancersPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-freelancers',template:/*ion-inline-start:"/home/lawrene/Tech-Tinder/src/pages/freelancers/freelancers.html"*/'<!-- <ion-header>\n  <ion-navbar color="transparent">\n    <ion-buttons start>\n      <button ion-button menuToggle>\n      <ion-icon name="menu" color="dark"></ion-icon>\n    </button>\n    </ion-buttons>\n\n    <ion-searchbar class="searchitem"\n    animated="true" \n   placeholder="Search for talents close to you"></ion-searchbar>\n\n    <ion-buttons end>\n      <button ion-button icon-only (click)="openSecondModal()">\n          <ion-icon  class="icon ion-home custom-icon" name="notifications"></ion-icon>\n      </button>\n  </ion-buttons>\n  </ion-navbar>\n</ion-header> -->\n\n<ion-content class="maincontent">\n\n    <ion-fab bottom right (click)="increase()" >\n      <button color="testone" ion-fab mini>\n        <ion-icon name="md-add"></ion-icon>\n      </button>\n    </ion-fab>\n  \n    <ion-input [(ngModel)]="radius" (keypress)="eventHandler($event.keyCode)" class="bottominput" bottom right placeholder="radius">\n        \n    </ion-input>\n  \n    <ion-fab bottom (click)="reduce()" right style="margin-right: 85px">\n      <button color="testone" ion-fab mini>\n        <ion-icon name="md-remove"></ion-icon>\n      </button>\n    </ion-fab>\n  \n  \n  \n    <div  #map id="map">\n    </div>\n  \n  \n    <ion-list class="floatinglist">\n      <ion-item *ngFor="let country of countries" (click)="add(country, i)">\n        {{country}}\n      </ion-item>\n    </ion-list>\n  \n    <ion-card class="headercard">\n      <ion-grid style="height: 50px;">\n        <ion-row>\n          <ion-col col-1>\n          <ion-icon menuToggle style="font-size: 27px; margin-left: 10px; float: left;" \n          name="menu" color="dark"></ion-icon>                      \n          </ion-col>\n  \n          <ion-col>\n            <ion-searchbar animated="true" \n            placeholder="Find talents close to you"\n            (ionChange)="search()"\n            (ionBlur)="removeFocus()"\n            debounce=500 [(ngModel)]="searchedtag" class="mysearch"></ion-searchbar>\n              <!-- <ion-searchbar animated="true" \n          placeholder="Search for talents close to you" class="mysearchbar"></ion-searchbar>-->\n          </ion-col>\n  \n  \n          <ion-col col-1>\n          <ion-icon style="font-size: 27px; \n          margin-right: 10px; float: right;" name="notifications-outline" \n          color="dark"></ion-icon>                                  \n          </ion-col>\n        </ion-row>\n      </ion-grid>\n  \n      <!-- <div>\n          <ion-icon style="font-size: 27px; margin-left: 20px; float: left; margin-top: 1px; margin-bottom: 1px;" name="menu" color="dark"></ion-icon>            \n          <ion-searchbar style="float: left;" animated="true" \n          placeholder="Search for talents close to you" class="mysearchbar"></ion-searchbar>\n      </div>\n           -->\n      </ion-card>\n  \n    <!-- <p align="center" id="intitalstring">\n      <b>Edung Divinefavour</b><br>\n      Hourly rate - $12.5/hr<br>\n      Skills - Android | UI/UX\n      <br>\n      <br>\n      <button onclick="Window.myComponent.viewProfile()" class="contactbtn">View Profile</button>\n    </p> -->\n  </ion-content>\n  '/*ion-inline-end:"/home/lawrene/Tech-Tinder/src/pages/freelancers/freelancers.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Keyboard */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Keyboard */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__providers_auth_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__providers_auth_auth_service__["a" /* AuthService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__["a" /* Geolocation */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__["a" /* Geolocation */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]) === "function" && _g || Object])
    ], FreelancersPage);
    return FreelancersPage;
    var _a, _b, _c, _d, _e, _f, _g;
}());

//# sourceMappingURL=freelancers.js.map

/***/ }),

/***/ 281:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DetailsfreelancerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_chat_chat_service__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_user_user_service__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_chat_model__ = __webpack_require__(621);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__chat_chat__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * Generated class for the DetailsfreelancerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var DetailsfreelancerPage = (function () {
    function DetailsfreelancerPage(navCtrl, authService, chatService, loadingCtrl, menuCtrl, userService, navParams) {
        this.navCtrl = navCtrl;
        this.authService = authService;
        this.chatService = chatService;
        this.loadingCtrl = loadingCtrl;
        this.menuCtrl = menuCtrl;
        this.userService = userService;
        this.navParams = navParams;
        this.res = this.navParams.get('res');
        // console.log(this.res);
        this.fullname = this.res.name;
        this.skills = this.res.skillsstring;
        this.hourlyrate = this.res.hourlyRate;
        this.writeup = this.res.aboutMe;
        this.experiences = this.res.experiences;
        console.log(this.res);
        console.log("this.res");
    }
    DetailsfreelancerPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DetailsfreelancerPage');
    };
    DetailsfreelancerPage.prototype.onChatCreate = function () {
        var _this = this;
        var recipientUser = {
            $key: this.res.uid,
            name: this.res.name,
            username: this.res.username,
            email: this.res.email,
            photo: ''
        };
        this.userService.currentUser.first().subscribe(function (currentUser) {
            // console.log(currentuser);
            console.log(recipientUser);
            console.log(currentUser);
            _this.chatService.getDeepChat(currentUser.$key, recipientUser.$key) //passa o UID dos usuarios  
                .first()
                .subscribe(function (chat) {
                if (chat.hasOwnProperty('$value')) {
                    // se tiver, é que não existe
                    var timestamp = __WEBPACK_IMPORTED_MODULE_7_firebase___default.a.database.ServerValue.TIMESTAMP; // pega o timestamp do servido
                    var chat1 = new __WEBPACK_IMPORTED_MODULE_5__models_chat_model__["a" /* Chat */]('', timestamp, recipientUser.name, (recipientUser.photo || '')); // parametro ultima mensagem e foto vazia
                    _this.chatService.create(chat1, currentUser.$key, recipientUser.$key);
                    var chat2 = new __WEBPACK_IMPORTED_MODULE_5__models_chat_model__["a" /* Chat */]('', timestamp, currentUser.name, (currentUser.photo || ''));
                    _this.chatService.create(chat2, recipientUser.$key, currentUser.$key);
                }
            });
        });
        // this.userService.currentUser  //tem q ter o subscribe por ser uma promise e a gente ficar 'ouvindo' as alteraçoes
        //   .first()
        //   .subscribe((currentUser: User) => {
        //     console.log("currentUser");
        //     // o usuario atual é o current User
        //   }, ((err) =>{
        //     console.log(err);
        //   }))
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__chat_chat__["a" /* ChatPage */], {
            recipientUser: recipientUser // envia o parametro que é o destinatário da mensagem pra pagina ChatPage
        });
    };
    DetailsfreelancerPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-detailsfreelancer',template:/*ion-inline-start:"/home/lawrene/Tech-Tinder/src/pages/detailsfreelancer/detailsfreelancer.html"*/'<ion-header>\n    <ion-navbar ion-fixed align-title="center"  color="light">\n        <ion-title color="primary">  \n          Profile\n        </ion-title>\n    </ion-navbar>\n  </ion-header>\n  \n  \n  <ion-content padding>\n  \n    <p align="center">\n      <!-- <div class="user-photo"> -->\n        <img class="user-photo"\n         src="../../assets/one.jpg">\n      <!-- </div> -->\n    </p>\n\n    <h4 align="center">{{fullname}}</h4>\n    <p align="center">{{skills}}\n    </p>\n\n    <p align="center">Hourly Rate - {{hourlyrate}}</p>\n\n    <ion-grid>\n      <ion-row>\n        <ion-col>\n            <button class="btn" (click)="onChatCreate()">MESSAGE</button>\n        </ion-col>\n\n        <ion-col>\n          <button class="btntwo">\n            SHORTLIST\n      </button>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n\n    <br>\n    <ion-list>\n      <ion-list>\n        <ion-list-header>Last Experience</ion-list-header>\n\n        <ion-item *ngFor="let experience of experiences">\n          <ion-avatar item-left>\n            <img src="../../assets/upwork.png">\n          </ion-avatar>\n          <b>{{experience.role}}</b><br>\n          {{experience.company}}\n        </ion-item>\n\n        <!-- <ion-item>\n            <ion-avatar item-left>\n              <img src="../../assets/upwork.png">\n            </ion-avatar>\n            <b>Android Developer</b><br>\n            Upwork\n          </ion-item> -->\n\n          <br>\n          <ion-list-header>About Edung</ion-list-header>\n          <div style="margin: 15px; font-size: 16px">\n              {{writeup}}\n          </div>\n      </ion-list>\n    </ion-list>\n\n    <!-- <div class="topdiv" >\n  \n      <div style="width: 100%; height: 10vh;"></div>\n      <div align="center"><b style="font-size: 16px; color: white">Expert Cross Platform Developer</b></div> \n      <div align="center" style="font-size: 14px; color: white">\n        <ion-icon></ion-icon>\n        Port Harcourt, Nigeria\n     </div>     \n     <div style="width: 100%; height: 3vh;"></div>\n     \n      <div align="center"><b style="font-size: 16px; margin-top: 10px; color: white">$12.50/hr</b></div> \n      \n      \n      <div class="user-photo">\n        <img src="../../assets/one.jpg">\n      </div>\n  \n  \n      \n      <ion-grid >\n        <ion-row style="padding-left: 110px; margin-top: 5vh">\n                <ion-col col-5>\n                    <div >\n                        <ion-card style="padding: 7px">\n                            Android\n                          </ion-card>\n                    </div>\n                    \n                  </ion-col>\n                    \n                  <ion-col col-4>\n                      <div >\n                          <ion-card style="padding: 7px">\n                              UI/UX\n                            </ion-card>\n                      </div>\n                      \n                    </ion-col>\n\n                   \n        </ion-row>\n      </ion-grid>\n  \n  \n    </div> -->\n<!--   \n    <div style="margin-top: 12vh"></div>\n    <div style="margin: 15px; font-size: 16px">\n        I am an Expert Cross platform Mobile Developer with over 4 years experience building mobile apps with Java, Kotlin, Swift, Objective-C, Ionic and Flutter. \n  \n        I build/maintain/debug mobile apps as a hobby, therefore, I have expert knowledge on a lot of areas and tools that extend the Android and iOS framework to whatever is to be achieved.\n        \n        Quality is very important to me so I always write readable and maintainable codes using best practices, clean architectural principles with reactive approach and MVVM pattern.\n        \n        I always ensure that every product is thoroughly tested on multiple devices before its release. I follow requirements strictly without missing a step and I can also share my ideas if you are nor sure of how something should work.\n        \n        I am reachable on Upwork and through any other means of communication. I am also comfortable working remotely with tools like Teamviewer, Anydesk or goToMeeting.. \n        \n        What matters to me is to actually make your ideas a reality. \n        I will like to be a part of your project and make it a success, nothing gives me more joy. \n        \n        I look forward to working with you\n    </div>\n   -->\n  \n    <!-- <div>\n      <ion-list>\n        \n            <ion-item-divider>\n                Account Info \n                <ion-icon color="white" name="ios-create-outline" \n                \n                item-right></ion-icon>   \n            </ion-item-divider>\n  \n            <ion-item detail-push (click)="showBox(0)">\n                Edung\n                <ion-icon color="white" name="ios-contact-outline" item-left></ion-icon>   \n            </ion-item>\n  \n            <ion-item detail-push (click)="showBox(1)">\n                Divinefavour \n                <ion-icon color="white" name="ios-contact-outline" item-left></ion-icon>   \n            </ion-item>\n  \n            <ion-item detail-push (click)="showBox(2)">\n                lawrenedickson49@gmail.com \n                <ion-icon color="white" name="ios-mail-outline" item-left></ion-icon>   \n            </ion-item>\n  \n  \n  \n  \n  \n            <ion-item-divider>\n                Change Password\n                <ion-icon color="white" name="ios-create-outline" \n                item-right></ion-icon>   \n            </ion-item-divider>\n  \n            <ion-item detail-push (click)="showBox(3)">\n                New Password\n                <ion-icon color="white" name="ios-lock-outline" item-left></ion-icon>   \n            </ion-item>\n  \n            <ion-item detail-push (click)="showBox(4)">\n                Confirm Password \n                <ion-icon color="white" name="ios-lock-outline" item-left></ion-icon>   \n            </ion-item>\n  \n  \n            <ion-item-divider>\n                Connected Accounts\n                <ion-icon color="white" name="ios-create-outline" \n                item-right></ion-icon>   \n            </ion-item-divider>\n  \n      </ion-list>\n    </div> -->\n  \n    \n  </ion-content>\n  '/*ion-inline-end:"/home/lawrene/Tech-Tinder/src/pages/detailsfreelancer/detailsfreelancer.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_3__providers_chat_chat_service__["a" /* ChatService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_user_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], DetailsfreelancerPage);
    return DetailsfreelancerPage;
}());

//# sourceMappingURL=detailsfreelancer.js.map

/***/ }),

/***/ 282:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SetupprofilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase_app__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tabsfreelancer_tabsfreelancer__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modal_modal__ = __webpack_require__(157);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the SetupprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SetupprofilePage = (function () {
    function SetupprofilePage(navCtrl, modalCtrl, keyboard, loadingCtrl, toastCtrl, alertCtrl, navParams) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.keyboard = keyboard;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.firedata = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["database"]();
        this.list = ['Android',
            'UI',
            'Photoshop',
            'Excel',
            'Xcode',
            'Ionic',
            'Visual Studio',
            'React',
            'Vue',
            'iOS',
            'Project Management',
            'Swift'];
        this.input = '';
        this.countries = [];
        this.skillstobeuploaded = [];
        this.isshidden = true;
        this.writeup = "";
        this.experienceslist = [];
        this.shouldhidetext = false;
        this.stringtoupload = "";
        this.shouldhidetexttwo = false;
        this.getData = function (data) {
            return new Promise(function (resolve, reject) {
                resolve();
                console.log(data);
                _this.writeup = data;
                _this.shouldhidetexttwo = true;
            });
        };
        this.fullname = this.navParams.get('fullname');
        this.hourlyrate = '0';
    }
    SetupprofilePage.prototype.add = function (item, i) {
        this.isshidden = false;
        // this.input = item;
        var currentskills = document.getElementById("currentskills");
        // if(this.skillstobeuploaded.length == 0){
        this.skillsstring = item + " | " + currentskills.innerHTML;
        this.stringtoupload = this.stringtoupload + item + ' | ';
        console.log(this.stringtoupload);
        currentskills.innerHTML = this.skillsstring;
        // console.log(item, i);
        this.skillstobeuploaded.push(item);
        this.countries = [];
        this.input = "";
    };
    SetupprofilePage.prototype.removeFocus = function () {
        this.keyboard.close();
    };
    SetupprofilePage.prototype.ionViewDidLoad = function () {
        if (this.writeup.length != 0) {
            this.shouldhidetexttwo = true;
        }
    };
    SetupprofilePage.prototype.search = function () {
        var _this = this;
        if (!this.input.trim().length || !this.keyboard.isOpen()) {
            this.countries = [];
            return;
        }
        this.countries = this.list.filter(function (item) { return item.toUpperCase().includes(_this.input.toUpperCase()); });
    };
    SetupprofilePage.prototype.presentModal = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__modal_modal__["a" /* ModalPage */], {
            // data: this.data,
            callback: this.getData
        });
    };
    SetupprofilePage.prototype.presentToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'top'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    SetupprofilePage.prototype.showBox = function (index) {
        var _this = this;
        var placeholder;
        var type;
        var classtouse;
        switch (index) {
            case 0:
                placeholder = "Full Name";
                type = 'text';
                break;
            case 1:
                placeholder = "Hourly Rate";
                type = 'number';
                break;
            case 3:
                placeholder = "Hourly Rate";
                type = 'number';
                this.presentModal();
                break;
        }
        var inputs = [
            {
                name: 'clickedsumtn',
                placeholder: placeholder,
                type: type
            }
        ];
        if (index == 2) {
            inputs = [
                {
                    name: 'role',
                    placeholder: 'Role',
                    type: 'text'
                },
                {
                    name: 'company',
                    placeholder: 'Company',
                    type: 'text'
                },
            ];
        }
        var alert = this.alertCtrl.create({
            inputs: inputs,
            cssClass: classtouse,
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function (data) {
                    }
                },
                {
                    text: 'Ok',
                    handler: function (data) {
                        switch (index) {
                            case 0:
                                _this.fullname = data.clickedsumtn;
                                break;
                            case 1:
                                _this.hourlyrate = data.clickedsumtn;
                                break;
                            case 2:
                                if (data.role != "" && data.role != null && data.company != "" && data.company != null) {
                                    _this.experienceslist.push({
                                        role: data.role,
                                        company: data.company
                                    });
                                }
                                else if (data.role == "" || data.role == null) {
                                    _this.presentToast("Role Field Cannot be left blank");
                                }
                                else if (data.company == "" || data.company == null) {
                                    _this.presentToast("Company name cannot be left blank");
                                }
                        }
                        if (_this.experienceslist.length != 0) {
                            _this.shouldhidetext = true;
                        }
                    }
                }
            ]
        });
        if (index != 3) {
            alert.present();
        }
        else if (index == 3) {
            alert.dismiss();
        }
    };
    SetupprofilePage.prototype.removeExperience = function (experience, index) {
        this.experienceslist.splice(index, 1);
        console.log(this.experienceslist.length);
        if (this.experienceslist.length == 0) {
            this.shouldhidetext = false;
        }
    };
    SetupprofilePage.prototype.revert = function () {
        // console.log(this.skillstobeuploaded.length);
        console.log(this.skillstobeuploaded[this.skillstobeuploaded.length - 1]);
        this.skillsstring = this.skillsstring.replace(this.skillstobeuploaded[this.skillstobeuploaded.length - 1] + " | ", "");
        this.skillstobeuploaded.splice(this.skillstobeuploaded.length - 1);
        var currentskills = document.getElementById("currentskills");
        currentskills.innerHTML = this.skillsstring;
        if (this.skillstobeuploaded.length == 0) {
            this.isshidden = true;
        }
    };
    SetupprofilePage.prototype.saveprofile = function () {
        var _this = this;
        var load = this.loadingCtrl.create({
            content: 'Setting up your Profile',
        });
        load.present();
        this.firedata.ref('/users').child(__WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"]().currentUser.uid).update({
            hourlyRate: '$' + this.hourlyrate + '/hr',
            skillstags: this.skillstobeuploaded,
            skillsstring: this.stringtoupload,
            experiences: this.experienceslist,
            aboutMe: this.writeup
        }).then(function () {
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__tabsfreelancer_tabsfreelancer__["a" /* TabsfreelancerPage */]);
            load.dismiss();
        }).catch(function (err) {
            _this.presentToast(err);
            load.dismiss();
        });
    };
    SetupprofilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-setupprofile',template:/*ion-inline-start:"/home/lawrene/Tech-Tinder/src/pages/setupprofile/setupprofile.html"*/'<ion-header>\n    <ion-navbar ion-fixed align-title="center"  color="light">\n        <ion-title color="primary">  \n          Setup Your Profile\n        </ion-title>\n    </ion-navbar>\n  </ion-header>\n  \n  \n  <ion-content padding>\n  \n    <p align="center">\n      <!-- <div class="user-photo"> -->\n        <img class="user-photo"\n         src="../../assets/user.png">\n      <!-- </div> -->\n    </p>\n  \n    <div (click)="showBox(0)">\n        <h4 align="center">{{fullname}}\n            <ion-icon item-right name="ios-create-outline"></ion-icon></h4>\n    </div>\n\n    <div [hidden]="isshidden" (click)="revert()">\n        <p style="margin-left: 30px;margin-right:30px" id="currentskills" align="center">\n            <ion-icon item-right name="ios-remove-circle-outline"></ion-icon>\n          </p>\n\n    </div>\n\n    <div (click)="showBox(1)">\n        <p align="center">Hourly Rate - ${{hourlyrate}}/hr\n            <ion-icon item-right name="ios-create-outline"></ion-icon>\n          </p>\n    </div>\n \n    <br>\n      <ion-list>\n\n          <ion-list-header>Skills\n          </ion-list-header>\n\n              <div class="autocomplete">\n                  <ion-item>\n                    <ion-input  type="text" \n                                placeholder="Search skill tags here"\n                                [(ngModel)]="input"\n                                (ionChange)="search()"\n                                (ionBlur)="removeFocus()"\n                                debounce=500>\n                              </ion-input>\n                  </ion-item>\n                  <ion-list>\n                    <ion-item *ngFor="let country of countries" (click)="add(country, i)">\n                      {{country}}\n                    </ion-item>\n                  </ion-list>\n            </div>\n\n        <ion-list-header (click)="showBox(2)">My Experiences\n            <ion-icon item-right name="ios-create-outline"></ion-icon>\n        </ion-list-header>\n\n        <p [hidden]="shouldhidetext" style="margin-left: 20px">No Experiences Added Yet, Click the icon above to add experiences</p>\n  \n        <ion-item *ngFor="let experience of experienceslist; let i= index">\n          <ion-avatar item-left>\n            <img src="../../assets/upwork.png">\n          </ion-avatar>\n          <b>{{experience.role}}</b><br>\n          {{experience.company}}\n          <ion-icon \n          name="ios-remove-circle-outline" (click)="removeExperience(experience, i)" item-right></ion-icon>\n        </ion-item>\n<!--   \n        <ion-item>\n            <ion-avatar item-left>\n              <img src="../../assets/upwork.png">\n            </ion-avatar>\n            <b>Android Developer</b><br>\n            Upwork\n          <ion-icon name="ios-remove-circle-outline" item-right></ion-icon>\n          </ion-item>\n   -->\n\n\n\n\n\n\n\n          <br>\n          <ion-list-header (click)="showBox(3)">About Me\n            <ion-icon item-right name="ios-create-outline"></ion-icon>\n          </ion-list-header>\n\n        <p [hidden]="shouldhidetexttwo" style="margin-left: 20px">Click the button above to tell the Tech-Tinder community about yourself</p>\n\n          <div id="writeup" style="margin: 15px; font-size: 16px">\n             {{writeup}}\n          </div>\n      </ion-list>\n\n      <p align="center">\n          <button ion-button outline (click)="saveprofile()" class="bsuccess">SAVE PROFILE</button>\n      </p>\n  </ion-content>\n  '/*ion-inline-end:"/home/lawrene/Tech-Tinder/src/pages/setupprofile/setupprofile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Keyboard */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], SetupprofilePage);
    return SetupprofilePage;
}());

//# sourceMappingURL=setupprofile.js.map

/***/ }),

/***/ 283:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JobsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(95);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var JobsPage = (function () {
    function JobsPage(navCtrl, geolocation, toastCtrl) {
        this.navCtrl = navCtrl;
        this.geolocation = geolocation;
        this.toastCtrl = toastCtrl;
        Window["myComponent"] = this;
    }
    JobsPage.prototype.ionViewDidLoad = function () {
        this.loadMap();
    };
    JobsPage.prototype.populateMap = function (map) {
        var icon = {
            url: '../../assets/icon/dot.png',
            scaledSize: new google.maps.Size(40, 40),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 0) // anchor
        };
        var text = document.getElementById("intitalstring");
        var initialwindow = new google.maps.InfoWindow({
            content: text
        });
        var features = [
            {
                position: new google.maps.LatLng(-33.91721, 151.22630),
                type: 'info',
            }, {
                position: new google.maps.LatLng(-33.91539, 151.22820),
                type: 'info'
            }, {
                position: new google.maps.LatLng(-33.91747, 151.22912),
                type: 'info'
            }, {
                position: new google.maps.LatLng(-33.91910, 151.22907),
                type: 'info'
            }, {
                position: new google.maps.LatLng(-33.91872, 151.23089),
                type: 'info'
            }, {
                position: new google.maps.LatLng(-33.91784, 151.23094),
                type: 'info'
            }, {
                position: new google.maps.LatLng(-33.91682, 151.23149),
                type: 'info'
            }, {
                position: new google.maps.LatLng(-33.91790, 151.23463),
                type: 'info'
            }, {
                position: new google.maps.LatLng(-33.91666, 151.23468),
                type: 'info'
            }, {
                position: new google.maps.LatLng(-33.916988, 151.233640),
                type: 'info'
            }, {
                position: new google.maps.LatLng(-33.91662347903106, 151.22879464019775),
                type: 'parking'
            }
        ];
        var markerslist = [];
        for (var i = 0; i < features.length; i++) {
            var marker = new google.maps.Marker({
                position: features[i].position,
                icon: icon,
                map: map
            });
            markerslist.push(marker);
        }
        ;
        // console.log(markerslist);
        // for(var i = 0; i < markerslist.length; i++){
        //   marker.addListener('click', (event) =>  {
        //     // initialwindow.open(map, marker);
        //   });
        // }
        markerslist.forEach(function (mymarker) {
            mymarker.addListener('click', function (event) {
                initialwindow.open(map, mymarker);
            });
        });
    };
    JobsPage.prototype.viewProfile = function () {
        // this.navCtrl.push(DetailsfreelancerPage);
    };
    JobsPage.prototype.loadMap = function () {
        var _this = this;
        var mapStyle = [
            {
                featureType: "administrative",
                elementType: "labels",
                stylers: [
                    { visibility: "off" }
                ]
            }, {
                featureType: "poi",
                elementType: "labels",
                stylers: [
                    { visibility: "off" }
                ]
            }, {
                featureType: "water",
                elementType: "labels",
                stylers: [
                    { visibility: "off" }
                ]
            }, {
                featureType: "road",
                elementType: "labels",
                stylers: [
                    { visibility: "off" }
                ]
            }
        ];
        this.geolocation.getCurrentPosition().then(function (resp) {
            console.log(resp.coords);
            var latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
            var mapOptions = {
                center: latLng,
                zoom: 16,
                disableDefaultUI: true,
                mapTypeId: 'terrain'
            };
            _this.map = new google.maps.Map(_this.mapElement.nativeElement, mapOptions);
            _this.map.set('styles', mapStyle);
            _this.addDefaultMarker(_this.map, latLng);
            _this.populateMap(_this.map);
            _this.map.addListener('click', function (e) {
                console.log('Clicked');
            });
        });
    };
    JobsPage.prototype.addDefaultMarker = function (map, position) {
        var icon = {
            url: '../../assets/icon/red.png',
            scaledSize: new google.maps.Size(40, 40),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 0) // anchor
        };
        var defmarker = new google.maps.Marker({
            position: position,
            map: map,
            // icon: icon,
            // animation: google.maps.Animation.BOUNCE,
            title: 'Hello World!'
        });
        defmarker.addListener('click', function () {
            map.setZoom(15);
            map.panTo(defmarker.getPosition());
        });
        return defmarker;
    };
    JobsPage.prototype.presentToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'top'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], JobsPage.prototype, "mapElement", void 0);
    JobsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-jobs',template:/*ion-inline-start:"/home/lawrene/Tech-Tinder/src/pages/jobs/jobs.html"*/'<!-- <ion-header>\n  <ion-navbar color="transparent">\n    <ion-buttons start>\n      <button ion-button menuToggle>\n      <ion-icon name="menu" color="dark"></ion-icon>\n    </button>\n    </ion-buttons>\n\n    <ion-searchbar class="searchitem"\n    animated="true" \n   placeholder="Search for talents close to you"></ion-searchbar>\n\n    <ion-buttons end>\n      <button ion-button icon-only (click)="openSecondModal()">\n          <ion-icon  class="icon ion-home custom-icon" name="notifications"></ion-icon>\n      </button>\n  </ion-buttons>\n  </ion-navbar>\n</ion-header> -->\n\n<ion-content class="maincontent">\n\n\n\n\n\n  <ion-fab bottom right >\n    <button color="testone" ion-fab mini>\n      <ion-icon name="md-add"></ion-icon>\n    </button>\n  </ion-fab>\n\n  <ion-fab bottom right style="margin-right: 45px">\n    <button color="testone" ion-fab mini>\n      <ion-icon name="md-remove"></ion-icon>\n    </button>\n  </ion-fab>\n\n\n\n  <div  #map id="map">\n  </div>\n\n\n  <ion-card class="headercard">\n    <ion-grid style="height: 50px;">\n      <ion-row>\n        <ion-col col-1>\n        <ion-icon menuToggle style="font-size: 27px; margin-left: 10px; float: left;" \n        name="menu" color="dark"></ion-icon>                      \n        </ion-col>\n\n        <ion-col>\n          <ion-searchbar animated="true" \n          placeholder="Find jobs close to you" class="mysearch"></ion-searchbar>\n            <!-- <ion-searchbar animated="true" \n        placeholder="Search for talents close to you" class="mysearchbar"></ion-searchbar>-->\n        </ion-col>\n\n        <ion-col col-1>\n        <ion-icon style="font-size: 27px; \n        margin-right: 10px; float: right;" name="notifications-outline" \n        color="dark"></ion-icon>                                  \n        </ion-col>\n      </ion-row>\n    </ion-grid>\n\n    <!-- <div>\n        <ion-icon style="font-size: 27px; margin-left: 20px; float: left; margin-top: 1px; margin-bottom: 1px;" name="menu" color="dark"></ion-icon>            \n        <ion-searchbar style="float: left;" animated="true" \n        placeholder="Search for talents close to you" class="mysearchbar"></ion-searchbar>\n    </div>\n         -->\n    </ion-card>\n\n  <p align="center" id="intitalstring">\n    <b>Edung Divinefavour</b><br>\n    Hourly rate - $12.5/hr<br>\n    Skills - Android | UI/UX\n    <br>\n    <br>\n    <button onclick="Window.myComponent.viewProfile()" class="contactbtn">View Profile</button>\n  </p>\n</ion-content>\n'/*ion-inline-end:"/home/lawrene/Tech-Tinder/src/pages/jobs/jobs.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */]])
    ], JobsPage);
    return JobsPage;
}());

//# sourceMappingURL=jobs.js.map

/***/ }),

/***/ 284:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilefreelancerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modal_modal__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// import { CountriesapiProvider } from '../../providers/countriesapi/countriesapi';

// import * as firebase from 'firebase/app';



var ProfilefreelancerPage = (function () {
    function ProfilefreelancerPage(navCtrl, modalCtrl, keyboard, loadingCtrl, toastCtrl, 
        // public countriesApi: CountriesapiProvider,
        alertCtrl, navParams) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.keyboard = keyboard;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.list = ['Android',
            'UI',
            'Photoshop',
            'Excel',
            'Xcode',
            'Ionic',
            'Visual Studio',
            'React',
            'Vue',
            'iOS',
            'Project Management',
            'Swift'];
        this.input = '';
        this.countries = [];
        this.skillstobeuploaded = [];
        this.isshidden = true;
        this.writeup = "";
        this.experienceslist = [];
        this.shouldhidetext = false;
        this.shouldhidetexttwo = false;
        this.isContactsReadonly = true;
        this.isPersonalReadonly = true;
        this.firedata = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database();
        this.getData = function (data) {
            return new Promise(function (resolve, reject) {
                resolve();
                console.log(data);
                _this.writeup = data;
                _this.shouldhidetexttwo = true;
            });
        };
        this.firedata.ref('/users').child(__WEBPACK_IMPORTED_MODULE_3_firebase___default.a.auth().currentUser.uid).once('value').then(function (res) {
            console.log(res.val());
            var user = res.val();
            _this.fullname = user.name;
            _this.writeup = user.aboutMe;
            _this.hourlyrate = user.hourlyRate;
            _this.email = user.email;
            _this.city = "Mohart, India";
            _this.phonenumber = user.phonenumber;
            _this.skillsstring = user.skillsstring;
            _this.experienceslist = user.experiences;
        }).catch(function (err) {
            _this.presentToast("Couldnt fetch user details");
        });
    }
    ProfilefreelancerPage.prototype.add = function (item, i) {
        this.isshidden = false;
        // this.input = item;
        var currentskills = document.getElementById("currentskills");
        // if(this.skillstobeuploaded.length == 0){
        this.skillsstring = item + " | " + currentskills.innerHTML;
        currentskills.innerHTML = this.skillsstring;
        // console.log(item, i);
        this.skillstobeuploaded.push(item);
        this.countries = [];
        this.input = "";
    };
    ProfilefreelancerPage.prototype.removeFocus = function () {
        this.keyboard.close();
    };
    ProfilefreelancerPage.prototype.ionViewDidLoad = function () {
        if (this.writeup.length != 0) {
            this.shouldhidetexttwo = true;
        }
    };
    ProfilefreelancerPage.prototype.makeEditable = function (index) {
        switch (index) {
            case 1:
                this.isPersonalReadonly = false;
                this.isContactsReadonly = true;
                this.namebox.setFocus();
                // this.emailbox.removeFocus();
                break;
            case 2:
                this.isPersonalReadonly = true;
                this.isContactsReadonly = false;
                this.emailbox.setFocus();
                // this.namebox.removeFocus();
                break;
        }
    };
    ProfilefreelancerPage.prototype.stopEdit = function () {
        this.isPersonalReadonly = true;
        this.isContactsReadonly = true;
    };
    ProfilefreelancerPage.prototype.search = function () {
        var _this = this;
        if (!this.input.trim().length || !this.keyboard.isOpen()) {
            this.countries = [];
            return;
        }
        this.countries = this.list.filter(function (item) { return item.toUpperCase().includes(_this.input.toUpperCase()); });
    };
    ProfilefreelancerPage.prototype.presentModal = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__modal_modal__["a" /* ModalPage */], {
            // data: this.data,
            callback: this.getData
        });
    };
    ProfilefreelancerPage.prototype.presentToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'top'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    ProfilefreelancerPage.prototype.showBox = function (index) {
        var _this = this;
        var placeholder;
        var type;
        var classtouse;
        switch (index) {
            case 0:
                placeholder = "Full Name";
                type = 'text';
                break;
            case 1:
                placeholder = "Hourly Rate";
                type = 'number';
                break;
            case 3:
                placeholder = "Hourly Rate";
                type = 'number';
                this.presentModal();
                break;
        }
        var inputs = [
            {
                name: 'clickedsumtn',
                placeholder: placeholder,
                type: type
            }
        ];
        if (index == 2) {
            inputs = [
                {
                    name: 'role',
                    placeholder: 'Role',
                    type: 'text'
                },
                {
                    name: 'company',
                    placeholder: 'Company',
                    type: 'text'
                },
            ];
        }
        var alert = this.alertCtrl.create({
            inputs: inputs,
            cssClass: classtouse,
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function (data) {
                    }
                },
                {
                    text: 'Ok',
                    handler: function (data) {
                        switch (index) {
                            case 0:
                                _this.fullname = data.clickedsumtn;
                                break;
                            case 1:
                                _this.hourlyrate = data.clickedsumtn;
                                break;
                            case 2:
                                if (data.role != "" && data.role != null && data.company != "" && data.company != null) {
                                    _this.experienceslist.push({
                                        role: data.role,
                                        company: data.company
                                    });
                                }
                                else if (data.role == "" || data.role == null) {
                                    _this.presentToast("Role Field Cannot be left blank");
                                }
                                else if (data.company == "" || data.company == null) {
                                    _this.presentToast("Company name cannot be left blank");
                                }
                        }
                        if (_this.experienceslist.length != 0) {
                            _this.shouldhidetext = true;
                        }
                    }
                }
            ]
        });
        if (index != 3) {
            alert.present();
        }
        else if (index == 3) {
            alert.dismiss();
        }
    };
    ProfilefreelancerPage.prototype.removeExperience = function (experience, index) {
        this.experienceslist.splice(index, 1);
        console.log(this.experienceslist.length);
        if (this.experienceslist.length == 0) {
            this.shouldhidetext = false;
        }
    };
    ProfilefreelancerPage.prototype.revert = function () {
        // console.log(this.skillstobeuploaded.length);
        console.log(this.skillstobeuploaded[this.skillstobeuploaded.length - 1]);
        this.skillsstring = this.skillsstring.replace(this.skillstobeuploaded[this.skillstobeuploaded.length - 1] + " | ", "");
        this.skillstobeuploaded.splice(this.skillstobeuploaded.length - 1);
        var currentskills = document.getElementById("currentskills");
        currentskills.innerHTML = this.skillsstring;
        if (this.skillstobeuploaded.length == 0) {
            this.isshidden = true;
        }
    };
    ProfilefreelancerPage.prototype.saveprofile = function () {
        var _this = this;
        var load = this.loadingCtrl.create({
            content: 'Saving changes',
        });
        load.present();
        this.firedata.ref('/users').child(__WEBPACK_IMPORTED_MODULE_3_firebase___default.a.auth().currentUser.uid).update({
            hourlyRate: this.hourlyrate,
            name: this.fullname,
            skillstags: this.skillstobeuploaded,
            experiences: this.experienceslist,
            aboutMe: this.writeup
        }).then(function () {
            // this.navCtrl.push(TabsfreelancerPage);
            load.dismiss();
            _this.presentToast("Profile Updated Succesfully");
        }).catch(function (err) {
            _this.presentToast(err);
            load.dismiss();
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('nameinput'),
        __metadata("design:type", Object)
    ], ProfilefreelancerPage.prototype, "namebox", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('emailinput'),
        __metadata("design:type", Object)
    ], ProfilefreelancerPage.prototype, "emailbox", void 0);
    ProfilefreelancerPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-profilefreelancer',template:/*ion-inline-start:"/home/lawrene/Tech-Tinder/src/pages/profilefreelancer/profilefreelancer.html"*/'<ion-header>\n  <ion-navbar color="light">\n    <ion-buttons start>\n      <button ion-button menuToggle>\n        <ion-icon name="menu"></ion-icon>\n      </button>\n    </ion-buttons>\n\n    <ion-title>My Profile</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n\n  <p align="center">\n    <!-- <div class="user-photo"> -->\n    <img class="user-photo" src="../../assets/one.jpg">\n    <!-- </div> -->\n  </p>\n\n  <div [hidden]="isshidden" (click)="revert()">\n    <p style="margin-left: 30px;margin-right:30px" id="currentskills" align="center">\n      <ion-icon item-right name="ios-remove-circle-outline"></ion-icon>\n    </p>\n\n  </div>\n\n  <br>\n  <ion-list>\n\n    <ion-item-divider>\n      Personal Info\n      \n      <ion-icon *ngIf="isPersonalReadonly" name="ios-create-outline" (click)="makeEditable(1)" item-right></ion-icon>\n      <ion-icon *ngIf="!isPersonalReadonly"  name="ios-checkmark-outline" (click)="stopEdit()" item-right></ion-icon>\n      \n    </ion-item-divider>\n\n    <ion-item>\n      <ion-input #nameinput [readonly]="isPersonalReadonly" [(ngModel)]="fullname"></ion-input>\n      <ion-icon name="ios-person-outline" item-left></ion-icon>\n    </ion-item>\n    <ion-item>\n      <ion-input [readonly]="isPersonalReadonly" [(ngModel)]="city"></ion-input>\n      <ion-icon name="ios-pin-outline" item-left></ion-icon>\n    </ion-item>\n    <ion-item>\n      <ion-input [readonly]="isPersonalReadonly" [(ngModel)]="hourlyrate"></ion-input>\n      <ion-icon name="ios-clock-outline" item-left></ion-icon>\n    </ion-item>\n\n    <br>\n    <ion-item-divider>\n      Contact Details\n      <ion-icon *ngIf="isContactsReadonly" name="ios-create-outline" (click)="makeEditable(2)" item-right></ion-icon>\n      <ion-icon *ngIf="!isContactsReadonly"  name="ios-checkmark-outline" (click)="stopEdit()" item-right></ion-icon>\n    </ion-item-divider>\n\n    <ion-item>\n        <ion-input #emailinput [readonly]="isContactsReadonly" [(ngModel)]="email"></ion-input>\n      <ion-icon name="ios-mail-outline" item-left></ion-icon>\n    </ion-item>\n\n    <ion-item>\n        <ion-input placeholder="Enter Phone Number Here" [readonly]="isContactsReadonly" [(ngModel)]="phonenumber"></ion-input>\n      <ion-icon name="ios-call-outline" item-left></ion-icon>\n    </ion-item>\n\n\n    <br>\n    <ion-item-divider>Skills\n    </ion-item-divider>\n\n    <div class="autocomplete">\n      <ion-item>\n        <ion-input type="text" placeholder="Search skill tags here" [(ngModel)]="input" (ionChange)="search()" (ionBlur)="removeFocus()"\n          debounce=500>\n        </ion-input>\n      </ion-item>\n      <ion-list>\n        <ion-item *ngFor="let country of countries" (click)="add(country, i)">\n          {{country}}\n        </ion-item>\n      </ion-list>\n    </div>\n\n    <ion-item-divider (click)="showBox(2)">My Experiences\n      <ion-icon item-right name="ios-create-outline"></ion-icon>\n    </ion-item-divider>\n\n    <p [hidden]="shouldhidetext" style="margin-left: 20px">No Experiences Added Yet, Click the icon above to add experiences</p>\n\n    <ion-item *ngFor="let experience of experienceslist; let i= index">\n      <ion-avatar item-left>\n        <img src="../../assets/upwork.png">\n      </ion-avatar>\n      <b>{{experience.role}}</b>\n      <br> {{experience.company}}\n      <ion-icon name="ios-remove-circle-outline" (click)="removeExperience(experience, i)" item-right></ion-icon>\n    </ion-item>\n    <!--   \n      <ion-item>\n          <ion-avatar item-left>\n            <img src="../../assets/upwork.png">\n          </ion-avatar>\n          <b>Android Developer</b><br>\n          Upwork\n        <ion-icon name="ios-remove-circle-outline" item-right></ion-icon>\n        </ion-item>\n -->\n\n\n\n\n\n\n\n    <br>\n    <ion-item-divider (click)="showBox(3)">About Me\n      <ion-icon item-right name="ios-create-outline"></ion-icon>\n    </ion-item-divider>\n\n    <p [hidden]="shouldhidetexttwo" style="margin-left: 20px">Click the button above to tell the Tech-Tinder community about yourself</p>\n\n    <div id="writeup" style="margin: 15px; font-size: 16px">\n      {{writeup}}\n    </div>\n  </ion-list>\n\n  <p align="center">\n    <button ion-button outline (click)="saveprofile()" class="bsuccess">SAVE PROFILE</button>\n  </p>\n</ion-content>'/*ion-inline-end:"/home/lawrene/Tech-Tinder/src/pages/profilefreelancer/profilefreelancer.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Keyboard */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], ProfilefreelancerPage);
    return ProfilefreelancerPage;
}());

//# sourceMappingURL=profilefreelancer.js.map

/***/ }),

/***/ 285:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PostjobPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tabsclient_tabsclient__ = __webpack_require__(94);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PostjobPage = (function () {
    function PostjobPage(navCtrl, element, loadingCtrl, toastCtrl, keyboard) {
        this.navCtrl = navCtrl;
        this.element = element;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.keyboard = keyboard;
        this.list = ['Android',
            'UI',
            'Photoshop',
            'Excel',
            'Xcode',
            'Ionic',
            'Visual Studio',
            'React',
            'Vue',
            'iOS',
            'Swift',
            'Project Management',
            'Swift'];
        this.input = '';
        this.countries = [];
        this.isshortcolor = "#ffffff";
        this.islongcolor = "#ffffff";
        this.duration = "";
        this.description = "";
        this.title = "";
        this.category = "";
        this.url = "";
        this.firedata = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database();
        // console.log("Current Date ",date.getTime()) 
    }
    PostjobPage.prototype.add = function (item) {
        this.input = item;
        this.countries = [];
    };
    PostjobPage.prototype.setShort = function () {
        this.isshortcolor = '#006096';
        this.islongcolor = '#ffffff';
        this.duration = "longterm";
    };
    PostjobPage.prototype.resize = function () {
        var element = this.myInput['_elementRef'].nativeElement.getElementsByClassName("text-input")[0];
        var scrollHeight = element.scrollHeight;
        element.style.height = scrollHeight + 'px';
        this.myInput['_elementRef'].nativeElement.style.height = (scrollHeight + 16) + 'px';
    };
    PostjobPage.prototype.setLong = function () {
        this.isshortcolor = '#ffffff';
        this.islongcolor = '#006096';
        this.duration = "shortterm";
    };
    PostjobPage.prototype.removeFocus = function () {
        this.keyboard.close();
    };
    PostjobPage.prototype.search = function () {
        var _this = this;
        if (!this.input.trim().length || !this.keyboard.isOpen()) {
            this.countries = [];
            return;
        }
        this.countries = this.list.filter(function (item) { return item.toUpperCase().includes(_this.input.toUpperCase()); });
    };
    PostjobPage.prototype.postJob = function () {
        var _this = this;
        console.log(this.duration);
        console.log(this.title);
        console.log(this.category);
        console.log(this.description);
        console.log(this.url);
        if (this.duration == "") {
            this.presentToast("Please select a job duration");
        }
        else if (this.title == "") {
            this.presentToast("Please Enter a Job Title");
        }
        else if (this.category == "") {
            this.presentToast("Please select a job category");
        }
        else if (this.description == "") {
            this.presentToast("Please Enter a Job Description");
        }
        else if (this.description.length < 15) {
            this.presentToast("Job Description should be atleast 15 words");
        }
        else if (this.url == "" || this.url.length < 3 || !this.url.includes(".")) {
            this.presentToast("Please Enter a valid url for project files");
        }
        else {
            this.timeposted = new Date();
            var load_1 = this.loadingCtrl.create({
                content: 'Logging you in',
            });
            load_1.present();
            this.pinuid = this.firedata.ref('/users').push().key;
            this.firedata.ref('/jobs').child(this.pinuid).set({
                duration: this.duration,
                title: this.title,
                category: this.category,
                description: this.description,
                timeposted: this.timeposted.getTime(),
                url: this.url,
                jobposter: __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().currentUser.uid
            }).then(function () {
                _this.presentToast("Your Job Post is Live!!!");
                load_1.dismiss();
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__tabsclient_tabsclient__["a" /* TabsclientPage */]);
            }).catch(function (err) {
                load_1.dismiss();
                _this.presentToast(err);
            });
        }
    };
    PostjobPage.prototype.presentToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'top'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('myInput'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], PostjobPage.prototype, "myInput", void 0);
    PostjobPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-postjob',template:/*ion-inline-start:"/home/lawrene/Tech-Tinder/src/pages/postjob/postjob.html"*/'<ion-header>\n  <ion-navbar color="light">\n    <ion-buttons start>\n      <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    </ion-buttons>\n\n    <ion-title>Post Job</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content class="maincontent">\n    <ion-grid>\n      <ion-row>\n        <ion-col>\n            <ion-card\n            class="cardss"\n            (click)="setShort()"            \n            [ngStyle]="{\'outline-color\': isshortcolor}">\n                <p style="margin-top: 20px" align="center"><ion-icon name="ios-clock-outline"></ion-icon></p>\n                <p style="margin-top: 5px"  align="center">Short term or part time work</p>\n                <p style="margin-top: 5px" align="center">Less than 30 hrs/week</p>\n                <p style="margin-bottom: 20px; margin-top: 5px" align="center">Less than 3 months</p>\n            </ion-card>\n        </ion-col>\n\n        <ion-col>\n            <ion-card class="cardss"\n            (click)="setLong()"\n            [ngStyle]="{\'outline-color\': islongcolor}">\n                <p style="margin-top: 20px" align="center"><ion-icon name="ios-calendar-outline"></ion-icon></p>\n                <p style="margin-top: 5px"  align="center">Dedicated Long term work</p>\n                <p style="margin-top: 5px" align="center">More than 30 hrs/week</p>\n                <p style="margin-bottom: 20px; margin-top: 5px" align="center">3+ months</p>\n            </ion-card>\n        </ion-col>\n      </ion-row>\n\n      <br>\n      <b style="margin-left: 11px; margin-bottom: 7px; ">Enter the title of your job post here</b>\n      <ion-row class="itemclass">\n          <ion-input\n          [(ngModel)]="title"\n            placeholder="Enter Job Title Here" required></ion-input>  \n      </ion-row>\n\n\n      <br>\n      <b style="margin-left: 11px; margin-bottom: 1px; ">\n        Job Category</b>\n      \n      <ion-card>\n            <ion-item>\n                    <ion-label style="opacity: 0.7; margin: 10px">Select Job Category </ion-label>\n                    <ion-select [(ngModel)]="category">\n                      <ion-option>Function QA</ion-option>\n                      <ion-option>Translation</ion-option>\n                      <ion-option>Writing</ion-option>\n                      <ion-option>IT & Networking</ion-option>\n                      <ion-option>Accounting & Consulting</ion-option>\n                      <ion-option>Data Science & Analytics</ion-option>\n                      <ion-option>Legal</ion-option>\n                      <ion-option>Sales & Marketing</ion-option>\n                      <ion-option>Web, Mobile & Software Dev</ion-option>\n                      <ion-option>Engineering & Architecture</ion-option>\n                      <ion-option>Admin Support</ion-option>\n                      <ion-option>Design & Creative</ion-option>\n                      <ion-option>Customer Service</ion-option>\n                      \n                    </ion-select>\n            </ion-item>\n         \n      </ion-card>\n\n\n\n       <!-- <ion-auto-complete [dataProvider]="CompletetestProvider"></ion-auto-complete>-->\n\n<!-- \n    <br>\n      <b style="margin-left: 13px; margin-bottom: 7px; ">\nAdd skill tags</b>\n\n    <div class="autocomplete">\n      <ion-item>\n        <ion-input  type="text" \n                    placeholder="Search skill tags here"\n                    [(ngModel)]="input"\n                    (ionChange)="search()"\n                    (ionBlur)="removeFocus()"\n                    debounce=500></ion-input>\n      </ion-item>\n      <ion-list>\n        <ion-item *ngFor="let country of countries" (click)="add(country)">\n          {{country}}\n        </ion-item>\n      </ion-list>\n</div> -->\n\n<div class="skillsdiv">\n  <ion-grid>\n    <ion-row *ngFor="let row of grid">\n      <ion-col width-50 *ngFor="let skill of row">\n        {{skill}}\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</div>\n\n\n\n      <br>\n      <b style="margin-left: 11px; margin-bottom: 7px; ">Enter job description here</b>\n      <ion-row class="item2class" >\n          <ion-textarea\n            #myInput id="myInput" rows="1" maxLength="500" (keyup)="resize()" [(ngModel)]="description"\n            placeholder="Enter Job Description Here" required></ion-textarea>  \n      </ion-row>\n\n\n      <br>\n      <b style="margin-left: 11px; margin-bottom: 1px; ">Project URL</b>\n      <ion-row class="itemclass">\n        <ion-input\n        [(ngModel)]="url"\n          placeholder="Enter URL to project files here" required></ion-input>  \n    </ion-row>\n\n      <br>\n    <button ion-button color="testone" (click)="postJob()" style="margin-left: 50px; margin-right: 50px">\n        Post Job\n    </button>    \n    <br>  \n\n    </ion-grid>  \n</ion-content>\n'/*ion-inline-end:"/home/lawrene/Tech-Tinder/src/pages/postjob/postjob.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Keyboard */]])
    ], PostjobPage);
    return PostjobPage;
}());

//# sourceMappingURL=postjob.js.map

/***/ }),

/***/ 286:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileclientPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// import { Dialogs } from '@ionic-native/dialogs';


/**
 * Generated class for the ProfileclientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ProfileclientPage = (function () {
    function ProfileclientPage(navCtrl, alertCtrl, navParams) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.firedata = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database();
        this.isPasswordReadOnly = true;
        this.isPersonalReadonly = true;
        this.password = "dkjgkdflgjdlf";
        this.confirmpassword = "dfkgjdfkgjhfj";
        this.firedata.ref('/users').child(__WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().currentUser.uid).once('value').then(function (res) {
            console.log(res.val());
            var user = res.val();
            _this.fullname = user.name;
            _this.email = user.email;
        }).catch(function (err) {
            alert("Couldnt fetch user details");
        });
    }
    ProfileclientPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ProfileclientPage');
    };
    ProfileclientPage.prototype.makeEditable = function (index) {
        switch (index) {
            case 1:
                this.isPersonalReadonly = false;
                this.isPasswordReadOnly = true;
                this.namebox.setFocus();
                // this.emailbox.removeFocus();
                break;
            case 2:
                this.isPersonalReadonly = true;
                this.isPasswordReadOnly = false;
                this.emailbox.setFocus();
                // this.namebox.removeFocus();
                break;
        }
    };
    ProfileclientPage.prototype.stopEdit = function () {
        this.isPersonalReadonly = true;
        this.isPasswordReadOnly = true;
    };
    ProfileclientPage.prototype.showBox = function (index) {
        var placeholder;
        switch (index) {
            case 0:
                placeholder = "First Name";
                break;
            case 1:
                placeholder = "Last Name";
                break;
            case 2:
                placeholder = "E-mail";
                break;
            case 3:
                placeholder = "New Password";
                break;
            case 4:
                placeholder = "Confirm Password";
                break;
        }
        var alert = this.alertCtrl.create({
            inputs: [
                {
                    name: 'clickedsumtn',
                    placeholder: placeholder
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Ok',
                    handler: function (data) {
                    }
                }
            ]
        });
        alert.present();
    };
    ProfileclientPage.prototype.saveprofile = function () {
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('nameinput'),
        __metadata("design:type", Object)
    ], ProfileclientPage.prototype, "namebox", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('emailinput'),
        __metadata("design:type", Object)
    ], ProfileclientPage.prototype, "emailbox", void 0);
    ProfileclientPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-profileclient',template:/*ion-inline-start:"/home/lawrene/Tech-Tinder/src/pages/profileclient/profileclient.html"*/'<ion-header>\n    <ion-navbar ion-fixed align-title="center" color="light">\n        <button ion-button left menuToggle>\n            <ion-icon class="icon ion-home custom-icon" name="menu"></ion-icon>\n        </button>\n\n        <ion-title>\n            My Profile\n        </ion-title>\n    </ion-navbar>\n</ion-header>\n\n\n<ion-content>\n\n    <div class="topdiv">\n\n        <div style="width: 100%; height: 10vh;"></div>\n\n        <div class="user-photo">\n            <img src="../../assets/one.jpg">\n        </div>\n\n    </div>\n\n    <br>\n    <div>\n        <ion-list>\n\n            <ion-item-divider>\n                Personal Info\n\n                <ion-icon *ngIf="isPersonalReadonly" name="ios-create-outline" (click)="makeEditable(1)" item-right></ion-icon>\n                <ion-icon *ngIf="!isPersonalReadonly" name="ios-checkmark-outline" (click)="stopEdit()" item-right></ion-icon>\n\n            </ion-item-divider>\n\n            <ion-item>\n                <ion-input #nameinput [readonly]="isPersonalReadonly" [(ngModel)]="fullname"></ion-input>\n                <ion-icon name="ios-person-outline" item-left></ion-icon>\n            </ion-item>\n            <ion-item>\n                <ion-input [readonly]="isPersonalReadonly" [(ngModel)]="email"></ion-input>\n                <ion-icon name="ios-mail-outline" item-left></ion-icon>\n            </ion-item>\n\n            <br>\n\n            <ion-item-divider>\n                Change Password\n                <ion-icon *ngIf="isPasswordReadOnly" name="ios-create-outline" (click)="makeEditable(2)" item-right></ion-icon>\n                <ion-icon *ngIf="!isPasswordReadOnly" name="ios-checkmark-outline" (click)="stopEdit()" item-right></ion-icon>\n            </ion-item-divider>\n\n            <ion-item>\n                <ion-input type="password" #emailinput [readonly]="isPasswordReadOnly" [(ngModel)]="password"></ion-input>\n                <ion-icon name="ios-lock-outline" item-left></ion-icon>\n            </ion-item>\n\n            <ion-item>\n                <ion-input type="password" placeholder="Enter Phone Number Here"\n                 [readonly]="isPasswordReadOnly" [(ngModel)]="confirmpassword"></ion-input>\n                <ion-icon name="ios-lock-outline" item-left></ion-icon>\n            </ion-item>\n\n            <ion-item-divider>\n                Connected Accounts\n                <ion-icon color="white" name="ios-create-outline" item-right></ion-icon>\n            </ion-item-divider>\n\n        </ion-list>\n    </div>\n\n    <p align="center">\n            <button ion-button outline (click)="saveprofile()" class="bsuccess">SAVE CHANGES</button>\n          </p>\n\n\n</ion-content>'/*ion-inline-end:"/home/lawrene/Tech-Tinder/src/pages/profileclient/profileclient.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], ProfileclientPage);
    return ProfileclientPage;
}());

//# sourceMappingURL=profileclient.js.map

/***/ }),

/***/ 287:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JoblistPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var JoblistPage = (function () {
    function JoblistPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    JoblistPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad JoblistPage');
    };
    JoblistPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-joblist',template:/*ion-inline-start:"/home/lawrene/Tech-Tinder/src/pages/joblist/joblist.html"*/'<ion-header>\n    <ion-navbar color="light">\n      <ion-buttons start>\n        <button ion-button menuToggle>\n        <ion-icon name="menu"></ion-icon>\n      </button>\n      </ion-buttons>\n  \n     \n    <ion-buttons end>\n        <button ion-button icon-only (click)="openSecondModal()">\n            <ion-icon  class="icon ion-home custom-icon" name="ios-search"></ion-icon>\n        </button>\n    </ion-buttons>\n      <ion-title>Find Jobs</ion-title>\n    </ion-navbar>\n  </ion-header>\n\n<ion-content>\n  <ion-list>\n    <ion-item>\n      <div style="margin-top: 10px">\n          <h2 style="color: #287AB0">Developer needed for creating site</h2>\n          <ion-icon style="position: absolute; z-index: 5;\n          top: 20px;\n           right: 20px;" name="ios-heart-outline"></ion-icon>\n      </div>\n      \n      <br>\n      <div><b>Hourly</b> - Just now</div>\n      <br>\n      <div>\n          <p>Skill Level</p>\n          <p>Intermediate</p>\n          <p style="position: absolute; z-index: 5;\n          bottom: 20px;\n           right: 20px;">3/5(19)</p>\n      </div>\n      \n      <div></div>\n    </ion-item>\n\n    <ion-item>\n        <div style="margin-top: 10px">\n            <h2 style="color: #287AB0">Developer needed for creating site</h2>\n            <ion-icon style="position: absolute; z-index: 5;\n            top: 20px;\n             right: 20px;" name="ios-heart-outline"></ion-icon>\n        </div>\n        \n        <br>\n        <div><b>Hourly</b> - 5minutes ago</div>\n        <br>\n        <div>\n            <p>Skill Level</p>\n            <p>Intermediate</p>\n            <p style="position: absolute; z-index: 5;\n            bottom: 20px;\n             right: 20px;">3/5(19)</p>\n        </div>\n        \n        <div></div>\n      </ion-item>\n\n      <ion-item>\n          <div style="margin-top: 10px">\n              <h2 style="color: #287AB0">Developer needed for creating site</h2>\n              <ion-icon style="position: absolute; z-index: 5;\n              top: 20px;\n               right: 20px;" name="ios-heart-outline"></ion-icon>\n          </div>\n          \n          <br>\n          <div><b>Hourly</b> - 19minutes ago</div>\n          <br>\n          <div>\n              <p>Skill Level</p>\n              <p>Intermediate</p>\n              <p style="position: absolute; z-index: 5;\n              bottom: 20px;\n               right: 20px;">3/5(19)</p>\n          </div>\n          \n          <div></div>\n        </ion-item>\n\n        <ion-item>\n            <div style="margin-top: 10px">\n                <h2 style="color: #287AB0">Developer needed for creating site</h2>\n                <ion-icon style="position: absolute; z-index: 5;\n                top: 20px;\n                 right: 20px;" name="ios-heart-outline"></ion-icon>\n            </div>\n            \n            <br>\n            <div><b>Hourly</b> - 19minutes ago</div>\n            <br>\n            <div>\n                <p>Skill Level</p>\n                <p>Intermediate</p>\n                <p style="position: absolute; z-index: 5;\n                bottom: 20px;\n                 right: 20px;">3/5(19)</p>\n            </div>\n            \n            <div></div>\n          </ion-item>\n\n          <ion-item>\n              <div style="margin-top: 10px">\n                  <h2 style="color: #287AB0">Developer needed for creating site</h2>\n                  <ion-icon style="position: absolute; z-index: 5;\n                  top: 20px;\n                   right: 20px;" name="ios-heart-outline"></ion-icon>\n              </div>\n              \n              <br>\n              <div><b>Hourly</b> - 19minutes ago</div>\n              <br>\n              <div>\n                  <p>Skill Level</p>\n                  <p>Intermediate</p>\n                  <p style="position: absolute; z-index: 5;\n                  bottom: 20px;\n                   right: 20px;">3/5(19)</p>\n              </div>\n              \n              <div></div>\n            </ion-item>\n\n            <ion-item>\n                <div style="margin-top: 10px">\n                    <h2 style="color: #287AB0">Developer needed for creating site</h2>\n                    <ion-icon style="position: absolute; z-index: 5;\n                    top: 20px;\n                     right: 20px;" name="ios-heart-outline"></ion-icon>\n                </div>\n                \n                <br>\n                <div><b>Hourly</b> - 19minutes ago</div>\n                <br>\n                <div>\n                    <p>Skill Level</p>\n                    <p>Intermediate</p>\n                    <p style="position: absolute; z-index: 5;\n                    bottom: 20px;\n                     right: 20px;">3/5(19)</p>\n                </div>\n                \n                <div></div>\n              </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/home/lawrene/Tech-Tinder/src/pages/joblist/joblist.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], JoblistPage);
    return JoblistPage;
}());

//# sourceMappingURL=joblist.js.map

/***/ }),

/***/ 288:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_user_user_service__ = __webpack_require__(49);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UserProfilePage = (function () {
    function UserProfilePage(authService, cd, navCtrl, navParams, userService) {
        this.authService = authService;
        this.cd = cd;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userService = userService;
        this.canEdit = false;
    }
    UserProfilePage.prototype.ionViewCanEnter = function () {
        return this.authService.authenticated;
    };
    UserProfilePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.userService.currentUser
            .subscribe(function (user) {
            _this.currentUser = user;
        });
    };
    UserProfilePage.prototype.onSubmit = function (event) {
        var _this = this;
        event.preventDefault(); // não dá refresh na página
        if (this.filePhoto) {
            var uploadTask_1 = this.userService.uploadPhoto(this.filePhoto, this.currentUser.$key);
            // vai ouvir a mudança de estado dessa task (qndo completar)
            // o snapshot é uma callback pra acessar o estado atual do upload
            uploadTask_1.on('state_changed', function (snapshot) {
                _this.uploadProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                // divide o tanto q já foi enviado pelo total e multiplica por 100 pra obter a porcentagem
                _this.cd.detectChanges();
                //detecta as mudanças que ocorreram do calculo para atualizar o template
            }, function (error) {
                //catch error
            }, function () {
                _this.editUser(uploadTask_1.snapshot.downloadURL); // passa a url completa
            });
        }
        else {
            this.editUser(); // chama a função privada
        }
    };
    UserProfilePage.prototype.onPhoto = function (event) {
        this.filePhoto = event.target.files[0]; // como tá fazendo o upload de apenas 1 foto, usamos o índice 0
    };
    UserProfilePage.prototype.editUser = function (photoUrl) {
        var _this = this;
        this.userService.edit({
            name: this.currentUser.name,
            username: this.currentUser.username,
            photo: photoUrl || this.currentUser.photo || ''
            // se recebeu uma foto nova, põe a foto nova, se não, usa a antiga, se ainda não tiver, fica vazio
        }).then(function () {
            _this.canEdit = false; // fecha o formulário
            _this.filePhoto = undefined; // reseta o atributo
            _this.uploadProgress = 0; // barra de progresso fica em 0%;
            _this.cd.detectChanges();
        });
    };
    UserProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-user-profile',template:/*ion-inline-start:"/home/lawrene/Tech-Tinder/src/pages/user-profile/user-profile.html"*/'<ion-header>\n\n  <custom-logged-header [title]=" \'User Profile\' "></custom-logged-header>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <user-info [user]="currentUser"></user-info>\n\n  <button ion-button block (click)="canEdit = !canEdit">\n    <!-- ao clicar, o canEdit passa a ser falso -->\n    Edit Profile\n  </button>\n\n  <form (ngSubmit)="onSubmit($event)" *ngIf="canEdit" #profileForm="ngForm">\n    <!-- variável profileForm recebe o elemento do formulário (ngForm) -->\n\n    <ion-item>\n      <ion-icon name="person" item-left></ion-icon>\n      <ion-input type="text" placeholder="Name" [(ngModel)]="currentUser.name"\n                 name="name" required minlength="3">\n      </ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-icon name="at" item-left></ion-icon>\n      <ion-input type="text" placeholder="Username" [(ngModel)]="currentUser.username"\n                 name="username" required minlength="3">\n      </ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-icon name="image" item-left></ion-icon>\n      <input type="file" accept="image/*" (change)="onPhoto($event)">\n      <!-- toda vez q o usuario mudar a foto (evento CHANGE), chama a funçao -->\n    </ion-item>\n\n    <progress-bar *ngIf="uploadProgress" [progress]="uploadProgress"></progress-bar>\n    \n    <br/>\n    <button ion-button block type="submit" [disabled]="profileForm.form.invalid">Save</button>\n  </form>\n\n</ion-content>\n'/*ion-inline-end:"/home/lawrene/Tech-Tinder/src/pages/user-profile/user-profile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_auth_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_user_user_service__["a" /* UserService */]])
    ], UserProfilePage);
    return UserProfilePage;
}());

//# sourceMappingURL=user-profile.js.map

/***/ }),

/***/ 289:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(294);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 29:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(254);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__base_base_service__ = __webpack_require__(88);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AuthService = (function (_super) {
    __extends(AuthService, _super);
    function AuthService(auth, http) {
        var _this = _super.call(this) || this;
        _this.auth = auth;
        _this.http = http;
        return _this;
    }
    AuthService.prototype.createAuthUser = function (user) {
        // função com parametro objeto user, retorna uma firebase promise do tipo firebaseauthstate
        // cria um usuario de autenticação com o serviço Angular Fire Auth
        return this.auth.createUser(user)
            .catch(this.handlePromiseError); //o erro do catch passa pra função handlePromiseError do BaseService
    };
    AuthService.prototype.signInWithEmail = function (user) {
        return this.auth.login(user)
            .then(function (authState) {
            return authState != null; // retorna true se o authState for diferente de nulo (ou seja, logou)
        })
            .catch(this.handlePromiseError);
    };
    AuthService.prototype.logOut = function () {
        return this.auth.logout();
    };
    Object.defineProperty(AuthService.prototype, "authenticated", {
        get: function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.auth
                    .first() // pega apenas a primeira alteração
                    .subscribe(function (authState) {
                    // (authState) ? resolve(true) : reject(false);  // se o authState for verdadeiro, retorna true
                    (authState) ? resolve(true) : reject(Error); // se o authState for verdadeiro, retorna true
                });
            });
        },
        enumerable: true,
        configurable: true
    });
    AuthService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], AuthService);
    return AuthService;
}(__WEBPACK_IMPORTED_MODULE_4__base_base_service__["a" /* BaseService */]));

//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ 294:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(248);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(253);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_auth_auth_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pipes_capitalize_capitalize__ = __webpack_require__(619);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_chat_chat__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_chat_chat_service__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_custom_logged_header_custom_logged_header_component__ = __webpack_require__(620);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_message_box_message_box_component__ = __webpack_require__(622);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_message_message_service__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__app_component__ = __webpack_require__(623);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_progress_bar_progress_bar_component__ = __webpack_require__(624);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_signup_signup__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_signin_signin__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__components_user_info_user_info_component__ = __webpack_require__(625);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__components_user_menu_user_menu_component__ = __webpack_require__(626);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__providers_user_user_service__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_user_profile_user_profile__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_tabsclient_tabsclient__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_tabsfreelancer_tabsfreelancer__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_jobs_jobs__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_profilefreelancer_profilefreelancer__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_freelancers_freelancers__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_shortlisted_shortlisted__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_chats_chats__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_setupprofile_setupprofile__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_modal_modal__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__pages_detailsfreelancer_detailsfreelancer__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__pages_postjob_postjob__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__pages_profileclient_profileclient__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__pages_joblist_joblist__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__ionic_native_geolocation__ = __webpack_require__(95);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







 //importa o firebase app config





























/* Salva as configurações do firebase (pega no painel do projeto no site do firebase) em uma constante */
var firebaseAppConfig = {
    apiKey: "AIzaSyAKq8NqNzRd7Z_GMe2XVK95Km8HTHOlYYs",
    authDomain: "tech-tinder.firebaseapp.com",
    databaseURL: "https://tech-tinder.firebaseio.com",
    storageBucket: "tech-tinder.appspot.com",
};
var firebaseAuthConfig = {
    provider: __WEBPACK_IMPORTED_MODULE_7_angularfire2__["d" /* AuthProviders */].Custom,
    method: __WEBPACK_IMPORTED_MODULE_7_angularfire2__["c" /* AuthMethods */].Password
};
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_9__pipes_capitalize_capitalize__["a" /* CapitalizePipe */],
                __WEBPACK_IMPORTED_MODULE_10__pages_chat_chat__["a" /* ChatPage */],
                __WEBPACK_IMPORTED_MODULE_12__components_custom_logged_header_custom_logged_header_component__["a" /* CustomLoggedHeaderComponent */],
                __WEBPACK_IMPORTED_MODULE_13__components_message_box_message_box_component__["a" /* MessageBoxComponent */],
                __WEBPACK_IMPORTED_MODULE_15__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_16__components_progress_bar_progress_bar_component__["a" /* ProgressBarComponent */],
                __WEBPACK_IMPORTED_MODULE_18__pages_signin_signin__["a" /* SigninPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_tabsclient_tabsclient__["a" /* TabsclientPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_tabsfreelancer_tabsfreelancer__["a" /* TabsfreelancerPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_jobs_jobs__["a" /* JobsPage */],
                __WEBPACK_IMPORTED_MODULE_33__pages_postjob_postjob__["a" /* PostjobPage */],
                __WEBPACK_IMPORTED_MODULE_34__pages_profileclient_profileclient__["a" /* ProfileclientPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_freelancers_freelancers__["a" /* FreelancersPage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_shortlisted_shortlisted__["a" /* ShortlistedPage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_setupprofile_setupprofile__["a" /* SetupprofilePage */],
                __WEBPACK_IMPORTED_MODULE_35__pages_joblist_joblist__["a" /* JoblistPage */],
                __WEBPACK_IMPORTED_MODULE_32__pages_detailsfreelancer_detailsfreelancer__["a" /* DetailsfreelancerPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_modal_modal__["a" /* ModalPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_profilefreelancer_profilefreelancer__["a" /* ProfilefreelancerPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_chats_chats__["a" /* ChatsPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_19__components_user_info_user_info_component__["a" /* UserInfoComponent */],
                __WEBPACK_IMPORTED_MODULE_20__components_user_menu_user_menu_component__["a" /* UserMenuComponent */],
                __WEBPACK_IMPORTED_MODULE_22__pages_user_profile_user_profile__["a" /* UserProfilePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_7_angularfire2__["b" /* AngularFireModule */].initializeApp(firebaseAppConfig, firebaseAuthConfig),
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_15__app_component__["a" /* MyApp */], {
                    tabsHideOnSubPages: true,
                    // tabsLayout:'icon-left',
                    preloadModules: true
                }, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["a" /* IonicStorageModule */].forRoot()
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_10__pages_chat_chat__["a" /* ChatPage */],
                __WEBPACK_IMPORTED_MODULE_15__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_30__pages_setupprofile_setupprofile__["a" /* SetupprofilePage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_jobs_jobs__["a" /* JobsPage */],
                __WEBPACK_IMPORTED_MODULE_32__pages_detailsfreelancer_detailsfreelancer__["a" /* DetailsfreelancerPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_modal_modal__["a" /* ModalPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_freelancers_freelancers__["a" /* FreelancersPage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_shortlisted_shortlisted__["a" /* ShortlistedPage */],
                __WEBPACK_IMPORTED_MODULE_35__pages_joblist_joblist__["a" /* JoblistPage */],
                __WEBPACK_IMPORTED_MODULE_33__pages_postjob_postjob__["a" /* PostjobPage */],
                __WEBPACK_IMPORTED_MODULE_34__pages_profileclient_profileclient__["a" /* ProfileclientPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_profilefreelancer_profilefreelancer__["a" /* ProfilefreelancerPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_signin_signin__["a" /* SigninPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_tabsclient_tabsclient__["a" /* TabsclientPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_chats_chats__["a" /* ChatsPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_tabsfreelancer_tabsfreelancer__["a" /* TabsfreelancerPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_user_profile_user_profile__["a" /* UserProfilePage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_8__providers_auth_auth_service__["a" /* AuthService */],
                __WEBPACK_IMPORTED_MODULE_11__providers_chat_chat_service__["a" /* ChatService */],
                __WEBPACK_IMPORTED_MODULE_36__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_21__providers_user_user_service__["a" /* UserService */],
                __WEBPACK_IMPORTED_MODULE_14__providers_message_message_service__["a" /* MessageService */],
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 49:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__base_base_service__ = __webpack_require__(88);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};





// import { FirebaseApp } from 'angularfire2/tokens';
// import { FirebaseObjectObservable } from 'angularfire2/database';
var UserService = (function (_super) {
    __extends(UserService, _super);
    function UserService(af, // injeta o angular fire pra poder mexer com o real time
        // @Inject(FirebaseApp) public firebaseApp: FirebaseApp,  // o firebaseApp é do tipo any mas o tipo da instancia é pra buscar na dependencia do FirebaseApp
        firebaseApp, // o firebaseApp é do tipo any mas o tipo da instancia é pra buscar na dependencia do FirebaseApp
        http) {
        var _this = _super.call(this) || this;
        _this.af = af;
        _this.firebaseApp = firebaseApp;
        _this.http = http;
        // this.users = this.af.database.list(`/users`);
        _this.listenAuthState();
        return _this;
    }
    UserService.prototype.listenAuthState = function () {
        var _this = this;
        this.af.auth.subscribe(function (authState) {
            if (authState) {
                _this.currentUser = _this.af.database.object("/users/" + authState.auth.uid);
                _this.setUsers(authState.auth.uid);
                // atribui o usuario logado ao current user
            }
        });
    };
    UserService.prototype.setUsers = function (uidToExclude) {
        this.users = this.af.database.list("/users", {
            query: {
                orderByChild: 'name' //orderna pelo nome
            }
        }).map(function (users) {
            return users.filter(function (user) { return user.$key !== uidToExclude; });
            // só vai pegar os usuários que NÃO tem o mesmo id do usuario atual (uid to exclude0)
        });
    };
    UserService.prototype.create = function (user, userUniqueId) {
        // A função create tem o parametro user do tipo User (pasta models) e retorna uma firebase.promise VAZIA (void)
        // return this.users.push(user); // o atributo users é uma listagem do nó '/users'. O método push é pra adicionar
        // Se não existir o caminho (do parametro abaixo), ele vai setar (.set()) o usuário nesse caminho (pra não duplicar)
        return this.af.database.object("/users/" + userUniqueId)
            .set(user)
            .catch(this.handlePromiseError);
    };
    UserService.prototype.edit = function (user) {
        return this.currentUser
            .update(user)
            .catch(this.handlePromiseError);
    };
    UserService.prototype.userExists = function (username) {
        return this.af.database.list("/users", {
            query: {
                orderByChild: 'username',
                equalTo: username // que seja igual ao username passado
            }
        }).map(function (users) {
            return users.length > 0; // se o array de users for maior q 0, retorna TRUE, se não, FALSE
        }).catch(this.handleObservableError); // tratamento de erro com o método handleObservableError do BaseService
        // return null;
    };
    UserService.prototype.emailAlreadyInUse = function (email) {
        return this.af.database.list("/users", {
            query: {
                orderByChild: 'email',
                equalTo: email // que seja igual ao username passado
            }
        }).map(function (users) {
            return users.length > 0; // se o array de users for maior q 0, retorna TRUE, se não, FALSE
        }).catch(this.handleObservableError); // tratamento de erro com o método handleObservableError do BaseService
        // return null;
    };
    UserService.prototype.getUser = function (userId) {
        return this.af.database.object("/users/" + userId)
            .catch(this.handleObservableError);
    };
    UserService.prototype.uploadPhoto = function (photoFile, userId) {
        // dava pra pegar o userId pelo this.currentUser.$key
        return this.firebaseApp
            .storage()
            .ref() // se deixasse aqui ia armazenar no root
            .child("/users/" + userId) // armazena no nó users com a chave userId
            .put(photoFile); // o parametro é o arquivo q vai ser armazenado
    };
    UserService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Inject */])(__WEBPACK_IMPORTED_MODULE_3_angularfire2__["e" /* FirebaseApp */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_angularfire2__["a" /* AngularFire */], Object, __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], UserService);
    return UserService;
}(__WEBPACK_IMPORTED_MODULE_4__base_base_service__["a" /* BaseService */]));

//# sourceMappingURL=user.service.js.map

/***/ }),

/***/ 619:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CapitalizePipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var CapitalizePipe = (function () {
    function CapitalizePipe() {
    }
    CapitalizePipe.prototype.transform = function (value, onlyFirst) {
        // return value.toLowerCase();
        if (onlyFirst) {
            return value.charAt(0).toUpperCase() + value.substr(1);
        }
        var words = value.split(' ');
        var final = '';
        words.forEach(function (value, index, words) {
            final += value.charAt(0).toUpperCase() + value.substr(1).toLowerCase() + ' ';
        });
        return final;
    };
    CapitalizePipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Pipe */])({
            name: 'capitalize',
        })
    ], CapitalizePipe);
    return CapitalizePipe;
}());

//# sourceMappingURL=capitalize.js.map

/***/ }),

/***/ 620:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomLoggedHeaderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base_component__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_user_model__ = __webpack_require__(158);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CustomLoggedHeaderComponent = (function (_super) {
    __extends(CustomLoggedHeaderComponent, _super);
    // @input é uma propriedade visivel para os outros components
    function CustomLoggedHeaderComponent(alertCtrl, authService, app, menuCtrl) {
        var _this = _super.call(this, alertCtrl, authService, app, menuCtrl) || this;
        _this.alertCtrl = alertCtrl;
        _this.authService = authService;
        _this.app = app;
        _this.menuCtrl = menuCtrl;
        return _this;
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", String)
    ], CustomLoggedHeaderComponent.prototype, "title", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4__models_user_model__["a" /* User */])
    ], CustomLoggedHeaderComponent.prototype, "user", void 0);
    CustomLoggedHeaderComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'custom-logged-header',template:/*ion-inline-start:"/home/lawrene/Tech-Tinder/src/components/custom-logged-header/custom-logged-header.component.html"*/'<ion-navbar>\n    <button ion-button menuToggle="user-menu">\n      <ion-icon name="menu"></ion-icon>\n    </button>\n\n  <ion-title>\n\n    <ion-item detail-none no-lines color="transparent" *ngIf="user; else titleTemplate">\n      <!-- vai chamar o ng-template #titleTemplate -->\n      <ion-avatar item-start>\n        <img [src]="user.photo || \'assets/imgs/no-photo.jpg\' ">\n      </ion-avatar>\n      {{ title }}\n    </ion-item>\n\n    <ng-template #titleTemplate>\n      {{ title }}\n    </ng-template>\n  \n  </ion-title>\n\n  <ion-buttons end>\n    <button ion-button icon-only (click)="onLogOut()">\n      <ion-icon name="exit"></ion-icon>\n    </button>\n  </ion-buttons>\n</ion-navbar>'/*ion-inline-end:"/home/lawrene/Tech-Tinder/src/components/custom-logged-header/custom-logged-header.component.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* App */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* MenuController */]])
    ], CustomLoggedHeaderComponent);
    return CustomLoggedHeaderComponent;
}(__WEBPACK_IMPORTED_MODULE_1__base_component__["a" /* baseComponent */]));

//# sourceMappingURL=custom-logged-header.component.js.map

/***/ }),

/***/ 621:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Chat; });
var Chat = (function () {
    // não passa no construtor pq esse $key é gerado automaticamente no firebase e ia dar conflito na hora de criar o chat
    function Chat(lastMessage, timeStamp, title, photo) {
        this.lastMessage = lastMessage;
        this.timeStamp = timeStamp;
        this.title = title;
        this.photo = photo;
    }
    return Chat;
}());

//# sourceMappingURL=chat.model.js.map

/***/ }),

/***/ 622:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessageBoxComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_message_model__ = __webpack_require__(276);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/* no host fica tipo assim
  <message-box [style.justify-content]="flex-start"> </message-box>
*/
var MessageBoxComponent = (function () {
    function MessageBoxComponent() {
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__models_message_model__["a" /* Message */])
    ], MessageBoxComponent.prototype, "message", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", Boolean)
    ], MessageBoxComponent.prototype, "isFromSender", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", Boolean)
    ], MessageBoxComponent.prototype, "alreadyRead", void 0);
    MessageBoxComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'message-box',template:/*ion-inline-start:"/home/lawrene/Tech-Tinder/src/components/message-box/message-box.component.html"*/'<!-- O atributo do objeto passado pro ng-Class é a CLASSE que vai receber SE o VALOR DO ATRIBUTO (:) for true -->\n<div class="text" [ngClass]="{\'sender-background\' : isFromSender}">\n  <p>{{ message.text }}</p>\n  <!-- <p class="timestamp"> {{ message.timeStamp | date:\'dd/MM/y H:mm\' }}</p> -->\n  <p class="timestamp" > {{ message.timeStamp | date: \'HH:mm\' }}\n    <ion-icon class="primeiro-icone" name="md-checkmark" [ngClass]="{\'ja-leu\' : alreadyRead}" *ngIf="isFromSender"></ion-icon>\n    <ion-icon class="segundo-icone" name="md-checkmark" [ngClass]="{\'ja-leu\' : alreadyRead}" *ngIf="isFromSender"></ion-icon>\n  </p>\n\n\n\n\n    <!-- <ion-item detail-none no-lines item-start>\n      <p class="timestamp"> {{ message.timeStamp | date: \'HH:mm\' }}</p>\n    </ion-item>\n    <ion-item detail-none no-lines item-end>\n        <ion-icon name="md-checkmark"></ion-icon>\n    </ion-item> -->\n\n  <!-- <ion-grid>\n    <ion-row>\n      <ion-col col-8>\n        <p class="timestamp"> {{ message.timeStamp | date: \'HH:mm\' }}</p>\n      </ion-col>\n      <ion-col col-4>\n       <ion-icon name="md-checkmark" style="font-size: 0.8em;\n       margin-top: 5px;\n       color: #999;"></ion-icon>\n      </ion-col>\n    </ion-row>\n  </ion-grid> -->\n</div>'/*ion-inline-end:"/home/lawrene/Tech-Tinder/src/components/message-box/message-box.component.html"*/,
            host: {
                // pode pegar propriedades no elemento e fazer input property (colocando um estilo (classe) condicionalmente)
                '[style.justify-content]': '((!isFromSender) ? "flex-start" : "flex-end")',
            }
        }),
        __metadata("design:paramtypes", [])
    ], MessageBoxComponent);
    return MessageBoxComponent;
}());

//# sourceMappingURL=message-box.component.js.map

/***/ }),

/***/ 623:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(248);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_signin_signin__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_user_user_service__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_tabsclient_tabsclient__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_tabsfreelancer_tabsfreelancer__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_postjob_postjob__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_profileclient_profileclient__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_joblist_joblist__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_firebase__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












// import { FirebaseAuthState } from 'angularfire2/auth';

var MyApp = (function () {
    function MyApp(authService, platform, statusBar, splashScreen, userService) {
        var _this = this;
        this.authService = authService;
        this.firedata = __WEBPACK_IMPORTED_MODULE_12_firebase___default.a.database();
        authService.auth.subscribe(function (authState) {
            if (authState) {
                // this.rootPage = HomePage;
                userService.currentUser.subscribe(function (user) {
                    // console.log(user);
                    // this.currentUser = user;
                    _this.fullname = user.username;
                    _this.email = user.email;
                    if (user.userType == "recruiter") {
                        _this.rootPage = __WEBPACK_IMPORTED_MODULE_7__pages_tabsclient_tabsclient__["a" /* TabsclientPage */];
                        // this.rootPage = ProfileclientPage;           
                        _this.pages = [
                            { title: 'Home', icon: 'ios-home', component: __WEBPACK_IMPORTED_MODULE_7__pages_tabsclient_tabsclient__["a" /* TabsclientPage */], pageName: 'GotopremiumPage', index: 1 },
                            { title: 'Profile', icon: 'ios-person', component: __WEBPACK_IMPORTED_MODULE_10__pages_profileclient_profileclient__["a" /* ProfileclientPage */], pageName: 'GotopremiumPage', index: 0 },
                            { title: 'Settings', icon: 'ios-settings', component: __WEBPACK_IMPORTED_MODULE_7__pages_tabsclient_tabsclient__["a" /* TabsclientPage */], pageName: 'GotopremiumPage', index: 1 },
                            { title: 'Post Job!', icon: 'ios-alert', component: __WEBPACK_IMPORTED_MODULE_9__pages_postjob_postjob__["a" /* PostjobPage */], pageName: 'GotopremiumPage', index: 2 },
                            { title: 'Logout', icon: 'ios-log-out', component: __WEBPACK_IMPORTED_MODULE_5__pages_signin_signin__["a" /* SigninPage */], pageName: 'GotopremiumPage', index: 6 },
                        ];
                    }
                    else if (user.userType == "freelancer") {
                        _this.rootPage = __WEBPACK_IMPORTED_MODULE_8__pages_tabsfreelancer_tabsfreelancer__["a" /* TabsfreelancerPage */];
                        // this.rootPage = ProfilefreelancerPage;
                        _this.pages = [
                            { title: 'Search Jobs', icon: 'ios-search', component: __WEBPACK_IMPORTED_MODULE_8__pages_tabsfreelancer_tabsfreelancer__["a" /* TabsfreelancerPage */], pageName: 'GotopremiumPage', index: 0 },
                            { title: 'Job Posts', icon: 'ios-pricetags', component: __WEBPACK_IMPORTED_MODULE_11__pages_joblist_joblist__["a" /* JoblistPage */], pageName: 'GotopremiumPage', index: 1 },
                            { title: 'Invite', icon: 'ios-alert', component: __WEBPACK_IMPORTED_MODULE_8__pages_tabsfreelancer_tabsfreelancer__["a" /* TabsfreelancerPage */], pageName: 'GotopremiumPage', index: 2 },
                            { title: 'Logout', icon: 'ios-log-out', component: __WEBPACK_IMPORTED_MODULE_5__pages_signin_signin__["a" /* SigninPage */], pageName: 'GotopremiumPage', index: 6 },
                        ];
                    }
                    // console.log(user.userType);// recebe o usuário que está atualmente logado
                });
            }
            else {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_signin_signin__["a" /* SigninPage */];
            }
        });
        platform.ready().then(function () {
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp.prototype.openPage = function (page) {
        var _this = this;
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        if (page.title == "Logout") {
            this.authService.logOut().then(function () {
                _this.nav.setRoot(page.component);
            });
        }
        else {
            this.nav.setRoot(page.component);
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */]),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */]) === "function" && _a || Object)
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/home/lawrene/Tech-Tinder/src/app/app.html"*/'<ion-menu persistent="true" [content]="content" type="overlay">\n    <ion-header no-border>\n      <ion-toolbar>\n                <div class="container">\n                    <img class="userimage" src="../../assets/one.jpg">\n                    <b class="user-name">{{fullname}}</b>\n                    <div class="user-mail">{{email}}</div>\n                    <br>\n                    <br>\n                   \n                </div>\n  \n      </ion-toolbar>\n    </ion-header>\n    \n    <ion-content>\n  \n        <ion-list>\n          <button ion-item menuClose *ngFor="let p of pages" (click)="openPage(p)">\n              <ion-icon item-start [name]="p.icon"></ion-icon>\n              <!-- <ion-icon item-start [name]="p.icon" [color]="isActive(p)"></ion-icon> -->\n              {{ p.title }}\n            </button>\n        </ion-list>\n  \n  <!-- \n              <ion-list>\n          <button ion-item menuClose *ngFor="let p of pages" (click)="openPage(p)">\n              <ion-icon item-start [name]="p.icon"></ion-icon>\n              {{ p.title }}\n            </button>\n        </ion-list> -->\n      </ion-content>\n  </ion-menu>\n  \n  <!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n  <ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"/home/lawrene/Tech-Tinder/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth_service__["a" /* AuthService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_6__providers_user_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__providers_user_user_service__["a" /* UserService */]) === "function" && _f || Object])
    ], MyApp);
    return MyApp;
    var _a, _b, _c, _d, _e, _f;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 624:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProgressBarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ProgressBarComponent = (function () {
    function ProgressBarComponent() {
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", Number)
    ], ProgressBarComponent.prototype, "progress", void 0);
    ProgressBarComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'progress-bar',template:/*ion-inline-start:"/home/lawrene/Tech-Tinder/src/components/progress-bar/progress-bar.component.html"*/'<div class="progress-outer">\n  <div class="progress-inner" [style.width]="progress + \'%\'">\n    <!-- o width vai aumentando conforme o número do progress aumenta\n       e vai aumentar percentualmente por causa da concatenação (%) -->\n    {{ progress }}%\n  </div>\n</div>'/*ion-inline-end:"/home/lawrene/Tech-Tinder/src/components/progress-bar/progress-bar.component.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], ProgressBarComponent);
    return ProgressBarComponent;
}());

//# sourceMappingURL=progress-bar.component.js.map

/***/ }),

/***/ 625:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserInfoComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_user_model__ = __webpack_require__(158);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UserInfoComponent = (function () {
    function UserInfoComponent() {
        this.isMenu = false;
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__models_user_model__["a" /* User */])
    ], UserInfoComponent.prototype, "user", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", Boolean)
    ], UserInfoComponent.prototype, "isMenu", void 0);
    UserInfoComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'user-info',template:/*ion-inline-start:"/home/lawrene/Tech-Tinder/src/components/user-info/user-info.component.html"*/'<div *ngIf="user">\n  <ion-avatar [ngClass]="{\'custom-background\': isMenu}">\n    <img class="round" [src]="user.photo || \'assets/imgs/no-photo.jpg\' ">\n  </ion-avatar>\n  <h2 text-center> {{ user.name }}</h2>\n  <p text-center> @{{ user.username }}</p>\n</div>'/*ion-inline-end:"/home/lawrene/Tech-Tinder/src/components/user-info/user-info.component.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], UserInfoComponent);
    return UserInfoComponent;
}());

//# sourceMappingURL=user-info.component.js.map

/***/ }),

/***/ 626:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserMenuComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__base_component__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_user_model__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_user_profile_user_profile__ = __webpack_require__(288);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var UserMenuComponent = (function (_super) {
    __extends(UserMenuComponent, _super);
    function UserMenuComponent(alertCtrl, authService, app, menuCtrl) {
        var _this = _super.call(this, alertCtrl, authService, app, menuCtrl) || this;
        _this.alertCtrl = alertCtrl;
        _this.authService = authService;
        _this.app = app;
        _this.menuCtrl = menuCtrl;
        return _this;
    }
    UserMenuComponent.prototype.onProfile = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__pages_user_profile_user_profile__["a" /* UserProfilePage */]);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])('user'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4__models_user_model__["a" /* User */])
    ], UserMenuComponent.prototype, "currentUser", void 0);
    UserMenuComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'user-menu',template:/*ion-inline-start:"/home/lawrene/Tech-Tinder/src/components/user-menu/user-menu.component.html"*/'<ion-content>\n    <!-- pega o atributo do current user do user-menu.component e passa de parametro pro user-info -->\n    <user-info [user]="currentUser" [isMenu]="true"></user-info>\n\n    <ion-list no-lines>\n        <button ion-item icon-right detail-none menuClose="user-menu" (click)="onProfile()">\n            Profile\n            <ion-icon name="person" item-right></ion-icon>\n        </button>\n        <button ion-item icon-right detail-none menuClose="user-menu" (click)="onLogOut()">\n            Log Out\n            <ion-icon name="log-out" item-right></ion-icon>\n        </button>\n    </ion-list>\n</ion-content>'/*ion-inline-end:"/home/lawrene/Tech-Tinder/src/components/user-menu/user-menu.component.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */]])
    ], UserMenuComponent);
    return UserMenuComponent;
}(__WEBPACK_IMPORTED_MODULE_3__base_component__["a" /* baseComponent */]));

//# sourceMappingURL=user-menu.component.js.map

/***/ }),

/***/ 88:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BaseService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs__ = __webpack_require__(358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs__);


var extractError = function (error) {
    // In a real world app, we might use a remote logging infrastructure
    var errMsg;
    if (error instanceof __WEBPACK_IMPORTED_MODULE_0__angular_http__["c" /* Response */]) {
        var body = error.json() || '';
        var err = body.error || JSON.stringify(body);
        errMsg = error.status + " - " + (error.statusText || '') + " " + err;
    }
    else {
        errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return errMsg;
};
var BaseService = (function () {
    function BaseService() {
    }
    // exportando classe abstrata que não pode ser instanciada. Ela só precisa ser HERDADA por outras classes!
    BaseService.prototype.handlePromiseError = function (error) {
        return Promise.reject(extractError(error));
    };
    BaseService.prototype.handleObservableError = function (error) {
        return __WEBPACK_IMPORTED_MODULE_1_rxjs__["Observable"].throw(extractError(error));
    };
    return BaseService;
}());

//# sourceMappingURL=base.service.js.map

/***/ }),

/***/ 93:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__base_base_service__ = __webpack_require__(88);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ChatService = (function (_super) {
    __extends(ChatService, _super);
    function ChatService(af, http) {
        var _this = _super.call(this) || this;
        _this.af = af;
        _this.http = http;
        _this.setChats();
        return _this;
    }
    ChatService.prototype.setChats = function () {
        var _this = this;
        this.af.auth
            .subscribe(function (authState) {
            // se usuario estiver logado
            if (authState) {
                // auth é o NÓ do usuario (se houver)
                _this.chats = _this.af.database.list("/chats/" + authState.auth.uid, {
                    query: {
                        orderByChild: 'timeStamp' //retorna em ordem CRESCENTE (tem q ser decrescente, ou seja, a mensagem mais recente)
                    }
                }).map(function (chats) {
                    return chats.reverse(); // inverte a ordem da array
                }).catch(_this.handleObservableError);
            }
        });
    };
    ChatService.prototype.create = function (chat, userId1, userId2) {
        return this.af.database.object("/chats/" + userId1 + "/" + userId2)
            .set(chat)
            .catch(this.handlePromiseError);
        // os nós de chats são compostos pelo id dos 2 usuarios
    };
    ChatService.prototype.getDeepChat = function (userId1, userId2) {
        return this.af.database.object("/chats/" + userId1 + "/" + userId2)
            .catch(this.handleObservableError);
    };
    ChatService.prototype.updatePhoto = function (chat, chatPhoto, recipientUserPhoto) {
        if (chatPhoto != recipientUserPhoto) {
            // então tem que atualizar a foto do chat
            return chat.update({
                photo: recipientUserPhoto
            }).then(function () {
                return true;
            }).catch(this.handlePromiseError);
        }
        return Promise.resolve();
    };
    ChatService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_angularfire2__["a" /* AngularFire */],
            __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], ChatService);
    return ChatService;
}(__WEBPACK_IMPORTED_MODULE_4__base_base_service__["a" /* BaseService */]));

//# sourceMappingURL=chat.service.js.map

/***/ }),

/***/ 94:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsclientPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__chats_chats__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shortlisted_shortlisted__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__freelancers_freelancers__ = __webpack_require__(280);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TabsclientPage = (function () {
    function TabsclientPage() {
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_3__freelancers_freelancers__["a" /* FreelancersPage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_1__chats_chats__["a" /* ChatsPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_2__shortlisted_shortlisted__["a" /* ShortlistedPage */];
    }
    TabsclientPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/home/lawrene/Tech-Tinder/src/pages/tabsclient/tabsclient.html"*/'<ion-tabs>\n    <ion-tab [root]="tab1Root" tabTitle="Freelancers" tabIcon="ios-people"></ion-tab>\n    <ion-tab [root]="tab2Root" tabTitle="Chats" tabIcon="ios-chatbubbles"></ion-tab>\n    <ion-tab [root]="tab3Root" tabTitle="ShortListed" tabIcon="ios-contacts"></ion-tab>\n  </ion-tabs>'/*ion-inline-end:"/home/lawrene/Tech-Tinder/src/pages/tabsclient/tabsclient.html"*/,
        }),
        __metadata("design:paramtypes", [])
    ], TabsclientPage);
    return TabsclientPage;
}());

//# sourceMappingURL=tabsclient.js.map

/***/ })

},[289]);
//# sourceMappingURL=main.js.map