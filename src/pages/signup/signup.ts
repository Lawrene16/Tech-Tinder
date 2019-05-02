import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Loading } from 'ionic-angular/components/loading/loading';
import * as firebase from 'firebase/app';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseAuthState } from 'angularfire2';

import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

import { AuthService } from '../../providers/auth/auth.service';
import { UserService } from './../../providers/user/user.service';
// import { User } from '../../models/user.model';

import { HomePage } from './../home/home';
import { TabsclientPage } from '../tabsclient/tabsclient';
import { TabsfreelancerPage } from '../tabsfreelancer/tabsfreelancer';
import { SetupprofilePage } from '../setupprofile/setupprofile';
// import { emailValidator } from '../../validators/email';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  signupForm: FormGroup; // atributo signUpForm ($scope.signUpForm no angular 1) do tipo FormGroup;
  checkingEmail: boolean = true;
  userType;
  firedata = firebase.database();
  cardbackgroundr = "#ffffff";
  cardbackgroundf = "#ffffff";
  cardtextf = "#000000";
  cardtextr = "#000000";
  
  constructor(
    public alertCtrl: AlertController,
    public authService: AuthService,  // service de criação de usuario de autenticação
    public formBuilder: FormBuilder,    // para trabalhar com formulário
    public loadingCtrl: LoadingController,  // mostrar o loading
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserService
  ) {
    // variavel com a expressão regular de validação de e-mail
    // let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.signupForm = this.formBuilder.group({  // definindo os atributos do signupForm (campos)
      // o primeiro item do array é o valor inicial, o segundo é o array de validators
      name: ['', [Validators.required, Validators.minLength(3)]], // o campo name é obrigatório (required) e precisa ter no minimo 3 caracteres
      username: ['', [Validators.required, Validators.minLength(3)]],
      // email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)]), emailValidator.checkEmail ], // validator tem q ser obrigatório E seguir a expressão regular do emailRegex
      email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])], // validator tem q ser obrigatório E seguir a expressão regular do emailRegex
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  isRecruiter(){
    this.userType = "recruiter";
    this.cardbackgroundr = "#006096";
    this.cardbackgroundf = "#ffffff";
    this.cardtextr = "#ffffff";
    this.cardtextf = "#000000";
  }

  isFreelancer(){
    this.userType = "freelancer";
    this.cardbackgroundf = "#006096";
    this.cardbackgroundr = "#ffffff";
    this.cardtextf = "#ffffff";
    this.cardtextr = "#000000";
  }

  onSubmit(): void {
    let loading: Loading = this.showLoading();
    // para pegar os atributos do formulario: this.signupForm.value (retorna o objeto inteiro)
    // let user: User = this.signupForm.value; não é mais do tipo User pq tirou a senha do model

    let formUser = this.signupForm.value;

    let username: string = formUser.username;

    var fullname: string = formUser.name;

    console.log(fullname);

    this.userService.userExists(username) // retorna um observable
      .first()  // recebe o primeiro valor recebido pelo observable, o resto será ignorado
      .subscribe((userExists: boolean) => { // se inscreve (subscribe) para receber alterações
        if (!userExists) {  // se o usuário não existir, cadastra um novo

          this.authService.createAuthUser({
            // cria o objeto de usuario para criar um usuário de autenticação no service Auth
            email: formUser.email,
            password: formUser.password,
          }).then((authState: FirebaseAuthState) => {
            //depois de cadastrar o usuário de autenticação:
            // pra não ter que passar o atributo PASSWORD do objeto formUser, tem q deletar este atributo
            delete formUser.password;

            // tem q adicionar o uid (id Único) criado na criação de usuário de autenticação (funçao createAuthUser)
            // formUser.uid = authState.auth.uid;

            let userUniqueId: string = authState.auth.uid;

            this.userService.create(formUser, userUniqueId) // cria usuario (nó no database)
              .then(() => {  // o método retorna uma promise vazia


                this.firedata.ref('/users').child(userUniqueId).update({
                  userType: this.userType,
                  uid: userUniqueId
                }).then(() =>{

                  loading.dismiss();

                  if(this.userType == "freelancer"){
                    this.navCtrl.setRoot(SetupprofilePage, {"fullname": fullname});
                  }else if(this.userType == "recruiter"){
                      this.navCtrl.setRoot(TabsclientPage);
                  }
                });
                
              }).catch((error: any) => {
                loading.dismiss();
                this.showAlert(error);
              });

          }).catch((error: any) => {
            loading.dismiss();
            this.showAlert(error);
          })

        } else {
          this.showAlert("Username already in use! Pick another one.");
          loading.dismiss();
        }
      });


  }

  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: "Please wait..."
    });

    loading.present();

    return loading;
  }

  private showAlert(message: string): void {
    this.alertCtrl.create({
      message: message,
      buttons: ['Ok']
    }).present();
  }

}
