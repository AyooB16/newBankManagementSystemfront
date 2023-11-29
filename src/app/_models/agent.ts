import { Agence } from "./agence";

export class Agent {
    constructor(
        public _id:String,
        public agence:Agence,
        public nom:String,
        public prenom:String,
        public cin:String,
        public email:String,
        public password:String,
        public dateNaissance:Date,
        public rue:String,
        public ville:String,
        public region: String,
        public codePostal :String
		){}
}
