
import {db} from "./database";
import { Response } from "express";

export function readAllLessons(req, res) {
    let delay = 500;
    if (delay > 0) {
        (<Response>res).setTimeout(delay, () => {
            (<Response>res).status(200).json({lessons:db.readAllLessons()});
        });
    } else {
        (<Response>res).status(200).json({lessons:db.readAllLessons()});
    }
}