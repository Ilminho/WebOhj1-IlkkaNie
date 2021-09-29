class Henkilo{
    constructor(etunimi, sukunimi, kutsumanimi, vuosi){
        this.etunimi = etunimi;
        this.sukunimi = sukunimi;
        this.kutsumanimi = kutsumanimi;
        this.vuosi=vuosi;
    }
}

class Urheilija extends Henkilo{
    constructor(etunimi,sukunimi,kutsumanimi,vuosi,kuva,omapaino,laji,
        saavutukset){
            super(etunimi,sukunimi,kutsumanimi,vuosi);
            this.kuva=kuva;
            this.omapaino=omapaino;
            this.laji=laji;
            this.saavutukset=saavutukset;
        }

    get Etunimi(){
        return this.etunimi;
    }

    set Etunimi(uus){
        this.etunimi=uus;
    }
    get Sukunimi(){
        return this.sukunimi;
    }

    set Sukunimi(uus){
        this.sukunimi=uus;
    }
    get Kutsumanimi(){
        return this.kutsumanimi;
    }

    set Kutsumanimi(uus){
        this.kutsumanimi=uus;
    }
    get Vuosi(){
        return this.vuosi;
    }

    set Vuosi(uus){
        this.vuosi=uus;
    }
    
}

let gangsteri= new Urheilija("Ilkka","Niemeläinen","Ile",1995,"https://nuotisto.s3-eu-west-1.amazonaws.com/store/7ce0747cd8e7e00b944a3cddafee3bac2147c6d8490fd05b566641794c99.jpg",100,"jalkapallo", "Ei mitään");

console.log(gangsteri.Vuosi);
gangsteri.Vuosi = 1996;
console.log(gangsteri.Vuosi);

console.log(gangsteri.Etunimi);
gangsteri.Etunimi="Jaska";
console.log(gangsteri.Etunimi);

console.log(gangsteri.Sukunimi);
gangsteri.Sukunimi="Jokunen";
console.log(gangsteri.Sukunimi);

console.log(gangsteri.Kutsumanimi);
gangsteri.Kutsumanimi="gangsteri";
console.log(gangsteri.Kutsumanimi);