const userController = require("../user.controller");
const User = require("../user.model");

jest.mock("../user.model", () => ({
  find: jest.fn(),
  findByIdAndUpdate: jest.fn(),
}));
// Manual mock for req and res
const mockRequest = () => {
  const req = {};
  req.body = {};
  req.params = {};
  req.query = {};
  return req;
};

const mockResponse = () => {
  const res = {};
  res.statusCode = 200; // Default
  res.status = jest.fn().mockImplementation((code) => {
    res.statusCode = code;
    return res;
  });
  res.json = jest.fn().mockReturnValue(res);
  res._getJSONData = () => res.json.mock.calls[0][0];
  return res;
};

describe("User Controller Unit Tests", () => {
  let req, res, next;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
    next = jest.fn();
    jest.clearAllMocks();
  });

  describe("getAllUsers", () => {
    it("should return all users if admin", async () => {
      req.user = { role: "admin" };
      const mockUsers = [{ name: "User 1" }, { name: "User 2" }];
      User.find.mockReturnValue({
        select: jest.fn().mockResolvedValue(mockUsers),
      });

      await userController.getAllUsers(req, res, next);

      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual(mockUsers);
    });

    it("should return 403 if not admin", async () => {
      req.user = { role: "student" };

      await userController.getAllUsers(req, res, next);

      expect(res.statusCode).toBe(403);
    });
  });

  describe("updateUserRole", () => {
    it("should update role if admin", async () => {
      req.user = { role: "admin" };
      req.params.userId = "user123";
      req.body.role = "instructor";
      const mockUser = { _id: "user123", role: "instructor" };

      User.findByIdAndUpdate.mockResolvedValue(mockUser);

      await userController.updateUserRole(req, res, next);

      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual(mockUser);
      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
        "user123",
        { role: "instructor" },
        { new: true }
      );
    });

    it("should return 400 for invalid role", async () => {
      req.user = { role: "admin" };
      req.body.role = "superuser";

      await userController.updateUserRole(req, res, next);

      expect(res.statusCode).toBe(400);
    });
  });
});
