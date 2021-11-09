import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service'; 
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
declare var jQuery: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  session: any;
  constructor(private userService: UsersService,
              private fb: FormBuilder,
              private router: Router) {
    this.loginForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  ngOnInit(): void {
    (($) => {
      $(document).ready(() => {
      });
    })(jQuery);
    this.session = this.userService.getUserSession();
    this.initIsAuth();
  }

  verifierSession(){
    this.session = this.userService.getUserSession();
  }

  initIsAuth(){
    if (this.session.username != null) {
      if (this.session.role === 'ADMIN'){
        this.router.navigate([`/univFianar/selection/administrations/home`]);
      } else {
        this.router.navigate([`/univFianar/selection/home`]);
      }
    }
  }

  /** username or password wrong */
  errorLogin(){
    (($) => {
    $('input[id=nom]').css('border-bottom', '2px solid red');
    $('input[id=password]').css('border-bottom', '2px solid red');
    $('input[id=password]').focus();
    $('.alert-login').css('visibility', 'visible');
    })(jQuery);
  }

  /** authentification */
  onSubmitLogin(){
    const loginValue = this.loginForm.value;
    this.userService.authentification(loginValue['nom'], loginValue['password']).subscribe((data) => {
      if (data.compte){
        (($) => {
          $("#k-animate-btn").css('display', 'block')
        })(jQuery);
        setTimeout(() => {
          (($) => {
            $("#k-animate-btn").css('display', 'none');
            $("#k-animate-btn-r").css({'display': 'block'});
          })(jQuery);
          setTimeout(()=> {
            (($) => {
              $("#k-animate-btn-r").css({'color': 'green'})
            })(jQuery);
            this.userService.addUserToSession(data.compte);
            location.reload();
          }, 500);
        }, 2000);
      }else{
        (($) => {
          $("#k-animate-btn").css('display', 'block')
        })(jQuery);
        setTimeout(() => {
          (($) => {
            $("#k-animate-btn").css('display', 'none');
            $("#k-animate-btn-r").css({'display': 'block'});
          })(jQuery);
          (($) => {
            $("#k-animate-btn-r").css({'color': 'red'})
          })(jQuery);
          setTimeout(()=> {
            
            this.errorLogin();
            (($) => {
              $("#k-animate-btn-r").css({'display': 'none'});
            })(jQuery);
          }, 2000);
          
          //document.getElementById('modal-spinner').style.display = 'none';
        }, 2000);
      }
    })
  }
}
