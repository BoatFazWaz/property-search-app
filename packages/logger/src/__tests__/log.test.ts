import { describe, it, expect, jest } from "@jest/globals";
import { logger } from "..";

jest.spyOn(global.console, "log");
jest.spyOn(global.console, "error");

describe("@repo/logger", () => {
  it("logs messages with different levels", () => {
    logger.log("test log");
    logger.info("test info");
    logger.error("test error");
    
    expect(console.log).toHaveBeenCalledWith("[LOG] test log");
    expect(console.log).toHaveBeenCalledWith("[INFO] test info");
    expect(console.error).toHaveBeenCalledWith("[ERROR] test error");
  });
});
