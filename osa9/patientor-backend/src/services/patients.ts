import {v1 as uuid} from 'uuid';
import patients from '../data/patients';
import { Entry, Gender, NewEntry, Patient, PublicPatient, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckRating, Diagnosis, DateRange } from '../types';
import { isDate, isString } from './base';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

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

const parseString = (value: unknown, fieldName: string): string => {
    if(!value || !isString(value)) {
        throw new Error(`Incorrect or missing ${fieldName}`);
    }
    return value;
};


const parseName = (name: unknown) : string => parseString(name, 'name');
const parseSsn = (ssn: unknown) : string => parseString(ssn, 'ssn');
const parseOccupation = (occupation: unknown) : string => parseString(occupation, 'occupation');

const parseDate = (date: unknown, fieldName: string) : string => {
    if(!date || !isString(date) || !isDate(date)) {
        throw new Error(`Incorrect or missing ${fieldName}`);
    }
    return date;
};
const parseDateOfBirth = (dob: unknown) : string => parseDate(dob, 'date of birth');

const parseGender = (gender: unknown) : Gender => {
    if(!gender || !isGender(gender)) {
        throw new Error("Incorrect or missing gender");
    }
    return gender;
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

const toNewEntry = (fields: NewEntry): Entry => {
    switch(fields.type) {
        case "HealthCheck":
            return toNewHealthCheckEntry(fields);
        case "Hospital":
            return toNewHospitalEntry(fields);
        case "OccupationalHealthcare":
            return toNewOccupationalHealthcareEntry(fields);
        default:
            throw new Error('Unknown entry type')
    }
};

export const addEntry = (patient: Patient, entry: NewEntry): Entry => {
    const addedEntry = toNewEntry(entry);
    patient.entries.push(addedEntry);
    return addedEntry;
};

const parseSpecialist = (specialist: unknown) : string => parseString(specialist, 'specialist');
const parseDescription = (description: unknown) : string => parseString(description, 'description');
const parseCriteria = (criteria: unknown) : string => parseString(criteria, 'criteria');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(Number(param));
};

const isNumber = (param: any): param is number => {
    return !isNaN(Number(param));
}

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
    if(!healthCheckRating || !isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
        throw new Error("Incorrect or missing health check rating");
    }
    return Number(healthCheckRating);
};

const parseDiagnosisCodes = (diagnosisCodes: Array<string> | undefined): Array<Diagnosis['code']> => {
    if(!diagnosisCodes) 
        return [];
    return diagnosisCodes.map( (code) => {
        if(!isString(code)) {
            throw new Error("Malformed diagnosis code");
        }
        return code;
    });
};

const toNewHealthCheckEntry = (fields: Omit<HealthCheckEntry, "id">): HealthCheckEntry => {
    const id: string = uuid();
    return {
        id,
        type: 'HealthCheck',
        specialist: parseSpecialist(fields.specialist),
        description: parseDescription(fields.description),
        date: parseDate(fields.date, 'date'),
        diagnosisCodes: parseDiagnosisCodes(fields.diagnosisCodes),
        healthCheckRating: parseHealthCheckRating(fields.healthCheckRating)
    };
};

const toNewHospitalEntry = (fields: Omit<HospitalEntry, "id">): HospitalEntry => {
    const id: string = uuid();
    return {
        id,
        type: 'Hospital',
        specialist: parseSpecialist(fields.specialist),
        description: parseDescription(fields.description),
        date: parseDate(fields.date, 'date'),
        diagnosisCodes: parseDiagnosisCodes(fields.diagnosisCodes),
        discharge: {
            date: parseDate(fields.discharge.date, 'discharge date'),
            criteria: parseCriteria(fields.discharge.criteria)
        }
    };
};

const parseSickLeave = (sickLeave: undefined | DateRange ) => {
    if(!sickLeave)
        return undefined;
    return {
        startDate: parseDate(sickLeave.startDate, 'sick leave start date'),
        endDate: parseDate(sickLeave.endDate, 'sick leave end date')
    };
};

const toNewOccupationalHealthcareEntry = (fields: Omit<OccupationalHealthcareEntry, "id">): OccupationalHealthcareEntry => {
    const id: string = uuid();
    return {
        id,
        type: 'OccupationalHealthcare',
        specialist: parseSpecialist(fields.specialist),
        description: parseDescription(fields.description),
        date: parseDate(fields.date, 'date'),
        diagnosisCodes: parseDiagnosisCodes(fields.diagnosisCodes),
        employerName: parseString(fields.employerName, 'employer name'),
        sickLeave: parseSickLeave(fields.sickLeave)
    };
};


