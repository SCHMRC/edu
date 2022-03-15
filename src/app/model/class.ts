import { Teacher } from "./teacher";

export enum Year {
  PRIMA, SECONDA, TERZA

}

export class Classroom {
  id?: number;
  year: string;
  section: string;
  teachers: Teacher[];
  /*ita = 6;
  sto = 2;
  geo = 1;
  mat = 6;
  tec = 2;
  ing = 2;
  fra = 2;
  art = 2;
  ed_fis = 2;
  mus = 2;
  rel = 1;
  app = 1;*/


  constructor( _year: string, _section: string,_id?: number,teachers?: Teacher[]) {
    if(_id){this.id = _id;}
    this.year = _year;
    this.section = _section;
    if(teachers){this.teachers = teachers}
  }

  /*getIta() {
    return this.ita;
  }

  setIta() {
    this.ita -= 1;
  }

  getSto() {
    return this.sto;
  }

  setSto() {
    this.sto -= 1;
  }

  getGeo() {
    return this.geo;
  }

  setGeo() {
    this.geo -= 1;;
  }

  getMat() {
    return this.mat;
  }

  setMat() {
    this.mat -= 1;;
  }

  getTec() {
    return this.tec;
  }

  setTec() {
    this.tec -= 1;;
  }

  getIng() {
    return this.ing;
  }

  setIng() {
    this.ing -= 1;;
  }

  getFra() {
    return this.fra;
  }

  setFra() {
    this.fra -= 1;;
  }

  getArt() {
    return this.art;
  }

  setArt() {
    this.art -= 1;;
  }

  getEdFis() {
    return this.ed_fis;
  }

  setEdFis() {
    this.ed_fis -= 1;;
  }

  getMus() {
    return this.mus;
  }

  setMus() {
    this.mus -= 1;;
  }

  getRel() {
    return this.rel;
  }

  setRel() {
    this.rel -= 1;;
  }

  getApp() {
    return this.app;
  }

  setApp() {
    this.app -= 1;;
  }*/
}
