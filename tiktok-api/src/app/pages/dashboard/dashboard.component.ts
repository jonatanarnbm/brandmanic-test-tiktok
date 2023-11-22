import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TiktokService } from '../../services/tiktok.service';
import { queryUserInfoResponseInterface } from '../../intefaces/interfaces';
import { ThisReceiver } from '@angular/compiler';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        CommonModule,
    ],
    template: `<p>dashboard works!</p>`,
    styleUrl: './dashboard.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
    constructor(private readonly tiktokService: TiktokService) {}
    userData?:queryUserInfoResponseInterface; 
    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        let cols = this.tiktokService.getqueryUserInfoResponse()
        let sub = this.tiktokService.getUserData().asObservable().subscribe(data => this.userData = data);
        
        
    }
 }
