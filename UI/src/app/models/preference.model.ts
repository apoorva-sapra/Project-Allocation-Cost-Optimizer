export interface IPreferenceList {
    employee_solution1: IEmployee[];
    employee_solution2: IEmployee[];
    employee_solution3: IEmployee[];
}

export interface IEmployee {
    id:              string;
    name:            string;
    skill:           string;
    city:            string;
    relocation_cost: number;
    training_cost:   number;
    total_cost:      number;
    need:            string;
}

export class PreferenceList implements IPreferenceList{
    employee_solution1: IEmployee[];
    employee_solution2: IEmployee[];
    employee_solution3: IEmployee[];
}

export class Employee implements IEmployee{
    id:              string;
    name:            string;
    skill:           string;
    city:            string;
    relocation_cost: number;
    training_cost:   number;
    total_cost:      number;
    need:            string;
}