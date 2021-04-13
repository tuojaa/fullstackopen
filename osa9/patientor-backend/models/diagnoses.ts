import diagnoses_data from '../data/diagnoses.json';

export interface Diagnose {
    code: string,
    name: string,
    latin?: string
}

export const getDiagnoses = () => {
    return diagnoses_data as Array<Diagnose>;
};