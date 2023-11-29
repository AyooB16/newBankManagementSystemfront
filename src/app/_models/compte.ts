import { Agence } from "./agence";
import { Client } from "./client";
import { TypeCompte } from "./type-compte";

export class Compte {
    constructor(
        public _id:String,
        public solde:number,
        public username:String,
        public password:String,

        public typeCompte:TypeCompte,
        public client:Client
		){}


}
