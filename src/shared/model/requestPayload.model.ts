export interface IFilterFields {
    isPagination: boolean,
    designations: string[],
    domains: string[],
    employmentTypeId: string[],
    genders: string[],
    subDomains: string[]
}

export interface IRequestPayloadFields {
    field: string,
    order: string,
    filter: IFilterFields
}