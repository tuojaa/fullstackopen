import {v1 as uuid} from 'uuid';
import patients_data from '../data/patients';
import { Gender, Patient, PublicPatient } from '../types';
import { isDate, isString } from './base';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const patients = patients_data as Array<Patient>;

export const getNonSensitivePatients = (): Array<PublicPatient> => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }): PublicPatient => {
        return { id, name, dateOfBirth, gender, occupation };
    });
};

export const getPatientById = (id : string) : Patient | undefined => {
    return patients.find(patient => {
        return patient.id === id;
    });
};

const parseName = (name: unknown) : string => {
    if(!name || !isString(name)) {
        throw new Error("Incorrect or missing name");
    }
    return name;
};

const parseSsn = (ssn: unknown) : string => {
    if(!ssn || !isString(ssn)) {
        throw new Error("Incorrect or missing ssn");
    }
    return ssn;
};


const parseDateOfBirth = (dob: unknown) : string => {
    if(!dob || !isString(dob) || !isDate(dob)) {
        throw new Error("Incorrect or missing date of birth");
    }
    return dob;
};

const parseGender = (gender: unknown) : Gender => {
    if(!gender || !isGender(gender)) {
        throw new Error("Incorrect or missing gender");
    }
    return gender;
};

const parseOccupation = (occupation: unknown) : string => {
    if(!occupation || !isString(occupation)) {
        throw new Error("Incorrect or missing occupation");
    }
    return occupation;
};

type Fields = { ssn: unknown, name: unknown, dateOfBirth: unknown, gender: unknown, occupation : unknown};

export const toNewPatient = ({ ssn, name, dateOfBirth, gender, occupation }: Fields): Patient => {
    const id: string = uuid();
    const newPatient: Patient = {
        id,
        entries: [], 
        name: parseName(name),
        dateOfBirth: parseDateOfBirth(dateOfBirth),
        ssn: parseSsn(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation)
    };
    return newPatient;
};

export const addPatient = ({ ssn, name, dateOfBirth, gender, occupation }: Fields): Patient => {
    const newPatient = toNewPatient({ ssn, name, dateOfBirth, gender, occupation });
    patients.push(newPatient);
    return newPatient;
};