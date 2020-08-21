export interface IRequirements {
    employees:       IRole;
    relocation_cost: number;
    location:   string;
    start_date: Date;
}

export interface IRole {
    skill_name: string;
    head_count: number;
    training_cost:number;
}

export class Requirements implements IRequirements {
    start_date: Date;
    location: string;
    employees: IRole;
    relocation_cost: number;
}

export class Role implements IRole {
    training_cost: number;
    skill_name: string;
    head_count: number;
}
