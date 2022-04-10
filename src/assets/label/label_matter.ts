export interface Select {
  value: string;
  viewValue: string;
}

export const LABEL_MATTER = [
  {value: 'ITALIANO', viewValue: 'ITALIANO'},
  {value: 'STORIA', viewValue: 'STORIA'},
  {value: 'GEOGRAFIA', viewValue: 'GEOGRAFIA'},
  {value: 'MATEMATICA', viewValue: 'MATEMATICA'},
  {value: 'SCIENZE', viewValue: 'SCIENZE'},
  {value: 'TECNOLOGIA', viewValue: 'TECNOLOGIA'},
  {value: 'INGLESE', viewValue: 'INGLESE'},
  {value: 'FRANCESE', viewValue: 'FRANCESE'},
  {value: 'ARTE', viewValue: 'ARTE'},
  {value: 'EdFISICA', viewValue: 'EdFISICA'},
  {value: 'MUSICA', viewValue: 'MUSICA'},
  {value: 'RELIGIONE', viewValue: 'RELIGIONE'},
  {value: 'APPROFONDIMENTO', viewValue: 'APPROFONDIMENTO'},
]

export const LABEL_HUMANIST_MATTER = [
  {value: 'ITALIANO', viewValue: 'ITALIANO'},
  {value: 'STORIA', viewValue: 'STORIA'},
  {value: 'GEOGRAFIA', viewValue: 'GEOGRAFIA'},
  {value: 'APPROFONDIMENTO', viewValue: 'APPROFONDIMENTO'},
]

export const LABEL_HUMANIST_MATTER_STRING = [
  'ITALIANO','STORIA','GEOGRAFIA','APPROFONDIMENTO'
]

export const LABEL_MATH_MATTER_STRING = [
  'MATEMATICA','SCIENZE'
]

export const LABEL_MATTER_STRING = [
  'TECNOLOGIA','INGLESE',
  'FRANCESE','ARTE','EdFISICA','MUSICA','RELIGIONE'
]
