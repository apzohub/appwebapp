import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthGuard } from './auth.guard';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
    type = 'auth';
    form: FormGroup;

    constructor(private fb:FormBuilder, 
                private authService: AuthGuard, 
                private router: Router,
                private route: ActivatedRoute) {

        this.form = this.fb.group({
            email: ['',Validators.required],
            password: ['',Validators.required],
            cpassword: ['',Validators.required]
        });
    }

    ngOnInit(): void {
        this.route.data.subscribe((data: any) => {
            this.type = data?.type? data.type:'auth'
        });
    }

    login() {
        const val = this.form.value;

        if (val.email && val.password) {
            this.authService.login(val.email, val.password)
                .subscribe(
                    () => {
                        console.log("User is logged in");
                        this.router.navigate(['/']);
                    }
                );
        }
    }

    register(){
        const val = this.form.value;

        if (val.email && val.password && val.cpassword
            && val.password === val.cpassword) {
            this.authService.register(val.email, val.password)
                .subscribe(
                    () => {
                        console.log("User is logged in");
                        this.router.navigate(['/']);
                    }
                );
        }
    }

    fpwd(){
        const val = this.form.value;
        if (val.email) {
            this.authService.fpwd(val.email)
                .subscribe(
                    () => {
                        console.log("fpwd");
                        this.router.navigate(['/']);
                    }
                );
        }
        this.router.navigate(['/']);
    }
}
