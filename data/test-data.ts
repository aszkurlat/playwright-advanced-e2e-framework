export default class TestData {
    static makeAppoinmentTestData() {
        return [
            { testId: "TC001", facility: "Tokyo CURA Healthcare Center", hcp: "Medicare", visitDt: "05/10/2025" },
            { testId: "TC002", facility: "Hongkong CURA Healthcare Center", hcp: "Medicaid", visitDt: "05/11/2025" },
            { testId: "TC003", facility: "Seoul CURA Healthcare Center", hcp: "None", visitDt: "05/12/2025" },
        ];
    }

    static apiUserCreation() {
        return [{
            data: {
                firstName: "Andrew",
                lastName: "Smith",
                age: 30,
                email: "adrewsmith@test.com",
            },
            headers: {
                "Content-Type": "application/json",
            }
        },
        {
            data: {
                firstName: "John",
                lastName: "Carter",
                age: 37,
                email: "johncarter@test.com",
            },
            headers: {
                "Content-Type": "application/json",
            }
        }]
    }
}