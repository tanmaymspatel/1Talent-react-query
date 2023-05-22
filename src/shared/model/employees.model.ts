export interface IEmployeeDetails {
    userId: string;
    name: string,
    userCode: string,
    emailId: string,
    profileImage: string,
    mobileNumber: string,
    gender: {
        id: number,
        name: string
    },
    designations: {
        id: number,
        name: string
    },
    domainWithSubDomain: {
        id: number,
        name: string,
        subDomain: {
            id: number,
            name: string,
        }
    },
    employeeTypes: {
        employmentTypeId: number,
        employmentType: "string"
    }

}