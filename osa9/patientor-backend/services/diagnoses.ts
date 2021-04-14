import diagnoses_data from '../data/diagnoses.json';

export interface Diagnose {
    code: string,
    name: string,
    latin?: string
}

const diagnoses = diagnoses_data as Array<Diagnose>;

export const getDiagnoses = () => {
    return diagnoses;
};