import { validate, validatingStudent } from "./validatingStudent";
import { jest } from "@jest/globals";
describe("validatingStudent middleware", () => {
  it("calls next when user is valid", () => {
    const req = {
      body: {
        firstName: "Veer",
        lastName: "Pratihar",
        age: 21,
        gender: "male",
        email: "veer@example.com",
      },
    };
    const res = {};
    const next = jest.fn();

    validatingStudent(req, res, next);

    expect(next).toHaveBeenCalled();
  });
  it("gives error when user is not valid", () => {
    user = { firstName: "Veer", lastName: "Pratihar" };
    const result = validate(user);
    expect(result).not.toBeUndefined();
  });
  it("passes to next when user is defined", () => {});
});
