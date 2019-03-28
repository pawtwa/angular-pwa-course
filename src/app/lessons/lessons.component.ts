import {Component, OnInit} from '@angular/core';
import {LessonsService} from "../services/lessons.service";
import {Observable} from "rxjs/Observable";
import {Lesson} from "../model/lesson";
import {SwPush} from "@angular/service-worker";
import {NewsletterService} from "../services/newsletter.service";

@Component({
    selector: 'lessons',
    templateUrl: './lessons.component.html',
    styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit {

    lessons$: Observable<Lesson[]>;
    isLoggedIn$: Observable<boolean>;

    sub: PushSubscription;

    readonly VAPID_PUBLIC_KEY = "BC8ZTEWmcfD5_5LycfXCJ5Ruj0XQVads2NsisgvOPM6Rt301gehMkIQAUjll8yke_NrnczKvYgODaufgWROs5qM";

    constructor(
        private lessonsService: LessonsService,
        private swPush: SwPush,
        private newsletterService: NewsletterService) {

    }

    ngOnInit() {
        this.loadLessons();
    }


    loadLessons() {
        this.lessons$ = this.lessonsService.loadAllLessons().catch(err => Observable.of([]));
    }

    subscribeToNotifications() {

        if (this.swPush.isEnabled) {
            this.swPush.requestSubscription({
                serverPublicKey: this.VAPID_PUBLIC_KEY
            })
                .then(sub => {
                    console.log("Notofication Subscription", sub);
                    this.sub = sub;                    
                    this.newsletterService.addPushSubscriber(sub).subscribe(
                        () => {
                            console.log("Sent push subscription object to server")
                        },
                        err => console.error("Could not sent push subscription object to server, reason", err)
                    );
                })
                .catch(err => {
                    console.error("Could not subscribe to notifications", err);
                });
        }

    }


    sendNewsletter() {

        console.log("Sending Newsletters to all Subscribes ...");

        this.newsletterService.send().subscribe();

    }





}
