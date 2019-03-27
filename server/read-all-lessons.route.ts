
import {db} from "./database";
import { HttpResponse } from "@angular/common/http";
import { Response } from "express";

export function readAllLessons(req, res) {
    (<Response>res).setTimeout(8000, () => {
        (<Response>res).status(200).json({lessons:db.readAllLessons()});
    });
}