

import {Injectable} from "@angular/core";
import {HttpClient, HttpEvent} from "@angular/common/http";
import { Observable } from "rxjs";



@Injectable()
export class NewsletterService {

    constructor(private http: HttpClient) {

    }

    addPushSubscriber(sub: any): Observable<any> {
        return this.http.post('/api/notifications', sub);
    }

    send() {
        return this.http.post('/api/newsletter', null);
    }

}


