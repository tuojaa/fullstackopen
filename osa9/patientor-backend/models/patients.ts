import patients_data from '../data/patients.json';

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: string,
    occupation: string
}

export interface NonSensitivePatient {
    id: string,
    name: string,
    dateOfBirth: string,
    gender: string,
    occupation: string
}

export const getNonSensitivePatients = (): Array<NonSensitivePatient> => {
    const patients = patients_data as Array<Patient>;
    return patients.map(({ id, name, dateOfBirth, gender, occupation }): NonSensitivePatient => {
        return { id, name, dateOfBirth, gender, occupation };
    });
};