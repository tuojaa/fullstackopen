import diagnoses_data from '../data/diagnoses.json';
import { Diagnosis } from '../types';

const diagnoses = diagnoses_data as Array<Diagnosis>;

export const getDiagnoses = () => {
    return diagnoses;
};